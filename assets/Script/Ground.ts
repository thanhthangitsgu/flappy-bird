import { _decorator, Component, Node, Vec3 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Ground")
export class Ground extends Component {
  //Init nodes:
  @property({
    type: Node,
    tooltip: "First ground bar",
  })
  private groundFirst: Node;

  @property({
    type: Node,
    tooltip: "Second ground bar",
  })
  private groundSecond: Node;

  //Init variables
  private widthGround: number;
  private widthFirst: number;
  private widthSecond: number;
  private tempStartFirst = new Vec3();
  private tempStartSecond = new Vec3();
  
  //Speed side of ground
  private speed: number = 200;

  start() {
    this.widthFirst = this.groundFirst.position.x;
    this.widthSecond = this.groundSecond.position.x;
    this.widthGround = this.widthSecond - this.widthFirst;
  }

  update(deltaTime: number) {
    //get position of grounds
    this.tempStartFirst = this.groundFirst.position;
    this.tempStartSecond = this.groundSecond.position;

    //move ground
    this.tempStartFirst.x -= this.speed * deltaTime;
    this.tempStartSecond.x -= this.speed * deltaTime;

    //return begin
    if (this.tempStartFirst.x <= this.widthFirst - this.widthGround) {
      this.tempStartFirst.x = this.widthFirst;
    }

    if (this.tempStartSecond.x <= this.widthFirst) {
      this.tempStartSecond.x = this.widthSecond;
    }

    this.groundFirst.setPosition(this.tempStartFirst);
    this.groundSecond.setPosition(this.tempStartSecond);
  }
}
