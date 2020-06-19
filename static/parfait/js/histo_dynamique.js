function histo_dynamique(item) {
  // set the dimensions and margins of the graph
  var margin = { top: 100, right: 30, bottom: 30, left: 40 }, //top: 10
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg_dyna = d3.select(item)
    .append("svg")
    .attr("id", "svg_dyna")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");


  // get the data
  d3.csv("static/parfait/data/SpeedDating.csv", function (data) {

    // X axis: scale and draw:
    var x = d3.scaleLinear()
      .domain([1, 7])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
      .range([0, width]);
    svg_dyna.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // text label for the x axis
    svg_dyna.append("text")
      .attr("transform",
        "translate(" + (width / 2) + " ," +
        (height + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .text("Race code of partner");

    // Y axis: initialization
    var y = d3.scaleLinear()
      .range([height, 0]);
    var yAxis = svg_dyna.append("g")

    // A function that builds the graph for a specific value of bin
    function update(nBin) {

      // set the parameters for the histogram
      var histogram = d3.histogram()
        .value(function (d) { return +d['race_o']; })   // I need to give the vector of value
        .domain(x.domain())  // then the domain of the graphic
        .thresholds(x.ticks(10)); // then the numbers of bins

      // And apply this function to data to get the bins
      nBin_string = nBin.toString();
      var bins = histogram(data.filter(function (d) { return d.race === nBin_string }));
      //var bins = histogram(data);

      // Y axis: update now that we know the domain
      y.domain([0, d3.max(bins, function (d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
      yAxis
        .transition()
        .duration(1000)
        .call(d3.axisLeft(y));

      // text label for the x axis
      svg_dyna.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Count");

      // Join the rect with the bins data
      var u = svg_dyna.selectAll("rect")
        .data(bins)

      // Manage the existing bars and eventually the new ones:
      u.enter()
        .append("rect") // Add a new rect for each new elements
        .merge(u) // get the already existing elements as well
        .transition() // and apply changes to all of them
        .duration(1000)
        .attr("x", 1)
        .attr("transform", function (d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
        .attr("width", function (d) { return x(d.x1) - x(d.x0) - 1; })
        .attr("height", function (d) { return height - y(d.length); })
        .style("fill", "#69b3a2")


      // If less bar in the new histogram, I delete the ones not in use anymore
      u.exit()
        .remove()

    }

    //d3.select("#svg_dyna").append("div").text("<center>Test</center>");
    //d3.select("#svg_dyna").append("div").html("<label>Choose race</label>").html("<input type='number' min='1' max='6' step='1' value='2' id='nBin'>");


    // Initialize with 20 bins
    update(2)


    // Listen to the button -> update if user change it
    d3.select("#nBin").on("input", function () {
      update(transform(this.value));
    });

   function transform(d){
    if (d == "Black/African"){
      var val="1"
      return +val
    }

    if (d == "European/Caucasian"){
      var val="2"

      return +val

    }

    if (d == "Latino/Hispanic"){
      var val="3"

      return +val
    }

    if (d == "Asian/Pacific"){
       var val="4"

      return +val

    }

    if (d == "Native American"){
       var val="5"

      return +val

    }

    if (d == "Other"){
       var val="6"

      return +val

    }

   }

    svg_dyna.append("text").attr("x", 250).attr("y", 30).text("Black/African=1").style("font-size", "15px").attr("alignment-baseline","middle");
    svg_dyna.append("text").attr("x", 250).attr("y", 50).text("European/Caucasian=2").style("font-size", "15px").attr("alignment-baseline","middle");
    svg_dyna.append("text").attr("x", 250).attr("y", 70).text("Latino/Hispanic=3").style("font-size", "15px").attr("alignment-baseline","middle");
    svg_dyna.append("text").attr("x", 250).attr("y", 90).text("Asian/Pacific=4").style("font-size", "15px").attr("alignment-baseline","middle");
    svg_dyna.append("text").attr("x", 250).attr("y", 110).text("Native American=5").style("font-size", "15px").attr("alignment-baseline","middle");
    svg_dyna.append("text").attr("x", 250).attr("y", 130).text("Other=6").style("font-size", "15px").attr("alignment-baseline","middle");

  });
}
