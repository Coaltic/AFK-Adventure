import AssetManager from "./AssetManager";
import Player from "./Player";

export default class Slime {

    public static STATE_IDLE:number = 0;
    public static STATE_DEAD:number = 1;
    public stage:createjs.StageGL;
    public _sprite:createjs.Sprite;

    public _state:number;
    public _health:number = 10;
    public _previoushealth:number = this._health;

    public slimeLevel:number = 1;
    private slimeLevelUp:number;

    public eventAttacked:createjs.Event;
    public eventKilled:createjs.Event;

    constructor(stage:createjs.StageGL, assetManager:AssetManager) {
        this.stage = stage;
        this._state = Slime.STATE_IDLE;
        this._sprite = assetManager.getSprite("assets", "Slime/Idle", 300, 240);

        this.eventAttacked = new createjs.Event("slimeAttacked", true, false);
        this.eventKilled = new createjs.Event("slimeKilled", true, false);


    } 

    public set health(value:number) {
        this._health = value;
        this._previoushealth = this._health;
        
    }

    public AttackMe(player:Player):void {
        //this._state = Slime.STATE_IDLE;
        this._health = this._health - player.attack;
        console.log(this._health);
        if (this._health <= 0) {
            this.killMe();
        }

    }

    public killMe():void {
        if (this._state == Slime.STATE_DEAD) return;
        console.log("kill me working");
        this._state = Slime.STATE_DEAD;
        createjs.Sound.play("death");
        this._sprite.gotoAndPlay("Slime/Dead");
        this._sprite.on("animationend", (e) => {
            this.stage.dispatchEvent(this.eventKilled);
            this.NewSlime();
        }, this, true);

        

    }

    public NewSlime():void {
        if (this._state == Slime.STATE_IDLE) return;
        this._state = Slime.STATE_IDLE;
        
        //this.stage.removeChild(this._sprite);
        this._health = this._previoushealth;
        this.stage.addChild(this._sprite);
        this._sprite.gotoAndPlay("Slime/Idle");

    }

    public update():void {

        this._sprite.on("click", this.AttackMe, false, false)  
    }
}