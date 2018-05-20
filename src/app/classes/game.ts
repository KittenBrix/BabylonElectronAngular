import {Engine, Scene, ArcRotateCamera, Color3, AssetsManager, Light, Vector3, HemisphericLight, MeshBuilder, StandardMaterial} from 'babylonjs';
import Test from "app/classes/Test";

export class Game {
        private _canvas: HTMLCanvasElement;
        private _engine: Engine;
        private _scene: Scene;
        private _camera: ArcRotateCamera;
        private _light: Light;
        private _Test: Test;
        private _lasttime: number;
        public duckmesh : any[] = [];
        public assetsmanager: AssetsManager;
        public tub :any;
        private mat: any;
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
   // this._camera = this._Test.generateFollowCam(this._scene);
   // target the camera to scene origin
   this._camera = new BABYLON.ArcRotateCamera("Camera", 1, 1, 50, new BABYLON.Vector3(0, 0, 0), this._scene);
   this._camera.setTarget(new Vector3(0,10,0));
   this.assetsmanager = new AssetsManager(this._scene);
   this.assetsmanager.useDefaultLoadingScreen = false;
   BABYLON.SceneLoader.ShowLoadingScreen = false;
   let tubload = this.assetsmanager.addMeshTask("tub task","", "../../assets/","tub.babylon");
   tubload.onSuccess = function(mesh){
     this.tub = mesh.loadedMeshes[0];
     this.tub.position = BABYLON.Vector3.Zero();
   }


   this._light = new HemisphericLight('light1', new Vector3(0,1,0), this._scene);


   this._camera.lockedTarget = this.tub;
   this._camera.attachControl(this._canvas, true);

   let water = BABYLON.MeshBuilder.CreatePlane("water",{height:20, width:44, sideOrientation: 2},this._scene)
   water.position.y = 10;
   water.rotation.x = Math.PI/2;

   let blumat = new BABYLON.StandardMaterial("myMaterial", this._scene);
   blumat.diffuseColor = new BABYLON.Color3(0,0,1);
   blumat.alpha = 0.4;
   water.material = blumat;

   let i = 0;
   for (i = 0; i < 10 ; i++ ){
     let duckload = this.assetsmanager.addMeshTask("duck task" + i,"", "../../assets/","RubberDuckAlone.babylon");
     duckload.onSuccess = (task) => {
       console.log(task);
       let duck = task.loadedMeshes[0];
       let x = Math.random() * 44 - 22;
       let y = Math.random() * 20 - 10;
       duck.position = new BABYLON.Vector3(x,1000,y);
       duck.material = blumat;
       this.duckmesh.push(duck);
     };
   }

   this.assetsmanager.load();
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
    //
    // this._camera.rotationOffset += delta/100;
    this._lasttime += delta;
    let i = 0;
    // for (i=0; i < this.duckcount(); i++){
      // this.duckmesh[i].position.y = math.flooMath.sin(this._lasttime/300000000)*0.1;
    // }
  }


  addDuck(num:number): void {
    let x = this.duckmesh[num].position.x;
    let y = this.duckmesh[num].position.z;
    if (this.duckmesh[num].position.y > 10){
      x = Math.random() * 44 - 22;
      y = Math.random() * 20 - 10;
      this.duckmesh[num].rotation.y = Math.random() * Math.PI;
    }
    this.duckmesh[num].position = new BABYLON.Vector3(x,9.8,y);
  }

  deleteDuck(num:number): void{
    if (this.duckcount() < 1){
      return;
    }
    this.duckmesh[num].position.y = 10000;
  }

  duckcount():number{
    return this.duckmesh.length;
  }

  //creates a new material for the ducks based on the new color.
  //deletes the old material.
  setDuckColor(red: number, grn: number, blu:number): void{
    let i = 0;
    let col = new BABYLON.Color3(red/255.0,grn/255.0,blu/255.0);
    this.mat = new BABYLON.StandardMaterial("myMaterial", this._scene);
    this.mat.diffuseColor = col;
    for (i=0; i < this.duckcount(); i++){
      this.duckmesh[i].material = this.mat;
      // console.log(this.duckmesh[i]);
    }
  }



}
