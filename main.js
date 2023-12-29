import * as THREE from 'three';

import { AsciiEffect } from 'three/addons/effects/AsciiEffect.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let camera, controls, scene, renderer, effect;
let torus;

const start = Date.now();
init();
animate();

function init(){
    camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth/window.innerHeight,
        1,
        100);
    camera.position.set(30,0,0);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0,0,0);

    const pointLight = new THREE.PointLight(
        0xffffff,
        3,
        0,
        0
    );
    pointLight.position.set(15,15,15);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(
        0xffffff,
        3,
        0,
        0
    );
    pointLight2.position.set(-15,15,-15);
    scene.add(pointLight2);


    torus = donut();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    effect = new AsciiEffect( renderer, ' .,:;i1tfLCG08@', { invert: true } );
    effect.setSize( window.innerWidth, window.innerHeight );
    effect.domElement.style.color = 'white';
    effect.domElement.style.backgroundColor = 'black';

    controls = new OrbitControls( camera, effect.domElement );
    controls.autoRotate = true;
    document.body.appendChild( effect.domElement );
    window.addEventListener( 'resize', onWindowResize );
}

function donut(){
    const geometry = new THREE.TorusGeometry( 10, 5, 150, 300 );
    const material =  new THREE.MeshPhongMaterial( { flatShading: true });
    const torus = new THREE.Mesh( geometry, material );
    scene.add( torus );
    return torus;
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
    effect.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

    requestAnimationFrame( animate );

    render();

}

function render(){
    const timer = Date.now() - start;

    torus.rotation.x = timer * 0.0003;
    torus.rotation.y = timer * 0.0002;
    effect.render(scene, camera);
}