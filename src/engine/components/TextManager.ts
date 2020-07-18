import * as PIXI from "pixi.js"

export class TextManager {

    private _rootStage: PIXI.Container;
    private _textlist: Map<string, PIXI.Text>;

    constructor(_stage: PIXI.Container) {

        this._textlist = new Map<string, PIXI.Text>();
        this._rootStage = _stage;
    }

    public CreateText(_id: string, _x: number, _y: number, _string: string, _obj: object): PIXI.Text {

        //Use this to create styling: https://pixijs.io/pixi-text-style/#

        let _text: PIXI.Text;
        let _oldText = this._textlist.get(_id);

        if (_oldText)
        {
            _text = _oldText;
            _text.text = _string;
            let _style = new PIXI.TextStyle(_obj);
            _text.style = _style;
        }
        else
        {
            _text = new PIXI.Text(_string, _obj);
            this._rootStage.addChild(_text);
        }

        this._textlist.set(_id, _text);

        _text.x = _x;
        _text.y = _y;
        
        return _text;
    }

    public textToggleVisibillity(_id: string, _boolean: boolean) {
        let _obj = this._textlist.get(_id);
        
        if (_obj)
            _obj.visible = _boolean;
    }

    public textDisableAll() {
        this._textlist.forEach(id => {id.visible = false});
    }
}
