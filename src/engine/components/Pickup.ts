import { GameObject } from "./GameObject";
import { ObjectTypes } from "../../utilities/Enums";

export class Pickup extends GameObject {

    constructor(_stage: PIXI.Container, _x: number, _y: number, _sprite: PIXI.Sprite, _type: ObjectTypes | undefined) {

        super(_stage, _x, _y, _sprite, _type);
    }
}