'use client'

import dynamic from 'next/dynamic'

// Carrega three + @react-three/fiber só no cliente, fora do bundle de entrada
// e fora do SSR (WebGL não existe no servidor).
const ShaderVideo = dynamic(() => import('./ShaderVideo'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-bg" />,
})

export default ShaderVideo
