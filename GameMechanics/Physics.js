class Physics {
    applyGravity(GameObject, gravityVector) {
        if (GameObject) {
            GameObject.acceleration.add(gravityVector);
        }
    }

    CheckCollision(player, land) {
        // Player edges
        let playerTop = player.pos.y - player.radius;
        let playerBottom = player.pos.y + player.radius;
        let playerLeft = player.pos.x - player.radius;
        let playerRight = player.pos.x + player.radius;
    
        // Land edges
        let landTop = land.getTopSurface(); // Use the top surface for accurate collision
        let landBottom = land.pos.y + land.thickness;
        let landLeft = land.pos.x;
        let landRight = land.pos.x + land.width;
    
        // Horizontal overlap
        let overlapX = playerRight > landLeft && playerLeft < landRight;
        // Vertical overlap
        let overlapY = playerBottom > landTop && playerTop < landBottom;
    
        if (overlapX && overlapY) {
            // Collision from top (player landing on platform)
            if (player.velocity.y > 0 && playerBottom - player.velocity.y <= landTop + 5) {
                player.pos.y = landTop - player.radius;
                player.velocity.y = 0;
                player.acceleration.y = 0;
                player.onGround = true;
                return true;
            } 
            // Collision from bottom (player hits head)
            else if (player.velocity.y < 0 && playerTop - player.velocity.y >= landBottom) {
                player.pos.y = landBottom + player.radius;
                player.velocity.y = 0;
            }
            // Collision from left
            else if (player.velocity.x > 0 && playerRight - player.velocity.x <= landLeft) {
                player.pos.x = landLeft - player.radius;
                player.velocity.x = 0;
            }
            // Collision from right
            else if (player.velocity.x < 0 && playerLeft - player.velocity.x >= landRight) {
                player.pos.x = landRight + player.radius;
                player.velocity.x = 0;
            }
            return true;
        } else {
            // Only set onGround to false if not standing on any land
            // This will be handled in the main loop
            return false;
        }
    }
    
    checkEnemyCollision(player, enemy) {
        // Check distance between player and enemy
        let distance = dist(player.pos.x, player.pos.y, enemy.pos.x, enemy.pos.y);
        return distance < (player.radius + enemy.size);
    }
    
    checkGhostCollision(player, ghost) {
        // Check distance between player and ghost
        let distance = dist(player.pos.x, player.pos.y, ghost.pos.x, ghost.pos.y);
        return distance < (player.radius + ghost.radius);
    }
}