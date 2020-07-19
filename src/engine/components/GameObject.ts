import * as PIXI from "pixi.js"

import { InputManager } from "./InputManager";
import { GameLoop } from "../../GameLoop";
import { GameProperties } from "../../utilities/GameProperties";

export class GameObject {

    public inputManager: InputManager;

    //- Position
    private _x: number;
    private _y: number;
    private _rotation: number;

    //- Visuals
    private _stage: PIXI.Container;
    private _sprite: PIXI.Sprite;

    private _width: number;
    private _height: number;
    private _anchor: object;
    private _tint: number;

    constructor(_stage: PIXI.Container, _x: number, _y: number, _sprite: PIXI.Sprite)
    {
        this.inputManager = GameLoop.prototype.getInputManager();
        
        this._stage = _stage;
        this._sprite = _sprite;

        this._x = _x;
        this._y = _y;
        this._rotation = this._sprite.rotation;

        
        
        this._width = this._sprite.width;
        this._height = this._sprite.width;
        this._anchor = {x: this._sprite.anchor.x, y: this._sprite.anchor.y };
        this._tint = this._sprite.tint;

        this._sprite.x = _x;
        this._sprite.y = _y;
        this._sprite.anchor.set(0.5);

        this._stage.addChild(this._sprite);
        
    }

    public moveDirection(_direction: number, _speed: number): void {

        _direction *= (Math.PI / 180);
        this.x += Math.cos(_direction) * _speed;
        this.y += Math.sin(_direction) * _speed;
    }

    public getPointInDirection(_direction: number | undefined, _distance: number): object {

        let _x = 0, _y = 0;

        if (_direction) {

            _direction *= (Math.PI / 180);
            _x = Math.cos(_direction) * _distance;
            _y = Math.sin(_direction) * _distance;  
        }
        

        return {x: Math.round(_x), y: Math.round(_y)};
    }

    public getPointInDirectionXY(_x: number, _y: number, _direction: number | undefined, _distance: number): object {

        let _xx = 0, _yy = 0;

        if (_direction) {

            _direction *= (Math.PI / 180);
            _xx = _x + (Math.cos(_direction) * _distance);
            _yy = _y + (Math.sin(_direction) * _distance);  
        }
        

        return {x: Math.round(_xx), y: Math.round(_yy)};
    }

    public update(): void {
        
        //if (this._currentDirection != this._nextDirection)
    }

    public checkHitWall(): boolean {
        let _return = false;

        if (this.x < this.width / 2 || this.x > GameProperties.levelWidth - this.width / 2 || this.y < this.height / 2 || this.y > GameProperties.levelHeight - this.height / 2)
            _return = true;
        
        return _return;
    }

    //#region - Getters & Setters

    get stage(): PIXI.Container { return this._stage; }

    //- Positions
    get x(): number { return this._x; }
    set x(_value: number) { this._x = _value; this._sprite.x = _value; }

    get y(): number { return this._y; }
    set y(_value: number) { this._y = _value; this._sprite.y = _value; }

    get rotation(): number { return this._rotation; }
    set rotation(_value: number) { this._rotation = _value; this._sprite.angle = _value; }

    //- Visuals
    get sprite(): PIXI.Sprite { return this._sprite; }
    set sprite(_value: PIXI.Sprite) {

        this._sprite.texture = _value.texture; 
        
    }

    // set sprite(_value: PIXI.Sprite) {
    //     this._stage.removeChild(this._sprite);
    //     this._sprite = _value; 
    //     this._stage.addChild(this._sprite);
    //     this._sprite.x = this.x;
    //     this._sprite.y = this.y;
    //     this._sprite.angle = this.rotation;
    // }

    get width(): number { return this._width; }
    set width(_value: number) { this._rotation = _value; this._sprite.width = _value; }

    get height(): number { return this._height; }
    set height(_value: number) { this._rotation = _value; this._sprite.height = _value; }

    get tint(): number { return this._tint; }
    set tint(_value: number) { this._tint = _value; this._sprite.tint = _value; }

    get anchor(): object { return this._anchor; }
    set anchor(_value: object) { 
        this._anchor = _value;
        this._sprite.anchor.x = _value.x; this._sprite.anchor.y = _value.y; 
    }

    private updateSprite(_variable: any, _variableSprite: any, _value: any) {
        _variableSprite = _value;
        _variable = _value;
    }

    //#endregion

}

export interface GameObject {
    update(): void;
}