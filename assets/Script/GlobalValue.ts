//Scene
export const SCENE_NAME = {
    BEGIN_SCENE: 'Entry',
    GAME_SCENE: 'Game'
}

//Enum
export enum StatusColor {
    COLOR_RED = 0,
    COLOR_PINK
}

export enum StatusMode {
    MODE_EASY,
    MODE_HARD
}

export enum AudioType {
    TYPE_DIE = 0,
    TYPE_HIT,
    TYPE_POINT,
    TYPE_SWOOH,
}

//Bird
export const BIRD_PARAMETER = {
    SPEED_FLY: 400,
    SPEED_ROTATION: 600,
    GRAVITY: 20,
    ROTATION: 15,
    MAX_ANGLE: 30,
    MIN_ANGLE: -90,
}
//Audio
export const AUDIO_VOLUME = {
    VOLUME_MAX: 1,
    VOLUME_MIN: 0,
}

export enum AUDIO_STATE {
    PLAY,
    PAUSE,
    RESUME, 
    STOP
}