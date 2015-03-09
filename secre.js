var parseSecres = function (level, tilemap, secreLayer, phones, scoreboard) {
    var secres = game.add.group();
    secres.phoneCooldown = 0;

    secres.lookPhone = function () {
        this.phoneCooldown--;

        if (this.phoneCooldown === 0) {
            phones.forEach( function (phone) {
                phone.attended = false;
                phone.alpha = 1;
            });
        }

    };

    tilemap.createFromTiles(1, -1, 'secre1',
                            secreLayer, secres);

    var update = function () {
        game.physics.arcade.collide(this, tilemap.floor);
        this.answerCooldown--;

        if (isPhoneRinging() && this.answerCooldown <= 0) {
            this.scale.set(generic.getXDirection(this, this.phone), 1);

            if (Math.abs(this.x - this.phone.x) <= 32) {
                secres.phoneCooldown = 500;
                this.phone.attended = true;
                this.phone.alpha = .5;
                this.isAnswering = true;
                this.answertimer = this.answerDelay;
                scoreboard.winMoney(100);
            } else {
                this.body.velocity.x = this.scale.x * this.speed;
            }

        } else {
            if (this.walking.current <= 0) {
                this.walking.current = randomBetween(this.walking.max,
                                                     this.walking.min);
                this.direction = randomBetween(-1,1);
                if (this.direction !== 0) {
                    this.scale.set(this.direction, 1);
                }

                this.body.velocity.x = this.direction * this.speed;
            }
            this.walking.current--;
        }

        if (this.body.velocity.x !== 0) {
            this.animations.play('walk');
        } else {
            this.animations.play('stand');
        }
    };

    var isPhoneRinging = function () {
        var ringing = true;

        phones.forEach( function (phone) {
            if (!phone.isRinging() || phone.attended)
                ringing = false;
        });

        return ringing;
    };

    secres.isPhoneRinging = isPhoneRinging;

    secres.forEach( function (secre) {
        // jhtan! everything you do to the "secre" here, will happen to all the secres
        // in the secres phaser group. The update function is above....
        // defining too many update functions will make the game laggy
        generic.silentlySetAnchor(secre);
        secre.isWalking = true;
        secre.answerCooldown = 0;
        secre.speed = 20;
        secre.answerDelay = 300;
        secre.answertimer = 0;

        secre.answer = {
            max: 800,
            min: 500
        };

        secre.walking = {
            max: 50,
            min: 10,
            current: 10
        };

        secre.iddle = {
            max: 500,
            min: 300,
            current: 100
        };

        game.physics.arcade.enable(secre);
        secre.update = update;

        secre.animations.add('walk', [0,1,2,1], 4, true);
        secre.animations.add('stand', [1]);
        secre.animations.play('stand');

        // giving to each secre a phone
        phones.forEach( function (phone) {
            if (phone.x > level.xPartition &&
                Math.abs(secre.y - phone.y) <= 80) {
                secre.phone = phone;
            }
        });
    });

    return secres;
};
