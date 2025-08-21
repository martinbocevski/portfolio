import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
// import modelUrl from "../assets/three/logo/m-3d-logo.gltf";
const modelUrl = `${import.meta.env.VITE_BASE_URL}models/m-3d-logo.gltf`;

export const getTHREE = () => {
  let container;
  let camera;
  let menuCamera;
  let renderer;
  let menuRenderer;
  let scene;
  let menuScene;
  let logo;
  let folder;
  let animation;
  let menuContainer;

  function init() {
    container = document.querySelector(".scene");
    menuContainer = document.querySelector(".menu-scene");

    //Create scene
    scene = new THREE.Scene();
    menuScene = new THREE.Scene();

    const fov = 35;
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1;
    const far = 1000;

    //Camera setup
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    menuCamera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 4, 30);
    menuCamera.position.set(0, 4, 30);

    const ambient = new THREE.AmbientLight(0x404040, 2);
    const menuAmbient = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambient);
    menuScene.add(menuAmbient);
    // scene.add(new THREE.AxesHelper());
    menuScene.add(new THREE.AxesHelper());

    const light = new THREE.DirectionalLight(0xdafcff, 2);
    const menuLight = new THREE.DirectionalLight(0x1aecff, 2);
    light.position.set(50, 50, 100);
    menuLight.position.set(50, 50, 100);
    scene.add(light);
    menuScene.add(menuLight);
    //Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    menuRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight, false);
    menuRenderer.setSize(
      menuContainer.clientWidth,
      menuContainer.clientHeight,
      false
    );
    renderer.setPixelRatio(window.devicePixelRatio);
    menuRenderer.setPixelRatio(window.devicePixelRatio);

    console.log(renderer.domElement.style.width);

    container.appendChild(renderer.domElement);
    menuContainer.appendChild(menuRenderer.domElement);

    //Load Model
    // let loader = new GLTFLoader();
    let logoLoader = new GLTFLoader();
    // console.log(loader);
    // loader.load("../assets/three/scene14.1.gltf", (gltf) => {
    //   console.log(gltf);
    //   // scene.add(gltf.scene);
    //   logo = gltf.scene;
    //   logo.scale.set(2, 2, 2);
    //   logo.position.set(0, 4, 0);
    //   scene.add(logo);
    //   console.log(logo);
    //   animate();
    // });
    // logoLoader.load("../assets/three/logo/m-3d-logo.gltf", (gltf) => {
    //   console.log(gltf);

    //   logo = gltf.scene.children[0];
    //   // console.log(logo);
    //   logo.scale.set(2.3, 2.3, 2.3);
    //   logo.position.set(0, 4, 0);
    //   scene.add(logo);

    //   animate();
    // });

    logoLoader.load("../../models/m-3d-logo.gltf", (gltf) => {
      console.log(gltf);

      logo = gltf.scene.children[0]; // this is a Group
      if (window.matchMedia("(max-width: 768px)").matches) {
        // Mobile or tablet screen
        logo.scale.set(1.5, 1.5, 1.5);
        logo.position.set(0, 4, 0);
      } else {
        // Desktop screen
        logo.scale.set(2.6, 2.6, 2.6);
        logo.position.set(0, 3.5, 0);
      }

      // Traverse all children of the group to apply opacity to meshes
      logo.traverse((child) => {
        if (child.isMesh) {
          // If no material exists, assign one
          if (!child.material) {
            child.material = new THREE.MeshStandardMaterial({
              color: 0xffffff,
              opacity: 0.2,
            });
          } else {
            child.material.transparent = true;
            child.material.opacity = 0.5;
          }
        }
      });

      scene.add(logo);
      animate();
    });
    // loader.load("../assets/three/low_polly_barrel.glb", (gltf) => {
    //   // console.log(gltf.children[2]);
    //   console.log(gltf.scene.children[0].children[0]);
    //   // scene.add(gltf.scene);
    //   folder = gltf.scene.children[0].children[0];
    //   // console.log(logo);
    //   folder.scale.set(-1.5, -1.5, -1.5);
    //   folder.position.set(0, -2, 0);
    //   folder.rotation.x += 1.5;
    //   // folder.rotation.z += 0.2;
    //   menuScene.add(folder);

    //   animateMenu();
    // });
    // loaderFunction("../assets/three/folder.gltf");
    // loaderFunction("../assets/three/lightsaber/wanderers_lightsaber.gltf");
    // loaderFunction("../assets/three/gameboy/scene.gltf");
    // loaderFunction("../assets/three/low_polly_barrel.glb");

    const menuAnchors = document.querySelectorAll(".menu-anchor");
    menuContainer.querySelector("canvas").style.display = "none";
    menuAnchors.forEach((element) => {
      element.addEventListener("mouseover", () => {
        menuContainer.querySelector("canvas").style.display = "block";
      });
      element.addEventListener("mouseout", () => {
        menuContainer.querySelector("canvas").style.display = "none";
      });
    });
  }

  let clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    logo.rotation.z += 0.008;

    renderer.render(scene, camera);
    // menuRenderer.render(menuScene, menuCamera);
  }
  function animateMenu() {
    requestAnimationFrame(animateMenu);
    folder.rotation.z += 0.007;
    menuRenderer.render(menuScene, menuCamera);
  }

  init();

  function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth, container.clientHeight);
  }

  window.addEventListener("resize", onWindowResize);
};

export const getDisk = () => {
  const diskContainer = document.querySelector("#disk");
  console.log(diskContainer);

  const camera = new THREE.PerspectiveCamera(
    75,
    diskContainer.clientWidth / diskContainer.clientWidth,
    0.1,
    1000
  );
  // camera.position.z = 13;
  // camera.position.set(0, 4, 30);

  const scene = new THREE.Scene();
  // scene.background = new THREE.Color(0x110011);
  let disk;

  // const geometry = new THREE.BoxGeometry(1, 1, 1);
  // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  // const cube = new THREE.Mesh(geometry, material);
  // scene.add(cube);

  camera.position.z = 5;

  const loader = new GLTFLoader();
  loader.load(
    "../assets/three/gameboy/scene.gltf",
    function (gltf) {
      disk = gltf.scenes[0].children[0];
      disk.scale.setScalar(0.6);
      disk.position.set(0, -2.3, 0);
      // disk.rotation.z = "180";
      // gltf.traverse(function (child) {
      //   if (child.isMesh) {
      //     gltf.material.wireframe = true;
      //     disk.material.wireframeLinewidth = 2; // Optional
      //     disk.material.wireframeLinecap = "round";
      //     // ...
      //   }
      // });
      scene.add(disk);

      // camera.lookAt(disk.position);

      console.log(gltf);
    },
    function (xhr) {},
    function (error) {}
  );

  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(diskContainer.clientWidth, diskContainer.clientWidth);
  diskContainer.appendChild(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0xdafcff, 1.5);
  scene.add(ambientLight);
  scene.add(new THREE.HemisphereLight(0xdafcff, 0xdafcff, 2.0));
  // scene.add(new THREE.AxesHelper());

  const reRender3D = () => {
    requestAnimationFrame(reRender3D);

    if (disk) disk.rotation.z += 0.01;
    renderer.render(scene, camera);
  };
  reRender3D();
};

export const getCube = () => {
  const cubeContainer = document.querySelector("#cube");
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    cubeContainer.clientWidth / cubeContainer.clientWidth,
    0.1,
    1000
  );

  // scene.background = new THREE.Color(0x110011);
  let cube;

  // const geometry = new THREE.BoxGeometry(1, 1, 1);
  // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  // const cube = new THREE.Mesh(geometry, material);
  // scene.add(cube);

  camera.position.z = 5;

  const cubeLoader = new GLTFLoader();
  cubeLoader.load(
    "../assets/three/tron_disk.glb",
    function (gltf) {
      cube = gltf.scenes[0].children[0];
      cube.scale.setScalar(1.5);
      cube.position.set(0, -1, 0);
      // disk.rotation.z = "180";
      scene.add(cube);

      // camera.lookAt(disk.position);

      console.log(gltf);
    },
    function (xhr) {},
    function (error) {}
  );

  const cubeRenderer = new THREE.WebGLRenderer({ alpha: true });
  cubeRenderer.setSize(cubeContainer.clientWidth, cubeContainer.clientWidth);
  cubeContainer.appendChild(cubeRenderer.domElement);

  const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
  scene.add(ambientLight);
  scene.add(new THREE.HemisphereLight(0xdafcff, 0xdafcff, 2.0));
  // scene.add(new THREE.AxesHelper());

  const cubeRender3D = () => {
    requestAnimationFrame(cubeRender3D);

    if (cube) cube.rotation.z += 0.01;
    cubeRenderer.render(scene, camera);
  };
  cubeRender3D();
};
