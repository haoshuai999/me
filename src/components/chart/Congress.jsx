import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

const Congress = ({ width }) => {
    const svgRef = useRef(null);
    const margin = ({top: 50, right: 10, bottom: 30, left: 10});
    const height = Math.min(width, 800);
    const radius = Math.min(width, height) / 2;
    const labelHeight = height / 40;

    const [data, setData] = useState([]);
    const [option, setOption] = useState("Senate");

    const onOptionChange = e => {
        setOption(e.target.value);
    };

    // Separate useEffect for data loading (runs once)
    useEffect(() => {
        d3.csv('./data/congress.csv').then(function(d) {
            setData(d);
        }).catch(function(err) {
            throw err;
        });
    }, []); // Empty dependency array - runs only once
    
    useEffect(() => {
        if (!data.length) return;

        const color = d3.scaleOrdinal()
            .domain(data.map(d => d.Stance))
            .range(["#FCC117","#FF0000","#608AD8","#D8D8D8"]);

        const arc = d3.arc()
            .innerRadius(radius * 0.33)
            .outerRadius(radius - 1);

        const pie = d3.pie()
            .padAngle(0.005)
            .sort(null)
            .startAngle(Math.PI/2)
            .endAngle(Math.PI * 1.5)
            .value(d => d[option]);

        const arcs = pie(data);

        const svg = d3
            .select(svgRef.current)
            .attr("viewBox", [
                -width / 2,
                -margin.top,
                width,
                height / 2 + margin.bottom + margin.top
            ]);

        svg.selectAll("*").remove();

        svg
            .selectAll("path")
            .data(arcs)
            .join("path")
            .attr("fill", d => color(d.data.Stance))
            .attr("d", arc)
            .append("title")
            .text(d => `${d.data.Stance}: ${d.data[option]}`);

        svg
            .append("g")
            .attr("font-family", "Acumin Pro")
            .attr("font-size", 20)
            .attr("text-anchor", "middle")
            .selectAll("text")
            .data(arcs)
            .join("text")
            .attr("transform", d => `translate(${arc.centroid(d)})`)
            .call(text =>
                text
                    .filter(d => d.endAngle - d.startAngle > 0.1)
                    .append("tspan")
                    .attr("y", "-0.4em")
                    .attr("font-weight", "bold")
                    .text(d => d.data.Stance)
            )
            .call(text =>
                text
                    .filter(d => d.endAngle - d.startAngle > 0.1)
                    .append("tspan")
                    .attr("x", 0)
                    .attr("y", "0.7em")
                    .attr("fill-opacity", 0.7)
                    .text(d => d.data[option])
            );

        const legend = svg
            .append('g')
            .attr(
            'transform',
            `translate(${-width / 2.2 + margin.left},${-height / 2.1})`
            );

        legend
            .selectAll(null)
            .data(data)
            .enter()
            .append('rect')
            .attr('x', width * 0.75)
            .attr('y', (d, i) => labelHeight * i * 1.8 + height * 0.8)
            .attr('width', labelHeight)
            .attr('height', labelHeight)
            .attr('fill', d => color(d.Stance))
            .attr('stroke', 'grey')
            .style('stroke-width', '1px');

        legend
            .selectAll(null)
            .data(data)
            .enter()
            .append('text')
            .text(d => `${d.Stance}: ${d[option]}`)
            .attr('x', labelHeight * 1.2 + width * 0.75)
            .attr(
            'y',
            (d, i) => labelHeight * i * 1.8 + labelHeight / 1.1 + height * 0.8
            )
            .style('font-size', `${labelHeight}px`);
    }, [width, data, option]);

    return (
        <div>
            <div className="d-flex p-2">
                <div className="form-check mx-2">
                    <input 
                        className="form-check-input"
                        type="radio"
                        name="flexRadio1" 
                        value="Senate"
                        checked={option === "Senate"}
                        onChange={onOptionChange}
                    />
                    <label className="form-check-label">
                        Senate
                    </label>
                </div>
                <div className="form-check mx-2">
                    <input 
                        className="form-check-input"
                        type="radio"
                        name="flexRadio2"
                        value="House of Representative"
                        checked={option === "House of Representative"}
                        onChange={onOptionChange}
                    />
                    <label className="form-check-label">
                        House of Representative
                    </label>
                </div>
            </div>
            <svg ref={svgRef} />
        </div>
    );
}

export default Congress;