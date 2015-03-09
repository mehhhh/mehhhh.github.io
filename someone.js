var someone = function (level, x, y) {
    console.log('ding');
    var sprite = game.add.sprite(x, y, 'secre' + randomBetween(0,1));
    sprite.animations.add('walk', [0,1,2,1], 3, true);
    sprite.animations.play('walk');
    game.physics.arcade.enable(sprite);
    sprite.body.velocity.x = 50;

    sprite.update = function () {
        game.physics.arcade.overlap(level.atms, this, function (someone, atm) {
            console.log(atm.animations.currentAnim.name);
            if (atm.animations.currentAnim.name === 'cracked') {
                level.scoreboard.winMoney(0.1);
            }
        });
    };
};
