
import * as PIXI from "pixi.js"

import { GameObject } from "./GameObject";
import { InputManager } from "./InputManager";
import { clamp, round } from "lodash";
import { GameProperties } from "../../utilities/GameProperties";
import { GridSystem } from "./gridsystem/GridSystem";

import {Line} from "../../utilities/Line";
import { UsefullFunctions } from "./UsefullFunctions";

export class Player extends GameObject {

    private _currentDirection: number | undefined;
    private _nextDirection: number | undefined;

    private _speed: number;

    private _xx: number;
    private _yy: number;
    private _timer: number;

    private _bodyList: Array<GameObject>;

    private _grid: GridSystem;

    private _debugLines: boolean;

    private _lineArray: Map<string, PIXI.Graphics>;

    constructor(_stage: PIXI.Container, _x: number, _y: number, _sprite: PIXI.Sprite, _grid: GridSystem)
    {
        super(_stage, _x, _y, _sprite);

        this._currentDirection = 90;
        this._nextDirection = this.currentDirection;
        this.rotation = this.currentDirection;

        this._xx = 0;
        this._yy = 0;

        this._speed = 0;

        this._bodyList = new Array<GameObject>();
        this.AddBodyObject(2, this.currentDirection);

        this._timer = 0;

        this._grid = _grid;

        this._debugLines = false;

        this._lineArray = new Map<string, PIXI.Graphics>();
        
        if (this._debugLines) {
            this.line("0", [_x, _y, _x + UsefullFunctions.lengthDirX(0, 100), _y + UsefullFunctions.lengthDirY(0, 100)], 0xffffff);
            this.line("90", [_x, _y, _x + UsefullFunctions.lengthDirX(90, 100), _y + UsefullFunctions.lengthDirY(90, 100)], 0xff0000);
            this.line("180", [_x, _y, _x + UsefullFunctions.lengthDirX(180, 100), _y + UsefullFunctions.lengthDirY(180, 100)], 0x00ff00);
            this.line("270", [_x, _y, _x + UsefullFunctions.lengthDirX(270, 100), _y + UsefullFunctions.lengthDirY(270, 100)], 0x0000ff);

            this.line("PlayerDir", [_x, _y, _x + UsefullFunctions.lengthDirX(0, 64), _y + UsefullFunctions.lengthDirY(0, 64)], 0x000000);
            this.line("PlayerDirN", [_x, _y, _x + UsefullFunctions.lengthDirX(180, 64), _y + UsefullFunctions.lengthDirY(180, 64)], 0xfa6511);
        }
    }

    public AddBodyObject(_amount: number, _direction: number) {

        let _piece, _x = 0, _y = 0, _sprite = PIXI.Sprite.from(PIXI.Loader.shared.resources.body.texture), _dir = _direction;
        let _size = this._bodyList.length | 0;

        for (let _i = 0; _i < _amount; _i++) {
            
            _i = this._bodyList.length;
            

            if (_i == 0)
            {
                _x = this.x;
                _y = this.y;
                _dir = this.currentDirection;
            }
            else
            {
                let _prevBody = this._bodyList[_i - 1];
                _dir = _prevBody.rotation;
                _x = _prevBody.x;
                _y = _prevBody.y;

                // If last sprite
                if (_i == _size + _amount - 1)
                {
                    _prevBody.sprite = _sprite;
                    _sprite = PIXI.Sprite.from(PIXI.Loader.shared.resources.bodyEnd.texture);
                }
                    
            }

            let _xx = _x + UsefullFunctions.lengthDirX(_dir - 180, 32);// * (_i + 1));
            let _yy = _y + UsefullFunctions.lengthDirY(_dir - 180, 32);// * (_i + 1));

            _piece = new GameObject(this.stage, _xx, _yy, _sprite);
            _piece.rotation = _dir;
            this._bodyList.push(_piece);
        }
    }

    private UpdateBodyObject(_array: Array<GameObject>) {

        for (let i = _array.length - 1; i >= 0; i--) {

            let _body = _array[i];

            if (i == 0)
            {
                _body.rotation = this.currentDirection;
                _body.x = this.x;
                _body.y = this.y;
                
            }
            else
            {
                let _body2 = _array[i - 1];

                _body.rotation = _body2.rotation;
                _body.x = _body2.x;
                _body.y = _body2.y;

                // if (i == _array.length - 1)
                //     _body.sprite.tint = 0xFF0000;
            }
        }
    }

    public line(_id: string, _points: Array<number>, color: number) {

        var line = new PIXI.Graphics();
  
        // Define line style (think stroke)
        // width, color, alpha
        line.lineStyle(5, color, 1);
        
        // Draw line
        line.moveTo(_points[0], _points[1]);
        line.lineTo(_points[2], _points[3]);
        
        this._lineArray.set(_id, line);
        this.stage.addChild(line);
    }

    public lineUpdate(_id: string, _points: Array<number>) {

        var line = this._lineArray.get(_id);

        if (!line)
            return;


        let style = line.line.clone();
        line.clear();
        // Define line style (think stroke)
        // width, color, alpha
        line.lineStyle(5, style.color, 1);
        
        // Define line position - this aligns the top left corner of our canvas
        //line.position.x = _points[0], _points[1];
        //line.position.y = _points[2], _points[3];
        
        // Define pivot to the center of the element (think transformOrigin)
        //line.pivot.set(0,140);
        //line.rotation = 0.785398; // in radiants - use google to convert degrees to radiants
        
        // Draw line
        line.moveTo(_points[0], _points[1]);
        line.lineTo(_points[2], _points[3]);//UsefullFunctions.lengthDirX(270, 100), UsefullFunctions.lengthDirY(270, 100)
    }

    public update() {
        
        

        // When the game has started. Set the current direction by the players first input
        if (this.currentDirection == undefined)
            this._currentDirection = this.nextDirection;

        if (this.currentDirection != undefined && this.nextDirection != undefined && this._speed > 0)
        {
            this._timer++;
            this._timer %= this._speed;

            if (this._timer == 0)
            {
                

                let _updateDirection = false;
                
                

                let _val1 = Math.round(this.nextDirection);
                let _val2 = Math.round(this.currentDirection)

                let _angle = (_val2 - 180);
                _angle = Math.abs(_angle);

                if (_val1 == 270 && _val2 == 90)
                {

                }
                else
                {
                    if (_val1 != _angle)
                        _updateDirection = true;
                }

                if (_updateDirection == true)
                {
                    this._currentDirection = this.nextDirection;
                    this.sprite.angle = this.currentDirection;
                }           

                //check xy with current direction and next direction
                let _nextTileLocation = this.getPointInDirection(this.currentDirection, this.width);
                let _x = _nextTileLocation.x;
                let _y = _nextTileLocation.x;

                this.UpdateBodyObject(this._bodyList);
                
                this.x += _nextTileLocation.x;
                this.y += _nextTileLocation.y;



                if (this._debugLines) {
                    this.lineUpdate("0", [this.x, this.y, this.x + UsefullFunctions.lengthDirX(0, 100), this.y + UsefullFunctions.lengthDirY(0, 100)]);
                    this.lineUpdate("90", [this.x, this.y, this.x + UsefullFunctions.lengthDirX(90, 100), this.y + UsefullFunctions.lengthDirY(90, 100)]);
                    this.lineUpdate("180", [this.x, this.y, this.x + UsefullFunctions.lengthDirX(180, 100), this.y + UsefullFunctions.lengthDirY(180, 100)]);
                    this.lineUpdate("270", [this.x, this.y, this.x + UsefullFunctions.lengthDirX(270, 100), this.y + UsefullFunctions.lengthDirY(270, 100)]);
    
                    this.lineUpdate("PlayerDir", [this.x, this.y, this.x + UsefullFunctions.lengthDirX(_angle, 64), this.y + UsefullFunctions.lengthDirY(_angle, 64)]);
                    this.lineUpdate("PlayerDirN", [this.x, this.y, this.x + UsefullFunctions.lengthDirX(_val1, 64), this.y + UsefullFunctions.lengthDirY(_val1, 64)]);
                }
            }
        }
    }

    get speed(): number { return this._speed; }
    set speed(_value: number) { this._speed = _value; }

    get currentDirection(): number | 0 { 
        
        if (this._currentDirection == undefined)
            return 0;
        else
            return this._currentDirection; 
    }

    get nextDirection(): number | undefined { return this._nextDirection; }
    set nextDirection(_value: number | undefined) { this._nextDirection = _value; console.log("UPDATED")}
}




// this.UpdateBodyObject(this._bodyList);

// // When the game has started. Set the current direction by the players first input
// if (this.currentDirection == undefined)
//     this._currentDirection = this.nextDirection;

// if (this.currentDirection != undefined)
// {
//     //check xy with current direction and next direction
//     let nextTileLocation = this.getPointInDirection(this.currentDirection, this.width);

//     //- Use this to check if the player rotate to an other grid axis
//     let _dir = this.getPointInDirection(this.currentDirection, this.speed);
//     this._xx += round(_dir.x);
//     this._yy += round(_dir.y);

//     // Loop it to 32 with modulo
//     this._yy %= 32;
//     this._xx %= 32;

//     let _updateDirection = false;
//     //- Vertical
//     if (this.currentDirection == 90 || this.currentDirection == 270)
//     {
//         // Turn on the next grid axis
//         if (round(this._yy) == 0)
//         {
//             _updateDirection = true;
//         }
//     }

//     //- Horizontal
//     if (this.currentDirection == 0 || this.currentDirection == 180)
//     {
//         // Turn on the next grid axis
//         if (round(this._xx) == 0)
//         {
//             _updateDirection = true;
//         }
//     }

//     if (_updateDirection)
//     {
//         this._currentDirection = this.nextDirection;
//         this.sprite.rotation = this.currentDirection;
//     }                

//     this.moveDirection(this.currentDirection, this.speed);

//     //this.x = clamp(this.x, 0 + this.width / 2, GameProperties.levelWidth - this.width / 2);
//     //this.y = clamp(this.y, 0 + this.height / 2, GameProperties.levelHeight - this.height / 2);
// }