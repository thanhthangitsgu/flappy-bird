import { _decorator, AudioClip, AudioSource, Component, director, input, Input, Node } from 'cc';
import { AUDIO_VOLUME, AudioType } from '../GlobalValue';
const { ccclass, property } = _decorator;

@ccclass('EffectAudio')
export class EffectAudio extends Component {
    @property(AudioClip)
    private sourceDie: AudioClip = null;

    @property(AudioClip)
    private sourceHit: AudioClip = null;

    @property(AudioClip)
    private sourcePoint: AudioClip = null;

    @property(AudioClip)
    private sourceSwoosh: AudioClip = null;

    public audioSource: AudioSource = null;

    private listAudio = new Map();

    private volume = AUDIO_VOLUME.VOLUME_MAX;

    protected start(): void {
        this.audioSource = this.node.getComponent(AudioSource);

        //Set key audio
        this.listAudio.set(AudioType.TYPE_DIE, this.sourceDie);
        this.listAudio.set(AudioType.TYPE_HIT, this.sourceHit);
        this.listAudio.set(AudioType.TYPE_POINT, this.sourcePoint);
        this.listAudio.set(AudioType.TYPE_SWOOH, this.sourceSwoosh);
    }

    public playSound(type: AudioType): void {
        this.audioSource.playOneShot(this.listAudio.get(type), this.volume);
    }

    public setVolume(volume: number): void {
        this.volume = volume;
    }
}

