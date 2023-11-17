import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import heatmapData from "../../data/heatmap.csv";

const Heatmap = ({ width }) => {
    const svgRef = useRef(null);
    const margin = ({ top: 40, right: 50, bottom: 70, left: 100 });

    const Timezone = ["Asia AM", "Asia PM", "NYC AM", "NYC PM"];
    const months = d3.range(6,10);

    const w = width - margin.left - margin.right;
    const gridSize = Math.floor(w / months.length);
    const h = gridSize * Timezone.length + margin.top + margin.bottom;

    const legendBarHeight = 10;
    const formatValue = d3.format(".2%");

    const [data, setData] = useState([]);
    
    useEffect(() => {
        d3.csv(heatmapData).then(function(d) {
            d.forEach((row, index) => {
                d[index] = {
                    Timezone: parseInt(row.Timezone),
                    Month: parseInt(row.Month),
                    Value: parseFloat(row.Value)
                };
            });
            setData(d);
        }).catch(function(err) {
            throw err;
        });

        const color = d3.scaleLinear()
            .domain([d3.min(data, d => d.Value), 0, d3.max(data, d => d.Value)])
            .range(["#FCC117", "#FFFFFF", "#608AD8"]);

        const legend = g => {
            g.attr("transform", `translate(0, ${h - margin.bottom - legendBarHeight })`)
            .append("rect")
                .attr("width", w)
                .attr("height", legendBarHeight)
                .style("fill", "url(#linear-gradient)");
            
            g.call(axisBottom)
                .selectAll(".axis line")
                .style("stroke", "#FFFFFF");
        };

        const axisScale = d3.scaleLinear()
            .domain(color.domain())
            .range([0, w]);

        const axisBottom = g => {
            g.classed("axis axis--bottom", true)
                .attr("transform", `translate(0, ${h - margin.bottom - legendBarHeight})`)
                .call(d3.axisBottom(axisScale)
                    .ticks(width / 80)
                    .tickSize(legendBarHeight)    
                    .tickFormat(d3.format(".0%")))
                    .style("font-size", 20)
                .select(".domain")
                .remove()
        };

        const svg = d3.select(svgRef.current)
            .attr("width", width)
            .attr("height", h)
            .classed("crashes-heatmap", true);
        
        svg.selectAll("*").remove();
        
        const defs = svg.append("defs");
        const linearGradient = defs.append("linearGradient")
            .attr("id", "linear-gradient");
        
        linearGradient.selectAll("stop")
            .data(color.ticks().map((t, i, n) => ({ offset: `${100*i/n.length}%`, color: color(t) })))
            .enter().append("stop")
            .attr("offset", d => d.offset)
            .attr("stop-color", d => d.color);

        const g = svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
        
        g.selectAll("rect")
            .data(data)
            .enter().append("rect")
                .attr("x", d => d.Month * gridSize)
                .attr("y", d => d.Timezone * gridSize)
                .attr("width", gridSize)
                .attr("height", gridSize)
                .attr("fill", d => color(d.Value))
                .attr("stroke", "#e2e2e2");
          
        g.selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .attr("x", d => d.Month * gridSize + gridSize/2)
            .attr("y", d => d.Timezone * gridSize + gridSize/2)
            .style("text-anchor", "middle")
            .style("font-size", 20)
            .attr("dy", ".35em")
            .text(d => formatValue(d.Value));
        
        g.selectAll(".timezone")
            .data(Timezone)
            .enter().append("text")
                .text(d => d)
                .classed("timezone", true)
                .attr("x", 0)
                .attr("y", (d, i) => i * gridSize)
                .style("text-anchor", "end")
                .attr("transform", "translate(-6," + gridSize / 1.8 + ")");
        
        g.selectAll(".month")
            .data(months)
            .enter().append("text")
                .text(d => d)
                .classed("month", true)
                .attr("x", (d, i) => i * gridSize)
                .attr("y", 0)
                .style("text-anchor", "middle")
                .attr("transform", "translate(" + gridSize / 2 + ", -6)");
        
        g.append("g")
            .call(legend);
    }, [width]);

    return (
        <div>
            <svg ref={svgRef} />
        </div>
    );
}

export default Heatmap;