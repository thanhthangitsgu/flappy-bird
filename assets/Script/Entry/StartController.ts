import { _decorator, Button, Component, director, Node } from 'cc';
import { AudioController } from '../Audio/AudioController';
import { SCENE_NAME, AudioType } from '../GlobalValue';
import { EffectAudio } from '../Audio/EffectAudio';
const { ccclass, property } = _decorator;

@ccclass('StartController')
export class StartController extends Component {
    @property({
        type: Node,
        tooltip: "Start menu"
    })
    private startMenu: Node | null = null;
    
    @property({
        type: Node,
        tooltip: "Option menu"
    })
    private optionMenu: Node | null = null;

    @property({
        type: Button,
        tooltip: "Button submit option"
    })
    private btnSubmit: Button | null = null;

    @property({
        type: Button,
        tooltip: "Button play game"
    })
    private btnPlay: Button | null = null;

    @property({
        type: Button,
        tooltip: "Button open option menu"
    })
    private btnOption: Button | null = null;

    protected onLoad(): void {
        //Hide optioneMenu
        this.optionMenu.active = false;

        //Handle event open option memu
        this.btnOption.node.on(Button.EventType.CLICK, () => {
            this.optionMenu.active = true;
            this.startMenu.active = false;
        }, this)

        //Handle event close option menu
        this.btnSubmit.node.on(Button.EventType.CLICK, () => {
            this.startMenu.active = true;
            this.optionMenu.active = false;
        })

        //Handle event start game
        this.btnPlay.node.on(Button.EventType.CLICK, () => {
            director.loadScene(SCENE_NAME.GAME_SCENE);
        })
    }
}

