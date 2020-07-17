
import * as PIXI from "pixi.js"

import { GameObject } from "./GameObject";
import { InputManager } from "./InputManager";


export class Player extends GameObject {

    constructor(_stage: PIXI.Container, _x: number, _y: number, _sprite: PIXI.Sprite)
    {
        super(_stage, _x, _y, _sprite);
    }

    public update() {
        
        
    }
}