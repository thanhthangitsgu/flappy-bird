import { _decorator, Button, Component, director, Node, Toggle } from 'cc';
import { AUDIO_STATE, AUDIO_VOLUME, SCENE_NAME } from '../GlobalValue';
import { EffectAudio } from '../Audio/EffectAudio';
import { BackgroundMusic } from '../Audio/BackgroundMusic';
import { AudioController } from '../Audio/AudioController';
const { ccclass, property } = _decorator;

@ccclass('Setting')
export class Setting extends Component {
    @property({
        type: Node,
        tooltip: "Setting node"
    })
    private setting: Node;

    @property({
        type: Button,
        tooltip: "Button return home"
    })
    private buttonHome: Button;

    @property({
        type: Button,
        tooltip: "Button setting"
    })
    private buttonSetting: Button;

    @property({
        type: Button,
        tooltip: "Button submit audio"
    })
    private buttonSubmit: Button;

    //Toggle
    @property({
        type: Toggle,
        tooltip: "Control background music"
    })
    private tgBackground: Toggle;

    @property({
        type: Toggle,
        tooltip: "Control effect sounds"
    })
    private tgEffect: Toggle;

    @property({
        type: AudioController,
        tooltip: "Audio controller"
    })
    private audioController: AudioController;

    protected onLoad(): void {
        //Disable popup
        this.setting.active = false;

        //Handle close popup
        this.buttonHome.node.on(Button.EventType.CLICK, () => {
            director.loadScene(SCENE_NAME.BEGIN_SCENE);
            director.resume();
        }, this)

        //Handle open popup 
        this.buttonSetting.node.on(Button.EventType.CLICK, () => {
            director.pause();
            this.setting.active = true;
        }, this)

        //Handle on submit
        this.buttonSubmit.node.on(Button.EventType.CLICK, () => {
            director.resume();
            this.setting.active = false;
        }, this)

        // Handle on mute background music
        this.tgBackground.node.on('toggle', () => {
            if (this.tgBackground.isChecked) {
                this.audioController.controlMusic(AUDIO_STATE.PLAY);
            } else {
                this.audioController.controlMusic(AUDIO_STATE.PAUSE);
            }
        }, this)

        //Handle on mute effect audio
        this.tgEffect.node.on('toggle', () => {
            if (this.tgEffect.isChecked) {
                this.audioController.unMuteEffectSound();
            } else {
                this.audioController.muteEffectSound();
            }
        }, this)
    }
}


