export class InputManager {

    private keys: Map<number, boolean>;

    constructor(keyboardElement: Element, mouseElement: Element) {

        this.keys = new Map<number, boolean>();
        let keys = this.keys;
        console.log(this.keys)
        //this.keys = new Map();

        window.addEventListener("keydown", setKeyDown);
        window.addEventListener("keyup", setKeyUp);

        function setKeyDown(e: KeyboardEvent): void {

            let _keyCode = e.keyCode;

            keys.set(_keyCode, true);
        }

        function setKeyUp(e: KeyboardEvent): void {

            let _keyCode = e.keyCode;

            keys.set(_keyCode, false);
        }
    }

    public keyDown(_value: InputManager.vk_Keys): boolean {
        
        let _return = false;

        

        if (this.keys.get(_value))
            _return = true;

        

        return _return;
    }

    public keyUp(_value: InputManager.vk_Keys): boolean {
        
        let _return = false;

        if (this.keys.has(_value) && this.keys.get(_value) == false)
            _return = true;

        return _return;
    }
}

export namespace InputManager {

    //- Virtual keyboard keys
    export enum vk_Keys {
        null = -1,
        up = 38,
        down = 40,
        left = 37,
        right = 39,

        w = 87,
        s = 83,
        a = 65,
        d = 68,
    }
}