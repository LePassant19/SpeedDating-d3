function legend(item){
	
	console.log("legend");
	var body=d3.select(item);
	var body=body.append("div");
	
	//Create SVG element
	let svg = body
	.append("svg")
	.attr("height", 110)
	.attr("width", 800)
	.attr("id", "legend");

	// Explanations
	svg.append("text").attr("x", 400).attr("y", 25).style("font-size", "16px")
	.append("tspan")
	.attr('x', 400)
	.attr('dy', 5)
	.attr("text-anchor", "middle")
	.text("Distributions of the scores attributed to the importance of different attributes in the opposite sex.")
	.append("tspan")
	.attr('x', 400)
	.attr('dy', 20)
	.attr("text-anchor", "middle")
	.text("Scales for scores are from 0 to 100.")

	svg.append("circle").attr("cx",70).attr("cy",65).attr("r", 6).style("fill", "#6495ED");
	svg.append("circle").attr("cx",70).attr("cy",95).attr("r", 6).style("fill", "#FF69B4");
	svg.append("text").attr("x", 90).attr("y", 70).text("Men").style("font-size", "16px").attr("alignment-baseline","middle");
	svg.append("text").attr("x", 90).attr("y", 100).text("Women").style("font-size", "16px").attr("alignment-baseline","middle");



	
}

