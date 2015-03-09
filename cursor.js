// return a phaser's keyboard listener, listening to cursor keys and wasd
var cursor = function () {
    var keys = game.input.keyboard.createCursorKeys();

    keys.action = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    keys.wasd = {};
    keys.wasd.up = game.input.keyboard.addKey(Phaser.Keyboard.W);
    keys.wasd.left = game.input.keyboard.addKey(Phaser.Keyboard.A);
    keys.wasd.down = game.input.keyboard.addKey(Phaser.Keyboard.S);
    keys.wasd.right = game.input.keyboard.addKey(Phaser.Keyboard.D);

    keys.isDown = function (keyName) {
        return this[keyName].isDown || this.wasd[keyName].isDown;
    }

    return keys;
};
