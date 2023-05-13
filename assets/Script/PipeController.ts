import { _decorator, Component, Node, Vec3 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("PipeController")
export class PipeController extends Component {
  private speed: number = 200;
  private pos = new Vec3();
  start() {
  }

  update(deltaTime: number) {
    this.pos = this.node.getPosition();
    this.pos.x -= this.speed * deltaTime;
    this.node.setPosition(this.pos);
  }
}
