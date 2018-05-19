import {Engine, Scene, FreeCamera, FollowCamera, Light, Vector3, HemisphericLight, MeshBuilder, StandardMaterial} from 'babylonjs';

export default class Test {
  public Pilot: any;

  constructor() {
  this.Pilot = null;
  }

  generateBaseScene(eng : BABYLON.Engine): BABYLON.Scene{
    let scn = new Scene(eng);

    let sphere = MeshBuilder.CreateSphere('sphere1', {segments: 16, diameter: 2}, scn);
    sphere.position.y = 1;

    let ground = MeshBuilder.CreateGround('ground1', {width: 6, height: 6, subdivisions: 2}, scn);
    this.Pilot = this.generatePilotObject(scn);
    this.Pilot.position = new Vector3(4,3,2);
    this.showWorldSpaceAxis(10,scn);

    return scn;
  }

  // draws worldspace axis at origin
  showWorldSpaceAxis(scale:number,scn:BABYLON.Scene) {
    let orig = new Vector3(0,0,0);
    let px = [orig,new Vector3(scale,0,0),new Vector3(scale*0.95,scale*0.05,0),new Vector3(scale,0,0),new Vector3(scale*0.95,scale*-0.05,0)];
    let py = [orig,new Vector3(0,scale,0),new Vector3(0,scale*0.95,scale*0.05),new Vector3(0,scale,0),new Vector3(0,scale*0.95,scale*-0.05)];
    let pz = [orig,new Vector3(0,0,scale),new Vector3(scale*0.05,0,scale*0.95),new Vector3(0,0,scale),new Vector3(scale*-0.05,0,scale*0.95)];
    let xcol = new BABYLON.Color4(255,0,0,120);
    let ycol = new BABYLON.Color4(0,0,255,120);
    let zcol = new BABYLON.Color4(0,255,0,120);
    let lx = MeshBuilder.CreateLines("worldlinex",{points:px,colors:[xcol,xcol,xcol,xcol,xcol]},scn);
    let ly = MeshBuilder.CreateLines("worldlinex",{points:py,colors:[ycol,ycol,ycol,ycol,ycol]},scn);
    let lz = MeshBuilder.CreateLines("worldlinex",{points:pz,colors:[zcol,zcol,zcol,zcol,zcol]},scn);
  }


  generateFollowCam(scn:Scene): BABYLON.FollowCamera {
    let camera = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(0, 10, -10), scn);
    // Parameters: name, position, scene

    //The goal distance of camera from target
    camera.radius = 30;

    // The goal height of camera above local origin (centre) of target
    camera.heightOffset = 10;

    // The goal rotation of camera around local origin (centre) of target in x y plane
    camera.rotationOffset = 0;

    //Acceleration of camera in moving from current to goal position

    camera.cameraAcceleration = 0.015;
    //The speed at which acceleration is halted
    camera.maxCameraSpeed = 30;

     // This attaches the camera to the canvas
    // camera.attachControl(canvas, true);

    // NOTE:: SET CAMERA TARGET AFTER THE TARGET'S CREATION AND NOTE CHANGE FROM BABYLONJS V 2.5
    //targetMesh created here
    // camera.target = targetMesh;   // version 2.4 and earlier
    // camera.lockedTarget = targetMesh; //version 2.5 onwards
    return camera;
  }





  generatePilotObject(scn:Scene):any {
    let part1 = MeshBuilder.CreateSphere('sphere1', {segments: 16, diameter: 2}, scn);
    let part2 = MeshBuilder.CreateBox('box1', {height: 1, width: 3, depth:0.5}, scn);
    part2.position.x = 1;
    part2.position.y = 0.5;
    part2.parent = part1;

    var myMaterial = new BABYLON.StandardMaterial("myMaterial", scn);
    myMaterial.diffuseColor = new BABYLON.Color3(0.5, 0, 0);
    myMaterial.specularColor = new BABYLON.Color3(0.5, 0.6, 0.87);
    myMaterial.emissiveColor = new BABYLON.Color3(0.1, 0.1, 0.1);
    myMaterial.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53);

    var myMaterial2 = new BABYLON.StandardMaterial("myMaterial", scn);
    myMaterial2.diffuseTexture = new BABYLON.Texture("../../assets/dorupaper.png", scn);
    // myMaterial2.specularTexture = new BABYLON.Texture("../../assets/check.png", scn);
    myMaterial2.emissiveTexture = new BABYLON.Texture("../../assets/hex.gif", scn);
    myMaterial2.emissiveTexture.hasAlpha = true;
    myMaterial2.ambientTexture = new BABYLON.Texture("../../assets/dorupaper.png", scn);
    myMaterial.wireframe = true;


    part1.material = myMaterial;
    // part1.material.alpha = 0.1;
    return part1;

  }

  



}
