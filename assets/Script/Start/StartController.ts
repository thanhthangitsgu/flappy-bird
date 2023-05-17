import { _decorator, Button, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('StartController')
export class StartController extends Component {
    @property({
        type: Node,
        tooltip: "Option menu"
    })
    optionMenu: Node | null = null;

    @property({
        type: Button,
        tooltip: "Button submit option"
    })
    btnSubmit: Button | null = null;

    @property({
        type: Button,
        tooltip: "Button play game"
    })
    btnPlay: Button | null = null;

    @property({
        type: Button,
        tooltip: "Button open option menu"
    })
    btnOption: Button | null = null;

    protected onLoad(): void {
        this.optionMenu.active = false;

        //Handle event open option memu
        this.btnOption.node.on(Button.EventType.CLICK, () => {
            this.optionMenu.active = true;
        }, this)

        //Handle event close option menu
        this.btnSubmit.node.on(Button.EventType.CLICK, () => {
            this.optionMenu.active = false;
        })

        //Handle event start game
        this.btnPlay.node.on(Button.EventType.CLICK, () => {
            director.addPersistRootNode(this.optionMenu);
            director.loadScene('Main');
        })
    }
}

