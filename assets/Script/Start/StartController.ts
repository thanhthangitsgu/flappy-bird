import { _decorator, Button, Color, Component, director, Node } from 'cc';
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
        tooltip: "Button play game"
    })
    btnPlay: Button | null = null;

    @property({
        type: Button,
        tooltip: "Button choose red"
    })
    buttonColorRed: Button | null = null;

    @property({
        type: Button,
        tooltip: "Button choose pink"
    })
    buttonColorPink: Button | null = null;

    private listColor: Button[] = [];

    @property({
        type: Button,
        tooltip: "Button choose easy"
    })
    buttonEasy: Button | null = null;

    @property({
        type: Button,
        tooltip: "Button choose hard"
    })
    buttonHard: Button | null = null;

    private color: statusColor = statusColor.COLOR_RED;

    protected onLoad(): void {
        //Init list color
        this.listColor.push(this.buttonColorRed);
        this.listColor.push(this.buttonColorPink);

        for (let i = 0; i < this.listColor.length; i++) {
            this.listColor[i].node.on(Button.EventType.CLICK, () => {
                this.color = i;
            })
        }
    }

    private handleButtonColor(): void {
        this.setNormalColor();
        this.listColor[this.color].normalColor.set(255, 255, 255, 255)
    }

    private setNormalColor(): void {
        this.listColor.map((_btn) => {
            _btn.normalColor.set(255, 255, 255, 150);
        })
    }

    protected start(): void {
        this.btnPlay.node.on(Button.EventType.CLICK, () => {
            director.loadScene("Main");
        }, this)
    }

    update(dt: number) {
        this.setNormalColor();
        this.handleButtonColor();
    }


}

