import { _decorator, Component, EventMouse, Node, Director, director, input, Input } from "cc";
const { ccclass, property } = _decorator;

@ccclass("BtnStart")
export class BtnStart extends Component {
  start() {
    input.on(Input.EventType.MOUSE_UP, this.onClick, this)
  }

  update(deltaTime: number) {}

  onClick(event: EventMouse) {
    director.loadScene('Main');
  }
}
