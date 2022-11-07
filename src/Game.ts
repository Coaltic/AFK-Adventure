// createjs typescript definition for TypeScript
/// <reference path="./../node_modules/@types/createjs/index.d.ts" />

// importing createjs framework
import "createjs";
// importing game constants
import { STAGE_WIDTH, STAGE_HEIGHT, FRAME_RATE, ASSET_MANIFEST } from "./Constants";
import AssetManager from "./AssetManager";
import ScreenManager from "./ScreenManager";
import Player from "./Player";
import Slime from "./Slime";

let player:Player;
let slime:Slime;
// game variables
let stage:createjs.StageGL;
let canvas:HTMLCanvasElement;
// assetmanager object
let assetManager:AssetManager;

let screenManager:ScreenManager;

let DPS:number = 0;
let DPStimer:number;

let coinsPerKill:number = 1;
let slimesKilled:number = 0;


// --------------------------------------------------- event handlers
function onReady(e:createjs.Event):void {
    console.log(">> adding sprites to game");

    createjs.Sound.play("music");

    // construct game objects/sprites
    DPStimer = window.setInterval(DamagePerSecond, 1000);
    
    player = new Player(stage, assetManager);
    slime = new Slime(stage, assetManager);

    screenManager = new ScreenManager(stage, assetManager);
    screenManager.showIntro();


    stage.on("gameStart", onGameEvent);
    stage.on("showGame", onGameEvent);
    stage.on("enterShop", onGameEvent);
    stage.on("slimeAttacked", onGameEvent);
    stage.on("slimeKilled", onGameEvent);

    stage.on("DPSup", onGameEvent);
    stage.on("coinsUp", onGameEvent);

    // startup the ticker
    createjs.Ticker.framerate = FRAME_RATE;
    createjs.Ticker.on("tick", onTick);     
    console.log(">> game ready");
}

function onTick(e:createjs.Event):void {
    // TESTING FPS
    document.getElementById("fps").innerHTML = String(createjs.Ticker.getMeasuredFPS());

    // This is your game loop :)
    // ...

    // update the stage!
    stage.update();
}

function DamagePerSecond():void {
    slime._health = slime._health - DPS;
    console.log(slime._health);

    if (slime._health <= 0) {
        slime.killMe();
    }
}

function AttackSlime(e:createjs.Event):void {
    stage.dispatchEvent("slimeAttacked");
}

function onGameEvent(e:createjs.Event):void {
    switch (e.type) {
        case "gameStart":
            screenManager.showGame();
            console.log("slime on screen");
            this.stage.addChild(slime._sprite);
            slime._sprite.gotoAndPlay("Slime/Idle");
            slime._sprite.on("click", AttackSlime, false, false);
            slime.health = 10;
            break;
        case "showGame":
            screenManager.showGame();
            this.stage.addChild(slime._sprite);
            slime._sprite.gotoAndPlay("Slime/Idle");
            break;
        case "enterShop":
            console.log("case is working");
            this.stage.removeChild(slime._sprite);
            screenManager.showShop(player);
            break;
        case "slimeAttacked":
            createjs.Sound.play("punch");
            console.log("slime attacked");
            slime.AttackMe(player);
            break;
        case "slimeKilled":
            slimesKilled++;
            console.log("SLIMES KILLED :" + slimesKilled);
            player.coins = player.coins + coinsPerKill;
            screenManager.coins = player.coins;
            console.log("COINS: " + player.coins);
            if (slimesKilled >= 20) {
                slime.health = Math.ceil(slime._previoushealth * 1.5);
                slimesKilled = 0;
            }
            break;
        case "DPSup":
            DPS = DPS + 0.5;
            screenManager.coins = player.coins;
            break;
        case "coinsUp":
                coinsPerKill = Math.ceil(coinsPerKill * 1.1);
                screenManager.coins = player.coins;
            break;
        
    }
}

// --------------------------------------------------- main method
function main():void {
    console.log(">> initializing");

    // get reference to canvas
    canvas = <HTMLCanvasElement> document.getElementById("game-canvas");
    // set canvas width and height - this will be the stage size
    canvas.width = STAGE_WIDTH;
    canvas.height = STAGE_HEIGHT;

    // create stage object
    stage = new createjs.StageGL(canvas, { antialias: true });

    // AssetManager setup
    assetManager = new AssetManager(stage);
    stage.on("allAssetsLoaded", onReady, null, true);
    // load the assets
    assetManager.loadAssets(ASSET_MANIFEST);
}

main();