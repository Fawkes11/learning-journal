'use client'
import ASScroll from '@ashthornton/asscroll';
import gsap from 'gsap';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Pane } from 'tweakpane';

const Day_1 = () => {
    const canvasRef = useRef(null);
    const scrollContainer = useRef(null);

    useEffect(() => {
        // Referencia al canvas
        const canvas = canvasRef.current;

        let asscroll = null;

        asscroll = new ASScroll({
            disableRaf: true, // Desactiva el requestAnimationFrame interno para usar el de Three.js
        });
        asscroll.enable({
            horizontalScroll: true, // Activa scroll horizontal, ya que tienes un slider horizontal
        });



        //new TWEAKPANE control
        const pane = new Pane();

        const sizes = {
            w: window.innerWidth,
            h: window.innerHeight
        }

        // Crear la escena, cámara y renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(30, sizes.w / sizes.h, 10, 1000);
        camera.position.z = 600;

        camera.fov = 2 * Math.atan((sizes.h / 2) / 600) * (180 / Math.PI);
        camera.updateProjectionMatrix();


        const renderer = new THREE.WebGLRenderer({ canvas });

        // Ajustar el tamaño del canvas
        renderer.setSize(window.innerWidth, window.innerHeight);

        //BASE PlANE
        let basePlaneGeometry = new THREE.PlaneGeometry(300, 300, 100, 100);
        let loader = new THREE.TextureLoader();
        let textureSampler = loader.load('/img/uvMap.png')
        // let textureSampler = loader.load('/img/landscape_01.jpeg')
        let basePlaneMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0.0 },
                fogDensity: { value: 0.1 },
                uProgress: { value: 0.0 },
                uTextureSize: { value: new THREE.Vector2(100, 100) },
                uCorners: { value: new THREE.Vector4(0, 0, 0, 0) },
                uResolution: { value: new THREE.Vector2(sizes.w, sizes.h) },
                uQuadSize: { value: new THREE.Vector2(300, 300) },
                texture1: { value: textureSampler }
            },
            vertexShader,
            fragmentShader,
            // wireframe: true
        })
        const basePlaneMesh = new THREE.Mesh(basePlaneGeometry, basePlaneMaterial);
        basePlaneMesh.position.x = 300;
        scene.add(basePlaneMesh);


        /**
         * GSAP ANIMATION
         */

        const timeline = gsap.timeline().pause()
            .to(basePlaneMesh.material.uniforms.uCorners.value, {
                x: 1,
                duration: 1
            }).to(basePlaneMesh.material.uniforms.uCorners.value, {
                y: 1,
                duration: 1
            }, 0.1).to(basePlaneMesh.material.uniforms.uCorners.value, {
                z: 1,
                duration: 1
            }, 0.2).to(basePlaneMesh.material.uniforms.uCorners.value, {
                w: 1,
                duration: 1
            }, 0.3)


        /**
        * LIGHTS
        */



        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)

        scene.add(ambientLight);

        /**
         * ORBIT CONTROLS
         */
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.update();


        let clock = new THREE.Clock();

        // Función de animación
        const animate = () => {
            requestAnimationFrame(animate);


            let elapsedTime = clock.getElapsedTime();
            basePlaneMaterial.uniforms.time.value = elapsedTime;

            timeline.progress(params.progress)


            asscroll.update();

            // Renderizar la escena
            renderer.render(scene, camera);
        };

        function onWindowResize() {


            sizes.w = window.innerWidth;
            sizes.h = window.innerHeight;

            //basePlaneMesh.material.uniforms.uResolution.value = new THREE.Vector2(sizes.w, sizes.h)
            timeline.progress(params.progress)

            // Ajusta el tamaño del renderer.
            renderer.setSize(sizes.w, sizes.h);
            renderer.setPixelRatio(window.devicePixelRatio);

            // Actualiza la relación de aspecto de la cámara.
            camera.aspect = sizes.w / sizes.h;
            camera.fov = 2 * Math.atan((sizes.h / 2) / 600) * (180 / Math.PI);
            camera.updateProjectionMatrix();

        }

        window.addEventListener('resize', onWindowResize);


        /**
         * GUI CONTROL BINDINGS
         */
        const params = {
            progress: basePlaneMaterial.uniforms.uProgress.value
        };

        pane.addBinding(params, 'progress', { min: 0, max: 1, step: 0.001 }).on('change', (ev) => {
            basePlaneMaterial.uniforms.uProgress.value = ev.value;
        });

        animate();

        // Limpiar recursos cuando se desmonte el componente
        return () => {
            // Destruir el canvas y limpiar la escena
            renderer.dispose();
            window.removeEventListener('resize', onWindowResize)
            asscroll.disable();
        };
    }, []);

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <canvas ref={canvasRef} className='w-full h-full absolute left-0 top-0 -z-10' />
            <div asscroll-container="true" className=' w-[1000px] h-96 flex items-center'>
                <div className='flex flex-row pl-16'>
                    {
                        ['/img/uvMap.png', '/img/uvMap.png', '/img/uvMap.png', '/img/uvMap.png', '/img/uvMap.png', '/img/uvMap.png', '/img/uvMap.png', '/img/uvMap.png', '/img/uvMap.png'].map((item, index) => (
                            <div
                                key={index}
                                className='w-48 mr-16 h-72 cursor-pointer group bg-neutral-400 flex flex-col items-center py-3 rounded-lg'>
                                <div className='w-44 h-44 mb-2 relative outline-1 outline-offset-4 outline-transparent group-hover:outline-matcha-950 outline-dotted rounded overflow-hidden'>
                                    <Image src={item} width={1024} height={1024} className='' alt='example slider image' priority />
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

const fragmentShader = `
uniform float time;

uniform float fogDensity;
uniform vec3 fogColor;
uniform float uProgress;
uniform vec2 uTextureSize;

uniform sampler2D texture1;

varying vec2 vUv;
varying vec2 vSize;

vec2 getUV(vec2 uv, vec2 textureSize, vec2 quadSize){
	vec2 tempUV = uv - vec2(0.5);

	float quadAspect = quadSize.x/quadSize.y;
	float textureAspect = textureSize.x/textureSize.y;

	if(quadAspect < textureAspect){
		tempUV = tempUV*vec2(quadAspect/textureAspect,1.);
	}else{
		tempUV = tempUV*vec2(1.,textureAspect/quadAspect);
	}


	tempUV += vec2(0.5);
	return tempUV;
}

void main(void) {

	vec2 correctUV = getUV(vUv , uTextureSize, vSize);
	vec4 color = texture(texture1, correctUV);
	gl_FragColor = color;

}

`

const vertexShader = `

uniform float time;
uniform float uProgress;
uniform vec2 uResolution;
uniform vec2 uQuadSize;
uniform vec4 uCorners;

varying vec2 vSize;

varying vec2 vUv;

void main()
{

    float PI = 3.1415926;
	vUv = uv;
    float sine = sin(PI * uProgress);
    float waves = sine *0.1 * sin(5. * length(uv) + 15. * uProgress);

	vec4 defaultState = modelMatrix * vec4( position,1.0 );
	vec4 fullScreenState =  vec4( position,1.0 ) ;
	fullScreenState.x *= uResolution.x/uQuadSize.x;
	fullScreenState.y *= uResolution.y/uQuadSize.y;

    float cornersProgress = mix(
        mix(uCorners.w, uCorners.y, uv.x),
        mix(uCorners.z, uCorners.x, uv.x),
        uv.y
    );

	vec4 newState = mix(defaultState, fullScreenState, uProgress + waves);

	vSize = mix(uQuadSize, uResolution, uProgress);

	gl_Position = projectionMatrix * viewMatrix * newState ;

}
    `