import { _decorator, AudioClip, AudioSource, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

export enum audioType {
    TYPE_DIE = 0,
    TYPE_HIT,
    TYPE_POINT,
    TYPE_SWOOH,
}

@ccclass('AudioController')
export class AudioController extends Component {

    @property(AudioClip)
    private sourceDie: AudioClip = null;

    @property(AudioClip)
    private sourceHit: AudioClip = null;

    @property(AudioClip)
    private sourcePoint: AudioClip = null;

    @property(AudioClip)
    private sourceSwoosh: AudioClip = null;

    private audioSource: AudioSource = null;

    public start(): void {
        console.log("check audio");
        this.audioSource.playOneShot(this.sourceHit, 120);

        console.log(this.sourceHit);
        console.log("check audio");

    }


}

