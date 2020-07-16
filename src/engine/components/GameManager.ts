import * as PIXI from "pixi.js"

import {RenderableElement} from "../../utilities/RenderableElement";
import {UpdateableElement} from "../../utilities/UpdateableElement";

import {GameProperties} from "../../utilities/GameProperties";
import {GameScene} from "../stages/GameScene";

export class GameManager implements RenderableElement, UpdateableElement {
    
    private gameScene: GameScene;
    private stage: PIXI.Container;

    constructor() {

    }

    public update(): void {

        //this.gameScene.getObjects.
    }

    createStage(): PIXI.Container {

        this.stage = new PIXI.Container();

        this.gameScene = new GameScene();
        this.stage.addChild(this.gameScene.getStage());

        return this.stage;
    }

    getStage(): PIXI.Container | undefined {
        return this.stage;
    }
}




