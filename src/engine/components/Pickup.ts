import { GameObject } from "./GameObject";
import { ObjectTypes, PickupTypes } from "../../utilities/Enums";

export class Pickup extends GameObject {

    private _pickupType: PickupTypes | undefined;

    constructor(_stage: PIXI.Container, _x: number, _y: number, _sprite: PIXI.Sprite, _type: ObjectTypes | undefined, _pickupType: PickupTypes | undefined) {

        super(_stage, _x, _y, _sprite, _type);

        this._pickupType = _pickupType;
    }

    get pickupType(): PickupTypes | undefined { return this._pickupType; };
}