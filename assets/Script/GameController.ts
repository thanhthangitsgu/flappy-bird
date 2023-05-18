import { _decorator, Button, Collider2D, Component, Contact2DType, director, Label, math, Node, RenderRoot2D, RigidBody2D, Vec3 } from 'cc';
import { AudioController, AudioType } from './AudioController';
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
    private scoreLable: Label;

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

    @property({
        type: Button,
        tooltip: "Button exit"
    })
    private buttonExit: Button | null = null;

    @property({
        type: AudioController,
        tooltip: "Controller the audio"
    })
    private audioSource: AudioController;

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
            //Play sound click
            this.audioSource.playSound(AudioType.TYPE_SWOOH)

            //Load scene main
            director.loadScene("Main");
        }, this)

        //Handle exit game
        this.buttonExit.node.on(Button.EventType.CLICK, () => {
            //Play sound click
            this.audioSource.playSound(AudioType.TYPE_SWOOH)

            //Load scene start
            director.loadScene("Start");
        }, this)
    }

    private gameOver(): void {
        //Play sound hit
        this.audioSource && this.audioSource.playSound(AudioType.TYPE_HIT);

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
        //Play sound die
        this.audioSource.playSound(AudioType.TYPE_DIE);

        //Active restart menu, enable bird
        this.scoreLable && (this.scoreLable.string = "");
        this.scoreLable.node.active = false;
        this.restartMenu.active = true;
        this.bird.active = false;

        //Set up result
        let result = this.restartMenu.getChildByName('MenuScore').getChildByName('Result').getComponent(Label);
        result.string = this.score.toString();

        let high = this.restartMenu.getChildByName('MenuScore').getChildByName('HighScore').getComponent(Label);
        high.string = localStorage.getItem('highscore');
    }

    private passPipe(): void {
        //Play sound pass
        this.audioSource.playSound(AudioType.TYPE_POINT);

        //Increment score and set label
        this.score++;
        this.scoreLable && (this.scoreLable.string = this.score.toString());
    }
}

