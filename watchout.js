// start slingin' some d3 here.

d3.select("svg").select("circle.enemy")
  .data([cx,cy])
  .enter()
  .append("circle")
  .style("r", function() {
    return "25";
  })
  .style("fill", function() {
    return "red";
  })
  .attr("class", "enemy")
  .style("cx", function(d) {
    return d[0];
  })
  .style("cy", function(d) {
    return d[1];
  })

var randomEnemyLocation = function() {
  var tuple = []
  tuple[0] = Math.floor(Math.random() * 700);
  tuple[1] = Math.floor(Math.random() * 700);
  return tuple;
}


