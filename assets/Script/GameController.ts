import { _decorator, Collider2D, Component, Contact2DType, IPhysics2DContact, Label, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;
export enum GameStatus {
    GAME_READY = 0,
    GAME_PLAYING,
    GAME_OVER
}

@ccclass('GameController')
export class GameController extends Component {
    @property({
        type: Node
    })
    Bird: Node = null;

    @property({
        type: Label
    })
    Score: Label = null;

    private score: number = 0;

    private gameStatus: GameStatus = GameStatus.GAME_READY;

    onLoad() {

        this.gameStatus = GameStatus.GAME_PLAYING;

        //Get collider
        let collider = this.Bird.getComponent(Collider2D);
        //Hanlde collider
        (collider) && collider.on(Contact2DType.BEGIN_CONTACT, (self: Collider2D, orth: Collider2D) => {
            if (orth.tag == 1) {
                this.Score && (this.Score.string = "GameOver");
                this.score = 0;
            }
            else {
                this.score++;
                this.Score && (this.Score.string = this.score.toString());
            }
        }, this.Bird);
    }

    start() {
    }

    update(dt: number) {

        if (this.gameStatus !== GameStatus.GAME_PLAYING) {
            return;
        }


        console.log(this.Bird.getPosition());


    }

    gameOver() {
        this.gameStatus = GameStatus.GAME_OVER;
    }
}

