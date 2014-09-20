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
    .attr("x", function(d) {
      return d[0];
    })
    .attr("y", function(d) {
      return d[1];
    })
    .attr("xlink:href", function() {
      return "asteroid.png";
    })

    board.attr("height", function() {
      return "50";
    })
    .attr("width", function() {
      return "50";
    })
    .attr("class", "asteroid")
    .attr("x", function(d) {
      return d[0];
    })
    .attr("y", function(d) {
      return d[1];
    })
    .attr("xlink:href", function() {
      return "asteroid.png";
    })
    //transition
};

var asteroidLocation = function() { //generates one enemy location
  var tuple = []
  tuple[0] = Math.floor(Math.random() * 700);
  tuple[1] = Math.floor(Math.random() * 700);
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

update(asteroidField(20)); // sets up inital state

setInterval(function() {
  update(asteroidField(20));
}, 1000);


