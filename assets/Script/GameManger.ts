import { _decorator, Component, Node, Prefab } from "cc";
const { ccclass, property } = _decorator;

@ccclass("GameManger")
export class GameManger extends Component {
  @property({
    type: Prefab,
  })
  public pipe: Prefab | null = null;
  start() {}

  update(deltaTime: number) {}
}
 