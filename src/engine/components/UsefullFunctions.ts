export class UsefullFunctions {

    constructor() {

    }

    public lookTowardPoint(_x: number, _y: number, _x2: number, _y2: number): number {

        //let _angleTemp = Math.atan2(_y2 - _y, _x2 - _x);
        //return _angleTemp;//this.toDegrees(_angleTemp);

        var dist_Y = _y - _y2;
        var dist_X = _x - _x2;
        return Math.atan2(dist_Y,dist_X);
    }

    public lengthDirX(direction: number, length: number): number {

        let radAngle = this.toRadians(direction);
        return (Math.cos(radAngle) * length);
    }

    public lengthDirY(direction: number, length: number): number {

        let radAngle = this.toRadians(direction);
        return (Math.sin(radAngle) * length);
    }

    //- Math
    public toRadians(degrees: number): number {

        return degrees * (Math.PI / 180);
    }

    public toDegrees(radians: number): number {

        return radians * (180 / Math.PI);
    }
}