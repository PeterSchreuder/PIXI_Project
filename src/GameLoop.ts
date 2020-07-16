import * as PIXI from "pixi.js"

import {GameManager} from "./engine/components/GameManager";
import {RenderableElement} from "./utilities/RenderableElement";

export class Game {

    private readonly renderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer;
    private readonly gameManager: GameManager;
    private readonly spriteList: PIXI.loaders.Loader;

    constructor (rendered: PIXI.CanvasRenderer | PIXI.WebGLRenderer, sprites: PIXI.loaders.Loader) {

        this.renderer = rendered;
        this.spriteList = sprites;
        this.gameManager = new GameManager(sprites);

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