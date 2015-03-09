var parseSysadmins = function (level, tilemap, sysadminLayer, phones) {
    var sysadmins = game.add.group();
    sysadmins.speed = 50;
    tilemap.createFromTiles(1, -1, 'sysadmin', sysadminLayer, sysadmins);

    var update = function () {

        game.physics.arcade.overlap(this, phones, function (sysadmin, phone) {
            if (phone.isRinging()) {
                console.log('gameoveer');
                // JHTAN GAMEOVER NAO!!!!!!!!!
                window.showGameOverModal();
            }
        });

        if (this.phone && this.phone.isRinging()) {
            this.scale.set(generic.getXDirection(this, this.phone), 1);
            this.body.velocity.x = this.scale.x * sysadmins.speed;
            this.animations.play('walk');
        } else {
            // Patrol
            this.animations.play('walk');
            if(this.body.x > 510 && this.body.x < 515 && this.body.y === 32 && this.body.velocity.x < 0) {
                // Get off from the 3th to the 2th floor.
                this.body.y = 200;
                this.body.x = 350;
                this.scale.set(1, 1);
            } else if (this.body.x > 350 && this.body.x < 355 && this.body.y === 200 && this.body.velocity.x < 0) {
                // Get off from the 2th to the first floor.
                this.body.y = 350;
                this.body.x = 700;
                this.scale.set(1, -1);
                this.body.velocity.x = sysadmins.speed * -1;
            } else if (this.body.x > 735 && this.body.x < 740 && this.body.y === 350 && this.body.velocity.x > 0) {
                // Get off from the first floor to the basement.
                this.body.y = 490;
                this.body.x = 675;
                this.scale.set(1, 1);
                this.body.velocity.x = sysadmins.speed * -1;
            } else if (this.body.x > 670 && this.body.x < 675 && this.body.y === 490 && this.body.velocity.x > 0) {
                // Climb from the basement to the first floor.
                this.body.y = 355;
                this.body.x = 700;
                this.scale.set(1, -1);
                this.body.velocity.x = sysadmins.speed * -1;
            } else if (this.body.x > 735 && this.body.x < 740 && this.body.y === 355 && this.body.velocity.x > 0) {
                // Climb from the first floor to the 2th.
                this.body.y = 205;
                this.body.x = 350;
                this.scale.set(1, 1);
                this.body.velocity.x = sysadmins.speed;
            } else if (this.body.x > 350 && this.body.x < 355 && this.body.y === 205 && this.body.velocity.x < 0) {
                // Climb from the 2th floor to the first.
                this.body.y = 32;
                this.body.x = 505;
                this.scale.set(1, -1);
                this.body.velocity.x = sysadmins.speed * -1;
            } else if (this.body.x >= 750 || this.body.velocity.x < 0) {
                this.body.velocity.x = sysadmins.speed * -1;
                this.scale.set(-1, 1);

                if(this.body.x < 350) {
                    this.body.velocity.x = sysadmins.speed;
                    this.scale.set(1, 1);
                }
            } else {
                this.body.velocity.x = sysadmins.speed;
            }
        }
    };

    sysadmins.forEach( function (sysadmin) {
        sysadmin.animations.add('walk', [0,1,2,3,4,3,2,1], 8, true);
        sysadmin.animations.add('stand', [2]);
        game.physics.arcade.enable(sysadmin);
        sysadmin.update = update;
        generic.silentlySetAnchor(sysadmin);

        // giving to each sysadmin it's phone
        phones.forEach( function (phone) {
            if (phone.x > level.xPartition &&
                Math.abs(sysadmin.y - phone.y) <= 80) {
                sysadmin.phone = phone;
            }
        });

    });

    return sysadmins;
};
