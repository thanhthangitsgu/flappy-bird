import {
  _decorator,
  Component,
  instantiate,
  Label,
  Node,
  Prefab,
  Vec3,
} from "cc";
const { ccclass, property } = _decorator;

//Function random number from min to max
const random = (max: number, min: number) => {
  return min + Math.floor(Math.random() * (max - min));
};

@ccclass("PoolPile")
export class PoolPile extends Component {
  @property({
    type: Prefab,
  })
  pipe: Prefab | null = null;

  private listPipe: Node[] = [null, null, null];

  private speed: number = 200;

  private pos: Vec3 = new Vec3();

  start() {
    //Init pipe
    for (let i = 0; i < this.listPipe.length; i++) {
      this.listPipe[i] = instantiate(this.pipe);
      if (this.listPipe[i]) this.node.addChild(this.listPipe[i]);
      let x = 460 * i;
      let y = random(180, 25);
      y = 120;
      this.listPipe[i].setPosition(new Vec3(x, y, 0));
      this.node.setPosition(new Vec3(x, y, 0));
    }
  }

  update(dt: number) {
    //move pipe
    this.listPipe.map((pipe) => {
      this.pos = pipe.getPosition();
      this.pos.x -= this.speed * dt;

      if (this.pos.x < -1580) {
        this.pos.x = -100;
        this.pos.y = random(180, 25);
      }

      pipe.setPosition(this.pos);
    })
  }
}
