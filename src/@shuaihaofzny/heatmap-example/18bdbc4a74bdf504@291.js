// https://observablehq.com/@shuaihaofzny/heatmap-example@291
export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["Heatmap@2.csv",require("./files/0a91280427f2511e4078e8566449070b1f657b8b95a2624e4a9c4c54bb3725d6ba088cacfc888c24196e3af9ecca31d437c382fbee01598c4c059e73e74236a5").default]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Heatmap Example
Credit: Avi Felman's [tweet](https://twitter.com/AviFelman/status/1311089040888717312) about trading Bitcoin. `
)});
  main.variable(observer("chart")).define("chart", ["d3","DOM","width","h","color","margin","data","gridSize","formatValue","Timezone","months","legend"], function(d3,DOM,width,h,color,margin,data,gridSize,formatValue,Timezone,months,legend)
{
  const svg = d3.select(DOM.svg(width, h))
    .classed("crashes-heatmap", true)
  
  const defs = svg.append("defs");
  const linearGradient = defs.append("linearGradient")
      .attr("id", "linear-gradient");
  
  linearGradient.selectAll("stop")
    .data(color.ticks().map((t, i, n) => ({ offset: `${100*i/n.length}%`, color: color(t) })))
    .enter().append("stop")
    .attr("offset", d => d.offset)
    .attr("stop-color", d => d.color);
  
  const g = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
  
  g.selectAll("rect")
    .data(data)
    .enter().append("rect")
      .attr("x", d => d.Month * gridSize)
      .attr("y", d => d.Timezone * gridSize)
      .attr("width", gridSize)
      .attr("height", gridSize)
      .attr("fill", d => color(d.Value))
      .attr("stroke", "#e2e2e2")
    
   g.selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr("x", d => d.Month * gridSize + gridSize/2)
      .attr("y", d => d.Timezone * gridSize + gridSize/2)
      .style("text-anchor", "middle")
      .attr("dy", ".35em")
      .text(d => formatValue(d.Value))
  
  g.selectAll(".timezone")
    .data(Timezone)
    .enter().append("text")
      .text(d => d)
      .classed("timezone", true)
      .attr("x", 0)
      .attr("y", (d, i) => i * gridSize)
      .style("text-anchor", "end")
      .attr("transform", "translate(-6," + gridSize / 1.8 + ")")
  
  g.selectAll(".month")
    .data(months)
    .enter().append("text")
      .text(d => d)
      .classed("month", true)
      .attr("x", (d, i) => i * gridSize)
      .attr("y", 0)
      .style("text-anchor", "middle")
      .attr("transform", "translate(" + gridSize / 2 + ", -6)");
  
  g.append("g")
    .call(legend)
  
  return svg.node();
}
);
  main.variable(observer("margin")).define("margin", function(){return(
{ top: 40, right: 50, bottom: 70, left: 100 }
)});
  main.variable(observer("w")).define("w", ["width","margin"], function(width,margin){return(
width - margin.left - margin.right
)});
  main.variable(observer("gridSize")).define("gridSize", ["w","months"], function(w,months){return(
Math.floor(w / months.length )
)});
  main.variable(observer("h")).define("h", ["gridSize","Timezone","margin"], function(gridSize,Timezone,margin){return(
gridSize * Timezone.length + margin.top + margin.bottom
)});
  main.variable(observer("Timezone")).define("Timezone", function(){return(
["Asia AM", "Asia PM", "NYC AM", "NYC PM"]
)});
  main.variable(observer("months")).define("months", ["d3"], function(d3){return(
d3.range(6,10)
)});
  main.variable(observer("color")).define("color", ["d3","data"], function(d3,data){return(
d3
  .scaleLinear()
  .domain([d3.min(data, d => d.Value), 0, d3.max(data, d => d.Value)])
  .range(["#FCC117", "#FFFFFF","#608AD8"])
)});
  main.variable(observer("legend")).define("legend", ["h","margin","legendBarHeight","w","axisBottom"], function(h,margin,legendBarHeight,w,axisBottom){return(
g => {
  g.attr("transform", `translate(0, ${h - margin.bottom - legendBarHeight })`)
  .append("rect")
    .attr("width", w)
    .attr("height", legendBarHeight)
    .style("fill", "url(#linear-gradient)")
  
  g.call(axisBottom)
}
)});
  main.variable(observer("axisScale")).define("axisScale", ["d3","color","w"], function(d3,color,w){return(
d3.scaleLinear()
  .domain(color.domain())
  .range([0, w])
)});
  main.variable(observer("axisBottom")).define("axisBottom", ["h","margin","legendBarHeight","d3","axisScale","width"], function(h,margin,legendBarHeight,d3,axisScale,width){return(
g => {
  g.classed("axis axis--bottom", true)
  .attr("transform", `translate(0, ${h - margin.bottom - legendBarHeight})`)
  .call(d3.axisBottom(axisScale)
    .ticks(width / 80)
    .tickSize(legendBarHeight)    
    .tickFormat(d3.format(".0%")))
  .select(".domain")
  .remove()
}
)});
  main.variable(observer("formatValue")).define("formatValue", ["d3"], function(d3){return(
d3.format(".2%")
)});
  main.variable(observer("legendBarHeight")).define("legendBarHeight", function(){return(
10
)});
  main.variable(observer("data")).define("data", ["csv"], function(csv){return(
csv.map(({ Timezone, Month, Value }) => ({
  Timezone: parseInt(Timezone),
  Month: parseInt(Month),
  Value: parseFloat(Value)
}))
)});
  main.variable(observer("csv")).define("csv", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("Heatmap@2.csv").csv()
)});
  main.variable(observer("css")).define("css", ["html"], function(html){return(
html`<style>
  svg.crashes-heatmap text {
    font-family: sans-serif;
    font-size: 20px;
    fill: #333;
  }

  svg.crashes-heatmap .axis.axis--bottom line {
    stroke: #fff;
  }
</style>`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Dependencies`
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  return main;
}
