export module UsefullFunctions {

    export function lookTowardPoint(_x: number, _y: number, _x2: number, _y2: number): number {
        
        return Math.atan2(_y - _y2, _x - _x2);
    }

    export function lengthDirX(direction: number, length: number): number {

        let radAngle = toRadians(direction);
        return (Math.cos(radAngle) * length);
    }

    export function lengthDirY(direction: number, length: number): number {

        let radAngle = toRadians(direction);
        return (Math.sin(radAngle) * length);
    }

    //- Math
    export function toRadians(degrees: number): number {

        return degrees * (Math.PI / 180);
    }

    export function toDegrees(radians: number): number {

        return radians * (180 / Math.PI);
    }

    export function clamp(_variable: number, _min: number, _max: number): number {
        let _return = _variable;

        if (_variable > _max)
            _return = _max;
        else if (_variable < _min)
            _return = _min;

        return _return;
    }

    export function round(_variable: number): number {
        return Math.round(_variable);
    }
}