var randomBetween = function (max, min) {
    return Math.round(Math.random() * (max - min)) + min;
};

// 528 y
var spawner = function (level, direction, x, y) {
    this.level = level
    this.x = x;
    this.y = y;
    this.direction = direction;

    this.max = 400;
    this.min = 100;

    this.setCooldown();
    this.cooldown = 10;
};

spawner.prototype.setCooldown = function () {
    this.cooldown = randomBetween(this.max, this.min);
};

spawner.prototype.update = function () {
    this.cooldown--;

    if (this.cooldown <= 0) {
        this.spawn();
        this.setCooldown();
    }
};

spawner.prototype.spawn = function () {
    someone(this.level, 16, 528);
};
