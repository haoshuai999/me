import * as d3 from "d3";

let legendId = 0;

// Tooltip box drawn into a <g>; pass a falsy value to hide it.
export const callout = (g, value) => {
  if (!value) return g.style("display", "none");

  g.style("display", null)
    .style("pointer-events", "none")
    .style("font", "10px sans-serif");

  const path = g
    .selectAll("path")
    .data([null])
    .join("path")
    .attr("fill", "white")
    .attr("stroke", "black");

  const text = g
    .selectAll("text")
    .data([null])
    .join("text")
    .call((text) =>
      text
        .selectAll("tspan")
        .data((value + "").split(/\n/))
        .join("tspan")
        .attr("x", 0)
        .attr("y", (d, i) => `${i * 1.1}em`)
        .style("font-weight", (_, i) => (i ? null : "bold"))
        .text((d) => d),
    );

  const { y, width: w, height: h } = text.node().getBBox();

  text.attr("transform", `translate(${-w / 2},${15 - y})`);
  path.attr("d", `M${-w / 2 - 10},5H${w / 2 + 10}v${h + 20}h-${w + 20}z`);
};

// Color legend for sequential, quantize and ordinal scales; returns an <svg> node.
export function legend(
  color,
  { title, tickSize = 6, width = 320, tickFormat } = {},
) {
  const marginTop = 18;
  const marginBottom = 16 + tickSize;
  const height = 44 + tickSize;

  const svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .style("overflow", "visible")
    .style("display", "block");

  const rampHeight = height - marginTop - marginBottom;
  const axis = (g) =>
    g
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(width / 64, tickFormat)
          .tickSize(tickSize),
      )
      .call((g) => g.select(".domain").remove());
  let x;

  if (color.interpolator) {
    const [d0, d1] = color.domain();
    x = d3.scaleLinear().domain([d0, d1]).range([0, width]);

    const id = `legend-gradient-${legendId++}`;
    svg
      .append("defs")
      .append("linearGradient")
      .attr("id", id)
      .selectAll("stop")
      .data(d3.range(11))
      .join("stop")
      .attr("offset", (i) => `${i * 10}%`)
      .attr("stop-color", (i) => color(d0 + ((d1 - d0) * i) / 10));

    svg
      .append("rect")
      .attr("y", marginTop)
      .attr("width", width)
      .attr("height", rampHeight)
      .attr("fill", `url(#${id})`);

    svg.append("g").call(axis);
  } else if (color.invertExtent) {
    const thresholds = color.thresholds();
    const format = d3.format(tickFormat ?? "");
    const range = color.range();
    x = d3
      .scaleLinear()
      .domain([-1, range.length - 1])
      .rangeRound([0, width]);

    svg
      .append("g")
      .selectAll("rect")
      .data(range)
      .join("rect")
      .attr("x", (d, i) => x(i - 1))
      .attr("y", marginTop)
      .attr("width", (d, i) => x(i) - x(i - 1))
      .attr("height", rampHeight)
      .attr("fill", (d) => d);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(
        d3
          .axisBottom(x)
          .tickSize(tickSize)
          .tickValues(d3.range(thresholds.length))
          .tickFormat((i) => format(thresholds[i])),
      )
      .call((g) => g.select(".domain").remove());
  } else {
    // Ordinal: swatches with labels
    const items = color.domain();
    const step = 90;
    svg.attr("height", 34).attr("viewBox", [0, 0, width, 34]);
    const g = svg
      .append("g")
      .selectAll("g")
      .data(items)
      .join("g")
      .attr("transform", (d, i) => `translate(${i * step},18)`);
    g.append("rect")
      .attr("width", 12)
      .attr("height", 12)
      .attr("fill", (d) => color(d));
    g.append("text")
      .attr("x", 16)
      .attr("y", 10)
      .attr("font-size", 10)
      .attr("font-family", "sans-serif")
      .text((d) => d);
  }

  svg
    .append("text")
    .attr("x", 0)
    .attr("y", color.invertExtent || color.interpolator ? marginTop - 6 : 10)
    .attr("fill", "currentColor")
    .attr("text-anchor", "start")
    .attr("font-weight", "bold")
    .attr("font-size", 10)
    .attr("font-family", "sans-serif")
    .text(title);

  return svg.node();
}
