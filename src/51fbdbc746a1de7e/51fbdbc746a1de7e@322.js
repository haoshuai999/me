import define1 from "./a4f599acbbef9a1e@218.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["Cosmos_India_full-1@1.csv",require("./files/77fa7756af821e4d2867e0fc43cd3040a0fef23a0603062eb031fa581c0bb3bfe70f462846e4bcd94cdbfe92622bd510d377dce140ea216549319ea08196f3c6").default]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Cosmos India Timeline`
)});
  main.variable(observer("chart")).define("chart", ["d3","width","height","xAxis","yAxis","legendCircle","data","x","y","xAxis2","yAxis2","bitcoin","line","cosmos","margin"], function(d3,width,height,xAxis,yAxis,legendCircle,data,x,y,xAxis2,yAxis2,bitcoin,line,cosmos,margin)
{
  const svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height]);

  svg.append("g").call(xAxis);
  svg.append("g").call(yAxis);

  const bubble = svg.append("g");

  let keys = ["BTC Price", "ATOM Price"];

  let color = d3
    .scaleOrdinal()
    .domain(keys)
    .range(["#FCC117", "#FF0000"]);

  let legend = legendCircle()
    .scale(
      d3
        .scaleSqrt()
        .domain([
          d3.min(data, d => d.Participants * 2),
          d3.max(data, d => d.Participants * 2)
        ])
        .range([0, Math.sqrt(d3.max(data, d => d.Participants * 2))])
    )
    .tickValues([100, 400, 1000, 2000])
    .tickFormat((d, i, e) =>
      i === e.length - 1 ? `${d / 2} Participants` : d / 2
    );

  bubble
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("r", d => Math.sqrt(d.Participants * 2))
    .attr("cx", d => x(d.Date))
    .attr("cy", d => y(null))
    .attr("fill", "#608AD8")
    .attr("opacity", "50%")
    .attr("transform", `translate(0,${height - 405})`);

  svg.append("g").call(xAxis2);

  svg.append("g").call(yAxis2);

  svg
    .append("path")
    .datum(bitcoin)
    .attr("fill", "none")
    .attr("stroke", "#FCC117")
    .attr("stroke-width", 3)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("d", line);

  svg
    .append("path")
    .datum(cosmos)
    .attr("fill", "none")
    .attr("stroke", "#FF0000")
    .attr("stroke-width", 3)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("d", line);
  
  if (width > 768) {
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
      .attr("x", width / 2)
      .attr("y", margin.top - 30)
      .attr("text-anchor", "middle")
      .style("font-size", 18)
      .style("font-family", "Acumin Pro")
      .style("font-weight", "bold")
      .text("Cosmos (ATOM) Price Growth and Events");
    
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", margin.top - 10)
      .attr("text-anchor", "middle")
      .style("font-size", 18)
      .style("font-family", "Acumin Pro")
      .style("font-weight", "bold")
      .text("Held by Cosmos in India");
  }


  svg
    .selectAll("mylines")
    .data(keys)
    .enter()
    .append("line")
    .style("stroke-width", 3)
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
    .style("alignment-baseline", "middle")
    .style("font-family", "Acumin Pro");
  
  if (width > 768) {
    svg
      .append("g")
      .attr("transform", "translate(300, 60)")
      .call(legend);
  } else {
    svg
      .append("g")
      .attr("transform", "translate(100, 150)")
      .call(legend);
  }

  return svg.node();
}
);
  main.variable(observer("height")).define("height", function(){return(
600
)});
  main.variable(observer("line")).define("line", ["d3","x","y2"], function(d3,x,y2){return(
d3
  .line()
  .defined(d => !isNaN(d.percentage))
  .x(d => x(d.date))
  .y(d => y2(d.percentage * 100))
)});
  main.variable(observer("xAxis")).define("xAxis", ["d3","x","width","height","margin"], function(d3,x,width,height,margin){return(
g =>
  g
    .call(
      d3
        .axisBottom(x)
        .ticks(width / 80)
        .tickSizeOuter(0)
    )
    .style("font-family", "Acumin Pro")
    .style("font-size", 14)
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(g => {
      g.select(".domain").remove();
    })
)});
  main.variable(observer("xAxis2")).define("xAxis2", ["d3","x"], function(d3,x){return(
g =>
  g
    .call(d3.axisTop(x))
    .style("font-family", "Acumin Pro")
    .style("font-size", 14)
    //.attr("transform", `translate(0,0)`)
    .call(g => {
      g.select(".domain").remove();
    })
)});
  main.variable(observer("yAxis")).define("yAxis", ["d3","y","margin","height","width"], function(d3,y,margin,height,width){return(
g =>
  g
    .call(d3.axisLeft(y))
    .style("font-family", "Acumin Pro")
    .style("font-size", 14)
    .attr("transform", `translate(${margin.left},${height - 405})`)
    .call(g => {
      g.select(".domain").remove();
      g.selectAll(".tick")
        .append("line")
        .attr("stroke", "#ccc")
        .attr("x2", width - margin.left);
    })
    .selectAll("text")
    .data([null])
    .join("text")
    .call(text =>
      text
        .selectAll("tspan")
        .data("Participation \nat 27 events".split(/\n/))
        .join("tspan")
        .attr("x", -10)
        .attr("y", (d, i) => `${i * 1.3}em`)
        .text(d => d)
    )
)});
  main.variable(observer("yAxis2")).define("yAxis2", ["margin","d3","y2"], function(margin,d3,y2){return(
g =>
  g
    .attr("transform", `translate(${margin.left},0)`)
    .style("font-family", "Acumin Pro")
    .style("font-size", 14)
    .call(d3.axisLeft(y2).tickFormat(d => d + "%"))
    .call(g => g.select(".domain").remove())
)});
  main.variable(observer("x")).define("x", ["d3","data","margin","width"], function(d3,data,margin,width){return(
d3
  .scaleUtc()
  .domain([d3.min(data, d => d.Date), d3.max(data, d => d.Date)])
  .range([margin.left, width - 100])
)});
  main.variable(observer("y")).define("y", ["d3","margin","height"], function(d3,margin,height){return(
d3
  .scaleOrdinal()
  .domain([null])
  .range([margin.top + height / 2, height - margin.bottom + height / 2])
)});
  main.variable(observer("y2")).define("y2", ["d3","cosmos","height","margin"], function(d3,cosmos,height,margin){return(
d3
  .scaleLinear()
  .domain(d3.extent(cosmos, d => d.percentage * 100))
  .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("margin")).define("margin", function(){return(
{ top: 50, right: 0, bottom: 100, left: 90 }
)});
  main.variable(observer("data")).define("data", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("Cosmos_India_full-1@1.csv").csv({ typed: true })
)});
  main.variable(observer("nomics_api_key")).define("nomics_api_key", function(){return(
'41838147e6618dff5014dc031ae5d9f0'
)});
  main.variable(observer("cors_head")).define("cors_head", function(){return(
"https://observable-cors.glitch.me/"
)});
  main.variable(observer("Bitcoin_data")).define("Bitcoin_data", ["d3","cors_head","nomics_api_key"], async function(d3,cors_head,nomics_api_key){return(
(await d3.json(`${cors_head}https://api.nomics.com/v1/candles?key=${nomics_api_key}&interval=1d&currency=BTC`)).map(({timestamp, close}) => ({date: new Date(timestamp), price: close}))
)});
  main.variable(observer("Cosmos_data")).define("Cosmos_data", ["d3","cors_head","nomics_api_key"], async function(d3,cors_head,nomics_api_key){return(
(await d3.json(
  `${cors_head}https://api.nomics.com/v1/candles?key=${nomics_api_key}&interval=1d&currency=ATOM`
)).map(({ timestamp, close }) => ({ date: new Date(timestamp), price: close }))
)});
  main.variable(observer("bitcoin")).define("bitcoin", ["calculate_returns","Bitcoin_data"], function(calculate_returns,Bitcoin_data){return(
calculate_returns(Bitcoin_data)
)});
  main.variable(observer("cosmos")).define("cosmos", ["calculate_returns","Cosmos_data"], function(calculate_returns,Cosmos_data){return(
calculate_returns(Cosmos_data)
)});
  main.variable(observer("calculate_returns")).define("calculate_returns", function(){return(
data => {
  var filter = data.filter(
    d => d.date >= new Date("2019-11-01") && d.date <= new Date("2020-09-01")
  );
  var returns = filter.map((currentValue, index, array) => {
    if (index == 0) {
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
}
)});
  const child1 = runtime.module(define1);
  main.import("legendCircle", child1);
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  return main;
}
