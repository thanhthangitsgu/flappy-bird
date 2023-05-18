import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BoardController')
export class BoardController extends Component {
    protected start(): void {
        director.addPersistRootNode(this.node);
    }
}

