import * as PIXI from "pixi.js"

import {RenderableElement} from "../../utilities/RenderableElement";
import {UpdateableElement} from "../../utilities/UpdateableElement";

import {GameProperties} from "../../utilities/GameProperties";
import {GameScene} from "../stages/GameScene";

export class GameManager implements RenderableElement, UpdateableElement {
    
    private gameScene: GameScene;
    private stage: PIXI.Container | undefined;
    private spriteList: PIXI.loaders.Loader;

    constructor(sprites: PIXI.loaders.Loader) {
        this.spriteList = sprites;
    }

    public update(): void {

        //this.gameScene.getObjects.
    }

    getStage(): PIXI.Container {

        this.stage = new PIXI.Container();

        this.gameScene = new GameScene(this.spriteList);

        return this.stage;
    }
}




