function bar_pro(item) {

    // set the dimensions and margins of the graph
    var margin = { top: 50, right: 30, bottom: 40, left: 300 },
        //width = 460 - margin.left - margin.right,
        width = 460 - margin.right,
        //height = 400 - margin.top - margin.bottom;
        height = 400 - margin.top;

    var body = d3.select(item)
    body.select('svg').remove()
        // append the svg object to the body of the page
    var svg_pro = body
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    svg_pro.append("text").attr("x", width / 2).attr("y", -15).style("font-size", "16px")
        .attr("text-anchor", "middle")
        .text("Counts of intended professions of the participants")

    // Parse the Data
    d3.csv("static/parfait/data/SpeedDatingPro.csv", function(data) {

        // Add X axis
        var x = d3.scaleLinear()
            .domain([0, 2500])
            .range([0, width]);
        svg_pro.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

        svg_pro.append("text")
            .attr("transform",
                "translate(" + (width / 2) + " ," +
                (height + margin.top + 30) + ")")
            .style("text-anchor", "middle")
            .text("Count");

        // Y axis
        var y = d3.scaleBand()
            .range([0, height])
            .domain(data.map(function(d) { return d.prof; }))
            .padding(.1);
        svg_pro.append("g")
            .call(d3.axisLeft(y))

        // text label for the x axis
        svg_pro.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -200 - margin.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Field");
        //Bars
        svg_pro.selectAll("myRect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", x(0))
            .attr("y", function(d) { return y(d.prof); })
            .attr("width", function(d) { return x(d.nbre); })
            .attr("height", y.bandwidth())
            .attr("fill", "#CD5C5C")


        //.attr("x", function(d) { return x(d.Country); })
        // .attr("y", function(d) { return y(d.Value); })
        // .attr("width", x.bandwidth())
        // .attr("height", function(d) { return height - y(d.Value); })
        // .attr("fill", "#69b3a2")

    });
}