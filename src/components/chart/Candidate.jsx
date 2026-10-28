import React, { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import { feature } from "topojson-client";
import Form from "react-bootstrap/Form";
import { callout, legend } from "./chartUtils";

const PROFILES = {
  Age: { file: "candidate_age.csv", padding: 0.1 },
  Seniority: { file: "candidate_seniority.csv", padding: 0.5 },
  Role: { file: "candidate_leader.csv", padding: 0.5 },
};

const YEARS = d3.range(1997, 2020).map(String);
const MARGIN = { top: 80, right: 10, bottom: 20, left: 40 };
const OUTLINE = { type: "Sphere" };
const LEGEND_OFFSET = 66;

const barColor = d3
  .scaleOrdinal(["Female", "Male"], ["#f98cae", "#8CF9D7"])
  .unknown("#ccc");
const mapColor = d3.scaleSequential([0, 60], d3.interpolateRdPu);

// World Bank country names -> names used in the topojson
const RENAME = new Map([
  ["Antigua and Barbuda", "Antigua and Barb."],
  ["Bolivia (Plurinational State of)", "Bolivia"],
  ["Bosnia and Herzegovina", "Bosnia and Herz."],
  ["Brunei Darussalam", "Brunei"],
  ["Central African Republic", "Central African Rep."],
  ["Cook Islands", "Cook Is."],
  ["Korea, Dem. People’s Rep.", "North Korea"],
  ["Congo, Dem. Rep.", "Dem. Rep. Congo"],
  ["Dominican Republic", "Dominican Rep."],
  ["Equatorial Guinea", "Eq. Guinea"],
  ["Iran, Islamic Rep.", "Iran"],
  ["Lao PDR", "Laos"],
  ["Marshall Islands", "Marshall Is."],
  ["Micronesia (Federated States of)", "Micronesia"],
  ["Korea, Rep.", "South Korea"],
  ["Republic of Moldova", "Moldova"],
  ["Russian Federation", "Russia"],
  ["Saint Kitts and Nevis", "St. Kitts and Nevis"],
  ["St. Vincent and the Grenadines", "St. Vin. and Gren."],
  ["Sao Tome and Principe", "São Tomé and Principe"],
  ["Solomon Islands", "Solomon Is."],
  ["South Sudan", "S. Sudan"],
  ["Swaziland", "eSwatini"],
  ["Syrian Arab Republic", "Syria"],
  ["The former Yugoslav Republic of Macedonia", "Macedonia"],
  ["United Republic of Tanzania", "Tanzania"],
  ["Venezuela (Bolivarian Republic of)", "Venezuela"],
  ["Viet Nam", "Vietnam"],
  ["Yemen, Rep.", "Yemen"],
  ["Venezuela, RB", "Venezuela"],
  ["Micronesia, Fed. Sts.", "Micronesia"],
  ["Northern Mariana Islands", "N. Mariana Is"],
  ["Virgin Islands (U.S.)", "U.S. Virgin Is."],
  ["United States", "United States of America"],
  ["Cayman Islands", "Cayman Is."],
  ["British Virgin Islands", "British Virgin Is."],
  ["Turks and Caicos Islands", "Turks and Caicos Is."],
  ["Eswatini", "eSwatini"],
  ["Slovak Republic", "Slovakia"],
  ["St. Lucia", "Saint Lucia"],
  ["Curacao", "Curaçao"],
  ["North Macedonia", "Macedonia"],
  ["Kyrgyz Republic", "Kyrgyzstan"],
  ["Gambia, The", "Gambia"],
  ["St. Martin (French part)", "St-Martin"],
  ["French Polynesia", "Fr. Polynesia"],
  ["Egypt, Arab Rep.", "Egypt"],
  ["Czech", "Czechia"],
  ["Congo, Rep.", "Congo"],
  ["Bahamas, The", "Bahamas"],
  ["Hong Kong SAR, China", "Hong Kong"],
  ["Macao SAR, China", "Macao"],
  ["Sint Maarten (Dutch part)", "Sint Maarten"],
]);

function Scrubber({ values, index, onChange, delay = 500 }) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    if (index >= values.length - 1) {
      setPlaying(false);
      return;
    }
    const id = setTimeout(() => onChange(index + 1), delay);
    return () => clearTimeout(id);
  }, [playing, index, values.length, delay, onChange]);

  const toggle = () => {
    if (!playing && index >= values.length - 1) onChange(0);
    setPlaying(!playing);
  };

  return (
    <div className="d-flex align-items-center gap-2 my-2">
      <button
        type="button"
        className="btn btn-sm btn-outline-secondary"
        style={{ width: "5em" }}
        onClick={toggle}
      >
        {playing ? "Pause" : "Play"}
      </button>
      <Form.Range
        min={0}
        max={values.length - 1}
        value={index}
        onChange={(e) => {
          setPlaying(false);
          onChange(+e.target.value);
        }}
      />
      <output
        className="text-nowrap"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {values[index]}
      </output>
    </div>
  );
}

function Candidate({ width }) {
  const barRef = useRef(null);
  const mapRef = useRef(null);

  const [data, setData] = useState(null);
  const [profile, setProfile] = useState("Age");
  const [yearIndex, setYearIndex] = useState(0);

  const year = YEARS[yearIndex];
  const yearRef = useRef(year);
  yearRef.current = year;

  const w = Math.max(width - 32, 0);

  // Both charts share the height of the world map at the current width
  const layout = useMemo(() => {
    if (!w) return null;
    const projection = d3.geoNaturalEarth1();
    const [[x0, y0], [x1, y1]] = d3
      .geoPath(projection.fitWidth(w, OUTLINE))
      .bounds(OUTLINE);
    const dy = Math.ceil(y1 - y0);
    const l = Math.min(Math.ceil(x1 - x0), dy);
    projection.scale((projection.scale() * (l - 1)) / l).precision(0.2);
    return { projection, height: dy };
  }, [w]);

  useEffect(() => {
    const loadProfile = ([key, { file }]) =>
      d3.csv(`./data/${file}`, (d) => ({
        [key]: key === "Age" ? +d[key] : d[key],
        Female: +d.Female || 0,
        Male: +d.Male || 0,
      }));

    Promise.all([
      ...Object.entries(PROFILES).map(loadProfile),
      d3.json("./data/seats_by_women.json"),
      d3.json("./data/countries-50m.json"),
    ]).then(([age, seniority, role, seats, world]) => {
      setData({
        profiles: { Age: age, Seniority: seniority, Role: role },
        seats,
        world,
      });
    });
  }, []);

  const seatsByCountry = useMemo(
    () =>
      data &&
      new Map(
        data.seats.map((r) => [
          RENAME.get(r["Country Name"]) ?? r["Country Name"],
          r,
        ]),
      ),
    [data],
  );
  const countries = useMemo(
    () => data && feature(data.world, data.world.objects.countries),
    [data],
  );

  // Stacked bar chart
  useEffect(() => {
    if (!data || !layout) return;
    const { height } = layout;
    const rows = data.profiles[profile];

    const series = d3
      .stack()
      .keys(["Female", "Male"])(rows)
      .map((s) => (s.forEach((v) => (v.key = s.key)), s));

    const x = d3
      .scaleBand()
      .domain(rows.map((d) => d[profile]))
      .range([MARGIN.left, w - MARGIN.right])
      .padding(PROFILES[profile].padding);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(series, (s) => d3.max(s, (d) => d[1]))])
      .rangeRound([height - MARGIN.bottom, MARGIN.top]);

    const svg = d3.select(barRef.current).attr("viewBox", [0, 0, w, height]);
    svg.selectAll("*").remove();

    svg
      .append("g")
      .attr("transform", `translate(0, 8)`)
      .append(() =>
        legend(barColor, {
          title: "Gender of Candidates",
          width: Math.min(320, Math.max(0, w - MARGIN.left - MARGIN.right)),
        }),
      );

    svg
      .append("g")
      .selectAll("g")
      .data(series)
      .join("g")
      .attr("fill", (s) => barColor(s.key))
      .selectAll("rect")
      .data((s) => s)
      .join("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.data[profile]))
      .attr("y", (d) => y(d[1]))
      .attr("height", (d) => y(d[0]) - y(d[1]))
      .attr("width", x.bandwidth());

    svg
      .append("g")
      .attr("transform", `translate(0,${height - MARGIN.bottom})`)
      .call(
        d3
          .axisBottom(x)
          .tickSizeOuter(0)
          .tickValues(
            w > 550 ? x.domain() : x.domain().filter((d, i) => i % 3 === 0),
          ),
      )
      .call((g) => g.selectAll(".domain").remove());

    svg
      .append("g")
      .attr("transform", `translate(${MARGIN.left},0)`)
      .call(d3.axisLeft(y).ticks(null, "s"))
      .call((g) => g.selectAll(".domain").remove())
      .call((g) =>
        g
          .append("text")
          .attr("x", -MARGIN.left)
          .attr("y", MARGIN.top - 12)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("Number of Candidates"),
      );

    if (profile === "Age") {
      // The fraction nudges the line to the visual center of the band
      const meanMarker = (age, offset, anchor, label, mean) => {
        const lineX = x(age) + x.bandwidth() / 2 + (x.bandwidth() * offset) / 2;
        svg
          .append("line")
          .style("stroke", "#000000")
          .style("stroke-width", 1)
          .attr("x1", lineX)
          .attr("y1", MARGIN.top)
          .attr("x2", lineX)
          .attr("y2", height - MARGIN.bottom);

        [label, mean].forEach((text, i) => {
          svg
            .append("text")
            .attr("x", anchor === "start" ? x(age) + x.bandwidth() : x(age))
            .attr("y", MARGIN.top - 5)
            .attr("dy", `${i}em`)
            .attr("text-anchor", anchor)
            .attr("font-size", 12)
            .text(text);
        });
      };
      meanMarker(50, 0.119, "start", "Male Candidates", "Mean Age: 50.1");
      meanMarker(45, 0.175, "end", "Female Candidates", "Mean Age: 45.2");
    }

    const tooltip = svg.append("g");

    svg
      .selectAll(".bar")
      .on("touchmove mousemove", function (event, d) {
        const [mouseX, mouseY] = d3.pointer(event, svg.node());
        tooltip.call(
          callout,
          `${profile}: ${d.data[profile]}\nGender: ${d.key}\nNumber of Candidates: ${d.data[d.key].toLocaleString("en")}`,
        );
        tooltip.attr(
          "transform",
          `translate(${mouseY > 350 ? [mouseX, mouseY - 50] : [mouseX, mouseY]})`,
        );
        d3.select(this).attr("stroke", "red").raise();
      })
      .on("touchend mouseleave", function () {
        tooltip.call(callout, null);
        d3.select(this).attr("stroke", null).lower();
      });
  }, [data, profile, w, layout]);

  // World map: geometry and interaction
  useEffect(() => {
    if (!data || !layout) return;
    const { projection, height } = layout;
    const path = d3.geoPath(projection);

    const svg = d3
      .select(mapRef.current)
      .style("display", "block")
      .attr("viewBox", [0, 0, w, height + LEGEND_OFFSET]);
    svg.selectAll("*").remove();

    const g = svg.append("g");
    g.append("g")
      .attr("transform", `translate(0, ${LEGEND_OFFSET})`)
      .selectAll("path")
      .data(countries.features)
      .join("path")
      .attr("class", "country")
      .attr("d", path)
      .attr("stroke", "white")
      .attr("stroke-width", 0.2)
      .attr("stroke-linejoin", "round");

    const tooltip = svg.append("g");

    svg
      .selectAll(".country")
      .on("touchmove mousemove", function (event, d) {
        const value = seatsByCountry.get(d.properties.name)?.[yearRef.current];
        tooltip.call(
          callout,
          `${d.properties.name}\n  ${yearRef.current}: ${value == null ? "N/A" : `${value}%`}`,
        );
        tooltip.attr(
          "transform",
          `translate(${d3.pointer(event, svg.node())})`,
        );
        d3.select(this).attr("stroke", "red").raise();
      })
      .on("touchend mouseleave", function () {
        tooltip.call(callout, null);
        d3.select(this).attr("stroke", "white").lower();
      });

    svg.call(
      d3
        .zoom()
        .scaleExtent([1, 8])
        .on("zoom", (event) =>
          g.selectAll("path").attr("transform", event.transform),
        ),
    );

    svg
      .append("g")
      .attr("transform", `translate(4, 0)`)
      .append(() =>
        legend(mapColor, {
          title: data.seats[0]["Indicator Name"],
          width: Math.min(320, Math.max(0, w - 20)),
        }),
      );
  }, [data, countries, seatsByCountry, w, layout]);

  // World map: fill for the selected year
  useEffect(() => {
    if (!data || !layout) return;
    d3.select(mapRef.current)
      .selectAll(".country")
      .attr("fill", (d) => {
        const value = seatsByCountry.get(d.properties.name)?.[year];
        return value == null ? "#ccc" : mapColor(value);
      });
  }, [data, seatsByCountry, year, w, layout]);

  return (
    <div>
      <h5>Candidate Profile in 2020 Singaporean General Election</h5>
      <div>
        {Object.keys(PROFILES).map((name) => (
          <Form.Check
            inline
            className="chart-radio"
            key={name}
            type="radio"
            id={`candidate-profile-${name}`}
            name="candidate-profile"
            label={name}
            checked={profile === name}
            onChange={() => setProfile(name)}
          />
        ))}
      </div>
      <svg ref={barRef} style={{ width: "100%", display: "block" }} />

      <h5 className="mt-4">
        Women Representation in National Parliaments Around the World
        (1990-2019)
      </h5>
      <Scrubber values={YEARS} index={yearIndex} onChange={setYearIndex} />
      <svg ref={mapRef} style={{ width: "100%" }} />
    </div>
  );
}

export default Candidate;
