// start slingin' some d3 here.
var update = function(data) {
  d3.select("svg").select("image.asteroid")
    .data(data)
    .enter()
    .append("image")
    .style("height", function() {
      return "50";
    })
    .style("width", function() {
      return "50";
    })
    .attr("class", "asteroid")
    .style("x", function(d) {
      return d[0];
    })
    .style("y", function(d) {
      return d[1];
    })
}

var asteroidLocation = function() { //generates one enemy location
  var tuple = []
  tuple[0] = Math.floor(Math.random() * 700);
  tuple[1] = Math.floor(Math.random() * 700);
  return tuple;
}

var asteroidField = function(n) { //generates locations for each enemy in fleet
  var counter = 0;
  var locData = [];
  while (counter <= n) {
    locData.push(asteroidLocation());
    counter++
  }
  return locData;
}

update(asteroidField(10));

