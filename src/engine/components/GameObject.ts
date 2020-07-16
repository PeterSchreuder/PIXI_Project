import * as PIXI from "pixi.js"

export class GameObject {

    private _sprite: PIXI.Sprite;

    constructor(_stage: PIXI.Container, _x: number, _y: number, _sprite: PIXI.Sprite)
    {
        this._sprite = _sprite;
        this._sprite.x = _x;
        this._sprite.y = _y;
        this.sprite.anchor.set(0.5);
        this.sprite.rotation = 90;
        _stage.addChild(this._sprite);
    }

    public moveDirection(): void {

    }

    //#region - Getters & Setters

    //- Positions
    get x(): number { return this._sprite.x; }
    set x(_value: number) { this._sprite.x = _value;}

    get y(): number { return this._sprite.y; }
    set y(_value: number) { this._sprite.y = _value; }

    get rotation(): number { return this._sprite.rotation; }
    set rotation(_value: number) { this._sprite.rotation = _value; }

    //- Visuals
    get sprite(): PIXI.Sprite { return this._sprite; }
    set sprite(_value: PIXI.Sprite) { this._sprite = _value; }

    get tint(): number { return this._sprite.tint; }
    set tint(_value: number) { this._sprite.tint = _value; }

    //#endregion

}
