function hobbies(item) {
    // create the svg area

    var body = d3.select(item)
    var svg = body
        .append("svg")
        .attr("width", 850)
        .attr("height", 850)
        .append("g")
        .attr("transform", "translate(425,400)")

    svg.append("text").attr("x", 0).attr("y", -360).style("font-size", "16px")
        .attr("text-anchor", "middle")
        .text("Percentage of matches of the dataset according to hobbies.")


    function convertNumbers(row) {
        var r = {};
        for (var k in row) {
            r[k] = +row[k];
            if (isNaN(r[k])) {
                r[k] = row[k];
            }
        }
        return r;
    }


    d3.csv("static/ialifinarita/data/hobbies_matrix.csv", convertNumbers, function(error, data) {
        var matrix = data;

        var names = ["sport", "tv", "exercise", "dining", "museums", "art", "hiking", "gaming", "clubbing", "reading", "tv", "theater", "movies", "concerts", "music", "shopping", "yoga"]
        var colors = ["#b5224f", "#f14287", "#ff7cbe", "#ebdb50", "#222133", "#731a52", "#4c0831", "#894078", "553983", "#8466b0", "#baaad1", "#2c4892", "#4b6099", "#7e97b6", "#aabcd4", "#e58f74", "#e5b29d"] //["#301E1E", "#083E77", "#342350", "#567235", "#8B161C", "#DF7C00","#301E1E", "#083E77", "#342350", "#567235", "#8B161C", "#DF7C00","#301E1E", "#083E77", "#342350", "#567235", "#8B161C"]
        var opacityDefault = 0.8;


        var colors = d3.scaleOrdinal()
            .domain(d3.range(names.length))
            .range(colors);


        var chord = d3.chord()
            .padAngle(0.01)
            .sortChords(d3.descending)
            (matrix)

        var arc = d3.arc()
            .innerRadius(330) // 190
            .outerRadius(340); // 200

        var path = svg
            .datum(chord)
            .append("g")
            .attr("class", "chord")
            .selectAll("path")
            .data(function(d) { return d; })
            .enter()
            .append("path")
            .attr("d", d3.ribbon()
                .radius(330) // 190
            )
            .style("fill", function(d) { return colors(d.source.index); })
            .style("opacity", 0.1)
            .on("mouseover", interact(100))
            .on("mouseout", interact(.1))


        var outerArcs = svg.selectAll("g.group")
            .data(function(chords) { return chords.groups; })
            .enter().append("g")
            .attr("class", "group")



        outerArcs.append("path")
            .style("fill", function(d) { return colors(d.index); })
            .attr("id", function(d, i) { return "group" + d.index; })
            .attr("class", "outer")
            .attr("d", arc)

        outerArcs.append("text")
            .attr("x", 6)
            .attr("dx", 10)
            .attr("dy", 8)
            .append("textPath")
            .attr("href", function(d) { return "#group" + d.index; })
            .text(function(chords, i) { return names[i]; })
            .style("fill", "white")
            .style("font-size", 10);

        path.append("title").text(function(d) {
            return " Matching " +
                names[d.source.index] +
                " -> " +
                names[d.target.index] +
                " : " +
                Math.round(d.source.value * 100) +
                " %"
        });

        function interact(opacity) {
            return function(d, i) {
                d3.select(this)
                    .transition()
                    .style("opacity", opacity);
            }
        }

    });
}