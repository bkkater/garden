import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { TexturePass } from 'three/addons/postprocessing/TexturePass.js'
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js'
import videoShader from '../shaders/videoShader.js'
import { getShaderSettings } from '../design/tokens'
import { video as videoMedia } from '../data/media'

const settings = getShaderSettings()

function VideoComposer({ video }) {
  const { gl, size } = useThree()
  const composerRef = useRef(null)
  const shaderPassRef = useRef(null)
  const lastSize = useRef({ width: 0, height: 0 })

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
  }, [gl, video])

  useFrame((state, delta) => {
    const composer = composerRef.current
    const shaderPass = shaderPassRef.current
    if (!composer || !shaderPass) return

    if (lastSize.current.width !== size.width || lastSize.current.height !== size.height) {
      composer.setSize(size.width, size.height)
      lastSize.current = { width: size.width, height: size.height }
    }

    const dpr = state.gl.getPixelRatio()
    shaderPass.uniforms.uTime.value += delta
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

  useEffect(() => {
    const element = videoRef.current
    if (!element) return

    const activate = () => {
      element.play().catch(() => {})
      setVideo(element)
    }

    if (element.readyState >= 2) activate()
    element.addEventListener('loadeddata', activate)
    element.addEventListener('canplay', activate)
    element.play().catch(() => {})

    return () => {
      element.removeEventListener('loadeddata', activate)
      element.removeEventListener('canplay', activate)
    }
  }, [])

  return (
    <div className="shader-video">
      <video
        ref={videoRef}
        src={videoMedia.background}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
      />

      {video && (
        <Canvas
          frameloop="always"
          gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
          dpr={[1, 1.5]}
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

export { settings }
