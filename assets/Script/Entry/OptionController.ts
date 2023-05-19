import { _decorator, Button, Component, Node } from 'cc';
import { BoardController } from './BoardController';
import { StatusColor, StatusMode } from '../GlobalValue';
const { ccclass, property } = _decorator;

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

    private listColor: Button[] = new Array();
    private listMode: Button[] = new Array();

    private color: StatusColor = StatusColor.COLOR_RED;
    private mode: StatusMode = StatusMode.MODE_EASY;

    protected onLoad(): void {
        //Init list color
        this.listColor.push(this.buttonColorRed);
        this.listColor.push(this.buttonColorPink);

        //Init mode
        this.listMode.push(this.buttonEasy);
        this.listMode.push(this.buttonHard);

        //Init Status
        this.handleOnChange(this.listColor, this.color);
        this.handleOnChange(this.listMode, this.mode);

        //Set value for color and mode
        this.setValue(this.setColor, this.listColor);
        this.setValue(this.setMode, this.listMode);
    }

    private setValue(callback: Function, array: Button[]): void {
        array.map((button, index) => {
            button.node.on(Node.EventType.MOUSE_ENTER, () => { button.onEnable(); });
            button.node.on(Button.EventType.CLICK, () => {
                array.map((btn) => {
                    btn.normalColor.set(255, 255, 255, 150);
                    btn.onDisable();
                });
                button.onEnable();
                callback.call(callback, index);
            }, this);
        })
    }

    private setColor(_color: StatusColor): void {
        this.color = _color;
        BoardController.setColor(_color)
    }

    private setMode(_mode: StatusMode): void {
        this.mode = _mode;
        BoardController.setMode(_mode);
    }

    private handleOnChange(array: Button[], index: StatusColor | StatusMode = 0): void {
        array[index].onEnable();
        array[index].normalColor.set(255, 255, 255, 255)
    }

    protected update(): void {
        this.handleOnChange(this.listColor, this.color);
        this.handleOnChange(this.listMode, this.mode);
    }
}

