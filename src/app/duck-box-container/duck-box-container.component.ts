import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Game } from '../classes/game';
@Component({
  selector: 'app-duck-box-container',
  templateUrl: './duck-box-container.component.html',
  styleUrls: ['./duck-box-container.component.css']
})
export class DuckBoxContainerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    let game = new Game('renderCanvas');
    game.createScene();

    game.animate();
  }

}
