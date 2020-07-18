
import * as PIXI from "pixi.js"

import { GameObject } from "./GameObject";
import { InputManager } from "./InputManager";
import { clamp, round } from "lodash";
import { GameProperties } from "../../utilities/GameProperties";

export class Player extends GameObject {

    private _currentDirection: number | undefined;
    private _nextDirection: number | undefined;

    private _speed: number;

    private _xx: number;
    private _yy: number;

    constructor(_stage: PIXI.Container, _x: number, _y: number, _sprite: PIXI.Sprite)
    {
        super(_stage, _x, _y, _sprite);

        this._currentDirection = undefined;
        this._nextDirection = this.currentDirection;

        this._xx = 0;
        this._yy = 0;

        this._speed = 0;
    }

    public update() {
        
        // When the game has started. Set the current direction by the players first input
        if (this.currentDirection == undefined)
            this._currentDirection = this.nextDirection;

        if (this.currentDirection != undefined)
        {
            //check xy with current direction and next direction
            let nextTileLocation = this.getPointInDirection(this.currentDirection, this.width);

            //- Use this to check if the player rotate to an other grid axis
            let _dir = this.getPointInDirection(this.currentDirection, this.speed);
            this._xx += round(_dir.x);
            this._yy += round(_dir.y);

            // Loop it to 32 with modulo
            this._yy %= 32;
            this._xx %= 32;

            //- Vertical
            if (this.currentDirection == 90 || this.currentDirection == 270)
            {
                // Turn on the next grid axis
                if (round(this._yy) == 0)
                {
                    this._currentDirection = this.nextDirection;
                }
            }

            //- Horizontal
            if (this.currentDirection == 0 || this.currentDirection == 180)
            {
                // Turn on the next grid axis
                if (round(this._xx) == 0)
                {
                    this._currentDirection = this.nextDirection;
                }
            }

            this.moveDirection(this.currentDirection, this.speed);

            //this.x = clamp(this.x, 0 + this.width / 2, GameProperties.levelWidth - this.width / 2);
            //this.y = clamp(this.y, 0 + this.height / 2, GameProperties.levelHeight - this.height / 2);
        }
        
    }

    get speed(): number { return this._speed; }
    set speed(_value: number) { this._speed = _value; }

    get currentDirection(): number | undefined { return this._currentDirection; }

    get nextDirection(): number | undefined { return this._nextDirection; }
    set nextDirection(_value: number | undefined) { this._nextDirection = _value; }
}