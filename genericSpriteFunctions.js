var generic = (function () {
    var shake = {
        init: function (sprite) {
            sprite.shaking = {
                delay: 10,
                cooldown: 20,
                direction: -1,
                isShaking: false
            };
        },

        shake: function (sprite) {
            sprite.isShaking = true;
            if (sprite.shaking.cooldown++ >= sprite.shaking.delay) {
                // math magic to alternate between -1 and 1
                // i have tested it... it DO work.
                sprite.shaking.direction -= 2*sprite.shaking.direction;

                sprite.shaking.cooldown = 0;
                sprite.body.angularVelocity = sprite.shaking.direction * 30;
            }
        },

        stop: function (sprite) {
            sprite.isShaking = false;
            sprite.angularVelocity = sprite.rotation = 0;
        }
    };

    // sets the anchor to center, without changing position
    var silentlySetAnchor = function (sprite) {
        sprite.x += sprite.width * .5;
        sprite.y += sprite.height * .5;
        sprite.anchor.set(.5,.5);
    };

    var getXDirection = function (protagonist, object) {
        if (protagonist.x - object.x > 0) {
            return -1;
        }
        return 1;
    };

    return {
        shake : shake,
        silentlySetAnchor : silentlySetAnchor,
        getXDirection : getXDirection
    };
})();
