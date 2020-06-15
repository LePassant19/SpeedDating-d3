// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#histo_race")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// get the data
d3.csv("data/SpeedDating.csv", function(data) {

  // X axis: scale and draw:
  var x = d3.scaleLinear()
      .domain([1,7])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
      .range([0, width]);
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
  // text label for the x axis
  svg.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .text("Race code");

  // set the parameters for the histogram
  var histogram = d3.histogram()
      .value(function(d) { return d.race; })   // I need to give the vector of value
      .domain(x.domain())  // then the domain of the graphic
      .thresholds(x.ticks(40)); // then the numbers of bins


  // And apply twice this function to data to get the bins.
  var bins1 = histogram(data.filter( function(d){return d.gender === "0"} ));
  var bins2 = histogram(data.filter( function(d){return d.gender === "1"} ));

  // Y axis: scale and draw:
  var y = d3.scaleLinear()
      .range([height, 0]);
      y.domain([0, d3.max(bins2, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
  svg.append("g")
      .call(d3.axisLeft(y));
  // text label for the x axis
  svg.append("text")             
      .attr("transform", "rotate(-90)")
      .attr("y", -6 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Occurrence");

  // append the bars for series 1
  svg.selectAll("rect")
      .data(bins1)
      .enter()
      .append("rect")
        .attr("x", 1)
        .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
        .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
        .attr("height", function(d) { return height - y(d.length); })
        .style("fill", "#69b3a2")
        .style("opacity", 0.6)

  // append the bars for series 2
  svg.selectAll("rect2")
      .data(bins2)
      .enter()
      .append("rect")
        .attr("x", 1)
        .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
        .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
        .attr("height", function(d) { return height - y(d.length); })
        .style("fill", "#404080")
        .style("opacity", 0.6)

  // Handmade legend
  svg.append("circle").attr("cx",300).attr("cy",30).attr("r", 6).style("fill", "#69b3a2")
  svg.append("circle").attr("cx",300).attr("cy",60).attr("r", 6).style("fill", "#404080")
  svg.append("text").attr("x", 320).attr("y", 30).text("Female").style("font-size", "15px").attr("alignment-baseline","middle")
  svg.append("text").attr("x", 320).attr("y", 60).text("Male").style("font-size", "15px").attr("alignment-baseline","middle")

  svg.append("text").attr("x", 300).attr("y", 90).text("Black/African=1").style("font-size", "15px").attr("alignment-baseline","middle")

});