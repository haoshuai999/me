import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import data from "../../data/family_tree.json";

const Tree = ({ width }) => {
    const svgRef = useRef(null);

    useEffect(() => {
        const tree = (data) => {
            const treeRoot = d3.hierarchy(data);
            treeRoot.dx = 50;
            treeRoot.dy = width / (treeRoot.height + 2);
            return d3.tree().nodeSize([treeRoot.dx, treeRoot.dy])(treeRoot);
        }

        const root = tree(data);

        let x0 = Infinity;
        let x1 = -x0;
        root.each((d) => {
            if (d.x > x1) x1 = d.x;
            if (d.x < x0) x0 = d.x;
        });

        const svg = d3
            .select(svgRef.current)
            .attr("viewBox", [-150, 0, width, x1 - x0 + root.dx * 2])
            .style("background-color", "white");

        svg.selectAll("*").remove();

        const g = svg
            .append("g")
            .attr("font-family", "Acumin Pro")
            .attr("font-size", 25)
            .attr("transform", `translate(${root.dy / 3},${root.dx - x0})`);

        const link = g
            .append("g")
            .attr("fill", "none")
            .attr("stroke", "#608AD8")
            .attr("stroke-width", 1.5)
            .selectAll("path")
            .data(root.links())
            .join("path")
            .attr(
            "d",
            d3
                .linkHorizontal()
                .x((d) => d.y)
                .y((d) => d.x)
            );

        const node = g
            .append("g")
            .attr("stroke-linejoin", "round")
            .attr("stroke-width", 3)
            .selectAll("g")
            .data(root.descendants())
            .join("g")
            .attr("transform", (d) => `translate(${d.y},${d.x})`);

        node
            .append("circle")
            .attr("fill", (d) => (d.children ? "#555" : "#999"))
            .attr("r", 2.5);

        node
            .append("text")
            .attr("dy", "0.31em")
            .attr("x", (d) => (d.children ? -6 : 6))
            .attr("text-anchor", (d) => (d.children ? "end" : "start"))
            .text((d) => d.data.name)
            .clone(true)
            .lower()
            .attr("stroke", "white");
    }, [width]);

    return (
        <div>
            <svg ref={svgRef} />
        </div>
    );
}

export default Tree;