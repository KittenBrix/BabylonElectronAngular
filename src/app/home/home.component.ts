import { Component, OnInit } from '@angular/core';
import { Game } from '../classes/game';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public DuckCount: number = 3;
    public Redval:number = 200;
    public Grnval:number = 170;
    public Bluval:number = 1;
    public gm : Game = null;
  constructor(
    // private formbuilder: FormBuilder
  ) {

    // this.DuckForm = this.formbuilder.group({
    //   DuckieSlider: [null, []],
    //   RedSlider: [null, []],
    //   GreenSlider: [null, []],
    //   BlueSlider: [null, []]
    // })
    // this.DuckForm.valueChanges.subscribe(() => {
    //   this.checkForChanges();
    //   // this.disableLoginButton();
    // })
  }

  ngOnInit() {
  }

  applyChanges(): void {
    var i;
    //handle number of duck changes.
    for (i = 0; i < this.DuckCount; i++) {
      this.gm.addDuck(i);
    }
    var j;
    for (j = this.DuckCount; j < this.gm.duckcount();j++){
      this.gm.deleteDuck(j);
    }
    //handle color changes.
    this.gm.setDuckColor(this.Redval,this.Grnval,this.Bluval);


  }

  redcheck():void {
    this.Redval = document.getElementById("RedSlider")['value'];
    this.applyChanges();
  }
  grncheck():void {
    this.Grnval = document.getElementById("GreenSlider")['value'];
    this.applyChanges();
  }
  blucheck():void {
    this.Bluval = document.getElementById("BlueSlider")['value'];
    this.applyChanges();
  }
  duckcheck():void {
    this.DuckCount = document.getElementById("DuckieSlider")['value'];
    this.applyChanges();
  }

  onRecieveGame(gameobject: Game) {
    this.gm = gameobject;
    this.applyChanges();
  }

}
