'use client'
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Day_1 = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        // Referencia al canvas
        const canvas = canvasRef.current;

        // Crear la escena, cámara y renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas });

        // Ajustar el tamaño del canvas
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.position.z = 5;

        // Crear un cubo
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        // Función de animación
        const animate = () => {
            requestAnimationFrame(animate);

            // Rotar el cubo
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;

            // Renderizar la escena
            renderer.render(scene, camera);
        };

        animate();

        // Limpiar recursos cuando se desmonte el componente
        return () => {
            // Destruir el canvas y limpiar la escena
            renderer.dispose();
        };
    }, []);

    return (
        <div className="w-full h-screen flex items-center justify-center overflow-hidden">
            <canvas ref={canvasRef} className='absolute left-0 top-0 -z-10' />
            <div className='w-[1000px] h-96 flex items-center overflow-x-auto'>
                <div className='flex flex-row pl-16'>
                    {
                        ['/img/uvMap.png', '/img/uvMap.png', '/img/uvMap.png','/img/uvMap.png','/img/uvMap.png','/img/uvMap.png', '/img/uvMap.png', '/img/uvMap.png', '/img/uvMap.png'].map((item, index) => (
                            <div
                                key={index}
                                className='w-48 mr-16 h-72 cursor-pointer group bg-neutral-400 flex flex-col items-center py-3 rounded-lg'>
                                <div className='w-44 h-44 mb-2 relative outline-1 outline-offset-4 outline-transparent group-hover:outline-matcha-950 outline-dotted rounded overflow-hidden'>
                                    <Image fill src={item} className='' alt='example slider image' />
                                </div>
                                <div className='w-full px-2'>
                                    <h2 className='font-semibold text-lg'>Esta es la imagen numero {index}</h2>
                                    <p className='font-light text-xs'>Poner aqui una descripcion coherente respecto de la imagen del slider</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>

    );
};

export default Day_1;

