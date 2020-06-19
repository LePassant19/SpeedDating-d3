function pie_chart(item){
	var margin = {top: 10, right: 30, bottom: 30, left: 60},
      width = 450,
    height = 450;


// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
//var radius = Math.min(width, height) / 2 - margin;
var radius = Math.min(width, height) / 2

// create 2 data_set;
var data5 ={"Seemed like a fun night out":1739,"To meet new people":1365,"To get a date":434,"Looking for a serious relationship":172,"To say I did it":234,"Other":230};
var data6 ={"Seemed like a fun night out":1687,"To meet new people":1647,"To get a date":197,"Looking for a serious relationship":129,"To say I did it":276,"Other":189};

// append the svg object to the div called 'my_dataviz'
var svg_motif = d3.select(item)
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// 1. Create the button
  var button = document.createElement("button");
  button.innerHTML = "Men";
  // 2. Append somewhere
  var body = document.getElementById("graphDiv2");
  body.appendChild(button);
  
  button.addEventListener ("click", function() {
    update3(data5);
  });
  
  // 1. Create the button
  var button = document.createElement("button");
  button.innerHTML = "Women";
  // 2. Append somewhere
  var body = document.getElementById("graphDiv2");
  body.appendChild(button);
  
  button.addEventListener ("click", function() {
    update3(data6);
  });
// set the color scale
var color = d3.scaleOrdinal()
  .domain(data5)
  .range(d3.schemeSet2);



// A function that create / update the plot for a given variable:
function update3(data) {

  // Compute the position of each group on the pie:
  var pie = d3.pie()
    .value(function(d) {return d.value; })
    .sort(function(a, b) { return d3.ascending(a.key, b.key);} ) ;// This make sure that group order remains the same in the pie chart
  var data_ready = pie(d3.entries(data));

  // map to data
  var u = svg_motif.selectAll("path")
    .data(data_ready);

  // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
  u
    .enter()
    .append('path')
    .merge(u)
    .transition()
    .duration(1000)
    .attr('d', d3.arc()
      .innerRadius(0)
      .outerRadius(radius)
    )
    .attr('fill', function(d){ return(color(d.data.key)) })
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .style("opacity", 1);


  u
    .enter()
    .append('text')
    .transition()
    .text(function(d){ return d.data.key})
    .attr("transform", function(d) { return "translate(" +  d3.arc().innerRadius(0).outerRadius(radius).centroid(d) + ")rotate(-80)";  })
    .style("text-anchor", "middle")
    .style("font-size", 17);
  // remove the group that is not present anymore
  u
    .exit()
    .remove()

  

}

// Initialize the plot with the first dataset
update3(data5);
}


