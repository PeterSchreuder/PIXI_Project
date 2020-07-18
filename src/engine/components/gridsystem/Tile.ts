import { GameObject } from "../GameObject";

export class Tile extends GameObject {

    private _occupier: GameObject | null;

    private _gridArrayX: number;
    private _gridArrayY: number;

    constructor(_stage: PIXI.Container, _x: number, _y: number, _sprite: PIXI.Sprite) {

        super(_stage, _x, _y, _sprite);

        this._gridArrayX = _x + (this.width / 2);
        this._gridArrayY = _y + (this.height / 2);

        this._occupier = null;
    }

    get gridArrayX(): number { return this._gridArrayX; }
    set gridArrayX(_value: number) { this._gridArrayX = _value; }

    get gridArrayY(): number { return this._gridArrayY; }
    set gridArrayY(_value: number) { this._gridArrayY = _value; }

    get occupier(): GameObject | null { return this._occupier; }
    set occupier(_value: GameObject | null) { this._occupier = _value }
}