import * as PIXI from "pixi.js"

import { InputManager } from "./InputManager";
import { GameLoop } from "../../GameLoop";


export class GameObject {

    private _sprite: PIXI.Sprite;
    public inputManager: InputManager;

    constructor(_stage: PIXI.Container, _x: number, _y: number, _sprite: PIXI.Sprite)
    {
        this.inputManager = GameLoop.prototype.getInputManager();
        
        this._sprite = _sprite;
        this._sprite.x = _x;
        this._sprite.y = _y;
        this.sprite.anchor.set(0.5);
        //this.sprite.rotation = 90;

        _stage.addChild(this._sprite);
        console.log("peter", this._sprite.width);
        
    }

    public moveDirection(_direction: number, _speed: number): void {

        _direction *= (Math.PI / 180);
        this.x += Math.cos(_direction) * _speed;
        this.y += Math.sin(_direction) * _speed;
    }

    public update(): void {

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

    get anchor(): object { return {x: this._sprite.anchor.x, y: this._sprite.anchor.x}; }
    set anchor(_value: object) { this._sprite.anchor.x = _value.x; this._sprite.anchor.y = _value.y; }

    //#endregion

}

export interface GameObject {
    update(): void;
}