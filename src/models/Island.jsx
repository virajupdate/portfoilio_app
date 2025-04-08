import React, { useRef, useEffect, useMemo, useCallback } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { a } from '@react-spring/three'
import islandScene from '../assets/3d/island.glb'

const Island = ({ isRotating, setIsRotating, setCurrentStage, ...props }) => {
  const islandRef = useRef()
  const { gl, viewport } = useThree()
  const { nodes, materials } = useGLTF(islandScene)

  const lastX = useRef(0)
  const rotationSpeed = useRef(0)
  const dampingFactor = 0.95

  const getStageFromRotation = (rotation) => {
    const normalizedRotation = ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)
    
    if (normalizedRotation >= 5.45 && normalizedRotation <= 6) return 4
    if (normalizedRotation >= 0.85 && normalizedRotation <= 1.5) return 3
    if (normalizedRotation >= 2.4 && normalizedRotation <= 2.8) return 2
    if (normalizedRotation >= 4.25 && normalizedRotation <= 4.75) return 1
    return null
  }

  const handlePointerDown = useCallback((e) => {
    e.stopPropagation()
    e.preventDefault()
    setIsRotating(true)

    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    lastX.current = clientX
  }, [setIsRotating])

  const handlePointerUp = useCallback((e) => {
    e.stopPropagation()
    e.preventDefault()
    setIsRotating(false)
  }, [setIsRotating])

  const handlePointerMove = useCallback((e) => {
    if (!isRotating) return
    
    e.stopPropagation()
    e.preventDefault()

    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const delta = (clientX - lastX.current) / viewport.width
    
    islandRef.current.rotation.y += delta * 0.01 * Math.PI
    lastX.current = clientX
    rotationSpeed.current = delta * 0.01 * Math.PI
  }, [isRotating, viewport.width])

  const handleKeyDown = useCallback((e) => {
    if (isRotating) return
    
    if (e.key === 'ArrowLeft') {
      setIsRotating(true)
      islandRef.current.rotation.y += 0.01 * Math.PI
      rotationSpeed.current = 0.04
    } else if (e.key === 'ArrowRight') {
      setIsRotating(true)
      islandRef.current.rotation.y -= 0.01 * Math.PI
      rotationSpeed.current = -0.04
    }
  }, [isRotating, setIsRotating])

  const handleKeyUp = useCallback((e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      setIsRotating(false)
    }
  }, [setIsRotating])

  useFrame(() => {
    if (!isRotating) {
      rotationSpeed.current *= dampingFactor
      
      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0
      }
      
      islandRef.current.rotation.y += rotationSpeed.current
    } else {
      const currentStage = getStageFromRotation(islandRef.current.rotation.y)
      setCurrentStage(currentStage)
    }
  })

  useEffect(() => {
    const canvas = gl.domElement
    
    canvas.addEventListener('pointerdown', handlePointerDown)
    canvas.addEventListener('pointerup', handlePointerUp)
    canvas.addEventListener('pointermove', handlePointerMove)
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown)
      canvas.removeEventListener('pointerup', handlePointerUp)
      canvas.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [gl, handlePointerDown, handlePointerUp, handlePointerMove, handleKeyDown, handleKeyUp])

  const islandMeshes = useMemo(() => (
    <>
      <mesh
        geometry={nodes.polySurface944_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface945_tree1_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface946_tree2_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface947_tree1_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface948_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface949_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.pCube11_rocks1_0.geometry}
        material={materials.PaletteMaterial001}
      />
    </>
  ), [nodes, materials])

  return (
    <a.group ref={islandRef} {...props}>
      {islandMeshes}
    </a.group>
  )
}

useGLTF.preload('/island.glb')
export default Island