import { _decorator, Button, Component, Node, Vec3 } from 'cc';
import { BoardController } from './BoardController';
import { StatusColor, StatusMode } from '../GlobalValue';
const { ccclass, property } = _decorator;

@ccclass('StartController')
export class StartController extends Component {
    @property({
        type: Node,
        tooltip: "Mark color"
    })
    private markColor: Node | null = null;

    @property({
        type: Node,
        tooltip: "Mark mode"
    })
    private markMode: Node | null = null;

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

    private listColor: Button[] = new Array();
    private listMode: Button[] = new Array();

    protected onLoad(): void {
        //Init list color
        this.listColor.push(this.buttonColorRed);
        this.listColor.push(this.buttonColorPink);

        //Init mode
        this.listMode.push(this.buttonEasy);
        this.listMode.push(this.buttonHard);
    }

    private setMode = (_mode: StatusMode, pos: Vec3) => {
        this.markMode?.setPosition(pos);
        BoardController.setMode(_mode);
    }

    private setColor = (_color: StatusColor, pos: Vec3) => {
        this.markColor?.setPosition(pos);
        BoardController.setColor(_color)
    }

    protected start(): void {
        //Set value for color and mode
        this.setValue(this.setColor, this.listColor);
        this.setValue(this.setMode, this.listMode);
    }

    private setValue(callback: Function, array: Button[]): void {
        array.map((button, index) => {
            button.node.on(Button.EventType.CLICK, () => {
                callback.call(callback, index, button.node.getPosition());
            }, this);
        })
    }
}

