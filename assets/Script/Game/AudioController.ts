import { _decorator, AudioClip, AudioSource, Component, director, input, Input, Node } from 'cc';
const { ccclass, property } = _decorator;

export enum AudioType {
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

    protected start(): void {
        this.audioSource = this.node.getComponent(AudioSource);

        // //Play sound when click
        // input.on(Input.EventType.MOUSE_UP, () => {
        //     this.audioSource.playOneShot(this.sourceSwoosh, 1);
        // }, this)
    }

    public playSound(type: AudioType): void {
        switch (type) {
            case AudioType.TYPE_DIE:
                this.audioSource.playOneShot(this.sourceDie, 1);
                break;
            case AudioType.TYPE_HIT:
                this.audioSource.playOneShot(this.sourceHit, 1);
                break
            case AudioType.TYPE_POINT:
                this.audioSource.playOneShot(this.sourcePoint, 1);
                break;
            case AudioType.TYPE_SWOOH:
                this.audioSource.playOneShot(this.sourceSwoosh, 1);
        }
    }



}

