var scoreboard = function (phones) {
    var style = { font: '15px Monospace', fill: '#000', align: 'left' };
    var text = game.add.text(18, 18, '', style);
    text.money = 0;
    text.data = 0;

    text.update = function () {
        this.text = 'DINERO: ' + Math.round(this.money) +
            '\nDATOS:  ' + this.data;
    };

    text.winMoney = function (qty) {
        this.money += qty;
    };

    text.winData = function (qty) {
        this.data += qty;
    };

    return text;
};
