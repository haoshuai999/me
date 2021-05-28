import define1 from "./e93997d5089d7165@2303.js";
import define2 from "./848ede03e6b8a9d1@163.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["congress@2.csv",require("./files/fe83fd55eb1882e6cc467c43d748360412553c578e05ed7178591a825b639661bcbcbcadf21e8a48741b7a051744246fa3cd2e3fcb1721dd66618febc1ef29ce").default]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# US Congress Chart
This chart shows lawmakers' attitude towards blockchain technology`
)});
  main.variable(observer("viewof r")).define("viewof r", ["radio"], function(radio){return(
radio({
  options: [
    { label: 'Senate', value: 'Senate' },
    { label: 'House of Representative', value: 'House of Representative' }
  ],
  value: 'Senate'
})
)});
  main.variable(observer("r")).define("r", ["Generators", "viewof r"], (G, _) => G.input(_));
  main.variable(observer("chart")).define("chart", ["pie","data","d3","width","margin","height","addWebFont","color","arc","r","labelHeight"], function(pie,data,d3,width,margin,height,addWebFont,color,arc,r,labelHeight)
{
  const arcs = pie(data);

  const svg = d3
    .create("svg")
    .attr("viewBox", [
      -width / 2,
      -margin.top,
      width,
      height / 2 + margin.bottom + margin.top
    ])
    .call(
      addWebFont,
      "Acumin Pro",
      "https://gist.githubusercontent.com/coindesk-research/2bf8eddda40303351c9f02f73b661cca/raw/2aa621a1be6cc12cc572fd390027839254b166a3/Acumin-RPro.otf",
      "opentype"
    );

  svg
    .selectAll("path")
    .data(arcs)
    .join("path")
    .attr("fill", d => color(d.data.Stance))
    .attr("d", arc)
    .append("title")
    .text(d => `${d.data.Stance}: ${d.data[r]}`);

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
        .text(d => d.data[r])
    );

  svg
    .append("text")
    .attr("x", 30)
    .attr("y", margin.top - 110)
    .attr("text-anchor", "middle")
    .style("font-size", 26)
    .style("font-family", "Acumin Pro")
    .style("font-weight", "bold")
    .text(`Blockchain Attitude in the ${r}`);

  const legend = svg
    .append("g")
    .attr(
      "transform",
      `translate(${-width / 2 + margin.left},${-height / 2.1})`
    );

  legend
    .selectAll(null)
    .data(data)
    .enter()
    .append("rect")
    .attr("x", width * 0.75)
    .attr("y", (d, i) => labelHeight * i * 1.8 + height * 0.8)
    .attr("width", labelHeight)
    .attr("height", labelHeight)
    .attr("fill", d => color(d.Stance))
    .attr("stroke", "grey")
    .style("stroke-width", "1px");

  legend
    .selectAll(null)
    .data(data)
    .enter()
    .append("text")
    .text(d => `${d.Stance}: ${d[r]}`)
    .attr("x", labelHeight * 1.2 + width * 0.75)
    .attr(
      "y",
      (d, i) => labelHeight * i * 1.8 + labelHeight / 1.1 + height * 0.8
    )
    .style("font-family", "Acumin Pro")
    .style("font-size", `${labelHeight}px`);
  return svg.node();
}
);
  main.variable(observer("data")).define("data", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
d3.csvParse(await FileAttachment("congress@2.csv").text(), d3.autoType)
)});
  main.variable(observer("color")).define("color", ["d3","data"], function(d3,data){return(
d3
  .scaleOrdinal()
  .domain(data.map((d) => d.Stance))
  .range(["#7CEE00", "#FF0000", "#608AD8", "#FCC117"])
)});
  main.variable(observer("height")).define("height", ["width"], function(width){return(
Math.min(width, 800)
)});
  main.variable(observer("labelHeight")).define("labelHeight", ["height"], function(height){return(
height / 50
)});
  main.variable(observer("arc")).define("arc", ["width","height","d3"], function(width,height,d3)
{
  const radius = Math.min(width, height) / 2;
  return d3.arc().innerRadius(radius * 0.33).outerRadius(radius - 1);
}
);
  main.variable(observer("arc_txt")).define("arc_txt", ["width","height","d3"], function(width,height,d3)
{
  const radius = Math.min(width, height) / 1.6;
  return d3.arc().innerRadius(radius * 0.33).outerRadius(radius - 1);
  // return d3.arc().innerRadius(radius * 0.4).outerRadius(d => {
  //   if(d.data.Stance === 'Antonio Nariño') return radius + 300
  //   else if(d.data.Stance === 'La Candelaria') return radius + 380
  //   else if(d.data.Stance === 'Los Mártires') return radius + 460
  //   else if(d.data.Stance === 'Sumapaz') return radius + 520
  //   return radius + 250
  // });
}
);
  main.variable(observer("pie")).define("pie", ["d3","r"], function(d3,r){return(
d3
  .pie()
  .padAngle(0.005)
  .sort(null)
  .startAngle(Math.PI / 2)
  .endAngle(Math.PI * 1.5)
  .value(d => d[r])
)});
  main.variable(observer("margin")).define("margin", function(){return(
{ top: 70, right: 10, bottom: 50, left: 10 }
)});
  const child1 = runtime.module(define1);
  main.import("radio", child1);
  const child2 = runtime.module(define2);
  main.import("addWebFont", child2);
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  return main;
}
