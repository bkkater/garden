'use client'

import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { TexturePass } from 'three/addons/postprocessing/TexturePass.js'
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js'
import videoShader from '@/shaders/videoShader.js'
import { getShaderSettings } from '@/lib/theme'
import { video as videoMedia } from '@/lib/media'

const settings = getShaderSettings()

// Não renderiza acima de ~30fps: o halftone/dither não ganha nada a 60.
const FRAME_INTERVAL = 1 / 30

function VideoComposer({ video }) {
  const { gl, size } = useThree()
  const composerRef = useRef(null)
  const shaderPassRef = useRef(null)
  const lastSize = useRef({ width: 0, height: 0 })
  const accumulator = useRef(0)

  useEffect(() => {
    const videoTexture = new THREE.VideoTexture(video)
    videoTexture.minFilter = THREE.LinearFilter
    videoTexture.magFilter = THREE.LinearFilter
    videoTexture.generateMipmaps = false
    videoTexture.colorSpace = THREE.SRGBColorSpace

    const composer = new EffectComposer(gl)
    composer.setPixelRatio(gl.getPixelRatio())
    composer.setSize(size.width, size.height)

    const texturePass = new TexturePass(videoTexture)
    const shaderPass = new ShaderPass(videoShader)

    shaderPass.uniforms.uGridSize.value = settings.gridSize
    shaderPass.uniforms.uDotSize.value = settings.dotSize
    shaderPass.uniforms.uContrast.value = settings.contrast
    shaderPass.uniforms.uBrightness.value = settings.brightness
    shaderPass.uniforms.uEffectStrength.value = settings.effectStrength
    shaderPass.uniforms.uColor.value = new THREE.Vector3(...settings.color)
    shaderPass.uniforms.uResolution.value = new THREE.Vector2(size.width, size.height)
    shaderPass.uniforms.uVideoSize.value = new THREE.Vector2(
      video.videoWidth || 1280,
      video.videoHeight || 720,
    )

    composer.addPass(texturePass)
    composer.addPass(shaderPass)

    composerRef.current = composer
    shaderPassRef.current = shaderPass

    return () => {
      composer.dispose()
      videoTexture.dispose()
      composerRef.current = null
      shaderPassRef.current = null
    }
    // size.width/height são lidos só para o valor inicial; o resize é tratado no useFrame.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gl, video])

  useFrame((state, delta) => {
    const composer = composerRef.current
    const shaderPass = shaderPassRef.current
    if (!composer || !shaderPass) return

    shaderPass.uniforms.uTime.value += delta

    // Pausa quando a aba está oculta ou o vídeo parou.
    if (document.hidden || video.paused || video.ended) return

    accumulator.current += delta
    if (accumulator.current < FRAME_INTERVAL) return
    accumulator.current = 0

    if (lastSize.current.width !== size.width || lastSize.current.height !== size.height) {
      composer.setSize(size.width, size.height)
      lastSize.current = { width: size.width, height: size.height }
    }

    const dpr = state.gl.getPixelRatio()
    shaderPass.uniforms.uResolution.value.set(size.width * dpr, size.height * dpr)
    shaderPass.uniforms.uVideoSize.value.set(
      video.videoWidth || 1280,
      video.videoHeight || 720,
    )

    state.gl.autoClear = true
    composer.render()
  }, 1)

  return null
}

export default function ShaderVideo() {
  const videoRef = useRef(null)
  const [video, setVideo] = useState(null)
  const [reducedMotion, setReducedMotion] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (event) => setReducedMotion(event.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const element = videoRef.current
    if (!element || reducedMotion) return

    const activate = () => {
      element.play().catch(() => {})
      setVideo(element)
    }

    if (element.readyState >= 2) activate()
    element.addEventListener('loadeddata', activate)
    element.addEventListener('canplay', activate)
    element.play().catch(() => {})

    const onVisibility = () => {
      if (document.hidden) element.pause()
      else element.play().catch(() => {})
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      element.removeEventListener('loadeddata', activate)
      element.removeEventListener('canplay', activate)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reducedMotion])

  // Sem animação: fundo sólido, sem WebGL nem vídeo.
  if (reducedMotion) {
    return <div className="h-full w-full bg-bg" />
  }

  return (
    <div className="relative h-full w-full">
      <video
        ref={videoRef}
        src={videoMedia.background}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0"
      />

      {video && (
        <Canvas
          frameloop="always"
          gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
          dpr={[1, 1.25]}
          className="block h-full! w-full!"
          style={{ position: 'absolute', inset: 0 }}
          onCreated={({ gl }) => {
            gl.setClearColor(settings.clearColor, 1)
            gl.toneMapping = THREE.NoToneMapping
          }}
          onPointerDown={() => video.play().catch(() => {})}
        >
          <VideoComposer video={video} />
        </Canvas>
      )}
    </div>
  )
}
