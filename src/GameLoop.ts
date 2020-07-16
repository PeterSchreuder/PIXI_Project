import * as PIXI from "pixi.js"

import {GameManager} from "./engine/components/GameManager";
import {RenderableElement} from "./utilities/RenderableElement";

export class Game {

    private readonly renderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer;
    private readonly gameManager: GameManager;

    constructor (rendered: PIXI.CanvasRenderer | PIXI.WebGLRenderer) {

        this.renderer = rendered;
        this.gameManager = new GameManager();

    }

    public update(): void {
        this.gameManager.update();
    }

    public render(): void {
        let rootStage = new PIXI.Container();
        ([
            this.gameManager,
        ] as Array<RenderableElement>)
            .map(element => element.getStage())
            .forEach(stage => rootStage.addChild(stage));

        this.renderer.render(rootStage);
    }
}