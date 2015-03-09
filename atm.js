var parseAtms = function (level, tilemap, atmLayer) {
    var atms = game.add.group();
    tilemap.createFromTiles(1, -1, 'atm', atmLayer, atms);

    var update = function () {
        this.isShaking = false;
        game.physics.arcade.overlap(this, level.cracker,
                                    function (atm, cracker) {
                                        generic.shake.shake(atm);
                                    });

        if (!this.isShaking) {
            generic.shake.stop(this);
        } else {
            // the code here will be executed iif the cracker is close to the
            // atm.
            if (level.cursor.action.isDown) {
                this.animations.play('cracked');
                if(!window.firstAtmCracked) {
                    window.firstAtmCracked = true;
                    game.paused = true;
                    window.showAtmModal();
                }
            }
        }
    };

    atms.forEach( function (atm) {
        // jhtan! everything you do to the "atm" here, will happen to all the atms
        // in the atms phaser group. The update function is above....
        // defining too many update functions will make the game laggy
        game.physics.arcade.enable(atm);
        atm.update = update;

        // there is an animation for a cracked ATM!!!!!
        atm.animations.add('cracked', [1]);
        atm.animations.add('ok', [0]);
        atm.animations.play('ok');
        generic.silentlySetAnchor(atm);

        generic.shake.init(atm);
    });

    return atms;
};
