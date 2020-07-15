import * as PIXI from "pixi.js"
import Sprite = PIXI.Sprite;

import {GameProperties} from "./utilities/GameProperties";


import RenderOptions = PIXI.RendererOptions;

function onLoad(): void {

    let loader = PIXI.loader;

    loader
        .add("player", "player.png");//"./images/player.png"
        
    loader.onProgress.add(showProgress);
    loader.onError.add(reportError);
    loader.onComplete.add(setup);

    loader.load((loader, resources) => {
        console.log("Loaded Resources: ", resources);
    });

    function setup(): void {

        let rendererOptions: RenderOptions = {
            backgroundColor: 0 * 0xFFFFFF,
            resolution: 1,
            
        }

        let renderer = new PIXI.Application(
            GameProperties.levelWidth,
            GameProperties.levelHeight,
            rendererOptions
        );

        let mainGameDiv = document.querySelector("#display");

        if (mainGameDiv != null)
            mainGameDiv.appendChild(renderer.view);
        else
            console.error("No 'display' div found in html");

        let player = PIXI.Sprite.fromImage('player.png');//new PIXI.Sprite(PIXI.loader.resources.player.texture);//PIXI.Sprite.from("./imagesplayer.png");//PIXI.loader.resources.player.texture
        player.x = GameProperties.levelWidth / 2;
        player.y = GameProperties.levelHeight / 2;
        player.anchor.set(0.5);
        renderer.stage.addChild(player);

        //console.log(player)
    }
}

function showProgress(e: any): void {

    console.log(e.progress);
}

function reportError(e: any): void {

    console.error("ERROR: " + e.message);
}

window.onload = () => onLoad();