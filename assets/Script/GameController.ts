import { _decorator, Collider2D, Component, Contact2DType, director, Label, math, Node, RigidBody2D, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    @property({
        type: Node,
        tooltip: "The bird in game"
    })
    Bird: Node = null;

    @property({
        type: Label
    })
    Score: Label = null;

    @property({
        type: Node
    })
    Ground: Node = null;

    @property({
        type: Node
    })
    RestartMenu: Node = null;

    private score: number = 0;

    onLoad() {
        //Enable restart menu
        this.RestartMenu.active = false;

        //Get collider
        let collider = this.Bird.getComponent(Collider2D);

        //Hanlde collider
        (collider) && collider.on(Contact2DType.BEGIN_CONTACT, (other: Collider2D) => {
            if (other.tag == 1) this.gameOver()
            else this.passPipe();
        }, this.Bird);
    }

    gameOver() {
        //Set high score by local strange
        let temp = this.score;
        let highScore = Number(localStorage.getItem('highscore'));
        highScore && (temp = highScore > this.score ? highScore : this.score)
        localStorage.setItem("highscore", temp.toString());

        //Active restart menu, enable bird
        this.Score && (this.Score.string = "");
        this.RestartMenu.active = true;
        this.Bird.active = false;

        this.showResult();

        //Reset score
        this.score = 0;
    }

    showResult() {
        //Set up result
        let result = this.RestartMenu.getChildByName('MenuScore').getChildByName('Result').getComponent(Label);
        result.string = this.score.toString();

        let high = this.RestartMenu.getChildByName('MenuScore').getChildByName('HighScore').getComponent(Label);
        high.string = localStorage.getItem('highscore');
    }

    passPipe() {
        //Increment score and set label
        this.score++;
        this.Score && (this.Score.string = this.score.toString());
    }
}

