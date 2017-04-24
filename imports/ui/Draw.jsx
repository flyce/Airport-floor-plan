import React, {Component} from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import d3 from 'd3';

import { Tracks } from '../api/tracks.js';

import { Peoples } from '../api/peoples.js';

// icon
import ModeEdit from "material-ui/svg-icons/editor/mode-edit";
import Clear from "material-ui/svg-icons/content/clear";

// 测试数据
const testData = [
    {
        id: '10001',
        mac: 'e0:db:55:f9:2f:51',
        getIn: '2017-03-17 11:32',
        depart: '2017-03-17 11:32',
        isExit: '是'
    },
    {
        id: '10002',
        mac: 'e1:cb:25:f4:1f:5a',
        getIn: '2017-03-17 11:32',
        depart: '2017-03-17 11:32',
        isExit: '是'
    },{
        id: '10003',
        mac: 'e0:db:55:f9:2f:51',
        getIn: '2017-03-17 11:32',
        depart: '2017-03-17 11:32',
        isExit: '是'
    },{
        id: '10004',
        mac: '30:fb:54:59:ff:31',
        getIn: '2017-03-17 11:32',
        depart: '2017-03-17 11:32',
        isExit: '是'
    },{
        id: '10005',
        mac: 'f0:df:25:9f:31:e1',
        getIn: '2017-03-17 11:32',
        depart: '2017-03-17 11:32',
        isExit: '是'
    },
];

export default class Draw extends Component {

    constructor(props) {
        super(props);

        this.handleAddLayer = this.handleAddLayer.bind(this);
    }

    InitView(){

        // d3 floorplan v0.1.0
        d3.floorplan = function() {
            function a(a) {
                var d = h.range()[1] - h.range()[0],
                    n = l.range()[1] - l.range()[0];
                a.each(function(a) {
                    if (a) {
                        var k = d3.select(this);
                        k.selectAll("defs").data([0]).enter().append("defs").each(function() {
                            var a = d3.select(this),
                                b = a.append("radialGradient").attr("id", "metal-bump").attr("cx", "50%").attr("cy", "50%").attr("r", "50%").attr("fx", "50%").attr("fy", "50%");
                            b.append("stop").attr("offset", "0%").style("stop-color", "rgb(170,170,170)").style("stop-opacity", 0.6);
                            b.append("stop").attr("offset",
                                "100%").style("stop-color", "rgb(204,204,204)").style("stop-opacity", 0.5);
                            a = a.append("pattern").attr("id", "grip-texture").attr("patternUnits", "userSpaceOnUse").attr("x", 0).attr("y", 0).attr("width", 3).attr("height", 3);
                            a.append("rect").attr("height", 3).attr("width", 3).attr("stroke", "none").attr("fill", "rgba(204,204,204,0.5)");
                            a.append("circle").attr("cx", 1.5).attr("cy", 1.5).attr("r", 1).attr("stroke", "none").attr("fill", "url(#metal-bump)")
                        });
                        var c = k.selectAll(".map-layers").data([0]),
                            b = c.enter().append("g").attr("class",
                                "map-layers"),
                            g = d3.transition(c);
                        b.append("rect").attr("class", "canvas").attr("pointer-events", "all").style("opacity", 0);
                        g.attr("width", d).attr("height", n).attr("x", h.range()[0]).attr("y", l.range()[0]);
                        b = k.selectAll(".map-controls").data([0]);
                        b.enter().append("g").attr("class", "map-controls").each(function() {
                            var a = d3.select(this);
                            a.append("path").attr("class", "ui-show-hide").attr("d", "M10,3 v40 h-7 a3,3 0 0,1 -3,-3 v-34 a3,3 0 0,1 3,-3 Z").attr("fill", "url(#grip-texture)").attr("stroke", "none").style("opacity",
                                0.5);
                            a.append("path").attr("class", "show ui-show-hide").attr("d", "M2,23 l6,-15 v30 Z").attr("fill", "rgb(204,204,204)").attr("stroke", "none").style("opacity", 0.5);
                            a.append("path").attr("class", "hide").attr("d", "M8,23 l-6,-15 v30 Z").attr("fill", "rgb(204,204,204)").attr("stroke", "none").style("opacity", 0);
                            a.append("path").attr("d", "M10,3 v40 h-7 a3,3 0 0,1 -3,-3 v-34 a3,3 0 0,1 3,-3 Z").attr("pointer-events", "all").attr("fill", "none").attr("stroke", "none").style("cursor", "pointer").on("mouseover", function() {
                                a.selectAll("path.ui-show-hide").style("opacity",
                                    1)
                            }).on("mouseout", function() { a.selectAll("path.ui-show-hide").style("opacity", 0.5) }).on("click", function() {
                                a.select(".hide").classed("ui-show-hide") ? a.transition().duration(1E3).attr("transform", "translate(" + (a.attr("view-width") - 10) + ",0)").each("end", function() { a.select(".hide").style("opacity", 0).classed("ui-show-hide", !1);
                                    a.select(".show").style("opacity", 1).classed("ui-show-hide", !0);
                                    a.selectAll("path.ui-show-hide").style("opacity", 0.5) }) : a.transition().duration(1E3).attr("transform", "translate(" +
                                    (a.attr("view-width") - 95) + ",0)").each("end", function() { a.select(".show").style("opacity", 0).classed("ui-show-hide", !1);
                                    a.select(".hide").style("opacity", 1).classed("ui-show-hide", !0);
                                    a.selectAll("path.ui-show-hide").style("opacity", 0.5) })
                            });
                            a.append("rect").attr("x", 10).attr("y", 0).attr("width", 85).attr("fill", "rgba(204,204,204,0.9)").attr("stroke", "none");
                            a.append("g").attr("class", "layer-controls").attr("transform", "translate(15,5)")
                        });
                        var g = b.select(".hide").classed("ui-show-hide") ? 95 : 10,
                            p = Math.max(45,
                                10 + 20 * e.length);
                        b.attr("view-width", d).attr("transform", "translate(" + (d - g) + ",0)").select("rect").attr("height", p);
                        b = b.select("g.layer-controls").selectAll("g").data(e, function(a) {
                            return a.id() });
                        g = b.enter().append("g").attr("class", "ui-active").style("cursor", "pointer").on("click", function(a) {
                            var b = d3.select(this),
                                a = k.selectAll("g." + a.id());
                            b.classed("ui-active") ? (a.style("display", "none"), b.classed("ui-active", !1).classed("ui-default", !0)) : (a.style("display", "inherit"), b.classed("ui-active", !0).classed("ui-default", !1))
                        });
                        g.append("rect").attr("x", 0).attr("y", 1).attr("rx", 5).attr("ry", 5).attr("width", 75).attr("height", 18).attr("stroke-width", "1px");
                        g.append("text").attr("x", 10).attr("y", 15).style("font-size", "12px").style("font-family", "Helvetica, Arial, sans-serif").text(function(a) {
                            return a.title() });
                        b.transition().duration(1E3).attr("transform", function(a, b) {
                            return "translate(0," + 20 * (e.length - (b + 1)) + ")" });
                        c = c.selectAll(".maplayer").data(e, function(a) {
                            return a.id() });
                        c.enter().append("g").attr("class", function(a) {
                            return "maplayer " +
                                a.title()
                        }).append("g").attr("class", function(a) {
                            return a.id() }).datum(null);
                        c.exit().remove();
                        c.order();
                        c.each(function(b) { d3.select(this).select("g." + b.id()).datum(a[b.id()]).call(b) });
                        k.call(d3.behavior.zoom().scaleExtent([1, i]).on("zoom", function() {
                            if (f) {
                                var a = d3.event.scale,
                                    b = d3.event.translate;
                                k && (a && (k.__scale__ = a), b && 1 < b.length && (k.__translate__ = b), a = (1 - k.__scale__) * (h.range()[1] - h.range()[0]), b = (1 - k.__scale__) * (l.range()[1] - l.range()[0]), k.__translate__[0] = Math.min(h.range()[0], Math.max(k.__translate__[0],
                                    a)), k.__translate__[1] = Math.min(l.range()[0], Math.max(k.__translate__[1], b)), k.selectAll(".map-layers").attr("transform", "translate(" + k.__translate__ + ")scale(" + k.__scale__ + ")"))
                            }
                        }))
                    }
                })
            }
            var e = [],
                f = !0,
                i = 5,
                h = d3.scale.linear(),
                l = d3.scale.linear();
            a.xScale = function(c) {
                if (!arguments.length) return h;
                h = c;
                e.forEach(function(a) { a.xScale(h) });
                return a };
            a.yScale = function(c) {
                if (!arguments.length) return l;
                l = c;
                e.forEach(function(a) { a.yScale(l) });
                return a };
            a.panZoom = function(c) {
                if (!arguments.length) return f;
                f = c;
                return a
            };
            a.addLayer = function(c, d) { c.xScale(h);
                c.yScale(l);
                1 < arguments.length && 0 <= d ? e.splice(d, 0, c) : e.push(c);
                return a };
            return a
        };
        d3.floorplan.version = "0.1.0";
        d3.floorplan.imagelayer = function() {
            function a(a) {
                a.each(function(a) {
                    a && (a = d3.select(this).selectAll("image").data(a, function(a) {
                        return a.url }), a.enter().append("image").attr("xlink:href", function(a) {
                        return a.url }).style("opacity", 1E-6), a.exit().transition().style("opacity", 1E-6).remove(), a.transition().attr("x", function(a) {
                        return e(a.x) }).attr("y", function(a) {
                        return f(a.y) }).attr("height", function(a) {
                        return f(a.y + a.height) - f(a.y) }).attr("width", function(a) {
                        return e(a.x + a.width) - e(a.x) }).style("opacity",
                        function(a) {
                            return a.opacity || 1 }))
                })
            }
            var e = d3.scale.linear(),
                f = d3.scale.linear(),
                i = "fp-imagelayer-" + (new Date).valueOf(),
                h = "imagelayer";
            a.xScale = function(f) {
                if (!arguments.length) return e;
                e = f;
                return a };
            a.yScale = function(e) {
                if (!arguments.length) return f;
                f = e;
                return a };
            a.id = function() {
                return i };
            a.title = function(e) {
                if (!arguments.length) return h;
                h = e;
                return a };
            return a
        };
        d3.floorplan.heatmap = function() {
            function a(a) {
                a.each(function(a) {
                    if (a && a.map) {
                        var d = d3.select(this);
                        a.units ? " " != a.units.charAt(0) && (a.units = " " + a.units) : a.units = "";
                        var b = a.map.map(function(a) {
                                return a.value }).sort(d3.ascending),
                            g, j;
                        switch (f) {
                            case "quantile":
                                g = d3.scale.quantile().range([1, 2, 3, 4, 5, 6]).domain(b);
                                j = g.quantiles();
                                break;
                            case "quantized":
                                g = d3.scale.quantize().range([1, 2, 3, 4, 5, 6]).domain([b[0], b[b.length - 1]]);
                                b = (g.domain()[1] - g.domain()[0]) / 6;
                                j = [b, 2 * b, 3 * b, 4 * b, 5 * b];
                                break;
                            case "normal":
                                var m =
                                        d3.mean(b),
                                    b = Math.sqrt(d3.sum(b, function(a) {
                                            return Math.pow(a - m, 2) }) / b.length);
                                g = d3.scale.quantile().range([1, 2, 3, 4, 5, 6]).domain([m - 6 * b, m - 2 * b, m - b, m, m + b, m + 2 * b, m + 6 * b]);
                                j = g.quantiles();
                                break;
                            default:
                                customThresholds || (customThresholds = j), b = customThresholds, b.push(b[b.length - 1]), b.unshift(b[0]), g = d3.scale.quantile().range([1, 2, 3, 4, 5, 6]).domain(b), customThresholds = j = g.quantiles()
                        }
                        d = d.selectAll("g.heatmap").data([0]);
                        d.enter().append("g").attr("class", "heatmap");
                        this.__colors__ && this.__colors__ != e && d.classed(this.__colors__, !1);
                        d.classed(e, !0);
                        this.__colors__ = e;
                        b = d.selectAll("rect").data(a.map.filter(function(a) {
                            return !a.points }), function(a) {
                            return a.x + "," + a.y });
                        j = b.enter().append("rect").style("opacity", 1E-6);
                        b.exit().transition().style("opacity", 1E-6).remove();
                        j.append("title");
                        b.attr("x", function(a) {
                            return i(a.x) }).attr("y", function(a) {
                            return h(a.y) }).attr("height", Math.abs(h(a.binSize) - h(0))).attr("width", Math.abs(i(a.binSize) - i(0))).attr("class", function(a) {
                            return "d6-" + g(a.value) }).select("title").text(function(b) {
                            return "value: " +
                                c(b.value) + a.units
                        });
                        j.transition().style("opacity", 0.6);
                        b = d.selectAll("path").data(a.map.filter(function(a) {
                            return a.points }), function(a) {
                            return JSON.stringify(a.points) });
                        j = b.enter().append("path").attr("d", function(a) {
                            return l(a.points) + "Z" }).style("opacity", 1E-6);
                        b.exit().transition().style("opacity", 1E-6).remove();
                        j.append("title");
                        b.attr("class", function(a) {
                            return "d6-" + g(a.value) }).select("title").text(function(b) {
                            return "value: " + c(b.value) + a.units });
                        j.transition().style("opacity", 0.6);
                        d = d.selectAll("text").data(a.map.filter(function(a) {
                                return a.points }),
                            function(a) {
                                return JSON.stringify(a.points) });
                        b = d.enter().append("text").style("font-weight", "bold").attr("text-anchor", "middle").style("opacity", 1E-6);
                        d.exit().transition().style("opacity", 1E-6).remove();
                        d.attr("transform", function(a) {
                            for (var b = 0, d = 0, j = 0, g = 0; g < a.points.length; ++g) var c = a.points[g],
                                k = a.points[g + 1] || a.points[0],
                                e = c.x * k.y - k.x * c.y,
                                b = b + (c.x + k.x) * e,
                                d = d + (c.y + k.y) * e,
                                j = j + e;
                            j = j / 2;
                            d = d / (6 * j);
                            return "translate(" + i(b / (6 * j)) + "," + h(d) + ")" }).text(function(b) {
                            return c(b.value) + a.units });
                        b.transition().style("opacity",
                            0.6)
                    }
                })
            }
            var e = "RdYlBu",
                f = "quantile",
                i = d3.scale.linear(),
                h = d3.scale.linear(),
                l = d3.svg.line().x(function(a) {
                    return i(a.x) }).y(function(a) {
                    return h(a.y) }),
                c = d3.format(".4n"),
                d = "fp-heatmap-" + (new Date).valueOf(),
                n = "heatmap";
            a.xScale = function(d) {
                if (!arguments.length) return i;
                i = d;
                return a };
            a.yScale = function(d) {
                if (!arguments.length) return h;
                h = d;
                return a };
            a.colorSet = function(d) {
                if (!arguments.length) return e;
                e = d;
                return a };
            a.colorMode = function(d) {
                if (!arguments.length) return f;
                f = d;
                return a };
            a.customThresholds =
                function(d) {
                    if (!arguments.length) return customThresholds;
                    customThresholds = d;
                    return a };
            a.id = function() {
                return d };
            a.title = function(d) {
                if (!arguments.length) return n;
                n = d;
                return a };
            return a
        };
        d3.floorplan.overlays = function() {
            function a(a) {
                a.each(function(a) {
                    if (a) {
                        var b = d3.select(this),
                            g = b.selectAll("rect.overlay-canvas").data([0]);
                        g.enter().append("rect").attr("class", "overlay-canvas").style("opacity", 0).attr("pointer-events", "all").on("click", function() {
                            if (j) {
                                var a = d3.mouse(this);
                                c.forEach(function(b) { b(f.invert(a[0]), i.invert(a[1])) }) } }).on("mouseup.drag", e).on("touchend.drag", e);
                        g.attr("x", f.range()[0]).attr("y", i.range()[0]).attr("height", i.range()[1] - i.range()[0]).attr("width", f.range()[1] -
                            f.range()[0]);
                        g = b.selectAll("path.polygon").data(a.polygons || [], function(a) {
                            return a.id });
                        g.enter().append("path").attr("class", "polygon").attr("vector-effect", "non-scaling-stroke").attr("pointer-events", "all").on("mousedown", function(a) { d.forEach(function(b) { b(a.id) }) }).call(o).append("title");
                        g.exit().transition().style("opacity", 1E-6).remove();
                        g.attr("d", function(a) {
                            return k(a.points) + "Z" }).style("cursor", j ? "move" : "pointer").select("title").text(function(a) {
                            return a.name || a.id });
                        if (j) {
                            var h = [];
                            a.polygons && a.polygons.forEach(function(a) { a.points.forEach(function(b, d) { h.push({ index: d, parent: a }) }) });
                            a = 1;
                            for (g = b.node(); g.parentNode;)
                                if (g = g.parentNode, g.__scale__) { a = g.__scale__;
                                    break }
                            b = b.selectAll("circle.vertex").data(h, function(a) {
                                return a.parent.id + "-" + a.index });
                            b.exit().transition().attr("r", 1E-6).remove();
                            b.enter().append("circle").attr("class", "vertex").attr("pointer-events", "all").attr("vector-effect", "non-scaling-stroke").style("cursor", "move").attr("r", 1E-6).call(o);
                            b.attr("cx", function(a) {
                                return f(a.parent.points[a.index].x) }).attr("cy",
                                function(a) {
                                    return i(a.parent.points[a.index].y) }).attr("r", 4 / a)
                        } else b.selectAll("circle.vertex").transition().attr("r", 1E-6).remove()
                    }
                })
            }

            function e() { b && (n.forEach(function(a) { b.parent ? a(b.parent.id, b.parent.points, b.index) : a(b.id, b.points) }), b = null) }
            var f = d3.scale.linear(),
                i = d3.scale.linear(),
                h = "fp-overlays-" + (new Date).valueOf(),
                l = "overlays",
                c = [],
                d = [],
                n = [],
                j = !1,
                k = d3.svg.line().x(function(a) {
                    return f(a.x) }).y(function(a) {
                    return i(a.y) }),
                o = d3.behavior.drag().on("dragstart", function(a) { j && (b = a) }).on("drag",
                    function() {
                        if (b) {
                            var d = f.invert(d3.event.dx) - f.invert(0),
                                c = i.invert(d3.event.dy) - i.invert(0);
                            b.parent ? (b.parent.points[b.index].x += d, b.parent.points[b.index].y += c) : b.points && b.points.forEach(function(a) { a.x += d;
                                    a.y += c });
                            a(d3.select(this.parentNode)) } }).on("dragend", e),
                b = null;
            a.xScale = function(b) {
                if (!arguments.length) return f;
                f = b;
                return a };
            a.yScale = function(b) {
                if (!arguments.length) return i;
                i = b;
                return a };
            a.id = function() {
                return h };
            a.title = function(b) {
                if (!arguments.length) return l;
                l = b;
                return a };
            a.editMode =
                function(b) {
                    if (!arguments.length) return j;
                    j = b;
                    return a };
            a.registerCanvasCallback = function(b) { arguments.length && c.push(b);
                return a };
            a.registerSelectCallback = function(b) { arguments.length && select.Callbacks.push(b);
                return a };
            a.registerMoveCallback = function(b) { arguments.length && n.push(b);
                return a };
            return a
        };
        d3.floorplan.vectorfield = function() {
            function a(a) {
                a.each(function(a) {
                    if (a && a.map) {
                        var c = d3.select(this).selectAll("path.vector").data(a.map, function(a) {
                            return a.x + "," + a.y });
                        c.exit().transition().style("opacity", 1E-6).remove();
                        c.enter().append("path").attr("class", "vector").attr("vector-effect", "non-scaling-stroke").style("opacity", 1E-6).append("title");
                        var e = a.binSize / 2 / d3.max(a.map, function(a) {
                                return Math.max(Math.abs(a.value.x), Math.abs(a.value.y)) });
                        c.attr("d", function(c) {
                            var f = {
                                x: c.x + a.binSize /
                                2,
                                y: c.y + a.binSize / 2
                            };
                            return i([f, { x: f.x + c.value.x * e, y: f.y + c.value.y * e }])
                        }).select("title").text(function(c) {
                            return Math.sqrt(c.value.x * c.value.x + c.value.y * c.value.y) + " " + a.units });
                        c.transition().style("opacity", 1)
                    }
                })
            }
            var e = d3.scale.linear(),
                f = d3.scale.linear(),
                i = d3.svg.line().x(function(a) {
                    return e(a.x) }).y(function(a) {
                    return f(a.y) }),
                h = "fp-vectorfield-" + (new Date).valueOf(),
                l = "vectorfield";
            a.xScale = function(c) {
                if (!arguments.length) return e;
                e = c;
                return a };
            a.yScale = function(c) {
                if (!arguments.length) return f;
                f = c;
                return a
            };
            a.id = function() {
                return h };
            a.title = function(a) {
                if (!arguments.length) return l;
                l = a;
                return images };
            return a
        };
        d3.floorplan.pathplot = function() {
            function a(a) { a.each(function(a) { a && (a = d3.select(this).selectAll("path").data(a, function(a) {
                return a.id }), a.exit().transition().style("opacity", 1E-6).remove(), a.enter().append("path").attr("vector-effect", "non-scaling-stroke").attr("fill", "none").style("opacity", 1E-6).append("title"), a.attr("class", function(a) {
                return a.classes || a.id }).attr("d", function(a, d) {
                return i(c(a, d)) }).select("title").text(function(a) {
                return a.title || a.id }), a.transition().style("opacity", 1)) }) }
            var e = d3.scale.linear(),
                f = d3.scale.linear(),
                i = d3.svg.line().x(function(a) {
                    return e(a.x) }).y(function(a) {
                    return f(a.y) }),
                h = "fp-pathplot-" + (new Date).valueOf(),
                l = "pathplot",
                c = function(a) {
                    return a.points };
            a.xScale = function(c) {
                if (!arguments.length) return e;
                e = c;
                return a };
            a.yScale = function(c) {
                if (!arguments.length) return f;
                f = c;
                return a };
            a.id = function() {
                return h };
            a.title = function(c) {
                if (!arguments.length) return l;
                l = c;
                return a };
            a.pointFilter = function(d) {
                if (!arguments.length) return c;
                c = d;
                return a };
            return a
        };
        // d3 floorplan end

        var xscale = d3.scale.linear()
                .domain([0,50.0])
                .range([0,720]),
            yscale = d3.scale.linear()
                .domain([0,33.79])
                .range([0,339]),
            map = d3.floorplan().xScale(xscale).yScale(yscale), // 设置平面图，使其有缩放／平移功能
            imagelayer = d3.floorplan.imagelayer(),             // 创建新的图像图层
            heatmap = d3.floorplan.heatmap(),
            vectorfield = d3.floorplan.vectorfield(),
            pathplot = d3.floorplan.pathplot(),
            overlays = d3.floorplan.overlays().editMode(true),
            mapdata = {};

        mapdata[imagelayer.id()] = [{
            url: 'http://localhost:81/QQ20170408-0.png',
            x: 0,
            y: 0,
            height: 33.79,
            width: 50.0
        }];

        // 负责初始图层绘制
        map.addLayer(imagelayer);

        d3.select("#demo").append("svg")
            .attr("height", 339).attr("width",720).attr("id", "draw")
            .datum(mapdata).call(map);

        // 移除右上角的 控制条
        this.removeMapControls();

        console.log("background-image:","finished");
    }

    handleAddLayer(row, event) {

        d3.floorplan = function() {
            function a(a) {
                var d = h.range()[1] - h.range()[0],
                    n = l.range()[1] - l.range()[0];
                a.each(function(a) {
                    if (a) {
                        var k = d3.select(this);
                        k.selectAll("defs").data([0]).enter().append("defs").each(function() {
                            var a = d3.select(this),
                                b = a.append("radialGradient").attr("id", "metal-bump").attr("cx", "50%").attr("cy", "50%").attr("r", "50%").attr("fx", "50%").attr("fy", "50%");
                            b.append("stop").attr("offset", "0%").style("stop-color", "rgb(170,170,170)").style("stop-opacity", 0.6);
                            b.append("stop").attr("offset",
                                "100%").style("stop-color", "rgb(204,204,204)").style("stop-opacity", 0.5);
                            a = a.append("pattern").attr("id", "grip-texture").attr("patternUnits", "userSpaceOnUse").attr("x", 0).attr("y", 0).attr("width", 3).attr("height", 3);
                            a.append("rect").attr("height", 3).attr("width", 3).attr("stroke", "none").attr("fill", "rgba(204,204,204,0.5)");
                            a.append("circle").attr("cx", 1.5).attr("cy", 1.5).attr("r", 1).attr("stroke", "none").attr("fill", "url(#metal-bump)")
                        });
                        var c = k.selectAll(".map-layers").data([0]),
                            b = c.enter().append("g").attr("class",
                                "map-layers"),
                            g = d3.transition(c);
                        b.append("rect").attr("class", "canvas").attr("pointer-events", "all").style("opacity", 0);
                        g.attr("width", d).attr("height", n).attr("x", h.range()[0]).attr("y", l.range()[0]);
                        b = k.selectAll(".map-controls").data([0]);
                        b.enter().append("g").attr("class", "map-controls").each(function() {
                            var a = d3.select(this);
                            a.append("path").attr("class", "ui-show-hide").attr("d", "M10,3 v40 h-7 a3,3 0 0,1 -3,-3 v-34 a3,3 0 0,1 3,-3 Z").attr("fill", "url(#grip-texture)").attr("stroke", "none").style("opacity",
                                0.5);
                            a.append("path").attr("class", "show ui-show-hide").attr("d", "M2,23 l6,-15 v30 Z").attr("fill", "rgb(204,204,204)").attr("stroke", "none").style("opacity", 0.5);
                            a.append("path").attr("class", "hide").attr("d", "M8,23 l-6,-15 v30 Z").attr("fill", "rgb(204,204,204)").attr("stroke", "none").style("opacity", 0);
                            a.append("path").attr("d", "M10,3 v40 h-7 a3,3 0 0,1 -3,-3 v-34 a3,3 0 0,1 3,-3 Z").attr("pointer-events", "all").attr("fill", "none").attr("stroke", "none").style("cursor", "pointer").on("mouseover", function() {
                                a.selectAll("path.ui-show-hide").style("opacity",
                                    1)
                            }).on("mouseout", function() { a.selectAll("path.ui-show-hide").style("opacity", 0.5) }).on("click", function() {
                                a.select(".hide").classed("ui-show-hide") ? a.transition().duration(1E3).attr("transform", "translate(" + (a.attr("view-width") - 10) + ",0)").each("end", function() { a.select(".hide").style("opacity", 0).classed("ui-show-hide", !1);
                                    a.select(".show").style("opacity", 1).classed("ui-show-hide", !0);
                                    a.selectAll("path.ui-show-hide").style("opacity", 0.5) }) : a.transition().duration(1E3).attr("transform", "translate(" +
                                    (a.attr("view-width") - 95) + ",0)").each("end", function() { a.select(".show").style("opacity", 0).classed("ui-show-hide", !1);
                                    a.select(".hide").style("opacity", 1).classed("ui-show-hide", !0);
                                    a.selectAll("path.ui-show-hide").style("opacity", 0.5) })
                            });
                            a.append("rect").attr("x", 10).attr("y", 0).attr("width", 85).attr("fill", "rgba(204,204,204,0.9)").attr("stroke", "none");
                            a.append("g").attr("class", "layer-controls").attr("transform", "translate(15,5)")
                        });
                        var g = b.select(".hide").classed("ui-show-hide") ? 95 : 10,
                            p = Math.max(45,
                                10 + 20 * e.length);
                        b.attr("view-width", d).attr("transform", "translate(" + (d - g) + ",0)").select("rect").attr("height", p);
                        b = b.select("g.layer-controls").selectAll("g").data(e, function(a) {
                            return a.id() });
                        g = b.enter().append("g").attr("class", "ui-active").style("cursor", "pointer").on("click", function(a) {
                            var b = d3.select(this),
                                a = k.selectAll("g." + a.id());
                            b.classed("ui-active") ? (a.style("display", "none"), b.classed("ui-active", !1).classed("ui-default", !0)) : (a.style("display", "inherit"), b.classed("ui-active", !0).classed("ui-default", !1))
                        });
                        g.append("rect").attr("x", 0).attr("y", 1).attr("rx", 5).attr("ry", 5).attr("width", 75).attr("height", 18).attr("stroke-width", "1px");
                        g.append("text").attr("x", 10).attr("y", 15).style("font-size", "12px").style("font-family", "Helvetica, Arial, sans-serif").text(function(a) {
                            return a.title() });
                        b.transition().duration(1E3).attr("transform", function(a, b) {
                            return "translate(0," + 20 * (e.length - (b + 1)) + ")" });
                        c = c.selectAll(".maplayer").data(e, function(a) {
                            return a.id() });
                        c.enter().append("g").attr("class", function(a) {
                            return "maplayer " +
                                a.title()
                        }).append("g").attr("class", function(a) {
                            return a.id() }).datum(null);
                        c.exit().remove();
                        c.order();
                        c.each(function(b) { d3.select(this).select("g." + b.id()).datum(a[b.id()]).call(b) });
                        k.call(d3.behavior.zoom().scaleExtent([1, i]).on("zoom", function() {
                            if (f) {
                                var a = d3.event.scale,
                                    b = d3.event.translate;
                                k && (a && (k.__scale__ = a), b && 1 < b.length && (k.__translate__ = b), a = (1 - k.__scale__) * (h.range()[1] - h.range()[0]), b = (1 - k.__scale__) * (l.range()[1] - l.range()[0]), k.__translate__[0] = Math.min(h.range()[0], Math.max(k.__translate__[0],
                                    a)), k.__translate__[1] = Math.min(l.range()[0], Math.max(k.__translate__[1], b)), k.selectAll(".map-layers").attr("transform", "translate(" + k.__translate__ + ")scale(" + k.__scale__ + ")"))
                            }
                        }))
                    }
                })
            }
            var e = [],
                f = !0,
                i = 5,
                h = d3.scale.linear(),
                l = d3.scale.linear();
            a.xScale = function(c) {
                if (!arguments.length) return h;
                h = c;
                e.forEach(function(a) { a.xScale(h) });
                return a };
            a.yScale = function(c) {
                if (!arguments.length) return l;
                l = c;
                e.forEach(function(a) { a.yScale(l) });
                return a };
            a.panZoom = function(c) {
                if (!arguments.length) return f;
                f = c;
                return a
            };
            a.addLayer = function(c, d) { c.xScale(h);
                c.yScale(l);
                1 < arguments.length && 0 <= d ? e.splice(d, 0, c) : e.push(c);
                return a };
            return a
        };
        d3.floorplan.pathplot = function() {
            function a(a) { a.each(function(a) { a && (a = d3.select(this).selectAll("path").data(a, function(a) {
                return a.id }), a.exit().transition().style("opacity", 1E-6).remove(), a.enter().append("path").attr("vector-effect", "non-scaling-stroke").attr("fill", "none").style("opacity", 1E-6).append("title"), a.attr("class", function(a) {
                return a.classes || a.id }).attr("d", function(a, d) {
                return i(c(a, d)) }).select("title").text(function(a) {
                return a.title || a.id }), a.transition().style("opacity", 1)) }) }
            var e = d3.scale.linear(),
                f = d3.scale.linear(),
                i = d3.svg.line().x(function(a) {
                    return e(a.x) }).y(function(a) {
                    return f(a.y) }),
                h = "fp-pathplot-" + (new Date).valueOf(),
                l = "pathplot",
                c = function(a) {
                    return a.points };
            a.xScale = function(c) {
                if (!arguments.length) return e;
                e = c;
                return a };
            a.yScale = function(c) {
                if (!arguments.length) return f;
                f = c;
                return a };
            a.id = function() {
                return h };
            a.title = function(c) {
                if (!arguments.length) return l;
                l = c;
                return a };
            a.pointFilter = function(d) {
                if (!arguments.length) return c;
                c = d;
                return a };
            return a
        };


        var xscale = d3.scale.linear()
                .domain([0,50.0])
                .range([0,720]),
            yscale = d3.scale.linear()
                .domain([0,33.79])
                .range([0,339]),
            map = d3.floorplan().xScale(xscale).yScale(yscale), // 设置平面图，使其有缩放／平移功能
            pathplot = d3.floorplan.pathplot(),
            mapdata = {};



        // 负责初始图层绘制
        map.addLayer(pathplot);

        var pathData;

        switch (row) {
            case 1: pathData = [{"id": "flt-1", "classes": "planned",
                        "points": [{"x": 12.9, "y": 25}, {"x": 12.9, "y": 20},
                            {"x": 8.95, "y": 17.3}, {"x": 8.95, "y": 11.3}]}];
            break;
            case 2: pathData = [{"id": "flt-1", "classes": "planned",
                        "points": [{"x": 15, "y": 15}, {"x": 15.9, "y": 21},
                            {"x": 19.5, "y": 22}, {"x": 20.4, "y": 13}]}];
            break;
            case 3: pathData = [{"id": "flt-1", "classes": "planned",
                "points": [{"x": 1, "y": 2}, {"x": 1.9, "y": 2.1},
                    {"x": 9.5, "y": 9.3}, {"x": 5.4, "y": 1.3}]}];
            break;
            case 4: pathData = [{"id": "flt-1", "classes": "planned",
                "points": [{"x": 25, "y": 0}, {"x": 2.9, "y": 2.9},
                    {"x": 7, "y": 7}, {"x": 6, "y": 6}]}];
            break;
            default:
                pathData = [{"id": "flt-1", "classes": "planned",
                    "points": [{"x": 30, "y": 30}, {"x": 30, "y": 21},
                        {"x": 16.66, "y": 7.36}, {"x": 17.4, "y": 13}]}];
        }

        mapdata[pathplot.id()] = pathData; // 蓝色虚线绘制

        d3.select("#draw").append("g")
            .attr("height", 339).attr("width",720).attr("id", "test" + row)
            .datum(mapdata).call(map);

        d3.select(".map-controls").remove();

        console.log("add-path: #test"+ row + " finished");
    }

    remove (row, event) {
        d3.select("#test" + row).remove();
        console.log("remove-path: #test" + row + " finished");
    }

    removeMapControls() {
        d3.select(".map-controls").remove();
    }


    componentDidMount() {
        this.InitView();
    }

    // 用于自动获取高和宽
    getWidth() {
        console.log(document.getElementById('demo').parentNode.offsetHeight,document.getElementById('demo').parentNode.offsetWidth);
    }

    fullScreen() {
        const elem = document.getElementById("demo");
        this.requestFullScreen(elem);
    }

    requestFullScreen(element) {
        // var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
        // if (requestMethod) {
        //     requestMethod.call(element);
        // } else if (typeof window.ActiveXObject !== "undefined") {
        //     var wscript = new ActiveXObject("WScript.Shell");
        //     if (wscript !== null) {
        //         wscript.SendKeys("{F11}");
        //     }
        // }
        console.log(Tracks.find().fetch());
    }



    render() {
        return (
            <Card id="error">
                {/*<CardHeader title="Welcome to the administration" />*/}
                <CardText>
                    <Table
                        selectable={false} // 可选
                        fixedHeader={false}
                        multiSelectable={false}
                    >
                        <TableHeader
                            displaySelectAll={false}
                            adjustForCheckbox={false}
                            enableSelectAll={false}
                        >
                            <TableRow>
                                <TableHeaderColumn>编号</TableHeaderColumn>
                                <TableHeaderColumn>Mac</TableHeaderColumn>
                                <TableHeaderColumn>进入时间</TableHeaderColumn>
                                <TableHeaderColumn>离开时间</TableHeaderColumn>
                                <TableHeaderColumn>是否离开</TableHeaderColumn>
                                <TableHeaderColumn>绘制</TableHeaderColumn>
                                <TableHeaderColumn>取消绘制</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody
                            stripedRows={false} // 隔行高亮
                            showRowHover={true}
                            displayRowCheckbox={false}
                        >

                            {testData.map((data, index) => (
                                <TableRow key={index} selected={data.selected}>
                                    <TableRowColumn>{index + 1}</TableRowColumn>
                                    <TableRowColumn>{data.mac}</TableRowColumn>
                                    <TableRowColumn>{data.getIn}</TableRowColumn>
                                    <TableRowColumn>{data.depart}</TableRowColumn>
                                    <TableRowColumn>{data.isExit}</TableRowColumn>
                                    <TableRowColumn>
                                        <IconButton onTouchTap={this.handleAddLayer.bind(this, index + 1)}>
                                            <ModeEdit color="#00bcd4"/>
                                        </IconButton>
                                    </TableRowColumn>
                                    <TableRowColumn>
                                        <IconButton onTouchTap={this.remove.bind(this, index + 1)}>
                                            <Clear color="#00bcd4"/>
                                        </IconButton>
                                    </TableRowColumn>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <button onClick={this.fullScreen.bind(this)}>全屏</button>
                    <div id="demo"></div>
                </CardText>
            </Card>
        );
    }
}
