const G = 0.1;

class Physics {

    applyGravity(GameObject, gravityVector) {
        if (GameObject) {
            GameObject.acceleration.add(gravityVector);
        }
    }

    CheckCollision(player, land) {
        // Player edges
        let playerTop = player.pos.y - player.length / 2;
        let playerBottom = player.pos.y + player.length / 2;
        let playerLeft = player.pos.x - player.width / 2;
        let playerRight = player.pos.x + player.width / 2;
    
        // Land edges
        let landTop = land.pos.y;
        let landBottom = land.pos.y + land.thickness;
        let landLeft = land.pos.x;
        let landRight = land.pos.x + land.width;
    
        // Horizontal overlap
        let overlapX = playerRight > landLeft && playerLeft < landRight;
        // Vertical overlap
        let overlapY = playerBottom > landTop && playerTop < landBottom;
    
        if (overlapX && overlapY) {
            // Collision from top (player landing on platform)
            if (player.velocity.y > 0 && playerBottom - player.velocity.y <= landTop) {
                player.pos.y = landTop - player.length / 2;
                player.velocity.y = 0;
                player.acceleration.y = 0;
                player.onGround = true;
            } 
            // Collision from bottom (player hits head)
            else if (player.velocity.y < 0 && playerTop - player.velocity.y >= landBottom) {
                player.pos.y = landBottom + player.length / 2;
                player.velocity.y = 0;
            }
            // Collision from left
            else if (player.velocity.x > 0 && playerRight - player.velocity.x <= landLeft) {
                player.pos.x = landLeft - player.width / 2;
                player.velocity.x = 0;
            }
            // Collision from right
            else if (player.velocity.x < 0 && playerLeft - player.velocity.x >= landRight) {
                player.pos.x = landRight + player.width / 2;
                player.velocity.x = 0;
            }
            return true;
        } else {
            //player.onGround = false; // not standing on this land
            return false;
        }
    }
    

}