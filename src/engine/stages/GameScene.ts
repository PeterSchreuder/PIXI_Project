import * as PIXI from "pixi.js"


import Container = PIXI.Container;

//import { GameProperties } from "../../utilities/GameProperties";
import {RenderableElement} from "../../utilities/RenderableElement";
import { GameObject } from "../components/GameObject";


export class GameScene implements RenderableElement {

    private stage: Container;
    private gameScene: Container;
    private objects: Array<any>;
    private spriteList: PIXI.loaders.Loader;

    constructor(sprites: PIXI.loaders.Loader)
    {
        this.spriteList = sprites;
        console.log("peter", this.spriteList)
        this.objects = [];
        this.gameScene = new PIXI.Container();

        let stage = this.buildScene();
        this.stage = stage;
    }

    private buildScene() {

        this.gameScene = new PIXI.Container();

        //- Create objects
        //let player = new GameObject(this.getStage(), 0, 0, this.spriteList.resources.player.texture);

        return this.gameScene;

    }

    public getStage(): PIXI.Container {
        
        return this.stage;
    }

    public getObjects(): Array<any> {

        return this.objects;
    }

}

