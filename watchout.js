// start slingin' some d3 here.
var update = function(data) {
  var board = d3.select("body").select("svg").selectAll("image.asteroid")
    .data(data)

    board.enter().append("image")
    .attr("height", function() {
      return "50";
    })
    .attr("width", function() {
      return "50";
    })
    .attr("class", "asteroid")
    .attr("xlink:href", function() {
      return "19-kitten.png";
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
    .attr("class", "asteroid")
    .attr("xlink:href", function() {
      return "asteroid.png";
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
          return "26";
        })
        .attr("width", function() {
          return "23";
        })
        .attr("x", function(d) {
          return "350";
        })
      .attr("y", function(d) {
          return "350";
        })
        .attr("class", "draggable")
        .attr("xlink:href", function() {
          return "19-kitten.png";
        })
};

var asteroidLocation = function() { //generates one enemy location
  var tuple = []
  tuple[0] = Math.floor(Math.random() * 675);
  tuple[1] = Math.floor(Math.random() * 675);
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
update(asteroidField(20)); // sets up inital state

setInterval(function() {
  update(asteroidField(20));
}, 1000);


