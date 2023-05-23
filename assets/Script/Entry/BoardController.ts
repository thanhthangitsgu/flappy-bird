import { _decorator, Component, director } from 'cc';
import { StatusColor, StatusMode } from '../GlobalValue';
const { ccclass } = _decorator;

@ccclass('BoardController')
export class BoardController extends Component {
    private static color: StatusColor = 0;

    private static mode: StatusMode = StatusMode.MODE_EASY;

    public static setColor(_color: StatusColor) {
        this.color = _color;
    }

    public static setMode(_mode: StatusMode) {
        this.mode = _mode;
    }

    public static getColor(): StatusColor {
        return BoardController.color;
    }

    public static getMode(): StatusMode {
        return BoardController.mode;
    }
}

