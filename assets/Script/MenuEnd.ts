import { _decorator, Button, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MenuEnd')
export class MenuEnd extends Component {

    @property({
        type: Button
    })
    buttonRestart: Button | null = null;

    start() {
        this.buttonRestart.node.on(Button.EventType.CLICK, () => {
            director.loadScene("Main");
        }, this)
    }


}

