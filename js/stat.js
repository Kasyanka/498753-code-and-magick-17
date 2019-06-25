'use strict';
(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP = 10;
  var FONT_GAP = 5;
  var BAR_WIDTH = 40;
  var FONT_Y = 220;
  var barHeight = CLOUD_WIDTH - GAP - FONT_Y - GAP;
  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };
  var getMaxElement = function (arr) {
    var maxElement = arr[0];
    for (var i = 0; i < arr.length; i++) {
      if (maxElement < arr[i]) {
        maxElement = arr[i];
      }
    }
    return maxElement;
  };

  window.renderStatistics = function (ctx, players, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.3)'); // тень
    renderCloud(ctx, CLOUD_X, CLOUD_Y, 'wheat'); // облако


    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    var maxTime = getMaxElement(times);

    for (var i = 0; i < players.length; i++) {
      if (players[i] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      } else {
        ctx.fillStyle = 'rgba(0, 0, ' + Math.round(Math.random() * 255) + ', 1)';
      }

      ctx.fillText(players[i], CLOUD_X + GAP + FONT_GAP + (GAP * 5 + BAR_WIDTH) * i, FONT_Y);
      ctx.fillRect(CLOUD_X + GAP + (GAP * 5 + BAR_WIDTH) * i, GAP + GAP + barHeight - barHeight * times[i] / maxTime, BAR_WIDTH, barHeight * times[i] / maxTime);
    }

    ctx.fillStyle = 'black';
    ctx.font = '16px PT Mono'; // текст
    ctx.fillText('Ура вы победили!', 110, 250);
    ctx.fillText(' Список результатов:', 110, 270);
  };
})();
