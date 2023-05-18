import { _decorator, Component, director, ImageAsset, input, Input, Node, Quat, resources, Sprite, SpriteFrame, tween, Vec3, } from "cc";
const { ccclass, property } = _decorator;
@ccclass("Bird")

export class Bird extends Component {

  //speed game
  private speed: number = 300;

  @property({
    type: Node,
    tooltip: "Background game"
  })
  private background: Node;

  protected start(): void {

    const v = this.node.getComponent(Sprite);
    resources.load('../Texture/pink.png', ImageAsset, (err: any, image) => {
      v.spriteFrame = SpriteFrame.createWithImage(image);
      console.log(image);
    })

    //Set variable rotation
    let quatTop: Quat = new Quat();
    Quat.fromEuler(quatTop, 0, 90, 45);

    let quatBottom: Quat = new Quat();
    Quat.fromEuler(quatBottom, 0, 90, -90);

    //Init tween
    let tw = tween(this.node).to(0.5, { rotation: quatBottom })

    this.background.on(Node.EventType.MOUSE_UP, () => {
      tween(this.node)
        .to(0.15, { position: new Vec3(this.node.position.x, this.node.position.y + 75, 0) })
        .to(0.3, { rotation: quatTop })
        .union()
        .then(tw)
        .start();

      this.node.setRotation(quatTop);
    })
  }

  protected update(dt: number): void {
    this.node.setPosition(new Vec3(this.node.position.x, this.node.getPosition().y - this.speed * dt, 0));
  }
}
