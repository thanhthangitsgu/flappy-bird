import {
  _decorator,
  Component,
  director,
  instantiate,
  Label,
  math,
  Node,
  Prefab,
  Vec3,
} from "cc";
import { statusMode } from "./Start/OptionController";
const { ccclass, property } = _decorator;

const MAX_Y = 180;
const MIN_Y = 25;
const LEFT_X = -1580;
const RIGHT_X = -100;

@ccclass("PoolPile")
export class PoolPile extends Component {
  @property({
    type: Prefab,
  })
  private pipe: Prefab | null = null;

  private listPipe: Node[] = [null, null, null];

  //Game speed
  private speed: number = 200;

  protected onLoad(): void {
    let colorLabel = director.getScene().getChildByName('OptionData').getChildByName('Canvas').getChildByName('mode').getComponent(Label);
    this.speed = parseInt(colorLabel.string) == statusMode.MODE_EASY ? 200 : 500;
  }

  protected start(): void {
    //Init pipe
    for (let i = 0; i < this.listPipe.length; i++) {
      this.listPipe[i] = instantiate(this.pipe);

      if (this.listPipe[i]) this.node.addChild(this.listPipe[i]);

      let x = 460 * i;
      let y = math.randomRange(MIN_Y, MAX_Y);
      y = 200;
      this.listPipe[i].setPosition(new Vec3(x, y, 0));
      this.node.setPosition(new Vec3(x, y, 0));
    }
  }

  protected update(dt: number): void {
    //move pipe
    this.listPipe.map((pipe) => {
      let pos = pipe.getPosition();
      pos.x -= this.speed * dt;

      if (pos.x < LEFT_X) {
        pos.x = RIGHT_X;
        pos.y = math.randomRange(MIN_Y, MAX_Y);
      }

      pipe.setPosition(pos);
    })
  }
}
