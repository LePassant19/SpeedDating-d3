function bar_race(item){
var data1 = [{"race":"Asian","count":937},{"race":"European","count":2520},{"race":"Other","count":277},{"race":"Latino","count":261},{"race":"Black","count":179},{"race":null,"count":null}]
var data2 = [{"race":"Asian","count":1045},{"race":"European","count":2207},{"race":"Other","count":245},{"race":"Latino","count":403},{"race":"Black","count":241},{"race":null,"count":null}]
// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var body=d3.select(item)
body.select('svg').remove()

// 1. Create the button
// var button = document.createElement("button");
// button.innerHTML = "Men";
// var body_button = document.item.appendChild(button);
// button.addEventListener ("click", function() {
  // update1(data1);
// });

// var rect = d3.select(item).append("button")
	// .attr("width", 10)
	// .attr("height", 10); 

// rect.on('click', function() {
  // console.log('i was clicked');
// });
	
// var button = document.createElement("button");
// button.innerHTML = "Women";
// var body_button = document.body.appendChild(button);
// button.addEventListener ("click", function() {
  // update1(data2);
// });

// append the svg object to the body of the page
var svg_race =body
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
    update1(data1);
  });
  
  // 1. Create the button
  var button = document.createElement("button");
  button.innerHTML = "Women";
  // 2. Append somewhere
  var body = document.getElementById("graphDiv2");
  body.appendChild(button);
  
  button.addEventListener ("click", function() {
    update1(data2);
  });

// X axis
var x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data1.map(function(d) { return d.race; }))
  .padding(0.2);
svg_race.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))

 svg_race.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .text("Race");
// Add Y axis
var y = d3.scaleLinear()
  .domain([0, 3000])
  .range([ height, 0]);
svg_race.append("g")
  .attr("class", "myYaxis")
  .call(d3.axisLeft(y));

// text label for the x axis
svg_race.append("text")             
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Count");


// A function that create / update the plot for a given variable:
function update1(data) {

  var u1 = svg_race.selectAll("rect")
    .data(data)

  u1
    .enter()
    .append("rect")
    .merge(u1)
    .transition()
    .duration(1000)
      .attr("x", function(d) { return x(d.race); })
      .attr("y", function(d) { return y(d.count); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.count); })
      .attr("fill", "#69b3a2")

}

// Initialize the plot with the first dataset
update1(data1)
	
}

