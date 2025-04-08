import { useGLTF } from '@react-three/drei'
import { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import skySceneDay from '../assets/3d/sky.glb'
import skySceneDawn from '../assets/3d/sky_dawn.glb'
import skySceneNight from '../assets/3d/sky_night.glb'

const getSkyScene = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 18) {
        return { sky: skySceneDay, lightSettings: { ambient: 0.7, directional: 1.2, hemisphere: 1.0 } };
    } else if (hour >= 18 && hour < 20) {
        return { sky: skySceneDawn, lightSettings: { ambient: 0.5, directional: 1.0, hemisphere: 0.8 } };
    } else {
        return { sky: skySceneNight, lightSettings: { ambient: 0.1, directional: 0.2, hemisphere: 0.2} };
    }
};

const Sky = ({ isRotating, setLightSettings }) => {
    const [currentSky, setCurrentSky] = useState(getSkyScene());
    const sky = useGLTF(currentSky.sky);
    const skyRef = useRef();

    useEffect(() => {
        const interval = setInterval(() => {
            const newSky = getSkyScene();
            setCurrentSky(newSky);
            setLightSettings(newSky.lightSettings);
        }, 60000); // Check every minute
        return () => clearInterval(interval);
    }, [setLightSettings]);

    useFrame((_, delta) => {
        if (isRotating) {
            skyRef.current.rotation.y += 0.15 * delta;
        }
    });

    return (
        <mesh ref={skyRef}>
            <primitive object={sky.scene} />
        </mesh>
    );
};

export default Sky;
