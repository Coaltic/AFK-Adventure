import AssetManager from "./AssetManager";
import Player from "./Player";

export default class ScreenManager {

    private stage:createjs.StageGL;
    private _coins:number;

    private introScreen:createjs.Container;
    private playSprite:createjs.Sprite;

    private shopScreen:createjs.Container;
    private swordSprite:createjs.Sprite;
    private swordPrice:number = 5;

    private moneybagSprite:createjs.Sprite;
    private moneybagPrice:number = 20;

    private timerSprite:createjs.Sprite;
    private timerPrice:number = 5;
    private backSprite:createjs.Sprite;

    private outsideAreaScreen:createjs.Container;
    private shopButton:createjs.Sprite;
    private coinSprite:createjs.Sprite;
    private txtCoins:createjs.BitmapText;

    private adventureAreaScreen:createjs.Container;

    private eventStartGame:createjs.Event;
    private eventShowGame:createjs.Event;
    private eventEnterShop:createjs.Event;

    private eventDPSup:createjs.Event;
    private eventCoinsup:createjs.Event;

    
    constructor(stage:createjs.StageGL, assetManager:AssetManager) {
        this.stage = stage;
        this.txtCoins = new createjs.BitmapText("0", assetManager.getSpriteSheet("glyphs"));
        this.txtCoins.x = 525;
        this.txtCoins.y = 50;

        // title screen
        this.introScreen = new createjs.Container();
        this.introScreen.addChild(assetManager.getSprite("assets", "Backgrounds/title", 300, 300));
        this.playSprite = assetManager.getSprite("assets", "Misc/Play", 300, 475);

        this.introScreen.addChild(this.playSprite);

        // shop screen
        this.shopScreen = new createjs.Container();
        this.shopScreen.addChild(assetManager.getSprite("assets", "Backgrounds/shop", 300, 300));
        this.swordSprite = assetManager.getSprite("assets", "Items/Sword", 200, 200);
        this.moneybagSprite = assetManager.getSprite("assets", "Items/moneybag", 300, 200);
        this.timerSprite = assetManager.getSprite("assets", "Items/timer", 400, 200);
        this.backSprite = assetManager.getSprite("assets", "Items/Sword", 64, 64);
        this.shopScreen.addChild(this.swordSprite);
        this.shopScreen.addChild(this.moneybagSprite);
        this.shopScreen.addChild(this.timerSprite);
        this.shopScreen.addChild(this.backSprite);


        // area 1 screen
        this.outsideAreaScreen = new createjs.Container();
        this.outsideAreaScreen.addChild(assetManager.getSprite("assets", "Backgrounds/dungeon", 300, 300));
        this.coinSprite = assetManager.getSprite("assets", "Coin", 475, 50);
        this.outsideAreaScreen.addChild(this.coinSprite);
        this.coinSprite.gotoAndPlay("Coin");
        this.outsideAreaScreen.addChild(this.txtCoins);
        this.shopButton = assetManager.getSprite("assets", "Misc/ShopUp", 150, 450);    
        //let adventureButton:createjs.Sprite = assetManager.getSprite("assets", "Misc/AdventureUp", 450, 450);
        this.outsideAreaScreen.addChild(this.shopButton);
        //this.outsideAreaScreen.addChild(adventureButton);

        // adventure screen
        // this.adventureAreaScreen = new createjs.Container();
        // this.adventureAreaScreen.addChild(assetManager.getSprite("sprites", "misc/backgroundAdventure", 0, 0));

        this.eventStartGame = new createjs.Event("gameStart", true, false);
        this.eventShowGame = new createjs.Event("showGame", true, false);
        this.eventEnterShop = new createjs.Event("enterShop", true, false);

        this.eventDPSup = new createjs.Event("DPSup", true, false);
        this.eventCoinsup = new createjs.Event("coinsUp", true, false);
    }

    public set coins(value:number) {
        this._coins = value;
        // update coins bitmapText object
        this.txtCoins.text = String(this._coins);
    }

    // -------------------------------------------------- public methods
    
    public showIntro():void {      

        // show the intro screen
        this.hideAll();
        this.stage.addChildAt(this.introScreen, 0);
        // detect click on the stage to remove intro screen and start the game
        this.playSprite.on("click", (e) => {
            this.stage.dispatchEvent(this.eventStartGame);
        }, this, true);        
    }

    public showGame():void {
        // show the game screen
        createjs.Sound.play("beep");
        this.hideAll();
        this.stage.addChildAt(this.outsideAreaScreen, 0);

        this.shopButton.on("mousedown", (e) => {
            createjs.Sound.play("beep");
            this.shopButton.gotoAndStop("Misc/ShopDown");
        }, this, true);    
        
        this.shopButton.on("pressup", (e) => {
            this.shopButton.gotoAndStop("Misc/ShopUp");
            this.stage.dispatchEvent(this.eventEnterShop);
        }, this, true); 

    }

    public showShop(player:Player):void {
        // show the shop screen
        createjs.Sound.play("beep");
        this.hideAll();
        this.stage.addChildAt(this.shopScreen, 0);   

        this.backSprite.on("click", (e) => {
            createjs.Sound.play("beep");
            this.stage.dispatchEvent(this.eventShowGame);
        }, this, true); 
        console.log("showshop() is running");  

        // shop items
        this.swordSprite.on("pressup", (e) => {
            if (player.coins >= this.swordPrice) { 
                createjs.Sound.play("purchase");
                player.coins = player.coins - this.swordPrice;
                console.log(player.coins);
                this.stage.dispatchEvent(this.eventDPSup);
            }
            else { createjs.Sound.play("beep"); }
            
        }, this, false);

        this.moneybagSprite.on("pressup", (e) => {
            if (player.coins >= this.moneybagPrice) {
                createjs.Sound.play("purchase"); 
                player.coins = player.coins - this.moneybagPrice;
                //console.log(player.coins);
                this.stage.dispatchEvent(this.eventCoinsup);
            }
            else { createjs.Sound.play("beep"); }
        }, this, false);

    }

    public showAdventure():void {      
        createjs.Sound.play("beep");
        // show the intro screen
        this.hideAll();
        this.stage.addChildAt(this.adventureAreaScreen, 0);
        // detect click on the stage to remove intro screen and start the game    
    }

    private hideAll():void {
        this.stage.removeChild(this.introScreen);
        this.stage.removeChild(this.outsideAreaScreen);
        this.stage.removeChild(this.shopScreen);
        
    }
}