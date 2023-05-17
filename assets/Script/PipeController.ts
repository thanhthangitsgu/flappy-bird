import { _decorator, Component, Collider, BoxCollider, ICollisionEvent, Collider2D, Contact2DType, director, IPhysics2DContact } from "cc";
const { ccclass, property } = _decorator;

@ccclass("PipeController")
export class PipeController extends Component {


  start() {
    let colider = this.node.getComponent(Collider2D);
    if (colider) {
      colider.on(Contact2DType.BEGIN_CONTACT, this.onCollision, this);
    }
  }
  private onCollision(self: Collider2D, orth: Collider2D, contact: IPhysics2DContact | null) {
    console.log(orth.tag);
  }


  update(deltaTime: number) { }
}
