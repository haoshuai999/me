import define1 from "./848ede03e6b8a9d1@163.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["coinbase-asset@3.csv",require("./files/bb2814b0b71df8257ec2d0fdcd2b4a09923b229a932af0051e5e03e6f90ea7c7b6490710999342f5f5593aee9e68ee96a4e3ebea2925a52a190b5e277e7db3dd").default]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Coinbase Radial Stacked Bar Chart`
)});
  main.variable(observer("chart")).define("chart", ["d3","DOM","width","height","addWebFont","data","z","arc","xAxis","yAxis","legend"], function(d3,DOM,width,height,addWebFont,data,z,arc,xAxis,yAxis,legend)
{
  const svg = d3.select(DOM.svg(width, height))
      .attr("viewBox", `${-width / 2} ${-height / 2} ${width} ${height}`)
      .style("width", "100%")
      .style("height", "auto")
      .call(
      addWebFont,
      'Acumin Pro',
      'https://gist.githubusercontent.com/coindesk-research/2bf8eddda40303351c9f02f73b661cca/raw/2aa621a1be6cc12cc572fd390027839254b166a3/Acumin-RPro.otf',
      'opentype'
    )
    .call(
      addWebFont,
      'Acumin Pro Bold',
      'https://gist.githubusercontent.com/coindesk-research/2bf8eddda40303351c9f02f73b661cca/raw/2aa621a1be6cc12cc572fd390027839254b166a3/Acumin-BdPro.otf',
      'opentype'
    )
    .style("font", "24px Acumin Pro");

  svg.append("g")
    .selectAll("g")
    .data(d3.stack().keys(data.columns.slice(1))(data))
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

  return svg.node();
}
);
  main.variable(observer("data")).define("data", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
d3.csvParse(await FileAttachment("coinbase-asset@3.csv").text(), (d, _, columns) => {
  let total = 0;
  for (let i = 1; i < columns.length; ++i) total += d[columns[i]] = +d[columns[i]];
  d.total = total;
  return d;
})
)});
  main.variable(observer("arc")).define("arc", ["d3","y","x","innerRadius"], function(d3,y,x,innerRadius){return(
d3.arc()
    .innerRadius(d => y(d[0]))
    .outerRadius(d => y(d[1]))
    .startAngle(d => x(d.data.Quarter))
    .endAngle(d => x(d.data.Quarter) + x.bandwidth())
    .padAngle(0.01)
    .padRadius(innerRadius)
)});
  main.variable(observer("x")).define("x", ["d3","data"], function(d3,data){return(
d3.scaleBand()
    .domain(data.map(d => d.Quarter))
    .range([0, 2 * Math.PI])
    .align(0)
)});
  main.variable(observer("y")).define("y", ["d3","data","innerRadius","outerRadius"], function(d3,data,innerRadius,outerRadius){return(
d3.scaleRadial()
      .domain([0, d3.max(data, d => d.total)])
      .range([innerRadius, outerRadius])
)});
  main.variable(observer("z")).define("z", ["d3","data"], function(d3,data){return(
d3.scaleOrdinal()
    .domain(data.columns.slice(1))
    //.domain([0, d3.max(data, d => d.total)])
    .range(["#fcc117", "white"])
)});
  main.variable(observer("xAxis")).define("xAxis", ["data","x","innerRadius"], function(data,x,innerRadius){return(
g => g
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
                ? "rotate(90)translate(0,25)"
                : "rotate(-90)translate(0,-9)")
            .text(d => d.Quarter)))
)});
  main.variable(observer("yAxis")).define("yAxis", ["y"], function(y){return(
(g) =>
  g
    .attr("text-anchor", "middle")
    .call((g) =>
      g
        .append("text")
        .attr("y", (d) => -y(y.ticks(5).pop()))
        .attr("dy", "-1em")
        .text("Total Assets on Coinbase Increased Nearly 150% in 2021Q1")
        .style("font-weight", "bold")
        .style("font-size", "30px")
    )
    .call((g) =>
      g
        .selectAll("g")
        .data(y.ticks(5).slice(1))
        .join("g")
        .attr("fill", "none")
        .call((g) =>
          g
            .append("circle")
            .attr("stroke", "#000")
            .attr("stroke-opacity", 0.5)
            .attr("r", y)
        )
        .call((g) =>
          g
            .append("text")
            .attr("y", (d) => -y(d))
            .attr("dy", "0.35em")
            .attr("stroke", "#fff")
            .attr("stroke-width", 5)
            .text((d) => y.tickFormat(5, "$s")(d).replace("G", "B"))
            .clone(true)
            .attr("fill", "#000")
            .attr("stroke", "none")
        )
    )
)});
  main.variable(observer("formatValue")).define("formatValue", ["d3"], function(d3){return(
d3.format("$.2s")
)});
  main.variable(observer("tickformat")).define("tickformat", ["formatValue"], function(formatValue){return(
num => {
  return formatValue(num).replace("G", "B");
}
)});
  main.variable(observer("legend")).define("legend", ["data","z"], function(data,z){return(
g => g.append("g")
  .selectAll("g")
  .data(data.columns.slice(1).reverse())
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
        .text("Assets on Platform"))
)});
  main.variable(observer("width")).define("width", function(){return(
975
)});
  main.variable(observer("height")).define("height", ["width"], function(width){return(
width
)});
  main.variable(observer("innerRadius")).define("innerRadius", function(){return(
180
)});
  main.variable(observer("outerRadius")).define("outerRadius", ["width","height"], function(width,height){return(
Math.min(width, height) / 2 - 50
)});
  const child1 = runtime.module(define1);
  main.import("addWebFont", child1);
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  return main;
}
