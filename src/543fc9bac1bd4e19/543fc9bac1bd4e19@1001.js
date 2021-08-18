import define1 from "./c2dae147641e012a@46.js";
import define2 from "./a33468b95d0b15b0@703.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["population@3.csv",require("./files/023f2e516d30f7483d2feb8ec2216b9af7fb5a2d3ff0ff615cfbfab3331a610a36ea2eb5a096ab59013e080c0e8db70c055f18b8c2a898e0ebe67742aaae6bfb").default],["China_OLD.geojson",require("./files/d5d3b7f8adfa5caeedd4f4c3fcef02ed8273523866e0db1ea69bb00824205fad60ada99acae0c4a3515bb95ef788f5993cd20c2e944b4475057ba81006d20401").default]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# China Province Population Map`
)});
  main.variable(observer("viewof year")).define("viewof year", ["Inputs","data"], function(Inputs,data){return(
Inputs.select(data.columns.slice(1,-2), {value: "2020", label: "Year"})
)});
  main.variable(observer("year")).define("year", ["Generators", "viewof year"], (G, _) => G.input(_));
  main.variable(observer("viewof metrics")).define("viewof metrics", ["Inputs"], function(Inputs){return(
Inputs.radio(["Population", "Deputies"], {value: "Population"})
)});
  main.variable(observer("metrics")).define("metrics", ["Generators", "viewof metrics"], (G, _) => G.input(_));
  main.variable(observer("chart")).define("chart", ["d3","width","height","legend","color","china","population","year","metrics","mutable province","x","year_list","y","xAxis","yAxis","margin","deputy","x2","gender_list","y2","xAxis2","yAxis2","callout","localStorage","format","format2"], function(d3,width,height,legend,color,china,population,year,metrics,$0,x,year_list,y,xAxis,yAxis,margin,deputy,x2,gender_list,y2,xAxis2,yAxis2,callout,localStorage,format,format2)
{

  const svg = d3
    .create("svg")
    .attr("viewBox", [0, 0, width, height]);
  //.style("overflow", "visible");

  svg
    .append("g")
    .attr("transform", "translate(10,20)")
    .append(() => legend({ color, title: "Population", width: 260, tickFormat: ".2s" }));
  
  let projection = d3.geoMercator() 
    .center([width > 500 ? 111.8 : 105, width > 500 ? 46.9 : 42])
    .translate([width > 500 ? width / 3 : width / 2 , height / 3])
    .scale(width > 500 ? width / 2.5 : width / 1.2);

  let path = d3.geoPath()
    .projection(projection);

  svg
    .append('g')
    .selectAll('path')
  	.data(china.features)
  	.enter()
    .append('path')
    .attr("class", "province")
    .attr("id", d => {
      if (d.properties.name == "Inner Mongolia"){
        return "Mongolia"
      } else if (d.properties.name == "Hong Kong") {
        return "HK"
      } else {
        return d.properties.name
      }
    })
    .attr('d', path)
    .attr("stroke", "white")
    .attr("fill", "white")
    .transition()
    .duration(200)
    .ease(d3.easeLinear)
    .attr("fill", d => {
      if(d.properties.name !== "Taiwan"){
        return color(population.get(d.properties.name)[year-2011]);
      } else {
        return "#000000";
      }
    });
  
  	
  
  if (metrics == "Population") {
    svg.append("g")
        .attr("class","bar")
      .selectAll("rect")
      .data(population.get(`${$0.value.length !=0 ? $0.value : "Guangdong"}`))
      .join("rect")
        .attr("x", (d, i) => x(year_list[i]))
        .attr("y", d => y(d))
        .attr("height", d => y(0) - y(d))
        .attr("width", x.bandwidth())
        .attr("fill", "red");

    svg.append("g")
        .call(xAxis);

    svg.append("g")
        .call(yAxis);

    svg
      .append("text")
      .attr("class", "bartitle")
      .attr("x", width > 500 ? width *  0.75 + margin.left : width / 2)
      .attr("y", width > 500 ? margin.top : height * 0.6 + margin.top)
      .attr("text-anchor", "middle")
      .style("font-size", 16)
      .style("font-weight", "bold")
      .text(`${metrics} of ${$0.value.length !=0 ? $0.value : "Guangdong"}`);

  } else {
    svg.append("g")
        .attr("class","bar")
      .selectAll("rect")
      .data(deputy.get(`${$0.value.length !=0 ? $0.value : "Guangxi"}`))
      .join("rect")
        .attr("x", (d, i) => x2(gender_list[i]) + x2.bandwidth()/4)
        .attr("y", d => y2(d))
        .attr("height", d => y2(0) - y2(d))
        .attr("width", x2.bandwidth() / 2)
        .attr("fill", "blue");

    svg.append("g")
        .call(xAxis2);

    svg.append("g")
        .call(yAxis2);

    svg
      .append("text")
      .attr("class", "bartitle")
      .attr("x", width > 500 ? width *  0.75 + margin.left : width / 2)
      .attr("y", width > 500 ? margin.top : height * 0.6 + margin.top)
      .attr("text-anchor", "middle")
      .style("font-size", 16)
      .style("font-weight", "bold")
      .text(`${metrics} of ${$0.value.length !=0 ? $0.value : "Guangxi"}`);
  }

  const tooltip = svg.append("g");

  svg
    .selectAll(".province")
    .on("touchmove click", function(event, d) {
      const current_population = population.get(d.properties.name)[year-2011];
          
      const mouse = d3.pointer(event, this);

      tooltip.call(callout, null);

      let last_project = JSON.parse(localStorage.getItem("data"))

      if (last_project != null) {
        if (last_project == "Inner Mongolia"){
          last_project[0] = "Mongolia"
        } else if (last_project == "Hong Kong") {
          last_project[0] = "HK"
        } else {}
        d3.select(`#${last_project[0]}`)
          .attr("stroke", "white")
          .lower();

        $0.value = []
      }
      
      $0.value = $0.value.concat([d.properties.name]);
      localStorage.setItem("data", JSON.stringify($0.value));
      
      tooltip.call(
        callout,
        `${d.properties.name}
Male NPC deputies；${deputy.get(d.properties.name)[0]}
Female NPC deputies: ${deputy.get(d.properties.name)[1]}
${year} Population: ${d.properties.name === "Taiwan" ? "N/A" : format(current_population)}
Population growth from last year: ${(d.properties.name === "Taiwan" || year == 2011) ? "N/A" : format2(( current_population - population.get(d.properties.name)[year-2012])/population.get(d.properties.name)[year-2012])}`
      );

      tooltip.attr("transform", `translate(${mouse[1] > 350 ? [mouse[0], mouse[1] - 50] : mouse})`);
      d3.select(this)
        .attr("stroke", "red")
        .raise();
      
      if (metrics == "Population") {           
        d3.selectAll(".bar").remove();
        d3.selectAll(".bartitle").remove();
        
        svg.append("g")
            .attr("class","bar")
          .selectAll("rect")
          .data(population.get(d.properties.name))
          .join("rect")
            .attr("x", (d, i) => x(year_list[i]))
            .attr("width", x.bandwidth())
            .attr("y", height - margin.top)
            .attr("height", 0)
            .transition()
        		.duration(200)
            .ease(d3.easeLinear)
            .attr("y", d => y(d))
            .attr("height", d => y(0) - y(d))
            .attr("fill", "red");
  
        svg.append("g")
            .call(xAxis);
  
        svg.append("g")
            .call(yAxis);

        svg
          .append("text")
          .attr("class", "bartitle")
          .attr("x", width > 500 ? width *  0.75 + margin.left : width / 2)
          .attr("y", width > 500 ? margin.top : height * 0.6 + margin.top)
          .attr("text-anchor", "middle")
          .style("font-size", 16)
          .style("font-weight", "bold")
          .text(`${metrics} of ${d.properties.name}`);

        tooltip.raise();
        
      } else {
        d3.selectAll(".bar").remove();
        d3.selectAll(".bartitle").remove();
        
        svg.append("g")
            .attr("class","bar")
            .attr("fill", "blue")
          .selectAll("rect")
          .data(deputy.get(d.properties.name))
          .join("rect")
            .attr("x", (d, i) => x2(gender_list[i]) + x2.bandwidth()/4)
            .attr("width", x2.bandwidth() / 2)
            .attr("y", height - margin.top)
            .attr("height", 0)
            .transition()
        		.duration(200)
            .ease(d3.easeLinear)
            .attr("y", d => y2(d))
            .attr("height", d => y2(0) - y2(d));
  
        svg.append("g")
            .call(xAxis2);
  
        svg.append("g")
            .call(yAxis2);

        svg
          .append("text")
          .attr("class", "bartitle")
          .attr("x", width > 500 ? width *  0.75 + margin.left : width / 2)
          .attr("y", width > 500 ? margin.top : height * 0.6 + margin.top)
          .attr("text-anchor", "middle")
          .style("font-size", 16)
          .style("font-weight", "bold")
          .text(`${metrics} of ${d.properties.name}`);

        tooltip.raise();
      }
    })
    // .on("touchend mouseleave", function() {
    //   tooltip.call(callout, null);
    //   d3.select(this)
    //     .attr("stroke", "white")
    //     .lower();
    // });

  return svg.node();
}
);
  main.variable(observer("x")).define("x", ["d3","year_list","width","margin"], function(d3,year_list,width,margin){return(
d3.scaleBand()
    .domain(year_list)
    .range([(width > 500 ? width / 2 + margin.left : margin.left), width - margin.right])
    .padding(0.1)
)});
  main.variable(observer("x2")).define("x2", ["d3","gender_list","width","margin"], function(d3,gender_list,width,margin){return(
d3.scaleBand()
    .domain(gender_list)
    .range([(width > 500 ? width / 2 + margin.left : margin.left), width - margin.right])
    .padding(0.1)
)});
  main.variable(observer("y")).define("y", ["d3","population","height","margin","width"], function(d3,population,height,margin,width){return(
d3.scaleLinear()
    .domain([0, d3.max(population.get("Guangdong"))]).nice()
    .range([height - margin.bottom, width > 500 ? margin.top : margin.top + height * 0.6])
)});
  main.variable(observer("y2")).define("y2", ["d3","deputy","height","margin","width"], function(d3,deputy,height,margin,width){return(
d3.scaleLinear()
    .domain([0, d3.max(deputy.get("Guangxi"))]).nice()
    .range([height - margin.bottom, width > 500 ? margin.top : margin.top + height * 0.6])
)});
  main.variable(observer("xAxis")).define("xAxis", ["height","margin","d3","x"], function(height,margin,d3,x){return(
g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .attr("class", "bar")
    .call(d3.axisBottom(x).tickSizeOuter(0))
)});
  main.variable(observer("xAxis2")).define("xAxis2", ["height","margin","d3","x2"], function(height,margin,d3,x2){return(
g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .attr("class", "bar")
    .call(d3.axisBottom(x2).tickSizeOuter(0))
)});
  main.variable(observer("yAxis")).define("yAxis", ["width","margin","d3","y","y_format","height"], function(width,margin,d3,y,y_format,height){return(
g => g
    .attr("transform", `translate(${width > 500 ? width/2 + margin.left : margin.left},0)`)
    .attr("class", "bar")
    .call(d3.axisLeft(y).ticks(null, y_format))
    .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
        .attr("x", -margin.left)
        .attr("y", width > 500 ? 10 : height * 0.62)
        .attr("fill", "black")
        .attr("text-anchor", "start")
        .text("Population"))
)});
  main.variable(observer("yAxis2")).define("yAxis2", ["width","margin","d3","y2","y_format","height"], function(width,margin,d3,y2,y_format,height){return(
g => g
    .attr("transform", `translate(${width > 500 ? width/2 + margin.left : margin.left},0)`)
    .attr("class", "bar")
    .call(d3.axisLeft(y2).ticks(null, y_format))
    .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
        .attr("x", -margin.left)
        .attr("y", width > 500 ? 10 : height * 0.62)
        .attr("fill", "black")
        .attr("text-anchor", "start")
        .text("Number of Deputies"))
)});
  main.variable(observer("year_list")).define("year_list", ["data"], function(data){return(
data.columns.slice(1,-2).reverse()
)});
  main.variable(observer("gender_list")).define("gender_list", ["data"], function(data){return(
data.columns.slice(-2)
)});
  main.variable(observer("population")).define("population", ["data"], function(data){return(
new Map(data.map(d => [d.Delegation, [d["2011"],d["2012"],d["2013"],d["2014"],d["2015"],d["2016"],d["2017"],d["2018"],d["2019"],d["2020"]]])).set("Taiwan",["N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A","N/A"])
)});
  main.variable(observer("deputy")).define("deputy", ["data"], function(data){return(
new Map(data.map(d => [d.Delegation, [d.Men, d.Women]])).set("Taiwan",["N/A","N/A"])
)});
  main.variable(observer("height")).define("height", ["width"], function(width){return(
width > 500 ? 420 : 550
)});
  main.variable(observer("data")).define("data", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
d3.csvParse(await FileAttachment("population@3.csv").text(), d3.autoType)
)});
  main.variable(observer("callout")).define("callout", function(){return(
(g, value) => {
  if (!value) return g.style("display", "none");

  g
      .style("display", null)
      .style("pointer-events", "none")
      .style("font", "10px sans-serif");

  const path = g.selectAll("path")
    .data([null])
    .join("path")
      .attr("fill", "white")
      .attr("stroke", "black");

  const text = g.selectAll("text")
    .data([null])
    .join("text")
    .call(text => text
      .selectAll("tspan")
      .data((value + "").split(/\n/))
      .join("tspan")
        .attr("x", 0)
        .attr("y", (d, i) => `${i * 1.1}em`)
        .style("font-weight", (_, i) => i ? null : "bold")
        .text(d => d));

  const {x, y, width: w, height: h} = text.node().getBBox();

  text.attr("transform", `translate(${-w / 2},${15 - y})`);
  path.attr("d", `M${-w / 2 - 10},5H${w / 2 + 10}v${h + 20}h-${w + 20}z`);
}
)});
  main.variable(observer("color")).define("color", ["d3"], function(d3){return(
d3.scaleQuantize([0, 120000000], d3.schemeBlues[7])
)});
  main.variable(observer("path")).define("path", ["d3"], function(d3){return(
d3.geoPath()
)});
  main.variable(observer("format")).define("format", ["d3"], function(d3){return(
d3.format(",")
)});
  main.variable(observer("format2")).define("format2", ["d3"], function(d3){return(
d3.format(".2%")
)});
  main.variable(observer("y_format")).define("y_format", ["d3"], function(d3){return(
d3.format("s")
)});
  main.variable(observer("china")).define("china", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("China_OLD.geojson").json()
)});
  main.variable(observer("margin")).define("margin", function(){return(
{top: 30, right: 30, bottom: 30, left: 40}
)});
  main.define("initial province", ["localStorage"], function(localStorage)
{
  var initial = JSON.parse(localStorage.getItem("data") || "[]");
  return initial;
}
);
  main.variable(observer("mutable province")).define("mutable province", ["Mutable", "initial province"], (M, _) => new M(_));
  main.variable(observer("province")).define("province", ["mutable province"], _ => _.generator);
  const child1 = runtime.module(define1);
  main.import("localStorage", child1);
  const child2 = runtime.module(define2);
  main.import("legend", child2);
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  return main;
}
