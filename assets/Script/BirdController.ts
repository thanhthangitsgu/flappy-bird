import {
  _decorator,
  Component,
  Node,
  Animation,
  SkeletalAnimation,
  animation,
  AnimationState,
  EventMouse,
  input,
  Input,
} from "cc";
const { ccclass, property } = _decorator;
@ccclass("Bird")
export class Bird extends Component {
  start() {
    input.on(Input.EventType.MOUSE_UP, this.onMouseUp, this);

  }

  update(deltaTime: number) {
   
  }
  

  onMouseUp = (event: EventMouse) => {
    const anim = this.getComponent(Animation);
    // anim.play("fly_2");
    // anim.play("fly");
  };
}
