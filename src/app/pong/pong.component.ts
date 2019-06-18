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
  
  private ballX = 240;
  private ballY = 460;
  private ballStep = 2;
  
  private player1X = 240;
  private player1Y = 470;
  private player1Step = 2;

  private player2X = 240;
  private player2Step = -2;


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
        setInterval(() => this.context.fillRect(this.ballX, this.ballY, 20, 20), 1000/30);    
        setInterval(() => this.context.fillRect(this.player1X, 470, 50, 10), 1000/30);  
        setInterval(() => this.context.fillRect(this.player2X, 0, 50, 10), 1000/30); 
        setInterval(() => this.moveBall(), 1000/30);
        setInterval(() => this.movePlayer1(), 1000/30);
        setInterval(() => this.movePlayer2(), 1000/30);
      });
  }

  public movePlayer1()
  {
    this.player1X -= this.player1Step;
    if (this.player1X <= 0 || this.player1X >= 590){
      this.player1Step *= -1;
    }   
  }

  public movePlayer2()
  {
    this.player2X -= this.player2Step;
    if (this.player2X <= 0 || this.player2X >= 590){
      this.player2Step *= -1;
    }   
  }

  public moveBall()
  {
    this.ballY -= this.ballStep;
    if (this.ballY <= 0 || this.ballY >= 460){
      //this.y = 480;
      this.ballStep *= -1;
      //this.x = -100;
    }
  }


}
