import {
  _decorator,
  Component,
  Node,
  Animation,
  EventMouse,
  input,
  Input,
  Collider,
  Collider2D,
  Contact2DType,
  IPhysics2DContact,
  Vec3,
} from "cc";
const { ccclass, property } = _decorator;
@ccclass("Bird")
export class Bird extends Component {
  start() {
    input.on(Input.EventType.MOUSE_UP, this.onMouseUp, this);


  }



  update(deltaTime: number) { }

  onMouseUp = (event: EventMouse) => {

  };

  _setPosition(dt: number) {
    let pos = this.node.getPosition();
    pos.y -= 200 * dt;
    this.node.setPosition(pos);
  }
}
