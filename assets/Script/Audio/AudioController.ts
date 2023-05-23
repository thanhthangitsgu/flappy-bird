import { _decorator, AudioClip, AudioSource, Component, Button, Toggle } from 'cc';
import { AUDIO_STATE, AUDIO_VOLUME, AudioType } from '../GlobalValue';
import { BackgroundMusic } from './BackgroundMusic';
import { EffectAudio } from './EffectAudio';
const { ccclass, property } = _decorator;

@ccclass('AudioController')
export class AudioController extends Component {
    /**______SCENE_ENTRY______ */
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

    /**______SCENE_GAME______ */
    @property({
        type: Toggle,
        tooltip: "Toggle background music"
    })
    private tgBackground: Toggle | null = null;

    @property({
        type: Toggle,
        tooltip: "Toggle effect audio"
    })
    private tgEffect: Toggle | null = null;

    @property({
        type: Button,
        tooltip: "Button submit setting"
    })
    private btnSubmitSetting: Button | null = null;

    @property({
        type: Button,
        tooltip: "Button restart"
    })
    private btnRestart: Button | null = null;

    @property({
        type: Button,
        tooltip: "Button exit game"
    })
    private btnExit: Button | null = null;

    //List button submit
    private listBtnSubmit: Button[] = [];

    //List button pick
    private listBtnPick: Button[] = [];

    //List toggle
    private listToggle: Toggle[] = [];

    //Components control audio
    @property({
        type: BackgroundMusic
    })
    private bgAudio: BackgroundMusic;

    @property({
        type: EffectAudio
    })
    private efAudio: EffectAudio;

    protected start(): void {
        //Add button submit into array
        this.listBtnSubmit.push(
            this.btnStart, this.btnSubmitOption, this.btnOption,
            this.btnExit, this.btnRestart, this.btnSubmitSetting
        );

        //Add button pick into array
        this.listBtnPick.push(
            this.btnPickEasyMode, this.btnPickHardMode, this.btnPickPinkBird, this.btnPickRedBird);

        //Add toggle into array
        this.listToggle.push(this.tgBackground, this.tgEffect);

        //Handle event audio on button submit
        this.listBtnSubmit.map((button) => {
            button?.node.on(Button.EventType.CLICK, () => {
                this.controlEffectSound(AudioType.TYPE_SWOOH);
            }, this)
        })

        //Handle event audio on button pick
        this.listBtnPick.map((button) => {
            button?.node.on(Button.EventType.CLICK, () => {
                this.controlEffectSound(AudioType.TYPE_POINT);
            }, this)
        })

        //Handle event audio on toggle
        this.listToggle.map((toggle) => {
            toggle?.node.on('toggle', () => {
                this.controlEffectSound(AudioType.TYPE_POINT);
            }, this)
        })
    }
    //Background music
    public controlMusic(type: AUDIO_STATE): void {
        switch (type) {
            case AUDIO_STATE.PLAY:
                this.bgAudio?._play();
                break;
            case AUDIO_STATE.STOP:
                this.bgAudio?._stop();
                break;
            case AUDIO_STATE.PAUSE:
                this.bgAudio?._pause();
        }
    }

    //Effect audio
    public controlEffectSound(type: AudioType): void {
        this.efAudio?.playSound(type);
    }

    public muteEffectSound(): void {
        this.efAudio?.setVolume(AUDIO_VOLUME.VOLUME_MIN);
    }

    public unMuteEffectSound(): void {
        this.efAudio?.setVolume(AUDIO_VOLUME.VOLUME_MAX);
    }
}