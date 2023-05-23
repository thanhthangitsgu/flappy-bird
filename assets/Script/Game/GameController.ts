import { _decorator, Button, Collider2D, Component, Contact2DType, director, Label, Node } from 'cc';
import { StatusColor, AudioType, SCENE_NAME } from '../GlobalValue';
import { BoardController } from '../Entry/BoardController';
import { EffectAudio } from '../Audio/EffectAudio';
import { BackgroundMusic } from '../Audio/BackgroundMusic';
const { ccclass, property } = _decorator;
@ccclass('GameController')
export class GameController extends Component {
    /**----- BIRD -----*/
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

    /**----- RESTART MENU -----*/
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
        type: Label,
        tooltip: "Label show result"
    })
    private result: Label | null = null;

    @property({
        type: Label,
        tooltip: "Label show high"
    })
    private high: Label | null = null;

    /**----- CONTROL SOUND -----*/
    @property({
        type: EffectAudio,
    })
    private audioSource: EffectAudio;

    @property({
        type: BackgroundMusic
    })
    private bgMusic: BackgroundMusic;

    @property({
        type: Node
    })
    private control: Node;

    /**----- VARIABLE -----*/
    private score: number = 0;

    @property({
        type: Label,
        tooltip: "Show score"
    })
    private scoreLable: Label;

    protected onLoad(): void {
        //Disable restart menu
        this.restartMenu.active = false;

        //Set bird
        if (BoardController.getColor() == StatusColor.COLOR_RED) {
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
            if (other.tag == 1) this.gameOver(); else this.passPipe();
        }, this.bird);

        //Handle restart game
        this.buttonRestart.node.on(Button.EventType.CLICK, () => {
            //Play sound click
            this.audioSource.playSound(AudioType.TYPE_SWOOH)

            //Load scene main
            director.loadScene(SCENE_NAME.GAME_SCENE);
            director.resume();
        }, this)

        //Handle exit game
        this.buttonExit.node.on(Button.EventType.CLICK, () => {
            //Play sound click
            this.audioSource.playSound(AudioType.TYPE_SWOOH)

            //Load scene start
            director.loadScene(SCENE_NAME.BEGIN_SCENE);
            director.resume();
        }, this)
    }

    private gameOver(): void {
        //Play sound hit, stop background music
        this.audioSource?.playSound(AudioType.TYPE_HIT);
        this.bgMusic?._stop();
        this.control.active = false;

        //Set high score by local strange
        let temp = this.score;
        let highScore = Number(localStorage.getItem('highscore'));
        temp = highScore && highScore > this.score ? highScore : this.score
        localStorage.setItem("highscore", temp.toString());

        //showResult
        this.showResult();

        //Reset score
        this.score = 0;
    }

    private showResult(): void {
        //Pause scene
        director.pause();

        //Play sound die
        this.audioSource.playSound(AudioType.TYPE_DIE);

        //Active restart menu, enable bird
        this.scoreLable.node.active = false;
        this.restartMenu.active = true;

        //Set up result
        this.result.string = this.score.toString();
        this.high.string = localStorage.getItem('highscore');
    }

    private passPipe(): void {
        //Play sound pass
        this.audioSource.playSound(AudioType.TYPE_POINT);

        //Increment score and set label
        this.score++;
        this.scoreLable && (this.scoreLable.string = this.score.toString());
    }
}

