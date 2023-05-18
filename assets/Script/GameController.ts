import { _decorator, Button, Collider2D, Component, Contact2DType, director, Label, math, Node, RenderRoot2D, RigidBody2D, Vec3 } from 'cc';
import { AudioController } from './AudioController';
import { statusColor } from './Start/OptionController';
const { ccclass, property } = _decorator;


@ccclass('GameController')
export class GameController extends Component {
    @property({
        type: Node,
        tooltip: "The red bird"
    })
    private birdRed: Node = null;

    @property({
        type: Node,
        tooltip: "The pink bird"
    })
    private birdPink: Node = null;

    @property({
        type: Node,
        tooltip: "The bird in game"
    })
    private bird: Node = null;

    @property({
        type: Label,
        tooltip: "Show score"
    })
    private scoreLable: Label = null;

    //Node of resume menu
    @property({
        type: Node,
        tooltip: "Resart menu"
    })
    private restartMenu: Node = null;

    @property({
        type: Button,
        tooltip: "Button restart"
    })
    private buttonRestart: Button | null = null;

    //Variable score
    private score: number = 0;

    protected onLoad(): void {
        //Disable restart menu
        this.restartMenu.active = false;

        let colorLabel = director.getScene().getChildByName('OptionData').getChildByName('Canvas').getChildByName('color').getComponent(Label);
 
        //Set bird
        if (parseInt(colorLabel.string) == statusColor.COLOR_RED) {
            this.bird = this.birdRed;
            this.birdPink.active = false;
        } else {
            this.bird = this.birdPink;
            this.birdRed.active = false;
        }

        //Get collider
        let collider = this.bird.getComponent(Collider2D);

        //Handle collider
        (collider) && collider.on(Contact2DType.BEGIN_CONTACT, (self: Collider2D, other: Collider2D) => {
            if (other.tag == 1) this.gameOver()
            else this.passPipe();
        }, this.bird);

        //Handle restart game
        this.buttonRestart.node.on(Button.EventType.CLICK, () => {
            director.loadScene("Main");
        }, this)
    }

    private gameOver(): void {
        //Set high score by local strange
        let temp = this.score;
        let highScore = Number(localStorage.getItem('highscore'));
        highScore && (temp = highScore > this.score ? highScore : this.score)
        localStorage.setItem("highscore", temp.toString());

        //showResult
        this.showResult();

        //Reset score
        this.score = 0;
    }

    private showResult(): void {
        //Active restart menu, enable bird
        this.scoreLable && (this.scoreLable.string = "");
        this.restartMenu.active = true;
        this.bird.active = false;

        //Set up result
        let result = this.restartMenu.getChildByName('MenuScore').getChildByName('Result').getComponent(Label);
        result.string = this.score.toString();

        let high = this.restartMenu.getChildByName('MenuScore').getChildByName('HighScore').getComponent(Label);
        high.string = localStorage.getItem('highscore');
    }

    private passPipe(): void {
        //Increment score and set label
        this.score++;
        this.scoreLable && (this.scoreLable.string = this.score.toString());
    }
}

