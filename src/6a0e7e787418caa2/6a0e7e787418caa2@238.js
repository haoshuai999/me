import define1 from "./848ede03e6b8a9d1@163.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["family_tree@1.json",require("./files/f22cb5a92b8e39f69df1ad97a8e9c510d7ed14fbe854436ecf74609adbb25ab6806e143558b05edfda471a1e535dd9ec51138ea3be8e21973c88ffbb3352d69c").default]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Crypto Family Tree`
)});
  main.variable(observer("chart")).define("chart", ["tree","data","d3","width","addWebFont"], function(tree,data,d3,width,addWebFont)
{
  const root = tree(data);

  let x0 = Infinity;
  let x1 = -x0;
  root.each((d) => {
    if (d.x > x1) x1 = d.x;
    if (d.x < x0) x0 = d.x;
  });

  const svg = d3
    .create("svg")
    .attr("viewBox", [-150, 0, width, x1 - x0 + root.dx * 2])
    .style("background-color", "white")
    .call(
      addWebFont,
      "Acumin Pro",
      "https://gist.githubusercontent.com/coindesk-research/2bf8eddda40303351c9f02f73b661cca/raw/2aa621a1be6cc12cc572fd390027839254b166a3/Acumin-RPro.otf",
      "opentype"
    );

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

  return svg.node();
}
);
  main.variable(observer("data")).define("data", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("family_tree@1.json").json()
)});
  main.variable(observer("tree")).define("tree", ["d3","width"], function(d3,width){return(
(data) => {
  const root = d3.hierarchy(data);
  root.dx = 50;
  root.dy = width / (root.height + 2);
  return d3.tree().nodeSize([root.dx, root.dy])(root);
}
)});
  main.variable(observer("width")).define("width", function(){return(
1015
)});
  const child1 = runtime.module(define1);
  main.import("addWebFont", child1);
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  return main;
}
