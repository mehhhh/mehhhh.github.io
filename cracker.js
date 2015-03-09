// returns a cracker (who is a sprite).
var cracker = function (level) {
    var sprite = game.add.sprite(60, 416, 'cracker');

    sprite.anchor.set(0.5);
    sprite.speed = 150;
    sprite.animations.add('walk', [0,1,1,2,3,4,3,3,2,1], 9, true);
    sprite.animations.add('stand', [2]);
    sprite.animations.play('walk');
    game.physics.arcade.enable(sprite);
    sprite.body.collideWorldBounds = true;

    // controls how much time will wait until teletransporting again
    sprite.doorCooldown = 0;

    // keeps the sprite visualy updated in an accurately manner
    sprite.visualUpdate = function () {
        if (this.isWalking()) {
            this.animations.play('walk');
        } else {
            this.animations.play('stand');
        }
    };

    // updates the motion of the cracker.
    sprite.motion = function () {
        // Initial values.
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;

        // Game keys.
        if (!level.cursor.action.isDown) {
            if (level.cursor.isDown('right')) {
                this.body.velocity.x += this.speed;
                this.scale.set(1,1);
            }
            if ( level.cursor.isDown('left')) {
                this.body.velocity.x -= this.speed;
                this.scale.set(-1,1);
            }
            if ( level.cursor.isDown('down')) {
                this.body.velocity.y += this.speed;
            }
            if ( level.cursor.isDown('up')) {
                this.body.velocity.y -= this.speed;
            }
        }
    };

    sprite.isWalking = function () {
        var directions = ['up', 'down', 'left', 'right'],
            direction;

        if (level.cursor.action.isDown) return false;

        for (direction of directions) {
            if (level.cursor.isDown(direction)) {
                return true;
            }
        }

        return false;
    };

    var overlapDoor = function (cracker, door) {
        var destination = null;

        if (cracker.doorCooldown <= 0) {
            if (cracker.cursor.isDown('up')) {
                destination = door.up;
            } else if (cracker.cursor.isDown('down')) {
                destination = door.down;
            }
        }

        if (destination) {
            cracker.doorCooldown = 20;
            cracker.x = destination.x;
            cracker.y = destination.y;
        }
    };

    sprite.collisions = function () {
        game.physics.arcade.collide(this, level.tilemap.floor);
        game.physics.arcade.overlap(level.doors, this, overlapDoor);
    };

    // update is now a member of an sprite object. Phaser will automagically
    // call it on every update cycle.
    sprite.update = function () {
        this.doorCooldown--;
        this.visualUpdate();
        this.motion();
        this.collisions();
    };

    return sprite;
};
