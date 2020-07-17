import { GameObject } from "~engine/components/GameObject";

export class CollisionWithObject {

    public static collision(col1: GameObject, col2: GameObject): boolean {

        let hit, vectorX, vectorY, combinedHalfWidths, combinedHalfHeights;

        hit = false;

        col1.centerX = col1.x + col1.width / 2;
        col1.centerY = col1.y + col1.height / 2;

        col2.centerX = col2.x + col2.width / 2;
        col2.centerY = col2.y + col2.height / 2;


        col1.halfWidth = col1.width / 2;
        col1.halfHeight = col1.height / 2;

        col2.halfWidth = col2.width / 2;
        col2.halfHeight = col2.height / 2;


        vectorX = col1.centerX - col2.centerX;
        vectorY = col1.centerY - col2.centerY;

        combinedHalfWidths = col1.halfWidth + col2.halfWidth;
        combinedHalfHeights = col1.halfHeight + col2.halfHeight;

        //Check for collision
        if (Math.abs(vectorX) < combinedHalfWidths || Math.abs(vectorY) < combinedHalfWidths) {

            hit = true;
        }

        return hit;
    }
}