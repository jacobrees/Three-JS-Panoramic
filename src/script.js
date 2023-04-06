import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Select the container for the scene
const canvas = document.querySelector('.webgl')

// Create the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});

renderer.setSize(window.innerWidth, window.innerHeight);

// Load the panoramic image and create a texture
const loader = new THREE.TextureLoader();
const texture = loader.load('panoramic-bedroom.jpeg');

// Create a spherical geometry and map the texture to it
const geometry = new THREE.SphereGeometry(500, 60, 40);

// Flip the geometry inside out
geometry.scale(-1, 1, 1);

const material = new THREE.MeshBasicMaterial({
    map: texture
});

const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Set up the camera and controls
camera.position.set(0, 0, 0.1);

const controls = new OrbitControls(camera, canvas);
controls.enableZoom = false;
controls.enablePan = false;

controls.rotateSpeed = 0.3;

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

// Animation loop
let lastTime = 0;
const rotationSpeed = 0.00005;

function animate(time) {
    const delta = time - lastTime;
    lastTime = time;
    requestAnimationFrame(animate);

    sphere.rotation.y += rotationSpeed * delta;

    controls.update();
    renderer.render(scene, camera);
}

animate(0);
