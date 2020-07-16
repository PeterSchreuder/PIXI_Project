import * as PIXI from "pixi.js"

export interface RenderableElement {
    createStage(): PIXI.Container;
    getStage(): PIXI.Container | undefined;
}