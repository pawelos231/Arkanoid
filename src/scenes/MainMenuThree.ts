//@ts-ignore
import * as THREE from "three";

// @ts-ignore
import { EffectComposer } from "../../node_modules/three/examples/jsm/postprocessing/EffectComposer.js";
// @ts-ignore
import { RenderPass } from "../../node_modules/three/examples/jsm/postprocessing/RenderPass.js";
// @ts-ignore
import { UnrealBloomPass } from "../../node_modules/three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { Common } from "../modules/Common.js";

interface Particle {
  mesh: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>;
  material: THREE.MeshStandardMaterial;
}

interface Sizes {
  width: number;
  height: number;
}

export class StarsBackgroundView extends Common<true> {
  NUMBER_OF_STARS: number;
  canvas: HTMLCanvasElement;
  scene: THREE.Scene;
  geometry: THREE.TorusGeometry;
  pointLight: THREE.PointLight;
  particles: Particle[];
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  sizes: Sizes;
  clock: THREE.Clock;
  bloomComposer: any;

  constructor(NUMBER_OF_STARS: number, CANVAS_ID: string) {
    super(CANVAS_ID);

    this.NUMBER_OF_STARS = NUMBER_OF_STARS;
    this.canvas = this.elementId as HTMLCanvasElement;
    this.scene = new THREE.Scene();
    this.geometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);
    this.pointLight = new THREE.PointLight(0xffffff, 0.1);
    this.particles = [];
    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  addParticle(): Particle {
    const [x, y, z] = Array.from({ length: 3 }, () =>
      THREE.MathUtils.randFloat(-100, 60)
    );

    let geometry = new THREE.SphereGeometry(0.05, 24, 24);
    let material = new THREE.MeshStandardMaterial({
      color: 0xfdb813,
      emissive: "#FF0000",
      emissiveIntensity: 13,
    });

    if (Math.abs(x) > 100 || Math.abs(y) > 100 || Math.abs(z) > 100) {
      geometry = new THREE.SphereGeometry(0.2, 24, 24);
    }

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z * 1.1);
    this.scene.add(mesh);

    return { mesh, material };
  }

  resizeWindow(): void {
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

  init(): void {
    this.clock = new THREE.Clock();
    this.particles = Array.from({ length: this.NUMBER_OF_STARS }, () =>
      this.addParticle()
    );

    this.camera = new THREE.PerspectiveCamera(
      75,
      this.sizes.width / this.sizes.height,
      0.1,
      500
    );
    this.camera.position.set(0, 0, 0.5);
    this.scene.add(this.camera);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
    });
    this.renderer.shadowMap.enabled = true;

    const renderScene = new RenderPass(this.scene, this.camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    );
    bloomPass.threshold = 1.5;
    bloomPass.strength = 3;
    bloomPass.radius = 10.5;
    this.bloomComposer = new EffectComposer(this.renderer);
    this.bloomComposer.setSize(window.innerWidth, window.innerHeight);
    this.bloomComposer.renderToScreen = true;
    this.bloomComposer.addPass(renderScene);
    this.bloomComposer.addPass(bloomPass);

    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.resizeWindow();
  }

  tick(): void {
    const elapsedTime: number = this.clock.getElapsedTime();

    this.particles.forEach((particle, index) => {
      particle.mesh.position.z += 0.5855;
      particle.material.emissive.r = 1 * Math.abs(particle.mesh.position.z);
      particle.material.emissive.g =
        3.86 * Math.abs(1 / particle.mesh.position.z);
      particle.material.emissive.b =
        3.86 * Math.abs(1 / particle.mesh.position.z);

      if (particle.mesh.position.z > 1.5) {
        this.scene.remove(particle.mesh);
        this.particles.splice(index, 1);
        this.particles.push(this.addParticle());
      }
    });

    this.renderer.render(this.scene, this.camera);
    this.bloomComposer.render();
  }
}
