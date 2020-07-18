import { GameObject } from "../GameObject";

export class Tile extends GameObject {

    private _occupier: GameObject | null;

    constructor(_stage: PIXI.Container, _x: number, _y: number, _sprite: PIXI.Sprite) {

        super(_stage, _x, _y, _sprite);

        this._occupier = null;
    }

    get occupier(): GameObject | null { return this._occupier; }
    set occupier(_value: GameObject | null) { this._occupier = _value }
}