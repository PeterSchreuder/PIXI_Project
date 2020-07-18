import * as PIXI from "pixi.js"

export class TextManager {

    private _rootStage: PIXI.Container;

    constructor(_stage: PIXI.Container) {

        this._rootStage = _stage;
    }

    public CreateText(_x: number, _y: number, _string: string, _obj: object): PIXI.Text {

        let _text = new PIXI.Text(_string, _obj);
        this._rootStage.addChild(_text);

        _text.x = _x;
        _text.y = _y;
        
        return _text;
    }
}
