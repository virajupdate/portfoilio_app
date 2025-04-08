import Loader from '../components/Loader'
import { Canvas } from '@react-three/fiber'
import React, { useState, useEffect, Suspense,lazy } from 'react'
import Island from '../models/Island'
import Sky from '../models/Sky'
import Bird from '../models/Bird'
import Plane from '../models/Plane'
import HomeInfo from '../components/HomeInfo'

const getLightSettings = () => {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 18) {
    return { ambient: 0.7, directional: 1.2, hemisphere: 1.0 };
  } else if (hour >= 18 && hour < 20) {
    return { ambient: 0.5, directional: 1.0, hemisphere: 0.8 };
  } else {
    return { ambient: 0.3, directional: 0.5, hemisphere: 0.6 };
  }
};

const Home = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);
  const [lightSettings, setLightSettings] = useState(getLightSettings());

  // Ensure currentStage is reset to 1 when component mounts
  useEffect(() => {
    setCurrentStage(1);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLightSettings(getLightSettings());
    }, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const adjustIslandForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [1, -6.5, -43];
    let rotation = [0.1, 4.7, 0];

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1, 1, 1];
    }
    return [screenScale, screenPosition, rotation];
  };

  const adjustPlaneForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }
    return [screenScale, screenPosition];
  };

  const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();
  const [planeScale, planePosition] = adjustPlaneForScreenSize();

  return (
    <section className="w-full h-screen relative">
      <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>
      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={lightSettings.ambient} />
          <directionalLight position={[5, 10, 5]} intensity={lightSettings.directional} />
          <hemisphereLight
            skyColor="#b1e1ff"
            groundColor="#000000"
            intensity={lightSettings.hemisphere}
          />
          <Bird />
          <Sky isRotating={isRotating} setLightSettings={setLightSettings} />
          <Island
            position={islandPosition}
            scale={islandScale}
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
          <Plane
            isRotating={isRotating}
            scale={planeScale}
            position={planePosition}
            rotation={[0, 20, 0]}
          />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Home;
