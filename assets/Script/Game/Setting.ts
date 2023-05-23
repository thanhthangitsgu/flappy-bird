import { _decorator, Button, Component, director, Node, Toggle } from 'cc';
import { AUDIO_VOLUME, SCENE_NAME } from '../GlobalValue';
import { EffectAudio } from '../Audio/EffectAudio';
import { BackgroundMusic } from '../Audio/BackgroundMusic';
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

    @property({
        type: EffectAudio,
        tooltip: "Control effect sounds"
    })
    private effectAudio: EffectAudio;

    @property({
        type: BackgroundMusic,
        tooltip:"Control background music"
    })
    private bgMusic: BackgroundMusic;

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
                this.bgMusic._play();
            } else {
                this.bgMusic._pause();
            }
        }, this)

        //Handle on mute effect audio
        this.tgEffect.node.on('toggle', () => {
            if (this.tgEffect.isChecked) {
                this.effectAudio.setVolume(AUDIO_VOLUME.VOLUME_MAX);
            } else {
                this.effectAudio.setVolume(AUDIO_VOLUME.VOLUME_MIN);
            }
        }, this)
    }
}


