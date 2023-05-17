import {
  _decorator,
  Component,
  EventMouse,
  input,
  Input,
  Quat,
  tween,
  Vec3,

} from "cc";
const { ccclass, property } = _decorator;
@ccclass("Bird")
export class Bird extends Component {

  private speed: number = 100;

  start() {

    input.on(Input.EventType.MOUSE_UP, () => {

      let quatTop: Quat = new Quat();
      Quat.fromEuler(quatTop, 0, 90, 45);

      let quatBottom: Quat = new Quat();
      Quat.fromEuler(quatBottom, 0, 90, -90);


      let tw2 = tween(this.node).to(0.5, { rotation: quatBottom })

      tween(this.node).to(0.15, { position: new Vec3(this.node.position.x, this.node.position.y + 75, 0) })
        .to(0.3, { rotation: quatTop }).union().then(tw2).start();

      this.node.setRotation(quatTop);
    }, this)

  }

  update(dt: number) {
    let pos = this.node.getPosition();
    pos.y -= 300 * dt;
    this.node.setPosition(pos);
  }


}
