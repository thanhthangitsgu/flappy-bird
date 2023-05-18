import { _decorator, color, Component, director, Node } from 'cc';
import { statusColor, statusMode } from './OptionController';
const { ccclass, property } = _decorator;

@ccclass('BoardController')
export class BoardController extends Component {
    private static color: statusColor = 0;

    private static mode: statusMode = 0;

    protected start(): void {
        director.addPersistRootNode(this.node);
    }

    public static setColor(_color: statusColor) {
        this.color = _color;
    }

    public static setMode(_mode: statusMode) {
        this.mode = _mode;
    }

    public static getColor(): statusColor {
        return BoardController.color;
    }

    public static getMode(): statusMode {
        return BoardController.mode;
    }
}

