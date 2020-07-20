import { GameObject } from "../GameObject";

export class Tile extends GameObject {

    private _occupier: GameObject | null;

    private _gridArrayX: number;
    private _gridArrayY: number;

    private _id: string;

    constructor(_stage: PIXI.Container, _x: number, _y: number, _sprite: PIXI.Sprite, _id: string) {

        super(_stage, _x, _y, _sprite);

        this._gridArrayX = _x + (this.width / 2);
        this._gridArrayY = _y + (this.height / 2);

        this._occupier = null;

        this.tint = 0xbbbbbb;

        this._id = _id;
    }

    public checkOccupied(_occupiend: GameObject) {

        if (_occupiend == undefined)
        {
            console.log("NOT OCCUPIED")
            this.occupier = null;
            return;
        }
        
        if (_occupiend.x == this.gridArrayX && _occupiend.y == this.gridArrayY)
        {
            console.log("-OCCUPIED")
            this.occupier = _occupiend;
        }       
    }

    get id(): string { return this._id; };

    get gridArrayX(): number { return this._gridArrayX; }
    set gridArrayX(_value: number) { this._gridArrayX = _value; }

    get gridArrayY(): number { return this._gridArrayY; }
    set gridArrayY(_value: number) { this._gridArrayY = _value; }

    get occupier(): GameObject | null { return this._occupier; }
    set occupier(_value: GameObject | null) { 
        
        // if (_value != null) {
        //     this.sprite.tint = 0xFF0000;
        // }
        // else
        // {
        //     this.sprite.tint = 0xbbbbbb;
        // }
            

        this._occupier = _value;
    }
}