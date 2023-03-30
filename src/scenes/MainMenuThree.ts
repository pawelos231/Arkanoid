//@ts-ignore
import * as THREE from "three";

// @ts-ignore
import { EffectComposer } from "../../node_modules/three/examples/jsm/postprocessing/EffectComposer.js";
// @ts-ignore
import { RenderPass } from "../../node_modules/three/examples/jsm/postprocessing/RenderPass.js";
// @ts-ignore
import { UnrealBloomPass } from "../../node_modules/three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { Common } from "../modules/Common.js";

const NUMBER_OF_STARS = 600;

interface addParticleReturnFuncInterface {
  Particle: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>;
  material: THREE.MeshStandardMaterial;
}

interface Sizes {
  width: number,
  height: number
}

export class StarsBackroundView extends Common {

  NUMBER_OF_STARS: number
  canvas: HTMLCanvasElement
  scene: THREE.scene
  geometry: THREE.TorusGeometry
  pointLight: THREE.pointLight
  Particle: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>
  material: THREE.PointsMaterial
  sphere: THREE.Points<THREE.TorusGeometry, THREE.PointsMaterial>
  renderer: THREE.WebGLRenderer
  camera: THREE.PerspectiveCamera
  sizes: Sizes
  arrOfParticles: addParticleReturnFuncInterface[] | any[]
  clock: THREE.clock
  bloomComposer: any

  constructor(NUMBER_OF_STARS: number, CANVAS_ID: string) {
    super(CANVAS_ID)

    this.NUMBER_OF_STARS = NUMBER_OF_STARS
    this.canvas = this.elementId as HTMLCanvasElement
    this.scene = new THREE.Scene()
    this.geometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);
    this.pointLight = new THREE.PointLight(0xffffff, 0.1);
    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    this.material =  new THREE.PointsMaterial({
      size: 0.005,
      color: "#0000ff",
    });
    this.arrOfParticles = []
    this.sphere = new THREE.Points(this.geometry, this.material);
    this.pointLight.position.x = 2;
    this.pointLight.position.y = 3;
    this.pointLight.position.z = 10;
    this.pointLight.intensity = 0.07;
  }

  addParticle(): addParticleReturnFuncInterface {

    let [x, y, z]: number[] = Array(3).fill(3)
      .map(() => THREE.MathUtils.randFloat(-100, 60));

    let geometry: THREE.SphereGeometry = new THREE.SphereGeometry(0.05, 24, 24);

    let material: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial({
      color: 0xfdb813,
      emissive: "#FF0000",
      emissiveIntensity: 13,
    });

    this.Particle = new THREE.Mesh(geometry, material);

    if (Math.abs(x) > 100 || Math.abs(y) > 100 || Math.abs(z) > 100) {
      geometry = new THREE.SphereGeometry(0.2, 24, 24);
      this.Particle = new THREE.Mesh(geometry, material);
    }

    this.Particle.position.set(x, y, z * 1.1);
    this.scene.add(this.Particle);
    this.scene.add(this.pointLight);

    return { Particle: this.Particle, material };

  }

  resizeWindow(): void{
    const sizes: Sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    
    window.addEventListener("resize", () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
    
      this.camera.aspect = sizes.width / sizes.height;
      this.camera.updateProjectionMatrix();
    
      this.renderer.setSize(sizes.width, sizes.height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
  }

  ArrOfParticles(){
    let arrOfParticles: addParticleReturnFuncInterface[] = [];

    Array(this.NUMBER_OF_STARS)
      .fill(0)
      .forEach(() => {
        arrOfParticles.push(this.addParticle());
      });
      return arrOfParticles
  }

  addCameraToScene(){
    const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
      75,
      this.sizes.width / this.sizes.height,
      0.1,
      500
    );
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 0.5;
    this.scene.add(camera)
    this.camera = camera
  }


  CreateRenderer(){
    const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
    });
    renderer.shadowMap.enabled = true;

    const renderScene: any = new RenderPass(this.scene, this.camera);
    const bloomPass: any = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    );
    bloomPass.threshold = 1.5;
    bloomPass.strength = 3; //intensity of glow
    bloomPass.radius = 10.5;
    const bloomComposer = new EffectComposer(renderer);
    bloomComposer.setSize(window.innerWidth, window.innerHeight);
    bloomComposer.renderToScreen = true;
    bloomComposer.addPass(renderScene);
    bloomComposer.addPass(bloomPass);
    
    renderer.setSize(this.sizes.width, this.sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.bloomComposer = bloomComposer
    this.renderer = renderer
    
  }

  Init(){
    this.clock = new THREE.Clock();
    this.arrOfParticles = this.ArrOfParticles()
    this.addCameraToScene()
    this.CreateRenderer()
    this.resizeWindow()
  }

  Tick(){
    console.log("tick")
    const elapsedTime: number = this.clock.getElapsedTime();
  
    this.arrOfParticles.forEach((item: addParticleReturnFuncInterface, i: number) => {
  
      item.Particle.position.z = item.Particle.position.z + 0.2855;
      item.material.emissive.r = 1 * Math.abs(item.Particle.position.z);
      item.material.emissive.g = 3.86 * Math.abs(1 / item.Particle.position.z);
      item.material.emissive.b = 3.86 * Math.abs(1 / item.Particle.position.z);
  
      if (item.Particle.position.z > 1.5) {
        item.Particle.geometry.dispose();
        item.Particle.material.dispose();
        this.scene.remove(item.Particle);
        this.arrOfParticles.splice(i, 1);
        this.arrOfParticles.push(this.addParticle());
      }
  
    });
    this.sphere.rotation.y = 0.5 * elapsedTime;
    this.renderer.render(this.scene, this.camera);
    this.bloomComposer.render();

  };

}


