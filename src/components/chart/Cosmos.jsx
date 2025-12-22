import React, { useState, useEffect, useRef, useMemo } from "react";
import * as d3 from "d3";
import bitcoinRawData from "../../json/cosmos_bitcoin.json";
import cosmosRawData from "../../json/cosmos_cosmos.json";

const Cosmos = ({ width }) => {
    const svgRef = useRef(null);
    const margin = ({ top: 50, right: 0, bottom: width > 500 ? 100 : 150, left: width > 500 ? 90 : 45 });
    const height = 600;

    const [data, setData] = useState([]);

    // Move these functions outside or memoize them
    const calculate_returns = useMemo(() => data => {
        let filter = data.filter(
          d => d.date >= new Date("2019-11-01") && d.date <= new Date("2020-09-01")
        );
        let returns = filter.map((currentValue, index, array) => {
          if (index === 0) {
            return {
              date: array[index].date,
              percentage: 0
            };
          } else {
            return {
              date: array[index].date,
              percentage: (array[index].price - array[0].price) / array[0].price
            };
          }
        });
        return returns;
    }, []);

    const stackData = useMemo(() => d => {
        return d["prices"].reduce((acc, curr, index) => {
            let date = new Date(curr[0]);
            let price = parseFloat(curr[1]);
        
            acc[index] = {
                date: date,
                price: price
            };
        
            return acc;
        }, []);
    }, []);

    // Memoize the calculated data
    const bitcoinData = useMemo(() => calculate_returns(stackData(bitcoinRawData)), [calculate_returns, stackData]);
    const cosmosData = useMemo(() => calculate_returns(stackData(cosmosRawData)), [calculate_returns, stackData]);
    
    // Separate useEffect for data loading (runs once)
    useEffect(() => {
        d3.csv('/data/cosmos.csv').then(function(d) {
            setData(d);
        }).catch(function(err) {
            throw err;
        });
    }, []); // Empty dependency array - runs only once

    useEffect(() => {
        if (!data.length) return; // Don't render if no data
        if (!bitcoinData.length) return; // Don't render if no bitcoin data
        if (!cosmosData.length) return; // Don't render if no cosmos data
        
        const x = d3.scaleUtc()
            .domain([new Date(d3.min(data, d => d.Date)), new Date(d3.max(data, d => d.Date))])
            .range([margin.left, width - 60]);

        const y = d3.scaleOrdinal()
            .domain([null])
            .range([margin.top + height / 2, height - margin.bottom + height / 2]);

        const y2 = d3.scaleLinear()
            .domain(d3.extent(cosmosData, d => d.percentage * 100))
            .range([height - margin.bottom, margin.top]);

        const line = d3
            .line()
            .defined(d => !isNaN(d.percentage))
            .x(d => x(new Date(d.date)))
            .y(d => y2(d.percentage * 100));

        const xAxis = g =>
            g.call(
                d3.axisBottom(x)
                    .ticks(width / 80)
                    .tickSizeOuter(0)
                )
                .style("font-family", "Acumin Pro")
                .style("font-size", 14)
                .attr("transform", `translate(0,${height - margin.bottom})`)
                .call(g => {
                    g.select(".domain").remove();
                });
        
        const yAxis = g =>
            g.call(d3.axisLeft(y))
                .style("font-family", "Acumin Pro")
                .style("font-size", 14)
                .attr("transform", `translate(${margin.left},${height - 405})`)
                .call(g => {
                    g.select(".domain").remove();
                    
                    g.selectAll(".tick")
                        .append("line")
                        .attr("stroke", "#ccc")
                        .attr("x2", width - margin.left - 25);
                })
                .selectAll("text")
                .data([null])
                .join("text")
                .call(text =>
                    text
                        .attr("transform", width > 500 ? "translate(0, 0)" : `translate(${margin.left}, -60)`)
                        .selectAll("tspan")
                        .data("Participation \nat 27 events".split(/\n/))
                        .join("tspan")
                        .attr("x", -10)
                        .attr("y", (d, i) => `${i * 1.3}em`)
                        .text(d => d)
                );

        const yAxis2 = g =>
            g.attr("transform", `translate(${margin.left},0)`)
              .style("font-family", "Acumin Pro")
              .style("font-size", 14)
              .call(d3.axisLeft(y2).tickFormat(d => d + "%"))
              .call(g => g.select(".domain").remove());

        const svg = d3
            .select(svgRef.current)
            .attr("width", width - 32)
            .attr("height", height)
            .attr("viewBox", [0, 0, width, height]);

        svg.selectAll("*").remove();

        svg.append("g").call(xAxis);
        svg.append("g").call(yAxis);

        const bubble = svg.append("g");

        let keys = ["BTC Price", "ATOM Price"];

        let color = d3
            .scaleOrdinal()
            .domain(keys)
            .range(["#FCC117", "#FF0000"]);

        let legend = svg.append("g")
            .attr("transform", width > 500 ? "translate(300, 60)" :  "translate(70, 140)");

        bubble
            .selectAll("circle")
            .data(data)
            .join("circle")
            .attr("r", d => Math.sqrt(d.Participants * 2))
            .attr("cx", d => x(new Date(d.Date)))
            .attr("cy", d => y(null))
            .attr("fill", "#608AD8")
            .attr("opacity", "50%")
            .attr("transform", `translate(0,${height - 405})`);

        legend
            .selectAll("circle")
            .data([100, 400, 1000, 2000])
            .join("circle")
            .attr("r", d => Math.sqrt(d))
            .attr("cx", Math.sqrt(2000))
            .attr("cy", d => Math.sqrt(d))
            .attr("fill", "none")
            .attr("stroke", "black");

        legend
            .selectAll("line")
            .data([100, 400, 1000, 2000])
            .join("line")
            .attr("x1", Math.sqrt(2000))
            .attr("y1", d => Math.sqrt(d) * 2)
            .attr("x2", Math.sqrt(2000) + 50)
            .attr("y2", d => Math.sqrt(d) * 2)
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("stroke-dasharray", "4, 2");

        legend
            .selectAll("text")
            .data(["50", "200", "500", "1000 Participants"])
            .join("text")
            .attr("x", Math.sqrt(2000) + 50)
            .attr("y", d => Math.sqrt(parseInt(d) * 2) * 2)
            .attr("dx", 3)
            .attr("dy", 4)
            .attr("font-size", 11)
            .text(d => d);

        svg.append("g").call(yAxis2);

        svg
            .append("path")
            .datum(bitcoinData)
            .attr("fill", "none")
            .attr("stroke", "#FCC117")
            .attr("stroke-width", 2)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("d", line);

        svg
            .append("path")
            .datum(cosmosData)
            .attr("fill", "none")
            .attr("stroke", "#FF0000")
            .attr("stroke-width", 2)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("d", line);

        if (width > 500) {
            svg
                .append("text")
                .attr("x", width / 2)
                .attr("y", margin.top - 20)
                .attr("text-anchor", "middle")
                .style("font-size", 26)
                .style("font-family", "Acumin Pro")
                .style("font-weight", "bold")
                .text("Cosmos (ATOM) Price Growth and Events Held by Cosmos in India");
        } else {
            svg
                .append("text")
                .attr("x", width / 2 - 25)
                .attr("y", margin.top - 25)
                .attr("text-anchor", "middle")
                .style("font-size", 14)
                .style("font-family", "Acumin Pro")
                .style("font-weight", "bold")
                .text("Cosmos (ATOM) Price Growth and");

            svg
                .append("text")
                .attr("x", width / 2 - 25)
                .attr("y", margin.top - 5)
                .attr("text-anchor", "middle")
                .style("font-size", 14)
                .style("font-family", "Acumin Pro")
                .style("font-weight", "bold")
                .text("Events Held by Cosmos in India");
        }


        svg
            .selectAll("mylines")
            .data(keys)
            .enter()
            .append("line")
            .attr("transform", width > 500 ? "translate(0, 0)" : "translate(-30, -15)")
            .style("stroke-width", 2)
            .attr("x1", 100)
            .attr("y1", function(d, i) {
                return 100 + i * 25;
            })
            .attr("x2", 150)
            .attr("y2", function(d, i) {
                return 100 + i * 25;
            })
            .style("stroke", function(d) {
                return color(d);
            });

        svg
            .selectAll("mylabels")
            .data(keys)
            .enter()
            .append("text")
            .attr("transform", width > 500 ? "translate(0, 0)" : "translate(-30, -15)")
            .attr("x", 160)
            .attr("y", function(d, i) {
                return 100 + i * 25;
            })
            .style("fill", function(d) {
                return color(d);
            })
            .text(function(d) {
                return d;
            })
            .attr("text-anchor", "left")
            .attr("font-size", width > 500 ? 16 : 14)
            .style("alignment-baseline", "middle")
            .style("font-family", "Acumin Pro");
    }, [width, data, bitcoinData, cosmosData]);

    return (
        <div>
            <svg ref={svgRef} />
        </div>
    );
}

export default Cosmos;