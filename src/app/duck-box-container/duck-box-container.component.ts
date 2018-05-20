import { Component, EventEmitter,Output,OnInit, Input, AfterViewInit } from '@angular/core';
import { Game } from '../classes/game';
@Component({
  selector: 'app-duck-box-container',
  templateUrl: './duck-box-container.component.html',
  styleUrls: ['./duck-box-container.component.scss']
})
export class DuckBoxContainerComponent implements OnInit {
  @Output() getGame = new EventEmitter<Game>();
  public game: Game;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.game = new Game('renderCanvas');
    this.game.createScene();
    this.game.animate();
    console.log("calling event.");
    this.giveGameToListeners(this.game);
    console.log("event called.");
  }

  giveGameToListeners(gameobject:Game){
    this.getGame.emit(gameobject);
  }

}
