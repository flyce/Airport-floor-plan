import React, { Component, PropTypes } from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import Toggle from 'material-ui/Toggle';
import d3 from 'd3';

// icon
import ModeEdit from "material-ui/svg-icons/editor/mode-edit";
import Clear from "material-ui/svg-icons/content/clear";

// Database
import { Guests } from '../api/guests.js';

import { createContainer } from 'meteor/react-meteor-data';


class SimilarTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowMonitor: false
        };

        this.handleAddLayer = this.handleAddLayer.bind(this);
    }

    componentDidMount() {
        this.InitView();
    }

    // 初始化机场图层
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
        // d3 floorplan end

        var xscale = d3.scale.linear()
                .domain([0,50.0])
                .range([0,this.getWidth()]), // 720
            yscale = d3.scale.linear()
                .domain([0,33.79])
                .range([0,this.getHeight()]), // 339
            map = d3.floorplan().xScale(xscale).yScale(yscale), // 设置平面图，使其有缩放／平移功能
            imagelayer = d3.floorplan.imagelayer(),             // 创建新的图像图层
            overlays = d3.floorplan.overlays().editMode(false),
            mapdata = {};

        mapdata[imagelayer.id()] = [{
            url: '/backgroundImage',
            x: 0,
            y: 0,
            height: 33.79,
            width: 50.0
        }];

        // 负责初始图层绘制
        map//.addLayer(imagelayer) // 背景图片 使用的时候打开即可
            .addLayer(overlays);

        d3.json("/data", function(data) {
            mapdata[overlays.id()] = data.overlays; // 渲染淡红色后的背景

            d3.select("#demo").append("svg")
                .attr("height", this.getHeight()).attr("width",this.getWidth()).attr("id", "draw")
                .datum(mapdata).call(map);
        }.bind(this));
        console.log("background-image:","finished");
    }

    // 新增旅客轨迹
    handleAddLayer(macAddress, event) {
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
                    // .delay(100)
                    // .duration(5000)
                        .ease("linear")
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

        if (!document.getElementById("path-" + macAddress)) {
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

            let points = this.getData(macAddress);
            let pathData = [{"id": "flt-2", "classes": "planned","title": "测试",
                "points": []}];

            let pathPoint = [];

            for (let i = points.tracks.length - 1; i >= 0 ; --i) {
                pathPoint.push(this.convertLocation(points.tracks[i].point));
            }

            pathData[0]["points"] = pathPoint;

            mapdata[pathplot.id()] = pathData; // 蓝色虚线绘制

            d3.select("#draw").append("g")
                .attr("height", this.getHeight()).attr("width",this.getWidth()).attr("id", "path-" + macAddress)
                .datum(mapdata).call(map);

            console.log("add-path: #path-"+ macAddress + " finished");
        }
    }

    // 移除旅客轨迹
    handleRemoveLayer(macAddress, event) {
        if (document.getElementById("path-" + macAddress)) {
            d3.select("#path-" + macAddress).remove();
            console.log("remove-path: #path-" + macAddress + " finished");
        }
    }

    /***
     * 地图控制
     ***/
    handleMapToggle() {
        if (this.state.isShowMonitor) {
            this.handleRemoveMonitor();
        } else {
            this.handleAddMonitor();
        }

        this.setState({
            isShowMonitor: !this.state.isShowMonitor
        });
    }

    handleAddMonitor() {
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
                return monitor;
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

        var xscale = d3.scale.linear()
                .domain([0,50.0])
                .range([0,this.getWidth()]), // 720
            yscale = d3.scale.linear()
                .domain([0,33.79])
                .range([0,this.getHeight()]), // 339
            map = d3.floorplan().xScale(xscale).yScale(yscale), // 设置平面图，使其有缩放／平移功能
            monitor = d3.floorplan.monitor(),
            mapdata = {};

        // 负责初始图层绘制
        map.addLayer(monitor);

        d3.json("/data", function(data) {
            mapdata[monitor.id()] = data.monitor;
            d3.select("#draw").append("g")
                .attr("height", this.getHeight()).attr("width",this.getWidth()).attr("id", "monitor")
                .datum(mapdata).call(map);
        }.bind(this));

        console.log("monitor:"," add finished");
    }

    handleRemoveMonitor() {
        d3.select("#monitor").remove();

        console.log("monitor:","remove finished");
    }

    // svg 大小自适应
    getWidth() {
        return document.getElementById('demo').offsetWidth;
    }

    getHeight() {
        return parseInt(this.getWidth() / 2.13) + 1;
    }

    // 全屏幕
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
                                <TableHeaderColumn colSpan="6" style={{textAlign: 'center', fontSize: 20}}>
                                    疑似与40:a5:ef:d3:c5:d6同行的旅客
                                </TableHeaderColumn>
                            </TableRow>
                            <TableRow>
                                <TableHeaderColumn>编号</TableHeaderColumn>
                                <TableHeaderColumn>Mac</TableHeaderColumn>
                                <TableHeaderColumn>相同的点数</TableHeaderColumn>
                                <TableHeaderColumn>相似度</TableHeaderColumn>
                                <TableHeaderColumn>绘制</TableHeaderColumn>
                                <TableHeaderColumn>取消绘制</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody
                            stripedRows={false} // 隔行高亮
                            showRowHover={true}
                            displayRowCheckbox={false}
                        >

                            {this.props.guests.map((data, index) => (
                                <TableRow key={index} selected={data.selected}>
                                    <TableRowColumn>{index + 1}</TableRowColumn>
                                    <TableRowColumn>{data.macAddress}</TableRowColumn>
                                    <TableRowColumn>{new Date(data.tracks[1]["timeStamp"] * 1000 ).toLocaleString('chinese', {hour12:false})}</TableRowColumn>
                                    <TableRowColumn>{new Date(data.tracks[data.tracks.length - 1]["timeStamp"] * 1000).toLocaleString('chinese', {hour12:false})}</TableRowColumn>
                                    <TableRowColumn>
                                        <IconButton onTouchTap={this.handleAddLayer.bind(this, data.macAddress)}>
                                            <ModeEdit color="#00bcd4"/>
                                        </IconButton>
                                    </TableRowColumn>
                                    <TableRowColumn>
                                        <IconButton onTouchTap={this.handleRemoveLayer.bind(this, data.macAddress)}>
                                            <Clear color="#00bcd4"/>
                                        </IconButton>
                                    </TableRowColumn>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {/*<button onClick={this.fullScreen.bind(this)}>全屏</button>*/}
                    <Toggle
                        label="显示采集设备位置"
                        labelPosition="left"
                        onToggle={this.handleMapToggle.bind(this)}
                    />
                    <div id="demo"></div>
                </CardText>
            </Card>
        );
    }
}


SimilarTable.propTypes = {
    guests: PropTypes.array.isRequired,
};

export default createContainer(() => {
    return {
        guests: Guests.find().fetch(),
    };
}, SimilarTable);
