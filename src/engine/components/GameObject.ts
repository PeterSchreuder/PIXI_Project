import * as PIXI from "pixi.js"

export class GameObject {

    private sprite: PIXI.Sprite;

    constructor(stage: PIXI.Container, x: number, y: number, sprite: PIXI.Sprite)
    {
        this.sprite = sprite;
        this.sprite.x = x;
        this.sprite.y = y;
        stage.addChild(this.sprite);
    }
}
