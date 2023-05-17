import { _decorator, Button, Collider2D, Component, Contact2DType, director, Label, math, Node, RenderRoot2D, RigidBody2D, Vec3 } from 'cc';
import { AudioController } from './AudioController';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    @property({
        type: Node,
        tooltip: "The bird in game"
    })
    private Bird: Node = null;

    @property({
        type: Label
    })
    private Score: Label = null;

    //Node of resume menu
    @property({
        type: Node,
        tooltip: "Resart menu"
    })
    private RestartMenu: Node = null;

    @property({
        type: Button,
        tooltip: "Button restart"
    })
    private buttonRestart: Button | null = null;

    @property({
        type: AudioController
    })
    private audioController: AudioController = new AudioController();

    //Variable
    private score: number = 0;

    protected onLoad(): void {

        console.log(director.getScene().getChildByName('OptionData').getChildByName('Canvas').getChildByName('color').getComponent(Label));

        //Enable restart menu
        this.RestartMenu.active = false;

        //Get collider
        let collider = this.Bird.getComponent(Collider2D);

        //Handle collider
        (collider) && collider.on(Contact2DType.BEGIN_CONTACT, (self: Collider2D, other: Collider2D) => {
            console.log(other.tag);
            if (other.tag == 1) this.gameOver()
            else this.passPipe();
        }, this.Bird);

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

        this.showResult();

        //Reset score
        this.score = 0;
    }

    private showResult(): void {
        //Active restart menu, enable bird
        this.Score && (this.Score.string = "");
        this.RestartMenu.active = true;
        this.Bird.active = false;

        //Set up result
        let result = this.RestartMenu.getChildByName('MenuScore').getChildByName('Result').getComponent(Label);
        result.string = this.score.toString();

        let high = this.RestartMenu.getChildByName('MenuScore').getChildByName('HighScore').getComponent(Label);
        high.string = localStorage.getItem('highscore');
    }




    private passPipe(): void {
        //Increment score and set label
        this.score++;
        this.Score && (this.Score.string = this.score.toString());
    }
}

