import { _decorator, AudioClip, AudioSource, Component, director, input, Input, Node, Button } from 'cc';
import { AudioType } from '../GlobalValue';
import { BackgroundMusic } from '../Audio/BackgroundMusic';
import { EffectAudio } from '../Audio/EffectAudio';
const { ccclass, property } = _decorator;


@ccclass('AudioController')
export class AudioController extends Component {
    //Button trigger
    //Scene Entry
    @property({
        type: Button,
        tooltip: "Button start game"
    })
    private btnStart: Button | null = null;

    @property({
        type: Button,
        tooltip: "Button option game"
    })
    private btnOption: Button | null = null;

    @property({
        type: Button,
        tooltip: "Button submit option"
    })
    private btnSubmitOption: Button | null = null;

    @property({
        type: Button,
        tooltip: "Button pick red bird"
    })
    private btnPickRedBird: Button | null = null;

    @property({
        type: Button,
        tooltip: "Button pick pink bird"
    })
    private btnPickPinkBird: Button | null = null;

    @property({
        type: Button,
        tooltip: "Button pick hard mode",
    })
    private btnPickHardMode: Button | null = null;

    @property({
        type: Button,
        tooltip: "Button pick easy mode"
    })
    private btnPickEasyMode: Button | null = null;

    //List button submit
    private listBtnSubmit: Button[] = [];

    //List button pick
    private listBtnPick: Button[] = [];

    //Components control audio
    @property({
        type: Node
    })

    private bgAudio: BackgroundMusic = new BackgroundMusic();
    private efAudio: EffectAudio = new EffectAudio();

    protected start(): void {
        this.efAudio.audioSource = this.efAudio.node.getComponent(AudioSource);
        this.listBtnSubmit.push(this.btnStart, this.btnSubmitOption, this.btnOption);
        this.listBtnPick.push(this.btnPickEasyMode, this.btnPickHardMode, this.btnPickPinkBird, this.btnPickRedBird);

        this.listBtnSubmit.map((button) => {
            button?.node.on(Button.EventType.CLICK, () => {
                this.playSound(AudioType.TYPE_SWOOH);
            }, this)
        })

        this.listBtnPick.map((button) => {
            button?.node.on(Button.EventType.CLICK, () => {
                this.playSound(AudioType.TYPE_POINT);
            }, this)
        })


    }

    //Background Music
    public playBackgroundMusic(): void {
        this.bgAudio._play();
    }

    public stopBackgroundMusic(): void {
        this.bgAudio._stop();
    }

    public pauseBackgroundMusic(): void {
        this.bgAudio._pause();
    }

    //Effect audio
    public playSound(type: AudioType): void {
        this.efAudio.playSound(type);
    }

}

