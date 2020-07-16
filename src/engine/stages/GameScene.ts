import * as PIXI from "pixi.js"


import Container = PIXI.Container;

//import { GameProperties } from "../../utilities/GameProperties";
import {RenderableElement} from "../../utilities/RenderableElement";


export class GameScene implements RenderableElement {

    private stage: Container;
    private gameScene: Container;
    private objects: Array<any>;

    constructor()
    {
        this.objects = [];
        this.gameScene = new PIXI.Container();

        let stage = this.buildScene();
        this.stage = stage;
    }

    private buildScene() {

        this.gameScene = new PIXI.Container();

        //- Create objects
        

        return this.gameScene;

    }

    public getStage(): PIXI.Container {
        
        return this.stage;
    }

    public getObjects(): Array<any> {

        return this.objects;
    }

}

