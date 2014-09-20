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
  tuple[0] = Math.floor(Math.random() * 650);
  tuple[1] = Math.floor(Math.random() * 350);
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


