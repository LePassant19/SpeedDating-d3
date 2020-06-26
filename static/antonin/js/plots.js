function plots(item) {
    // set the dimensions and margins of the graphs
    var margin = { top: 30, right: 30, bottom: 30, left: 60 },
        width = 400 - margin.left - margin.right,
        height = 235 - margin.top - margin.bottom;

    // dictionary quality: column_name 
    var col_dict = {
        "Attractive": "attr1_1",
        "Sincere": "sinc1_1",
        "Intelligent": "intel1_1",
        "Fun": "fun1_1",
        "Ambitious": "amb1_1",
        "Shared Interests": "shar1_1"
    };
    console.log("plots");

    // initialize averages for tooltip
    var average_men = {};
    var average_women = {};

    var body = d3.select(item);
    var body = body.append("div")
        .attr("id", "plots");

    // initialize tooltip
    var tooltip = body
        .append("div")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("background-color", "rgba(255, 255, 255, 0.5)")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "5px");

    // plot the data
    d3.csv("static/data/SpeedDating.csv", function(data) {
        for (var attr in col_dict) {

            var col = col_dict[attr];

            // append the svg object to the body of the page
            var svg = d3.select("#plots")
                .append("svg")
                .attr("id", col)
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + 7 + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

            // plot title
            svg.append("text")
                .text(attr)
                .style("font-size", "15")
                .attr("font-family", "sans-serif")
                .attr("text-anchor", "middle")
                .attr("alignment-baseline", "central")
                .attr("font-weight", "normal")
                .attr("x", width / 2)

            // x Axis
            var x = d3.scaleLinear()
                .domain([0, 60])
                .range([0, width]);
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            // first y Axis
            var y_m = d3.scaleLinear()
                .range([height / 2, 0])
                .domain([0, 0.1]);
            svg.append("g")
                //.attr("transform", "translate(-20,0)")
                .call(d3.axisLeft(y_m).tickValues([0.05, 0.1]));

            // second y Axis
            var y_w = d3.scaleLinear()
                .range([height / 2, height])
                .domain([0, 0.1]);
            svg.append("g")
                //.attr("transform", "translate(-20,0)")
                .call(d3.axisLeft(y_w).ticks(2).tickSizeOuter(0));

            // x-axis label
            svg.append("text")
                .attr("transform",
                    "translate(" + (width / 2) + " ," +
                    (height + margin.top + 2) + ")")
                .style("text-anchor", "middle")
                .style("font-size", "12")
                .text("Scores");

            // kernel density estimation
            var kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(20));
            var men_array = data.filter(function(d) { return d.gender === "1" }).map(function(d) { return d[col]; });
            var women_array = data.filter(function(d) { return d.gender === "0" }).map(function(d) { return d[col]; });
            var density_m = kde(men_array);
            var density_w = kde(women_array);

            // averages
            average_men[attr] = d3.mean(men_array);
            average_women[attr] = d3.mean(women_array);

            // men area
            svg.append("path")
                .datum(density_m)
                .attr("fill", "#6495ED")
                .attr("opacity", ".8")
                .attr("stroke", "#000")
                .attr("stroke-width", 1)
                .attr("stroke-linejoin", "round")
                .attr("d", d3.area()
                    .curve(d3.curveBasis)
                    .x(function(d) { return x(d[0]); })
                    .y0(y_m(0))
                    .y1(function(d) { return y_m(d[1]); })
                )

            // women area
            svg.append("path")
                .datum(density_w)
                .attr("fill", "#FF69B4")
                .attr("opacity", ".8")
                .attr("stroke", "#000")
                .attr("stroke-width", 1)
                .attr("stroke-linejoin", "round")
                .attr("d", d3.area()
                    .curve(d3.curveBasis)
                    .x(function(d) { return x(d[0]); })
                    .y0(y_w(0))
                    .y1(function(d) { return y_w(d[1]); })
                )

        };

        // tooltip
        d3.select("#attr1_1")
            .on("mouseover", function() { return tooltip.style("visibility", "visible"); })
            .on("mousemove", function() {
                return tooltip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px")
                    .html("<center>Attractive</center>" +
                        "Men average : " + Math.round(average_men["Attractive"]) + "<br>" +
                        "Women average : " + Math.round(average_women["Attractive"]));
            })
            .on("mouseout", function() { return tooltip.style("visibility", "hidden"); });

        d3.select("#sinc1_1")
            .on("mouseover", function() { return tooltip.style("visibility", "visible"); })
            .on("mousemove", function() {
                return tooltip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px")
                    .html("<center>Sincere</center>" +
                        "Men average : " + Math.round(average_men["Sincere"]) + "<br>" +
                        "Women average : " + Math.round(average_women["Sincere"]));
            })
            .on("mouseout", function() { return tooltip.style("visibility", "hidden"); });

        d3.select("#intel1_1")
            .on("mouseover", function() { return tooltip.style("visibility", "visible"); })
            .on("mousemove", function() {
                return tooltip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px")
                    .html("<center>Intelligent</center>" +
                        "Men average : " + Math.round(average_men["Intelligent"]) + "<br>" +
                        "Women average : " + Math.round(average_women["Intelligent"]));
            })
            .on("mouseout", function() { return tooltip.style("visibility", "hidden"); });

        d3.select("#fun1_1")
            .on("mouseover", function() { return tooltip.style("visibility", "visible"); })
            .on("mousemove", function() {
                return tooltip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px")
                    .html("<center>Fun</center>" +
                        "Men average : " + Math.round(average_men["Fun"]) + "<br>" +
                        "Women average : " + Math.round(average_women["Fun"]));
            })
            .on("mouseout", function() { return tooltip.style("visibility", "hidden"); });

        d3.select("#amb1_1")
            .on("mouseover", function() { return tooltip.style("visibility", "visible"); })
            .on("mousemove", function() {
                return tooltip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px")
                    .html("<center>Ambitious</center>" +
                        "Men average : " + Math.round(average_men["Ambitious"]) + "<br>" +
                        "Women average : " + Math.round(average_women["Ambitious"]));
            })
            .on("mouseout", function() { return tooltip.style("visibility", "hidden"); });

        d3.select("#shar1_1")
            .on("mouseover", function() { return tooltip.style("visibility", "visible"); })
            .on("mousemove", function() {
                return tooltip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px")
                    .html("<center>Shared interests</center>" +
                        "Men average : " + Math.round(average_men["Shared Interests"]) + "<br>" +
                        "Women average : " + Math.round(average_women["Shared Interests"]));
            })
            .on("mouseout", function() { return tooltip.style("visibility", "hidden"); });

    });


    // Function to compute density
    function kernelDensityEstimator(kernel, X) {
        return function(V) {
            return X.map(function(x) {
                return [x, d3.mean(V, function(v) { return kernel(x - v); })];
            });
        };
    }

    function kernelEpanechnikov(k) {
        return function(v) {
            return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
        };
    }

}