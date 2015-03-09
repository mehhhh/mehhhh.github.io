var parsePhones = function (level, tilemap, phoneLayer) {
    var phones = game.add.group();
    tilemap.createFromTiles(1, -1, 'phone', phoneLayer, phones);

    var update = function () {
        this.isShaking = false;
        game.physics.arcade.overlap(this, level.cracker,
                                    function (phone, cracker) {
                                        generic.shake.shake(phone);
                                    });

        if (!this.isShaking) {
            generic.shake.stop(this);
        } else if (level.cursor.action.isDown) {
            if(!window.firstPhishing) {
                window.firstPhishing = true;
                game.paused = true;
                window.showPhishingModal();
            }

            phones.forEach( function (phone) {
                phone.animations.play('ring');
            });
            generic.shake.stop(this);
        } else if (this.isRinging()) {
            phones.forEach( function (phone) {
                phone.animations.play('stand');
            });
        }
    };

    var isRinging = function () {
        return this.animations.currentAnim.name === 'ring';
    };

    phones.forEach( function (phone) {
        phone.animations.add('ring', [1,2], 8, true);
        phone.animations.add('stand', [0]);
        game.physics.arcade.enable(phone);
        generic.silentlySetAnchor(phone);

        generic.shake.init(phone);
        phone.shaking.delay = 20;

        phone.update = update;
        phone.isRinging = isRinging;
    });

    return phones;
};
