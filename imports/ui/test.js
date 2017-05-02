d3.floorplan.pathplot = function() {
    var x = d3.scale.linear(),
        y = d3.scale.linear(),
        line = d3.svg.line()
            .x(function(d) {
                return x(d.x); })
            .y(function(d) { return y(d.y); }),
        id = "fp-pathplot-" + new Date().valueOf(),
        name = "pathplot",
        pointFilter = function(d) { return d.points; };

    function pathplot(g) {
        g.each(function(data) {
            if (!data) return;

            var g = d3.select(this),
                paths = g.selectAll("path")
                    .data(data, function(d) { return d.id; });

            paths.exit().transition()
                .style("opacity", 1e-6).remove();

            paths.enter().append("path")
                .attr("vector-effect", "non-scaling-stroke")
                .attr("fill", "none")
                .style("opacity", 1e-6)
                .append("title");

            paths
                .attr("class", function(d) { return d.classes || d.id; })
                .attr("d", function(d,i) { return line(pointFilter(d,i)); })
                .select("title")
                .text(function(d) { return d.title || d.id; });

            paths.transition().style("opacity", 1);
        });
    }

    pathplot.xScale = function(scale) {
        if (! arguments.length) return x;
        x = scale;
        return pathplot;
    };

    pathplot.yScale = function(scale) {
        if (! arguments.length) return y;
        y = scale;
        return pathplot;
    };

    pathplot.id = function() {
        return id;
    };

    pathplot.title = function(n) {
        if (! arguments.length) return name;
        name = n;
        return pathplot;
    };

    pathplot.pointFilter = function(fn) {
        if (! arguments.length) return pointFilter;
        pointFilter = fn;
        return pathplot;
    };

    return pathplot;
};