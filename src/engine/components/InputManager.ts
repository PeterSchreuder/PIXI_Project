export class InputManager {

    private keys: Map<number, boolean>;
    private mouse: {x: number, y: number};

    constructor(keyboardElement: any, mouseElement: any, renderer: Element) {

        this.keys = new Map<number, boolean>();
        let keys = this.keys;
        
        this.mouse = {x: 0, y: 0};
        let mouse = this.mouse;

        //- Keyboard events
        keyboardElement.addEventListener("keydown", setKeyDown);
        keyboardElement.addEventListener("keyup", setKeyUp);

        function setKeyDown(e: KeyboardEvent): void {

            let _keyCode = e.keyCode;
            console.log(_keyCode);

            keys.set(_keyCode, true);
        }

        function setKeyUp(e: KeyboardEvent): void {

            let _keyCode = e.keyCode;

            keys.set(_keyCode, false);
        }

        
        //- Mouse events
        mouseElement.addEventListener("mousemove", setMousePosition);

        function setMousePosition(e: MouseEvent): void {
            var rect = renderer.getBoundingClientRect();
            
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        }
    }

    public mouseX(): number {
        
        let _return = 0;

        _return = this.mouse.x;

        return _return;
    }

    public mouseY(): number {
        
        let _return = 0;

        _return = this.mouse.y;

        return _return;
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