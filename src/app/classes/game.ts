import {Engine, Scene, FreeCamera, FollowCamera, Light, Vector3, HemisphericLight, MeshBuilder} from 'babylonjs';
import Test from "app/classes/Test";

export class Game {
        private _canvas: HTMLCanvasElement;
        private _engine: Engine;
        private _scene: Scene;
        private _camera: FollowCamera;
        private _light: Light;
        private _Test: Test;
        private _lasttime: number;
        public DuckNumber: number = 2;
  constructor(canvasElement : string) {
    this._canvas = <HTMLCanvasElement>document.getElementById(canvasElement);
    this._engine = new Engine(this._canvas, true);
    this._Test = new Test();
    this._lasttime = Date.now();
  }

  createScene() : void {
   // create a basic BJS Scene object
   this._scene = this._Test.generateBaseScene(this._engine);
   // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
   // this._camera = new FreeCamera('camera1', new Vector3(0, 5,-10), this._scene);
   this._camera = this._Test.generateFollowCam(this._scene);
   // target the camera to scene origin
   this._camera.setTarget(Vector3.Zero());

   // attach the camera to the canvas
   // this._camera.attachControl(this._canvas, false);

   // create a basic light, aiming 0,1,0 - meaning, to the sky
   this._light = new HemisphericLight('light1', new Vector3(0,1,0), this._scene);

   // create a built-in "sphere" shape; with 16 segments and diameter of 2
   // let sphere = MeshBuilder.CreateSphere('sphere1', {segments: 16, diameter: 2}, this._scene);

   // move the sphere upward 1/2 of its height

   // create a built-in "ground" shape
   // let ground = MeshBuilder.CreateGround('ground1', {width: 6, height: 6, subdivisions: 2}, this._scene);
   this._camera.lockedTarget = this._Test.Pilot;
   this._camera.attachControl(this._canvas, true);
  }

  animate() : void {
  // run the render loop
  this._engine.runRenderLoop(() => {
      this.gameLoop();
      this._scene.render();
  });
  // the canvas/window resize event handler
  window.addEventListener('resize', () => {
      this._engine.resize();
    });
  }

  gameLoop() : void {
    let delta = Date.now() - this._lasttime;

    this._camera.rotationOffset += delta/30;
    this._lasttime += delta;
  }
}
