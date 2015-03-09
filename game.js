var lvl1 = (function () {
    var xPartition = 320;

    var preload = function () {
        // tilemap
        this.xPartition = xPartition;
        game.load.tilemap('map', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('floor', 'assets/floor.png');
        game.load.image('tileset', 'assets/tileset.png');
        game.load.image('wall', 'assets/wall.png');

        // furniture
        game.load.spritesheet('door', 'assets/door.png', 48, 80);
        game.load.spritesheet('phone', 'assets/phone.png', 32, 48);
        game.load.spritesheet('atm', 'assets/atm.png', 48, 80);

        // ppj
        game.load.spritesheet('cracker', 'assets/cracker.png', 48, 96);
        game.load.spritesheet('sysadmin', 'assets/sysadmin.png', 48, 96);
        game.load.spritesheet('secre0', 'assets/ingenuous.png', 48, 96);
        game.load.spritesheet('secre1', 'assets/ingenuous2.png', 48, 96);
        game.load.image('pear', 'assets/pear.png');

        // removing blury images
        game.stage.smoothed = false;
    };

    var create = function () {
        // Background color.
        game.stage.backgroundColor = '#eee';

        // Physics.
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Sprites creation
        this.tilemap = map(this, xPartition);
        this.cracker = cracker(this);
        this.cursor = cursor();

        // this is a horrible patch: do not remove it, unless
        // you wanna fix cracker's overlapDoor conflict
        this.cracker.cursor = this.cursor;

        // creating doors
        this.doors = this.tilemap.parseDoors();
        // creating phones
        this.phones = parsePhones(this, this.tilemap, this.tilemap.phone);
        // creating sysadmins
        this.sysadmins = parseSysadmins(this, this.tilemap, this.tilemap.sysadmin,
                                        this.phones);
        // creating atms
        this.atms = parseAtms(this, this.tilemap, this.tilemap.atm);
        // scoreboard
        this.scoreboard = scoreboard(this.phones);
        // creating secres
        this.secres = parseSecres(this, this.tilemap, this.tilemap.secre, this.phones, this.scoreboard);

        this.spawner = new spawner(this);


        // bringing to top things (below this line)
        this.cracker.bringToTop();
        this.sysadmins.forEach( function (sysadmin) {
            sysadmin.bringToTop();
        });
        this.secres.forEach( function (secre) {
            secre.bringToTop();
        });
    };

    var update = function () {
        this.spawner.update();
        // sysadmin fixes the atm's
        game.physics.arcade.overlap(this.atms, this.sysadmins,
                                    function (atm, sysadmin) {
                                        atm.animations.play('ok');
                                    });
        this.secres.lookPhone();
    };

    // check the cracker.js file! the overlapDoor function ;)

    return {
        create : create,
        preload : preload,
        update : update
    };
})();

var game = new Phaser.Game(800, 640, Phaser.AUTO, 'game');
game.state.add('lvl1', lvl1);
game.state.start('lvl1');

// Global variables
window.firstAtmCracked = false;
window.firstPhishing = false;
