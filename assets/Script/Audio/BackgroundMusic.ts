import { _decorator, AudioClip, AudioSource, Button, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BackgroundMusic')
export class BackgroundMusic extends Component {

    private audioSource: AudioSource = null;

    protected onLoad(): void {
        //get component
        this.audioSource = this.node.getComponent(AudioSource);
    }
    protected start(): void {
        //play background music when start game
        this.audioSource.play();
    }

    public _play(): void {
        this.audioSource.play();
    }

    public _stop(): void {
        this.audioSource.stop();
    }

    public _pause(): void {
        this.audioSource.pause();
    }
}

