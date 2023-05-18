import { _decorator, Button, Component, director, Label, Node } from 'cc';
import { BoardController } from './BoardController';
const { ccclass, property } = _decorator;

export enum statusColor {
    COLOR_RED = 0,
    COLOR_PINK
}
export enum statusMode {
    MODE_EASY = 0,
    MODE_HARD
}

@ccclass('StartController')
export class StartController extends Component {
    @property({
        type: Button,
        tooltip: "Button choose red"
    })
    private buttonColorRed: Button | null = null;

    @property({
        type: Button,
        tooltip: "Button choose pink"
    })
    private buttonColorPink: Button | null = null;

    @property({
        type: Button,
        tooltip: "Button choose easy"
    })
    private buttonEasy: Button | null = null;

    @property({
        type: Button,
        tooltip: "Button choose hard"
    })
    private buttonHard: Button | null = null;

    private listColor: Button[] = [];
    private listMode: Button[] = [];

    private color: statusColor = statusColor.COLOR_RED;
    private mode: statusMode = statusMode.MODE_EASY;

    protected onLoad(): void {
        //Init list color
        this.listColor.push(this.buttonColorRed);
        this.listColor.push(this.buttonColorPink);

        //Init mode
        this.listMode.push(this.buttonEasy);
        this.listMode.push(this.buttonHard);

        //Init status
        this.handleButtonColor();
        this.handleButtonMode();

        //Set color
        for (let i = 0; i < this.listColor.length; i++) {

            this.listColor[i].node.on(Node.EventType.MOUSE_ENTER, () => { this.listColor[i].onEnable(); })

            this.listColor[i].node.on(Button.EventType.CLICK, () => {
                BoardController.setColor(i);
                this.listColor.map((btn) => { btn.normalColor.set(255, 255, 255, 150), btn.onDisable() });
                this.listColor[i].onEnable();
                this.color = i;
            }, this)
        }

        //Set mode
        for (let i = 0; i < this.listMode.length; i++) {

            this.listMode[i].node.on(Node.EventType.MOUSE_ENTER, () => { this.listMode[i].onEnable(); })

            this.listMode[i].node.on(Button.EventType.CLICK, () => {
                BoardController.setMode(i);
                this.listMode.map((btn) => { btn.normalColor.set(255, 255, 255, 150), btn.onDisable() });
                this.listMode[i].onEnable();
                this.mode = i;
            }, this)
        }
    }

    //Handle set color
    private handleButtonColor(): void {
        this.listColor[this.color].onEnable();
        this.listColor[this.color].normalColor.set(255, 255, 255, 255)
    }

    //Handle set mode
    private handleButtonMode(): void {
        this.listMode[this.mode].onEnable();
        this.listMode[this.mode].normalColor.set(255, 255, 255, 255)
    }

    protected update(): void {
        this.handleButtonColor();
        this.handleButtonMode();
    }
}

