// start slingin' some d3 here.
var update = function(data) {
  var board = d3.select("body").select("svg").selectAll("image.pira")
    .data(data)

    board.enter().append("image")
    .attr("height", function() {
      return "50";
    })
    .attr("width", function() {
      return "50";
    })
    .attr("class", "pira")
    .attr("xlink:href", function() {
      return "pira.png";
    })
    //transition
    .transition()
      .duration(1000)
      .attr("x", function(d) {
        return d[0];
      })
      .attr("y", function(d) {
        return d[1];
      });

    board.attr("height", function() {
      return "50";
    })
    .attr("width", function() {
      return "50";
    })
    .attr("class", "pira")
    .attr("xlink:href", function() {
      return "pira.png";
    })
    .transition()
      .duration(1000)
      .attr("x", function(d) {
        return d[0];
      })
      .attr("y", function(d) {
        return d[1];
      });

};

var createPlayer = function() {
    d3.select('body').select('svg')
      .append("image")
        .attr("height", function() {
          return "52";
        })
        .attr("width", function() {
          return "46";
        })
        .attr("x", function(d) {
          return "350";
        })
      .attr("y", function(d) {
          return "191";
        })
        .attr("class", "adam")
        .attr("xlink:href", function() {
          return "adam.png";
        })
};

var asteroidLocation = function() { //generates one enemy location
  var tuple = []
  tuple[0] = Math.floor(Math.random() * 680);
  tuple[1] = Math.floor(Math.random() * 383);
  return tuple;
};

var asteroidField = function(n) { //generates locations for each enemy in fleet
  var counter = 0;
  var locData = [];
  while (counter < n) {
    locData.push(asteroidLocation());
    counter++;
  }
  return locData;
};

  //update the board

var checkCollision = function(enemy, callback) {
  return _(players).each(function(player) {
    var radiusSum, separation, xDiff, yDiff;
    radiusSum = parseFloat(enemy.attr('width')) + player.r;
    xDiff = parseFloat(enemy.attr('x')) - player.x;
    yDiff = parseFloat(enemy.attr('y')) - player.y;
    separation = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
    if (separation < radiusSum) {
      return callback();
    }
  });
};

var onCollision = function() {
  updateBestScore();
  gameStats.score = 0;
  return updateScore();
};

var score = function(currentScore) {
  var num = +currentScore;
  return ++num;
};
//if collision call on span
createPlayer();

var drag = d3.behavior.drag()

  .on('drag', function(d) {
    if(d3.event.x > 0 && d3.event.x < 650) {
      d3.select(this).attr("x" , d3.event.x);
    }

    if(d3.event.y > 0 && d3.event.y < 350) {
      d3.select(this).attr("y" ,d3.event.y);
    }
  });

d3.select("body").select("svg").select(".adam").call(drag);

update(asteroidField(10)); // sets up inital state

setInterval(function() {
  update(asteroidField(10));
}, 1000);

setInterval(function() {
  var scoreFromDOM = d3.select('body').select('.current').select('span')
    .text();
  var updatedScore = score(scoreFromDOM);
  d3.select('body').select('.current').select('span')
    .text(updatedScore);;
}, 1500);




