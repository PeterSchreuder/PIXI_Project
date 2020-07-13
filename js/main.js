//import * as PIXI from 'pixi.js';
//import {PIXI} = "js/node_modules/pixi.js/lib/pixi.js";

//- Pixi variables
let app;//autoDetectRenderer({width: 800, height: 600, backgroundColor: 0xAAAAAA});
let loader;


let keys = [];
let keysDiv;
let mainGameDiv;
let objects = [];

//- Player 
let player;

window.onload = function() {

    app = new PIXI.Application({
        
        width: 800, 
        height: 600, 
        backgroundColor: 0xAAAAAA
    });

    document.body.appendChild(app.view);
    const stage = new PIXI.Container();

    keysDiv = document.querySelector("#keys");
    mainGameDiv = document.querySelector("#MainGame");
    

    mainGameDiv.appendChild(app.view);

    //- Load in the sprites
    loader = app.loader;

    // preload assets
    loader.baseUrl = "images";
    loader
        .add("sprite01", "bloat01.png")
        .add("sprite02", "bloat02.png")
        .add("sprite03", "bloat03.png")
        .add("sprite04", "bloat04.png")
        .add("sprite05", "bloat05.png")
        .add("player", "player.png");

    loader.onProgress.add(showProgress);
    loader.onComplete.add(doneLoading);
    loader.onError.add(reportError);

    loader.load();

    //- Input
    //app.stage.interactive = true;
    //mainGameDiv.addEventListener("pointerdown", mouseDown);
    //mainGameDiv.addEventListener("pointerup", mouseUp);

    window.addEventListener("keydown", keysDown);
    window.addEventListener("keyup", keysUp);

    

    

}

//============
//- Gameplay -
//============

//37 = left, 38 = up, 39 = right, 40 = down

function gameLoop(deltaTime) {
    //beginLoop

    //midLoop

    //endLoop

    //resetKeys

    keysDiv.innerHTML = JSON.stringify(keys);

    let speed = 5;

    if (!player)
        return;

    if (keys['37']) {

        player.x -= speed;
    }
    if (keys['39']) {

        player.x += speed;
    }

    if (keys['38']) {

        player.y -= speed;
    }
    if (keys['40']) {

        player.y += speed;
    }
}


//===================
//- Input Functions -
//===================

function keysDown(e) {

    console.log(e.keyCode);
    keys[e.keyCode] = true;
}

function keysUp(e) {

    console.log(e.keyCode);
    keys[e.keyCode] = false;
}

//====================
//- Image preloading -
//====================

function showProgress(e) {

    console.log(e.progress);
}

function reportError(e) {

    console.error("ERROR: " + e.message);
}

function doneLoading(e) {

    console.log("DONE LOADING IN ASSETS");

    var _resources = app.loader.resources;

    player = PIXI.Sprite.from(_resources.player.texture);
    player.x = app.view.width / 2;
    player.y = app.view.height / 2;
    player.anchor.set(0.5);
    app.stage.addChild(player);


    //- Gameloop
    app.ticker.add(gameLoop);
}