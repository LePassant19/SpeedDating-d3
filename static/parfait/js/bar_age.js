function bar_age(item){
var data3 = [{"wave":1,"m_age":25.2},{"wave":2,"m_age":25.4375},{"wave":3,"m_age":24.6},{"wave":4,"m_age":26.9444444444},{"wave":5,"m_age":20.7777777778},{"wave":6,"m_age":30.4},{"wave":7,"m_age":26.125},{"wave":8,"m_age":25.9},{"wave":9,"m_age":27.6},{"wave":10,"m_age":28.3333333333},{"wave":11,"m_age":26.2380952381},{"wave":12,"m_age":28.3571428571},{"wave":13,"m_age":26.5714285714},{"wave":14,"m_age":27.5},{"wave":15,"m_age":27.1052631579},{"wave":16,"m_age":26.75},{"wave":17,"m_age":25.9285714286},{"wave":18,"m_age":28.6666666667},{"wave":19,"m_age":28.2666666667},{"wave":20,"m_age":26.4285714286},{"wave":21,"m_age":25.9090909091}]
var data4 = [{"wave":1,"m_age":23.6},{"wave":2,"m_age":24.4210526316},{"wave":3,"m_age":25.25},{"wave":4,"m_age":26.8333333333},{"wave":5,"m_age":20.4444444444},{"wave":6,"m_age":25.0},{"wave":7,"m_age":27.9375},{"wave":8,"m_age":25.9},{"wave":9,"m_age":25.6},{"wave":10,"m_age":27.2222222222},{"wave":11,"m_age":26.0},{"wave":12,"m_age":27.4285714286},{"wave":13,"m_age":29.2},{"wave":14,"m_age":27.0526315789},{"wave":15,"m_age":26.7777777778},{"wave":16,"m_age":25.6666666667},{"wave":17,"m_age":25.4},{"wave":18,"m_age":31.6666666667},{"wave":19,"m_age":26.9333333333},{"wave":20,"m_age":24.8333333333},{"wave":21,"m_age":25.0952380952}]
// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var body=d3.select(item)
body.select('svg').remove()
// append the svg object to the body of the page
var svg_age = body
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// 1. Create the button
  var button = document.createElement("button");
  button.innerHTML = "Men";
  // 2. Append somewhere
  var body = document.getElementById("graphDiv2");
  body.appendChild(button);
  
  button.addEventListener ("click", function() {
    update2(data3);
  });
  
  // 1. Create the button
  var button = document.createElement("button");
  button.innerHTML = "Women";
  // 2. Append somewhere
  var body = document.getElementById("graphDiv2");
  body.appendChild(button);
  
  button.addEventListener ("click", function() {
    update2(data4);
  });
// X axis
var x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data3.map(function(d) { return d.wave; }))
  .padding(0.2);
svg_age.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))

 svg_age.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .text("Wave");
// Add Y axis
var y = d3.scaleLinear()
  .domain([0, 50])
  .range([ height, 0]);
svg_age.append("g")
  .attr("class", "myYaxis")
  .call(d3.axisLeft(y));

// text label for the x axis
svg_age.append("text")             
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Age moyen");


// A function that create / update the plot for a given variable:
function update2(data) {

  var u2 = svg_age.selectAll("rect")
    .data(data)

  u2
    .enter()
    .append("rect")
    .merge(u2)
    .transition()
    .duration(1000)
      .attr("x", function(d) { return x(d.wave); })
      .attr("y", function(d) { return y(d.m_age); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.m_age); })
      .attr("fill", "#69b3a2")
      
}

// Initialize the plot with the first dataset
update2(data3)
	
	
}

