import * as PIXI from "pixi.js"
//

import {GameProperties} from "./utilities/GameProperties";
import {GameLoop} from "./GameLoop";

window.onload = () => onLoad();

function onLoad(): void {

    //- Pre- load the Sprites
    let loader = PIXI.Loader.shared;

    loader
        .add("body", "body.png")
        .add("bodyEnd", "bodyEnd.png")
        .add("player", "player.png")
        .add("tile", "tile.png");
        
    loader.onProgress.add(showLoaderProgress);
    loader.onError.add(reportLoaderError);
    loader.onComplete.add(setup);

    let spriteResources = loader.resources;

    loader.load((loader, resources) => {
        
        console.log("Loaded Resources: ", resources);
    });

    //- Setup the game
    function setup(): void {
        
        let app = new PIXI.Application({
            width: GameProperties.levelWidth,
            height: GameProperties.levelHeight,
            backgroundColor: 0xAAAAAA
        });

        let mainGameDiv = document.querySelector("#display");

        if (mainGameDiv != null)
            mainGameDiv.appendChild(app.view);
        else
            console.error("No 'display' div found in html");

        // let player = PIXI.Sprite.from(spriteResources.player.texture);
        // player.x = GameProperties.levelWidth / 2;
        // player.y = GameProperties.levelHeight / 2;
        // player.anchor.set(0.5);
        // app.stage.addChild(player);

        // Start the game
        let _gameLoop = new GameLoop(app);

        _gameLoop.setupGame();
        gameLoop(_gameLoop);
        //console.log(player)
    }

    function gameLoop(game: GameLoop): void {

        requestAnimationFrame(() => gameLoop(game));
        game.update();
        game.render();
    }
}

function showLoaderProgress(e: any): void {

    console.log(e.progress);
}

function reportLoaderError(e: any): void {

    console.error("ERROR: " + e.message);
}

