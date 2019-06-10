import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import io from "socket.io-client";

@Component({
  selector: 'app-pong',
  templateUrl: './pong.component.html',
  styleUrls: ['./pong.component.scss']
})
export class PongComponent implements OnInit {

  @ViewChild("game", null)
  private gameCanvas: ElementRef;

  private context: any;
  private socket: any;
  
  private x = 240;
  private y = 460;
  private step = 2;
  
  public ngOnInit() {
    this.socket = io("http://localhost:3000")
  }

  public ngAfterViewInit() {
      this.context = this.gameCanvas.nativeElement.getContext("2d");
      this.socket.on("position", position => {
        //Clears screen so we don't draw a line
        setInterval(() => this.context.clearRect (
          0,
          0, 
          this.gameCanvas.nativeElement.width,
          this.gameCanvas.nativeElement.height,
        ), 1000/30);
        //console.log(position.x, position.y)
        setInterval(() => this.context.fillRect(this.x, this.y, 20, 20), 1000/30);      
        setInterval(() => this.moveBall(), 1000/30);

      });
  }

  public move(direction: string) {
      this.socket.emit("move", direction);
      //this.x += 2;

  }

  public moveBall() {
    this.y -= this.step
    if (this.y <= 0 || this.y >= 460){
      //this.y = 480;
      this.step *= -1;
      //this.x = -100;
    }
  }


}
