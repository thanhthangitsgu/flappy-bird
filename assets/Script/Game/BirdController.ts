import { BIRD_PARAMETER } from './../GlobalValue';
import { _decorator, Component, Node, Quat, tween, Vec3, } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Bird")

export class Bird extends Component {

  //speed gravity
  private speed: number = BIRD_PARAMETER.SPEED_FLY;

  //speed rotation
  private speedRotation: number = BIRD_PARAMETER.SPEED_ROTATION;

  @property({
    type: Node,
    tooltip: "Background game"
  })
  private background: Node;

  protected start(): void {
    this.background.on(Node.EventType.MOUSE_UP, () => {

      this.speed = BIRD_PARAMETER.SPEED_FLY;
      this.speedRotation = BIRD_PARAMETER.SPEED_ROTATION;
    })
  }

  protected update(dt: number): void {
    //Set positon
    this.speed -= BIRD_PARAMETER.GRAVITY;
    this.node.setPosition(new Vec3(this.node.position.x, this.node.getPosition().y + this.speed * dt, 0));

    //Set rotation
    this.speedRotation -= BIRD_PARAMETER.ROTATION;
    let angle = (this.speedRotation * dt / 2) * BIRD_PARAMETER.MAX_ANGLE;

    if (angle >= BIRD_PARAMETER.MAX_ANGLE) angle = BIRD_PARAMETER.MAX_ANGLE;
    if (angle <= BIRD_PARAMETER.MIN_ANGLE) angle = BIRD_PARAMETER.MIN_ANGLE;

    let quat: Quat = new Quat();
    Quat.fromEuler(quat, 0, 90, angle);
    this.node.setRotation(quat);
  }
}
