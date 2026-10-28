import React, { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import Form from "react-bootstrap/Form";
import { callout, legend } from "./chartUtils";

const YEAR_LIST = d3.range(2011, 2021);
const GENDERS = ["Women", "Men"];
const MARGIN = { top: 30, right: 30, bottom: 30, left: 40 };
const METRICS = ["Population", "Deputies"];

const color = d3.scaleQuantize([0, 120000000], d3.schemeBlues[7]);
const format = d3.format(",");
const formatPercent = d3.format(".2%");
const formatAxis = d3.format("s");

function Chinamap({ width }) {
  const svgRef = useRef(null);

  const [data, setData] = useState(null);
  const [year, setYear] = useState(2020);
  const [metric, setMetric] = useState("Population");
  const [selected, setSelected] = useState(null);

  const w = Math.max(width - 32, 0);
  const height = w > 500 ? 420 : 550;

  useEffect(() => {
    Promise.all([
      d3.csv("./data/china_population.csv", d3.autoType),
      d3.json("./data/china_provinces.geojson"),
    ]).then(([rows, china]) => {
      const byName = new Map(
        rows.map((d) => [
          d.Delegation,
          {
            population: YEAR_LIST.map((y) => d[y]),
            deputies: [d.Women, d.Men],
          },
        ]),
      );
      setData({ china, byName });
    });
  }, []);

  // Taiwan is absent from the data; it is drawn black with no bars
  const province =
    selected ?? (metric === "Population" ? "Guangdong" : "Guangxi");

  const scales = useMemo(() => {
    if (!data || !w) return null;
    const rows = [...data.byName.values()];
    const left = w > 500 ? w / 2 + MARGIN.left : MARGIN.left;
    const top = w > 500 ? MARGIN.top : MARGIN.top + height * 0.6;
    const range = [height - MARGIN.bottom, top];
    return {
      x: d3
        .scaleBand()
        .domain(YEAR_LIST)
        .range([left, w - MARGIN.right])
        .padding(0.1),
      x2: d3
        .scaleBand()
        .domain(GENDERS)
        .range([left, w - MARGIN.right])
        .padding(0.1),
      y: d3
        .scaleLinear()
        .domain([0, d3.max(rows, (r) => d3.max(r.population))])
        .nice()
        .range(range),
      y2: d3
        .scaleLinear()
        .domain([0, d3.max(rows, (r) => d3.max(r.deputies))])
        .nice()
        .range(range),
      left,
    };
  }, [data, w, height]);

  // Map, legend and tooltip
  useEffect(() => {
    if (!data || !w) return;
    const projection = d3
      .geoMercator()
      .center([w > 500 ? 111.8 : 105, w > 500 ? 46.9 : 42])
      .translate([w > 500 ? w / 3 : w / 2, height / 3.5])
      .scale(w > 500 ? w / 3 : w / 1.2);
    const path = d3.geoPath(projection);
    const index = year - 2011;

    const svg = d3.select(svgRef.current).attr("viewBox", [0, 0, w, height]);
    svg.selectAll("*").remove();

    svg
      .append("g")
      .selectAll("path")
      .data(data.china.features)
      .join("path")
      .attr("class", "province")
      .attr("d", path)
      .attr("stroke", "white")
      .attr("fill", (d) => {
        const row = data.byName.get(d.properties.name);
        return row ? color(row.population[index]) : "#000000";
      });

    svg
      .append("g")
      .attr("transform", "translate(10,20)")
      .append(() =>
        legend(color, { title: "Population", width: 260, tickFormat: ".2s" }),
      );

    svg.append("g").attr("class", "bars");
    const tooltip = svg.append("g");

    svg.selectAll(".province").on("click", function (event, d) {
      const name = d.properties.name;
      const row = data.byName.get(name);
      const current = row?.population[index];
      const previous = row?.population[index - 1];
      const [women, men] = row?.deputies ?? ["N/A", "N/A"];

      setSelected(name);
      tooltip.call(
        callout,
        `${name}
Male NPC deputies: ${men}
Female NPC deputies: ${women}
${year} Population: ${row ? format(current) : "N/A"}
Population growth from last year: ${row && year > 2011 ? formatPercent((current - previous) / previous) : "N/A"}`,
      );
      const [px, py] = d3.pointer(event, svg.node());
      tooltip
        .attr("transform", `translate(${py > 350 ? [px, py - 50] : [px, py]})`)
        .raise();
    });
  }, [data, w, height, year]);

  // Selected-province highlight and bar chart
  useEffect(() => {
    if (!data || !scales) return;
    const svg = d3.select(svgRef.current);
    const { x, x2, y, y2, left } = scales;
    const isPopulation = metric === "Population";
    const row = data.byName.get(province);

    svg
      .selectAll(".province")
      .attr("stroke", (d) => (d.properties.name === province ? "red" : "white"))
      .filter((d) => d.properties.name === province)
      .raise();

    const bars = svg.select(".bars");
    bars.selectAll("*").remove();

    const [xs, ys, values, labels] = isPopulation
      ? [x, y, row?.population ?? [], YEAR_LIST]
      : [x2, y2, row?.deputies ?? [], GENDERS];

    bars
      .append("g")
      .selectAll("rect")
      .data(values)
      .join("rect")
      .attr(
        "x",
        (d, i) => xs(labels[i]) + (isPopulation ? 0 : xs.bandwidth() / 4),
      )
      .attr("width", isPopulation ? xs.bandwidth() : xs.bandwidth() / 2)
      .attr("fill", isPopulation ? "red" : "blue")
      .attr("y", height - MARGIN.top)
      .attr("height", 0)
      .transition()
      .duration(200)
      .ease(d3.easeLinear)
      .attr("y", (d) => ys(d))
      .attr("height", (d) => ys(0) - ys(d));

    bars
      .append("g")
      .attr("transform", `translate(0,${height - MARGIN.bottom})`)
      .call(d3.axisBottom(xs).tickSizeOuter(0));

    bars
      .append("g")
      .attr("transform", `translate(${left},0)`)
      .call(d3.axisLeft(ys).ticks(null, formatAxis))
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .append("text")
          .attr("x", -MARGIN.left)
          .attr("y", w > 500 ? 10 : height * 0.62)
          .attr("fill", "black")
          .attr("text-anchor", "start")
          .text(isPopulation ? "Population" : "Number of Deputies"),
      );

    bars
      .append("text")
      .attr("x", w > 500 ? w * 0.75 + MARGIN.left : w / 2)
      .attr("y", w > 500 ? MARGIN.top : height * 0.6 + MARGIN.top)
      .attr("text-anchor", "middle")
      .style("font-size", 16)
      .style("font-weight", "bold")
      .text(`${metric} of ${province}`);
  }, [data, scales, metric, province, year, w, height]);

  return (
    <div>
      <div className="d-flex flex-wrap align-items-center gap-3 mb-2">
        <Form.Group className="d-flex align-items-center gap-2">
          <Form.Label className="mb-0" htmlFor="china-map-year">
            Year
          </Form.Label>
          <Form.Select
            size="sm"
            id="china-map-year"
            style={{ width: "auto" }}
            value={year}
            onChange={(e) => setYear(+e.target.value)}
          >
            {YEAR_LIST.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <div>
          {METRICS.map((name) => (
            <Form.Check
              inline
              key={name}
              type="radio"
              id={`china-map-metric-${name}`}
              name="china-map-metric"
              label={name}
              checked={metric === name}
              onChange={() => setMetric(name)}
            />
          ))}
        </div>
      </div>
      <svg ref={svgRef} style={{ width: "100%", display: "block" }} />
    </div>
  );
}

export default Chinamap;
