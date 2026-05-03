

//Variables for setup

let targetRotationY = 0;
let targetRotationX = 0;
let container;
let camera;
let renderer;
let scene;
let house;
let house2;
let house3;

let object;

function init()
{
container = document.querySelector('.scene');

scene = new THREE.Scene();

const fov = 35;
const aspect = container.clientWidth / container.clientHeight;
const near = 0.1;
const far = 500;

camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 3, 30);

const ambient = new THREE.AmbientLight(0x404040, 4);
scene.add(ambient);

const light = new THREE.DirectionalLight(0xffffff,4);
light.position.set(10,10,10);
scene.add(light);

renderer = new THREE.WebGLRenderer ({antialias: true, alpha: true});
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);

container.appendChild(renderer.domElement);






document.addEventListener('mousemove', onMouseMove, false);

document.addEventListener('wheel', onMouseWheel, false);

//document.addEventListener('click', onMouseClick, false);




//function onMouseClick(event) {
  //camera.position.x -=  300;
//}




function onMouseWheel(event) {
  camera.position.z -= event.deltaY * 0.1;
}

function onMouseMove(event) {
    targetRotationY = (event.clientX / window.innerWidth) * 2 * Math.PI * 2;
    targetRotationX = (event.clientY / window.innerHeight) * 2 * Math.PI * 2;
  }


let loader = new THREE.GLTFLoader();

loader.load("./3d/drop6.gltf", function(gltf) {
    scene.add(gltf.scene);
    house = gltf.scene.children[0];
    house.position.x = -900;
    animate();
})
}

let loader = new THREE.GLTFLoader();

loader.load("./3d/scena.gltf", function(gltf) {
    scene.add(gltf.scene);
    house2 = gltf.scene.children[0];
    house2.position.x = -300;
    animate();
    
})

loader.load("./3d/YOŁ.gltf", function(gltf) {
  scene.add(gltf.scene);
  house3 = gltf.scene.children[0];
  house3.position.x = -600;
  animate();
  
})




function animate()
{
    requestAnimationFrame(animate);
    //house.rotation.y += 0.005;
    renderer.render(scene, camera);
    house.rotation.y += (targetRotationY - house.rotation.y) * 0.05;
    house.rotation.x += (targetRotationX - house.rotation.x) * 0.05;

    
    
    
   house2.rotation.y += (targetRotationY - house2.rotation.y) * 0.05;
   house2.rotation.x += (targetRotationX - house2.rotation.x) * 0.05;

   house3.rotation.y += (targetRotationY - house3.rotation.y) * 0.05;
   house3.rotation.x += (targetRotationX - house3.rotation.x) * 0.05;

}

init();


function onWindowResize() 
{
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth, container.clientHeight);

}

window.addEventListener("resize", onWindowResize);



