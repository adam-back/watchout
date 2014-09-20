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

var checkCollision = function(player, enemies, callback) {
  return _.each(enemies, function(asteroid, index, list) {
    // var radiusSum;
    var separation;
    var xDiff;
    var yDiff;
    xDiff = parseFloat(asteroid[0] - player.attr('x'));
    yDiff = parseFloat(asteroid[1] - player.attr('y'));
    separation = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
    if (separation < 96) { //if difference is less than player width + enemy width
      return callback();
    }
  });
};

var onCollision = function() {
  updateHighScore();
  d3.select('body').select('.current').select('span')
    .text('0');
};

var score = function(currentScore) {
  var num = +currentScore;
  return ++num;
};

var updateHighScore = function() {
  var currentVal = d3.select('body').select('.current').select('span').text();

  var highScore = d3.select('body').select('.high').select('span').text();

  if(+currentVal > +highScore) {
    d3.select('body').select('.high').select('span')
    .text(+currentVal);
  }
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
  var newLocs = asteroidField(10)
  update(newLocs);
  // check for collisions
  checkCollision(d3.select('body').select("svg").select('.adam'), newLocs, onCollision);
}, 1000);

setInterval(function() {
  var scoreFromDOM = d3.select('body').select('.current').select('span')
    .text();
  var updatedScore = score(scoreFromDOM);
  d3.select('body').select('.current').select('span')
    .text(updatedScore);;
}, 80);




