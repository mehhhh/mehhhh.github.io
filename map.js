var map = function (level, xPartition) {
    // returns the map, which is a phaser's tilemap.
    var tilemap = game.add.tilemap('map', 16, 16, 800, 640);

    tilemap.xPartition = xPartition;

    tilemap.addTilesetImage('tileset');
    tilemap.addTilesetImage('floor');
    tilemap.addTilesetImage('wall');

    // "promise of a door" layer
    tilemap.door = tilemap.createLayer('door');
    // "promise of a phone" layer
    tilemap.phone = tilemap.createLayer('phone');
    // "promise of sysadmins" layer
    tilemap.sysadmin = tilemap.createLayer('sysadmin');
    // "promise of atm" layer
    tilemap.atm = tilemap.createLayer('atm');
    // "promise of secre" layer
    tilemap.secre = tilemap.createLayer('secre');

    // background layer
    tilemap.background = tilemap.createLayer('background');

    // collision layer
    tilemap.floor = tilemap.createLayer('collide');
    game.physics.arcade.enable(tilemap.floor);
    tilemap.setCollisionByExclusion([], true, tilemap.floor);

    tilemap.parseDoors = function () {
        var doors = game.add.group(),
            i, j, distance;
        this.createFromTiles(1, -1, 'door', this.door, doors);

        var zindex = 0;
        var doorVec = [];
        doors.forEach( function (door) {
            // jhtan! inside this function, you can play with each door of the
            // doors group.
            doorVec.push(door);
            game.physics.arcade.enable(door);
            door.body.immovable = true;
            door.z = zindex++;

            // I need the anchor at the center, because it looks awesome
            // on the rotation effect
            generic.silentlySetAnchor(door);

            door.isOnTheSameRoomThan = function (anotherDoor) {
                return (this.x < xPartition && anotherDoor.x < xPartition) ||
                    (this.x > xPartition && anotherDoor.x > xPartition);
            };

            // check genericSpriteFunctions.js if you are confused about this.
            generic.shake.init(door);
            door.update = function () {
                this.isShaking = false;
                game.physics.arcade.overlap(this, level.cracker,
                                            function (door, cracker) {
                                                    generic.shake.shake(door);
                                            });
                if (!this.isShaking) {
                    generic.shake.stop(this);
                }
            };
        });

        // setting links with bruteforce, because the hell with it!
        for (i of doorVec) {
            for (j of doorVec) {
                if (i !== j && i.isOnTheSameRoomThan(j)) {
                    yDistance = i.y - j.y;
                    if (Math.abs(yDistance) <= 176) { // this stinks
                        if (yDistance < 0) {
                            i.down = j;
                            j.up = i;
                        } else {
                            i.up = j;
                            j.down = i;
                        }
                    }
                }
            }
        }

        return doors;
    };

    return tilemap
};
