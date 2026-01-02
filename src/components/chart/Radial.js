import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import radialData from "../../data/radial.csv";

const Radial = ({ width }) => {
    const svgRef = useRef(null);
    const height = width > 500 ? width : width + 100;
    const innerRadius = width > 500 ? 180 : 110;
    const outerRadius = width > 500 ? Math.min(width, height) / 2 - 50 : Math.min(width, height) / 2;

    const [data, setData] = useState([]);
    const [domainArray, setDomainArray] = useState([]);

    // Separate useEffect for data loading (runs once)
    useEffect(() => {
        d3.csv(radialData).then(function(d) {
            d.forEach((row) => {
                let total = 0;
                for (let i = 1; i < d.columns.length; ++i) total += row[d.columns[i]] = +row[d.columns[i]];
                row.total = total;
            });
            setData(d);
            setDomainArray(d.columns.slice(1));
        }).catch(function(err) {
            throw err;
        });
    }, []);
    
    useEffect(() => {
        if (!data.length) return;

        const x = d3.scaleBand()
            .domain(data.map(d => d.Quarter))
            .range([0, 2 * Math.PI])
            .align(0);
        
        const y = d3.scaleRadial()
            .domain([0, d3.max(data, d => d.total)])
            .range([innerRadius, outerRadius]);
        
        const z = d3.scaleOrdinal()
            .domain(domainArray)
            .range(["#fcc117", "white"]);

        const arc = d3.arc()
            .innerRadius(d => y(d[0]))
            .outerRadius(d => y(d[1]))
            .startAngle(d => x(d.data.Quarter))
            .endAngle(d => x(d.data.Quarter) + x.bandwidth())
            .padAngle(0.01)
            .padRadius(innerRadius);
        
        const xAxis = g => g
            .attr("text-anchor", "middle")
            .call(g => g.selectAll("g")
            .data(data)
            .join("g")
                .attr("transform", d => `
                rotate(${((x(d.Quarter) + x.bandwidth() / 2) * 180 / Math.PI - 90)})
                translate(${innerRadius},0)
                `)
                .call(g => g.append("line")
                    .attr("x2", -5)
                    .attr("stroke", "#000"))
                .call(g => g.append("text")
                    .attr("transform", d => (x(d.Quarter) + x.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) < Math.PI
                        ? "rotate(90) translate(0,25)"
                        : "rotate(-90) translate(0,-9)")
                    .text(d => d.Quarter)));
        
        const yAxis = g =>
            g.attr("text-anchor", "middle")
            .call((g) =>
                g.append("text")
                    .attr("y", () => -y(y.ticks(5).pop()))
                    .attr("dy", "-1em")
                    .text("Total Assets on Coinbase Increased Nearly 150% in 2021Q1")
                    .style("font-weight", "bold")
                    .style("font-size", width > 500 ? 30 : 13)
            )
            .call((g) =>
                g.selectAll("g")
                    .data(y.ticks(5).slice(1))
                    .join("g")
                    .attr("fill", "none")
            .call((g) =>
                g.append("circle")
                    .attr("stroke", "#000")
                    .attr("stroke-opacity", 0.5)
                    .attr("r", y)
            )
            .call((g) =>
                g.append("text")
                    .attr("y", (d) => -y(d))
                    .attr("dy", "0.35em")
                    .attr("stroke", "#fff")
                    .attr("stroke-width", 5)
                    .text((d) => y.tickFormat(5, "$s")(d).replace("G", "B"))
                    .clone(true)
                    .attr("fill", "#000")
                    .attr("stroke", "none")
            )
        );

        const legend = g => g.append("g")
            .selectAll("g")
            .data(domainArray.reverse())
            .join("g")
                .attr("transform", (d, i) => `translate(-80,${(i - (data.columns.length - 1) / 2) * 20})`)
                .call(g => g.append("rect")
                    .attr("width", 18)
                    .attr("height", 18)
                    .attr("fill", z))
                .call(g => g.append("text")
                    .attr("x", 24)
                    .attr("y", 9)
                    .attr("dy", "0.35em")
                    .text("Assets on Platform"));

        const svg = d3
            .select(svgRef.current)
            .attr("viewBox", `${-width / 2} ${-height / 2} ${width} ${height}`)
            .attr("font-family", "Acumin Pro")
            .attr("font-size", width > 500 ? 24 : 14);
        
        svg.selectAll("*").remove();

        svg.append("g")
            .selectAll("g")
            .data(d3.stack().keys(domainArray)(data))
            .join("g")
            .attr("fill", d => z(d.key))
            .selectAll("path")
            .data(d => d)
            .join("path")
            .attr("d", arc);

        svg.append("g")
            .call(xAxis);

        svg.append("g")
            .call(yAxis);

        svg.append("g")
            .call(legend);
    }, [width, data]);

    return (
        <div>
            <svg ref={svgRef} />
        </div>
    );
}

export default Radial;