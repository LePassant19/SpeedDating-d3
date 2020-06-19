var treeData =
  {
      "name": "People",
      "children": [
		{
			"name":"Profile",
			"children":[
				{
				  "name": "Race",
          "action": "bar_race.js"
          //"action": "histo_dynamique.js"
				},
				{
				  "name": "Qualities",
				  "action": "plots.js"
				},
				{
				  "name": "Age",
				  "action": "bar_age.js"
				},
				{
				  "name": "Jobs",
				  "action": "bar_pro.js"
				},    
				{
				  "name": "Hobby",
				  "action": "hobbies_2.js"
				}
			]
		},
    {
      "name": "Match",
      "children":[
        {
          "name": "Race of partner",
          "action": "histo_dynamique.js"
        },
        {
          "name": "Gender",
          "action": "bar_match.js"
        }]
      
    },
    {
      "name": "Reasons",
      "action": "pie_motif.js"
    }
      ]
    }

// Set the dimensions and margins of the diagram
var margin = {top: 20, right: 165, bottom: 30, left: 165}, // 90
    width = 960 - margin.left - margin.right, // 960
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin

var svg2=d3.select("#graphDiv2").append("svg")
	.attr("id","graphs_svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate("
          + margin.left + "," + margin.top + ")");
		  
var svg = d3.select("#graphDiv").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate("
          + margin.left + "," + margin.top + ")");

var i = 0,
    duration = 750,
    root;

// declares a tree layout and assigns the size
var treemap = d3.tree().size([height, width]);



root = d3.hierarchy(treeData, function(d) { return d.children; });

root.x0 = height / 2;
root.y0 = 0;
	// Collapse after the second level
root.children.forEach(collapse);
	
update(root);
	
	// Collapse the node and all it's children
function collapse(d) {
  if(d.children) {
	d._children = d.children
	d._children.forEach(collapse)
	d.children = null
  }else{
		if (d.data.action){

			d._action=d.action;
			}
		}
	}
	






function update(source) {

  // Assigns the x and y position for the nodes
  var treeData = treemap(root);

  // Compute the new tree layout.
  var nodes = treeData.descendants(),
      links = treeData.descendants().slice(1);

  // Normalize for fixed-depth.
  nodes.forEach(function(d){ d.y = d.depth * 180});

  // ****************** Nodes section ***************************

  // Update the nodes...
  var node = svg.selectAll('g.node')
      .data(nodes, function(d) {return d.id || (d.id = ++i); });

  // Enter any new modes at the parent's previous position.
  var nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr("transform", function(d) {
        return "translate(" + source.y0 + "," + source.x0 + ")";
    })
    .on('click', click);

  // Add Circle for the nodes
  nodeEnter.append('circle')
      .attr('class', 'node')
      .attr('r', 1e-6)
      .style("fill", function(d) {
          return d._children ? "lightsteelblue" : "#fff";
      });

  // Add labels for the nodes
  nodeEnter.append('text')
      .attr("dy", ".35em")
      .attr("x", function(d) {
          return d.children || d._children ? -13 : 13;
      })
      .attr("text-anchor", function(d) {
          return d.children || d._children ? "end" : "start";
      })
      .text(function(d) { return d.data.name; });

  // UPDATE
  var nodeUpdate = nodeEnter.merge(node);

  // Transition to the proper position for the node
  nodeUpdate.transition()
    .duration(duration)
    .attr("transform", function(d) { 
        return "translate(" + d.y + "," + d.x + ")";
     });

  // Update the node attributes and style
  nodeUpdate.select('circle.node')
    .attr('r', 10)
    .style("fill", function(d) {
        return d._children ? "lightsteelblue" : "#fff";
    })
    .attr('cursor', 'pointer');


  // Remove any exiting nodes
  var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) {
          return "translate(" + source.y + "," + source.x + ")";
      })
      .remove();

  // On exit reduce the node circles size to 0
  nodeExit.select('circle')
    .attr('r', 1e-6);

  // On exit reduce the opacity of text labels
  nodeExit.select('text')
    .style('fill-opacity', 1e-6);

  // ****************** links section ***************************

  // Update the links...
  var link = svg.selectAll('path.link')
      .data(links, function(d) { return d.id; });

  // Enter any new links at the parent's previous position.
  var linkEnter = link.enter().insert('path', "g")
      .attr("class", "link")
      .attr('d', function(d){
        var o = {x: source.x0, y: source.y0}
        return diagonal(o, o)
      });

  // UPDATE
  var linkUpdate = linkEnter.merge(link);

  // Transition back to the parent element position
  linkUpdate.transition()
      .duration(duration)
      .attr('d', function(d){ return diagonal(d, d.parent) });

  // Remove any exiting links
  var linkExit = link.exit().transition()
      .duration(duration)
      .attr('d', function(d) {
        var o = {x: source.x, y: source.y}
        return diagonal(o, o)
      })
      .remove();

  // Store the old positions for transition.
  nodes.forEach(function(d){
    d.x0 = d.x;
    d.y0 = d.y;
  });

  // Creates a curved (diagonal) path from parent to the child nodes
  function diagonal(s, d) {

    path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`

    return path
  }

  // Toggle children on click.
  function click(d) {
	 d3.select("#graphDiv2").selectAll('*').remove()
    if (d.children) {
        d._children = d.children;
        d.children = null;
      }  else {
		 
		if(d.data.action){
			switch(String(d.data.action)) {
				case "bar_race.js":
          //document.getElementById('graphDiv2').innerHTML += '<button id="1" name="btn1" onclick="update1(data1)">Men</button> <button id="2" name="btn2" onclick="update1(data2)">Women</button>'
					bar_race("#graphDiv2");
					break;
				case "bar_age.js":
					bar_age("#graphDiv2");
					break;
				case "bar_match.js":
					bar_match("#graphDiv2");
					break;
				case "bar_pro.js":
					bar_pro("#graphDiv2");
					break;
				case "plots.js":
					legend("#graphDiv2");
					plots("#graphDiv2");
					break;
				case "hobbies_2.js":
					hobbies("#graphDiv2");
					break;
				case "pie_motif.js":
					pie_chart("#graphDiv2");
					break;
				case "histo_dynamique.js":
          document.getElementById('graphDiv2').innerHTML += '<p> <label>Choose race</label> <input id="nBin" list="browsers"><datalist id="browsers"><option value="Black/African"><option value="European/Caucasian"> <option value="Latino/Hispanic"><option value="Asian/Pacific"><option value="Native American"><option value="Other"> </datalist></p>'
					histo_dynamique("#graphDiv2");
					break;
				 default:
					d3.select('#graphDiv2').select('svg').remove();
					break;
				}
			// if(d.data.actiop
			// console.log("external_js");
			// bar_pro("#graphDiv");
		}else{
			d.children = d._children;
			d._children = null;	 
	 }
  }
    update(d);
  }
}
