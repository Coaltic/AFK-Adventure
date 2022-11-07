// game constants
export const STAGE_WIDTH:number = 600;
export const STAGE_HEIGHT:number = 600;
export const FRAME_RATE:number = 30;

export const ASSET_MANIFEST:Object[] = [
    {
        type:"json",
        src:"./lib/spritesheets/assets.json",
        id:"assets",
        data:0
    },
    {
        type:"image",
        src:"./lib/spritesheets/assets.png",
        id:"assets",
        data:0
    },
    {
        type:"json",
        src:"./lib/spritesheets/glyphs.json",
        id:"glyphs",
        data:0
    },
    {
        type:"image",
        src:"./lib/spritesheets/glyphs.png",
        id:"glyphs",
        data:0
    },
    {
        type:"sound",
        src:"./lib/sounds/beep.ogg",
        id:"beep",
        data:4
    },  
    {
        type:"sound",
        src:"./lib/sounds/punch.ogg",
        id:"punch",
        data:4
    },
    {
        type:"sound",
        src:"./lib/sounds/death.ogg",
        id:"death",
        data:4
    },
    {
        type:"sound",
        src:"./lib/sounds/purchase.ogg",
        id:"purchase",
        data:4
    },
    {
        type:"sound",
        src:"./lib/sounds/music.ogg",
        id:"music",
        data:4
    },  
];
