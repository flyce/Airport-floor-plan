import React, { Component } from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import Toggle from 'material-ui/Toggle';
import d3 from 'd3';

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
            var layers = [],
                panZoomEnabled = true,
                maxZoom = 5,
                xScale = d3.scale.linear(),
                yScale = d3.scale.linear();

            function map(g) {
                var width = xScale.range()[1] - xScale.range()[0],
                    height = yScale.range()[1] - yScale.range()[0];

                g.each(function(data){
                    if (! data) return;

                    var g = d3.select(this);

                    // define common graphical elements
                    __init_defs(g.selectAll("defs").data([0]).enter().append("defs"));

                    // setup container for layers and area to capture events
                    var vis = g.selectAll(".map-layers").data([0]),
                        visEnter = vis.enter().append("g").attr("class","map-layers"),
                        visUpdate = d3.transition(vis);

                    visEnter.append("rect")
                        .attr("class", "canvas")
                        .attr("pointer-events","all")
                        .style("opacity",0);

                    visUpdate.attr("width", width)
                        .attr("height", height)
                        .attr("x",xScale.range()[0])
                        .attr("y",yScale.range()[0]);


                    // render and reorder layers
                    var maplayers = vis.selectAll(".maplayer")
                        .data(layers, function(l) {return l.id();});
                    maplayers.enter()
                        .append("g")
                        .attr("class", function(l) {return "maplayer " + l.title();})
                        .append("g")
                        .attr("class", function(l) {return l.id();})
                        .datum(null);
                    maplayers.exit().remove();
                    maplayers.order();

                    // redraw layers
                    maplayers.each(function(layer) {
                        d3.select(this).select("g." + layer.id()).datum(data[layer.id()]).call(layer);
                    });

                    // add pan - zoom behavior
                    g.call(d3.behavior.zoom().scaleExtent([1,maxZoom])
                        .on("zoom", function() {
                            if (panZoomEnabled) {
                                __set_view(g, d3.event.scale, d3.event.translate);
                            }
                        }));

                });
            }

            map.xScale = function(scale) {
                if (! arguments.length) return xScale;
                xScale = scale;
                layers.forEach(function(l) { l.xScale(xScale); });
                return map;
            };

            map.yScale = function(scale) {
                if (! arguments.length) return yScale;
                yScale = scale;
                layers.forEach(function(l) { l.yScale(yScale); });
                return map;
            };

            map.panZoom = function(enabled) {
                if (! arguments.length) return panZoomEnabled;
                panZoomEnabled = enabled;
                return map;
            };

            map.addLayer = function(layer, index) {
                layer.xScale(xScale);
                layer.yScale(yScale);

                if (arguments.length > 1 && index >=0) {
                    layers.splice(index, 0, layer);
                } else {
                    layers.push(layer);
                }

                return map;
            };

            function __set_view(g, s, t) {
                if (! g) return;
                if (s) g.__scale__ = s;
                if (t && t.length > 1) g.__translate__ = t;

                // limit translate to edges of extents
                var minXTranslate = (1 - g.__scale__) *
                    (xScale.range()[1] - xScale.range()[0]);
                var minYTranslate = (1 - g.__scale__) *
                    (yScale.range()[1] - yScale.range()[0]);

                g.__translate__[0] = Math.min(xScale.range()[0],
                    Math.max(g.__translate__[0], minXTranslate));
                g.__translate__[1] = Math.min(yScale.range()[0],
                    Math.max(g.__translate__[1], minYTranslate));
                g.selectAll(".map-layers")
                    .attr("transform",
                        "translate(" + g.__translate__ +
                        ")scale(" + g.__scale__ + ")");
            };

            function __init_defs(selection) {
                selection.each(function() {
                    var defs = d3.select(this);

                    var grad = defs.append("radialGradient")
                        .attr("id","metal-bump")
                        .attr("cx","50%")
                        .attr("cy","50%")
                        .attr("r","50%")
                        .attr("fx","50%")
                        .attr("fy","50%");

                    grad.append("stop")
                        .attr("offset","0%")
                        .style("stop-color","rgb(170,170,170)")
                        .style("stop-opacity",0.6);

                    grad.append("stop")
                        .attr("offset","100%")
                        .style("stop-color","rgb(204,204,204)")
                        .style("stop-opacity",0.5);

                    var grip = defs.append("pattern")
                        .attr("id", "grip-texture")
                        .attr("patternUnits", "userSpaceOnUse")
                        .attr("x",0)
                        .attr("y",0)
                        .attr("width",3)
                        .attr("height",3);

                    grip.append("rect")
                        .attr("height",3)
                        .attr("width",3)
                        .attr("stroke","none")
                        .attr("fill", "rgba(204,204,204,0.5)");

                    grip.append("circle")
                        .attr("cx", 1.5)
                        .attr("cy", 1.5)
                        .attr("r", 1)
                        .attr("stroke", "none")
                        .attr("fill", "url(#metal-bump)");
                });
            }

            function __init_controls(selection) {
                selection.each(function() {
                    var controls = d3.select(this);

                    controls.append("path")
                        .attr("class", "ui-show-hide")
                        .attr("d", "M10,3 v40 h-7 a3,3 0 0,1 -3,-3 v-34 a3,3 0 0,1 3,-3 Z")
                        .attr("fill","url(#grip-texture)")
                        .attr("stroke", "none")
                        .style("opacity", 0.5);

                    controls.append("path")
                        .attr("class", "show ui-show-hide")
                        .attr("d", "M2,23 l6,-15 v30 Z")
                        .attr("fill","rgb(204,204,204)")
                        .attr("stroke", "none")
                        .style("opacity", 0.5);

                    controls.append("path")
                        .attr("class", "hide")
                        .attr("d", "M8,23 l-6,-15 v30 Z")
                        .attr("fill","rgb(204,204,204)")
                        .attr("stroke", "none")
                        .style("opacity", 0);

                    controls.append("path")
                        .attr("d", "M10,3 v40 h-7 a3,3 0 0,1 -3,-3 v-34 a3,3 0 0,1 3,-3 Z")
                        .attr("pointer-events", "all")
                        .attr("fill","none")
                        .attr("stroke", "none")
                        .style("cursor","pointer")
                        .on("mouseover", function() {
                            controls.selectAll("path.ui-show-hide").style("opacity", 1);
                        })
                        .on("mouseout", function() {
                            controls.selectAll("path.ui-show-hide").style("opacity", 0.5);
                        })
                        .on("click", function() {
                            if (controls.select(".hide").classed("ui-show-hide")) {
                                controls.transition()
                                    .duration(1000)
                                    .attr("transform", "translate("+(controls.attr("view-width")-10)+",0)")
                                    .each("end", function() {
                                        controls.select(".hide")
                                            .style("opacity",0)
                                            .classed("ui-show-hide",false);
                                        controls.select(".show")
                                            .style("opacity",1)
                                            .classed("ui-show-hide",true);
                                        controls.selectAll("path.ui-show-hide")
                                            .style("opacity",0.5);
                                    });
                            } else {
                                controls.transition()
                                    .duration(1000)
                                    .attr("transform", "translate("+(controls.attr("view-width")-95)+",0)")
                                    .each("end", function() {
                                        controls.select(".show")
                                            .style("opacity",0)
                                            .classed("ui-show-hide",false);
                                        controls.select(".hide")
                                            .style("opacity",1)
                                            .classed("ui-show-hide",true);
                                        controls.selectAll("path.ui-show-hide")
                                            .style("opacity",0.5);
                                    });
                            }
                        });

                    controls.append("rect")
                        .attr("x",10)
                        .attr("y",0)
                        .attr("width", 85)
                        .attr("fill", "rgba(204,204,204,0.9)")
                        .attr("stroke", "none");

                    controls.append("g")
                        .attr("class", "layer-controls")
                        .attr("transform", "translate(15,5)");
                });
            }

            return map;
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
            var x = d3.scale.linear(),
                y = d3.scale.linear(),
                id = "fp-overlays-" + new Date().valueOf(),
                name = "overlays",
                canvasCallbacks = [],
                selectCallbacks = [],
                moveCallbacks = [],
                editMode = false,
                line = d3.svg.line() // 新建一个线生成器
                    .x(function(d) { return x(d.x); })
                    .y(function(d) { return y(d.y); }),
                dragBehavior = d3.behavior.drag() // 创建拖动行为
                    .on("dragstart", __dragItem)
                    .on("drag", __mousemove)
                    .on("dragend", __mouseup),
                dragged = null,
                pointPosition = [];

            function overlays(g) {
                // console.log(g[0][0]);
                // <g class="fp-overlays-1492436229741"><rect class="overlay-canvas" pointer-events="all" x="0" y="0" height="487" width="720" style="opacity: 0;"></rect><path class="polygon" vector-effect="non-scaling-stroke" pointer-events="all" d="M238.00000000000048,321.0000000000005L172.00000000000003,253.00000000000068L134.00000000000009,187.00000000000057L153,92.00000000000009L226.00000000000017,96.00000000000017L321,107.00000000000037L372.9999999999999,123.00000000000041L456.99999999999983,194.0000000000003L483.99999999999926,269.0000000000007L378,350.00000000000114Z" style="cursor: move;"><title>kitchen</title></path><circle class="vertex" pointer-events="all" vector-effect="non-scaling-stroke" r="4" cx="238.00000000000048" cy="321.0000000000005" style="cursor: move;"></circle><circle class="vertex" pointer-events="all" vector-effect="non-scaling-stroke" r="4" cx="172.00000000000003" cy="253.00000000000068" style="cursor: move;"></circle><circle class="vertex" pointer-events="all" vector-effect="non-scaling-stroke" r="4" cx="134.00000000000009" cy="187.00000000000057" style="cursor: move;"></circle><circle class="vertex" pointer-events="all" vector-effect="non-scaling-stroke" r="4" cx="153" cy="92.00000000000009" style="cursor: move;"></circle><circle class="vertex" pointer-events="all" vector-effect="non-scaling-stroke" r="4" cx="226.00000000000017" cy="96.00000000000017" style="cursor: move;"></circle><circle class="vertex" pointer-events="all" vector-effect="non-scaling-stroke" r="4" cx="321" cy="107.00000000000037" style="cursor: move;"></circle><circle class="vertex" pointer-events="all" vector-effect="non-scaling-stroke" r="4" cx="372.9999999999999" cy="123.00000000000041" style="cursor: move;"></circle><circle class="vertex" pointer-events="all" vector-effect="non-scaling-stroke" r="4" cx="456.99999999999983" cy="194.0000000000003" style="cursor: move;"></circle><circle class="vertex" pointer-events="all" vector-effect="non-scaling-stroke" r="4" cx="483.99999999999926" cy="269.0000000000007" style="cursor: move;"></circle><circle class="vertex" pointer-events="all" vector-effect="non-scaling-stroke" r="4" cx="378" cy="350.00000000000114" style="cursor: move;"></circle></g>
                g.each(function(data){
                    if (! data) return;
                    var g = d3.select(this);

                    // setup rectangle for capturing events
                    // 设置用于捕获事件的矩形
                    var canvas = g.selectAll("rect.overlay-canvas").data([0]);

                    canvas.enter().append("rect") // .enter() 为缺失的元素返回占位符
                        .attr("class", "overlay-canvas")
                        .style("opacity", 0)
                        .attr("pointer-events", "all")
                        .on("click", function() {
                            if (editMode) {
                                var p = d3.mouse(this);
                                canvasCallbacks.forEach(function(cb) {
                                    cb(x.invert(p[0]), y.invert(p[1]));
                                });
                            }
                        })
                        .on("mouseup.drag", __mouseup)
                        .on("touchend.drag", __mouseup);

                    canvas.attr("x", x.range()[0])
                        .attr("y", y.range()[0])
                        .attr("height", y.range()[1] - y.range()[0])
                        .attr("width", x.range()[1] - x.range()[0]);

                    // draw polygons (currently only type supported) // 绘制多边形
                    var polygons = g.selectAll("path.polygon")
                        .data(data.polygons || [], function(d) {return d.id;});

                    polygons.enter().append("path")
                        .attr("class", "polygon")
                        .attr("vector-effect", "non-scaling-stroke")
                        .attr("pointer-events", "all")
                        .on("mousedown", function(d) { // 为交互添加或移除事件监听器
                            selectCallbacks.forEach(function(cb) {
                                cb(d.id);
                            });
                        })
                        .call(dragBehavior)
                        .append("title");

                    polygons.exit().transition().style("opacity", 1e-6).remove();

                    polygons
                        .attr("d", function(d) {return line(d.points) + "Z";})
                        .style("cursor", editMode ? "move" : "pointer")
                        .select("title")
                        .text(function(d) { return d.name || d.id; });

                    if (editMode) {
                        var pointData = [];
                        if (data.polygons) {
                            data.polygons.forEach(function(polygon) {
                                polygon.points.forEach(function(pt, i) {
                                    pointData.push({"index":i,
                                        "parent":polygon});
                                });
                            });
                        }

                        // determine current view scale to make appropriately
                        // sized points to drag
                        var scale = 1;
                        var node = g.node();
                        while (node.parentNode) {
                            node = node.parentNode;
                            if (node.__scale__) {
                                scale = node.__scale__;
                                break;
                            }
                        }

                        var points = g.selectAll("circle.vertex")
                            .data(pointData, function(d) {
                                return d.parent.id + "-" + d.index;});

                        points.exit().transition()
                            .attr("r", 1e-6).remove();

                        points.enter().append("circle")
                            .attr("class", "vertex")
                            .attr("pointer-events", "all")
                            .attr("vector-effect", "non-scaling-stroke")
                            .style("cursor", "move")
                            .attr("r", 1e-6)
                            .call(dragBehavior);

                        points
                            .attr("cx", function(d) {
                                pointPosition[d.index] = {x: d.parent.points[d.index].x, y: d.parent.points[d.index].y};
                                // console.log(d.index);
                                // console.log(d.parent.points[d.index]);
                                return x(d.parent.points[d.index].x);
                            })
                            .attr("cy", function(d) { return y(d.parent.points[d.index].y); })
                            .attr("r", 4/scale);
                    } else {
                        g.selectAll("circle.vertex").transition()
                            .attr("r", 1e-6).remove();
                    }

                    /***
                     * 新增功能 将每个关键点的位置以 json 的形式输出
                     * @type {string}
                     */

                    var json = '每次鼠标移动某个点后\n控制台输出的最后信息才是有用信息!\n';
                    pointPosition.map(function(value, key) {
                        if ((key + 1) == pointPosition.length) {
                            json = json + '{"x": '+ value.x + ', "y": '+ value.y + '}\n';
                        } else {
                            json = json + '{"x": '+ value.x + ', "y": '+ value.y + '},\n';
                        }
                    })
                    console.log("%c"+json, "color: #757575");
                });
            }

            overlays.xScale = function(scale) {
                if (! arguments.length) return x;
                x = scale;
                return overlays;
            };

            overlays.yScale = function(scale) {
                if (! arguments.length) return y;
                y = scale;
                return overlays;
            };

            overlays.id = function() {
                return id;
            };

            overlays.title = function(n) {
                if (! arguments.length) return name;
                name = n;
                return overlays;
            };

            overlays.editMode = function(enable) {
                if (! arguments.length) return editMode;
                editMode = enable;
                return overlays;
            };

            overlays.registerCanvasCallback = function(cb) {
                if (arguments.length) canvasCallbacks.push(cb);
                return overlays;
            };

            overlays.registerSelectCallback = function(cb) {
                if (arguments.length) select.Callbacks.push(cb);
                return overlays;
            };

            overlays.registerMoveCallback = function(cb) {
                if (arguments.length) moveCallbacks.push(cb);
                return overlays;
            };

            function __dragItem(d) {
                if (editMode) dragged = d;
            }

            function __mousemove() {
                if (dragged) {
                    var dx = x.invert(d3.event.dx) - x.invert(0);
                    var dy = y.invert(d3.event.dy) - y.invert(0);
                    if (dragged.parent) { // a point
                        dragged.parent.points[dragged.index].x += dx;
                        dragged.parent.points[dragged.index].y += dy;

                        /***
                         * // %c 用于自定义 控制台输出的颜色
                         */
                        console.log("%cNo. " + dragged.index +"\nx: " +
                            dragged.parent.points[dragged.index].x +
                            " y: " + dragged.parent.points[dragged.index].y, "color: #F44336");

                        // console.log(dragged.parent.points[dragged.index].x + ' ' + dragged.parent.points[dragged.index].x);
                    } else if (dragged.points) { // a composite object
                        dragged.points.forEach(function(pt) {
                            pt.x += dx;
                            pt.y += dy;
                        });
                    }
                    // parent is container for overlays
                    overlays(d3.select(this.parentNode));
                }
            }

            function __mouseup() {
                if (dragged) {
                    moveCallbacks.forEach(function(cb) {
                        dragged.parent ? cb(dragged.parent.id, dragged.parent.points, dragged.index) :
                            cb(dragged.id, dragged.points);
                    });
                    dragged = null;
                }
            }

            return overlays;
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

                    console.log(new Date());

                    paths
                        .attr("class", function(d) { return d.classes || d.id; })
                        .attr("d", function(d,i) { line(pointFilter(d,i)); })
                        .select("title")
                        .text(function(d) { return d.title || d.id; });

                    console.log(new Date());

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
        /***
         * 自定义方法 用于在某个点放置一个三角形
         * @returns {monitor}
         */
        d3.floorplan.monitor = function() {
            var x = d3.scale.linear(),
                y = d3.scale.linear(),
                id = "fp-overlays-" + new Date().valueOf(),
                name = "monitor",
                editMode = false,
                pointPosition = [];

            function monitor(g) {
                g.each(function(data){
                    if (! data) return;
                    var g = d3.select(this);

                    var pointData = [];
                    if (data.polygons) {
                        data.polygons.forEach(function(polygon) {
                            polygon.points.forEach(function(pt, i) {
                                pointData.push({"index":i,
                                    "parent":polygon});
                            });
                        });
                    }

                    // determine current view scale to make appropriately
                    // sized points to drag
                    var scale = 1;


                    var points = g.selectAll("circle.vertex")
                        .data(pointData, function(d) {
                            return d.parent.id + "-" + d.index;});

                    points.enter().append("circle")
                        .attr("class", "vertex")
                        .attr("pointer-events", "all")
                        .attr("vector-effect", "non-scaling-stroke")
                        .style("cursor", "move")
                        .attr("r", 1e-6)

                    points
                        .attr("cx", function(d) {
                            pointPosition[d.index] = {x: d.parent.points[d.index].x, y: d.parent.points[d.index].y};
                            return x(d.parent.points[d.index].x);
                        })
                        .attr("cy", function(d) { return y(d.parent.points[d.index].y); })
                        .attr("r", 4/scale);

                });
            }

            monitor.xScale = function(scale) {
                if (! arguments.length) return x;
                x = scale;
                return monitor;
            };

            monitor.yScale = function(scale) {
                if (! arguments.length) return y;
                y = scale;
                return overlays;
            };

            monitor.id = function() {
                return id;
            };

            monitor.title = function(n) {
                if (! arguments.length) return name;
                name = n;
                return monitor;
            };

            monitor.editMode = function(enable) {
                if (! arguments.length) return editMode;
                editMode = enable;
                return monitor;
            };


            return monitor;
        };
        // d3 floorplan end

        var xscale = d3.scale.linear()
                .domain([0,50.0])
                .range([0,this.getWidth()]), // 720
            yscale = d3.scale.linear()
                .domain([0,33.79])
                .range([0,this.getHeight()]), // 339
            map = d3.floorplan().xScale(xscale).yScale(yscale), // 设置平面图，使其有缩放／平移功能
            imagelayer = d3.floorplan.imagelayer(),             // 创建新的图像图层
            // heatmap = d3.floorplan.heatmap(),
            // vectorfield = d3.floorplan.vectorfield(),
            // pathplot = d3.floorplan.pathplot(),
            overlays = d3.floorplan.overlays().editMode(false),
            monitor = d3.floorplan.monitor(),
            mapdata = {};

        mapdata[imagelayer.id()] = [{
            url: '/backgroundImage',
            x: 0,
            y: 0,
            height: 33.79,
            width: 50.0
        }];

        // 负责初始图层绘制
        map.addLayer(imagelayer) // 背景图片 使用的时候打开即可
            .addLayer(overlays)
            .addLayer(monitor);

        d3.json("/data", function(data) {
            //mapdata[heatmap.id()] = data.overlays; // 渲染淡红色的区域
            mapdata[overlays.id()] = data.overlays; // 渲染淡红色后的背景
            mapdata[monitor.id()] = data.monitor;
            //mapdata[vectorfield.id()] = data.vectorfield; // Entrance 区域的斜线
            //mapdata[pathplot.id()] = data.pathplot; // 蓝色虚线绘制

            d3.select("#demo").append("svg")
                .attr("height", this.getHeight()).attr("width",this.getWidth()).attr("id", "draw")
                .datum(mapdata).call(map);
        }.bind(this));

        console.log("background-image:","finished");
    }

    handleAddLayer(row, event) {

        d3.floorplan = function() {
            var layers = [],
                panZoomEnabled = true,
                maxZoom = 5,
                xScale = d3.scale.linear(),
                yScale = d3.scale.linear();

            function map(g) {
                var width = xScale.range()[1] - xScale.range()[0],
                    height = yScale.range()[1] - yScale.range()[0];

                g.each(function(data){
                    if (! data) return;

                    var g = d3.select(this);

                    // define common graphical elements
                    __init_defs(g.selectAll("defs").data([0]).enter().append("defs"));

                    // setup container for layers and area to capture events
                    var vis = g.selectAll(".map-layers").data([0]),
                        visEnter = vis.enter().append("g").attr("class","map-layers"),
                        visUpdate = d3.transition(vis);

                    visEnter.append("rect")
                        .attr("class", "canvas")
                        .attr("pointer-events","all")
                        .style("opacity",0);

                    visUpdate.attr("width", width)
                        .attr("height", height)
                        .attr("x",xScale.range()[0])
                        .attr("y",yScale.range()[0]);


                    // render and reorder layers
                    var maplayers = vis.selectAll(".maplayer")
                        .data(layers, function(l) {return l.id();});
                    maplayers.enter()
                        .append("g")
                        .attr("class", function(l) {return "maplayer " + l.title();})
                        .append("g")
                        .attr("class", function(l) {return l.id();})
                        .datum(null);
                    maplayers.exit().remove();
                    maplayers.order();

                    // redraw layers
                    maplayers.each(function(layer) {
                        d3.select(this).select("g." + layer.id()).datum(data[layer.id()]).call(layer);
                    });

                    // add pan - zoom behavior
                    g.call(d3.behavior.zoom().scaleExtent([1,maxZoom])
                        .on("zoom", function() {
                            if (panZoomEnabled) {
                                __set_view(g, d3.event.scale, d3.event.translate);
                            }
                        }));

                });
            }

            map.xScale = function(scale) {
                if (! arguments.length) return xScale;
                xScale = scale;
                layers.forEach(function(l) { l.xScale(xScale); });
                return map;
            };

            map.yScale = function(scale) {
                if (! arguments.length) return yScale;
                yScale = scale;
                layers.forEach(function(l) { l.yScale(yScale); });
                return map;
            };

            map.panZoom = function(enabled) {
                if (! arguments.length) return panZoomEnabled;
                panZoomEnabled = enabled;
                return map;
            };

            map.addLayer = function(layer, index) {
                layer.xScale(xScale);
                layer.yScale(yScale);

                if (arguments.length > 1 && index >=0) {
                    layers.splice(index, 0, layer);
                } else {
                    layers.push(layer);
                }

                return map;
            };

            function __set_view(g, s, t) {
                if (! g) return;
                if (s) g.__scale__ = s;
                if (t && t.length > 1) g.__translate__ = t;

                // limit translate to edges of extents
                var minXTranslate = (1 - g.__scale__) *
                    (xScale.range()[1] - xScale.range()[0]);
                var minYTranslate = (1 - g.__scale__) *
                    (yScale.range()[1] - yScale.range()[0]);

                g.__translate__[0] = Math.min(xScale.range()[0],
                    Math.max(g.__translate__[0], minXTranslate));
                g.__translate__[1] = Math.min(yScale.range()[0],
                    Math.max(g.__translate__[1], minYTranslate));
                g.selectAll(".map-layers")
                    .attr("transform",
                        "translate(" + g.__translate__ +
                        ")scale(" + g.__scale__ + ")");
            };

            function __init_defs(selection) {
                selection.each(function() {
                    var defs = d3.select(this);

                    var grad = defs.append("radialGradient")
                        .attr("id","metal-bump")
                        .attr("cx","50%")
                        .attr("cy","50%")
                        .attr("r","50%")
                        .attr("fx","50%")
                        .attr("fy","50%");

                    grad.append("stop")
                        .attr("offset","0%")
                        .style("stop-color","rgb(170,170,170)")
                        .style("stop-opacity",0.6);

                    grad.append("stop")
                        .attr("offset","100%")
                        .style("stop-color","rgb(204,204,204)")
                        .style("stop-opacity",0.5);

                    var grip = defs.append("pattern")
                        .attr("id", "grip-texture")
                        .attr("patternUnits", "userSpaceOnUse")
                        .attr("x",0)
                        .attr("y",0)
                        .attr("width",3)
                        .attr("height",3);

                    grip.append("rect")
                        .attr("height",3)
                        .attr("width",3)
                        .attr("stroke","none")
                        .attr("fill", "rgba(204,204,204,0.5)");

                    grip.append("circle")
                        .attr("cx", 1.5)
                        .attr("cy", 1.5)
                        .attr("r", 1)
                        .attr("stroke", "none")
                        .attr("fill", "url(#metal-bump)");
                });
            }

            function __init_controls(selection) {
                selection.each(function() {
                    var controls = d3.select(this);

                    controls.append("path")
                        .attr("class", "ui-show-hide")
                        .attr("d", "M10,3 v40 h-7 a3,3 0 0,1 -3,-3 v-34 a3,3 0 0,1 3,-3 Z")
                        .attr("fill","url(#grip-texture)")
                        .attr("stroke", "none")
                        .style("opacity", 0.5);

                    controls.append("path")
                        .attr("class", "show ui-show-hide")
                        .attr("d", "M2,23 l6,-15 v30 Z")
                        .attr("fill","rgb(204,204,204)")
                        .attr("stroke", "none")
                        .style("opacity", 0.5);

                    controls.append("path")
                        .attr("class", "hide")
                        .attr("d", "M8,23 l-6,-15 v30 Z")
                        .attr("fill","rgb(204,204,204)")
                        .attr("stroke", "none")
                        .style("opacity", 0);

                    controls.append("path")
                        .attr("d", "M10,3 v40 h-7 a3,3 0 0,1 -3,-3 v-34 a3,3 0 0,1 3,-3 Z")
                        .attr("pointer-events", "all")
                        .attr("fill","none")
                        .attr("stroke", "none")
                        .style("cursor","pointer")
                        .on("mouseover", function() {
                            controls.selectAll("path.ui-show-hide").style("opacity", 1);
                        })
                        .on("mouseout", function() {
                            controls.selectAll("path.ui-show-hide").style("opacity", 0.5);
                        })
                        .on("click", function() {
                            if (controls.select(".hide").classed("ui-show-hide")) {
                                controls.transition()
                                    .duration(1000)
                                    .attr("transform", "translate("+(controls.attr("view-width")-10)+",0)")
                                    .each("end", function() {
                                        controls.select(".hide")
                                            .style("opacity",0)
                                            .classed("ui-show-hide",false);
                                        controls.select(".show")
                                            .style("opacity",1)
                                            .classed("ui-show-hide",true);
                                        controls.selectAll("path.ui-show-hide")
                                            .style("opacity",0.5);
                                    });
                            } else {
                                controls.transition()
                                    .duration(1000)
                                    .attr("transform", "translate("+(controls.attr("view-width")-95)+",0)")
                                    .each("end", function() {
                                        controls.select(".show")
                                            .style("opacity",0)
                                            .classed("ui-show-hide",false);
                                        controls.select(".hide")
                                            .style("opacity",1)
                                            .classed("ui-show-hide",true);
                                        controls.selectAll("path.ui-show-hide")
                                            .style("opacity",0.5);
                                    });
                            }
                        });

                    controls.append("rect")
                        .attr("x",10)
                        .attr("y",0)
                        .attr("width", 85)
                        .attr("fill", "rgba(204,204,204,0.9)")
                        .attr("stroke", "none");

                    controls.append("g")
                        .attr("class", "layer-controls")
                        .attr("transform", "translate(15,5)");
                });
            }

            return map;
        };
        d3.floorplan.pathplot = function() {
            var x = d3.scale.linear(),
                y = d3.scale.linear(),
                line = d3.svg.line()
                    .x(function(d) {
                        return x(d.x); })
                    .y(function(d) { return y(d.y); })
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

                    paths.transition()
                        .delay(100)
                        .duration(1000)
                        .ease("linear")
                        .each("start", function (d,i) {
                            console.log(d + i);
                            console.log("start");
                        })
                        .style("opacity", 1);
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


        var xscale = d3.scale.linear()
                .domain([0,50.0])
                .range([0,this.getWidth()]), //730
            yscale = d3.scale.linear()
                .domain([0,33.79])
                .range([0,this.getHeight()]), //339
            map = d3.floorplan().xScale(xscale).yScale(yscale), // 设置平面图，使其有缩放／平移功能
            pathplot = d3.floorplan.pathplot(),
            mapdata = {};



        // 负责初始图层绘制
        map.addLayer(pathplot);

        var pathData;

        switch (row) {
            case 1: pathData = [{"id": "flt-2", "classes": "planned","title": "测试",
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
            .attr("height", this.getHeight()).attr("width",this.getWidth()).attr("id", "test" + row)
            .datum(mapdata).call(map);

        d3.select(".map-controls").remove();

        console.log("add-path: #test"+ row + " finished");
    }

    handlePathToggle(row, event) {
        console.log(row);
        console.log(event.target.getAttribute("value"));
    }

    remove (row, event) {
        d3.select("#test" + row).remove();
        console.log("remove-path: #test" + row + " finished");
    }


    componentDidMount() {
        this.InitView();
    }

    // svg 大小自适应
    getWidth() {
        return document.getElementById('demo').offsetWidth;
    }

    getHeight() {
        return parseInt(this.getWidth() / 2.13) + 1;
    }

    fullScreen() {
        const elem = document.getElementById("demo");
        this.requestFullScreen(elem);
    }

    requestFullScreen(element) {
        var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
        if (requestMethod) {
            requestMethod.call(element);
        } else if (typeof window.ActiveXObject !== "undefined") {
            var wscript = new ActiveXObject("WScript.Shell");
            if (wscript !== null) {
                wscript.SendKeys("{F11}");
            }
        }
    }

    render() {
        return (
            <Card>
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
                                        <Toggle
                                            labelPosition="left"
                                            onToggle={this.handlePathToggle.bind(this, index + 1 )}
                                        />
                                        {/*<IconButton onTouchTap={this.handleAddLayer.bind(this, index + 1)}>*/}
                                            {/*<ModeEdit color="#00bcd4"/>*/}
                                        {/*</IconButton>*/}
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
                    <button onClick={this.getWidth}>宽</button>
                    <div id="demo"></div>
                </CardText>
            </Card>
        );
    }
}
