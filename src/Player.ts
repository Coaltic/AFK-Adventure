import AssetManager from "./AssetManager";

export default class Slime {

    public attack:number;
    public coins:number;


    constructor(stage:createjs.StageGL, assetManager:AssetManager) {
        
        this.attack = 1;

        this.coins = 0;

    } 
}
