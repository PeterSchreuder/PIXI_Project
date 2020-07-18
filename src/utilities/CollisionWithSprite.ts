import { GameObject } from "~engine/components/GameObject";

export class CollisionWithObject {

    public static collision(col1: GameObject, col2: GameObject): boolean {

        let hit, vectorX, vectorY, combinedHalfWidths, combinedHalfHeights;

        hit = false;

        let centerX1 = col1.x + col1.width / 2;
        let centerY1 = col1.y + col1.height / 2;

        let centerX2 = col2.x + col2.width / 2;
        let centerY2 = col2.y + col2.height / 2;


        let halfWidth1 = col1.width / 2;
        let halfHeight1 = col1.height / 2;

        let halfWidth2 = col2.width / 2;
        let halfHeight2 = col2.height / 2;


        vectorX = centerX1 - centerX2;
        vectorY = centerY1 - centerY2;

        combinedHalfWidths = halfWidth1 + halfWidth2;
        combinedHalfHeights = halfHeight1 + halfHeight2;

 2      //Check for collision
        if (Math.abs(vectorX) < combinedHalfWidths) {

            if (Math.abs(vectorY) < combinedHalfHeights) {

                hit = true;
            }
        }

        return hit;
    }
}