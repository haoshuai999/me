import define1 from "./e93997d5089d7165@2303.js";
import define2 from "./d6e8c0ede802d46c@750.js";
import define3 from "./bedb50933413e557@45.js";
import define4 from "./848ede03e6b8a9d1@163.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Vertical Returns Chart`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### How to use it?
- Choose the size of the chart
  - Some parts of the chart might be cut off for certain chart size
  - Select "Fit on screen" to see the full chart
  - Change chart size when x-axis looks too congested
- Type in the chart title
- Pick a start date and an end date to set the time period of the chart. **The start date should be the last date of the previous month for monthly returns**
- Choose assets you want to visualize in the checkbox
- Hover over the chart to read the tooltips
- Hover over a cell and click the three vertical dots (cell actions) on the left to:
  - Leave comments 
  - Download the visualization in PNG or SVG format
- Use the button beneath the chart to download the data in CSV format`
)});
  main.variable(observer("viewof size")).define("viewof size", ["radio"], function(radio){return(
radio({
  title: 'Chart Size',
  description: 'Please select your preferred chart size',
  options: [
    { label: 'Article (1420 * 916)', value: 'post' },
    { label: 'Twitter / LinkedIn (1200 * 675)', value: 'social' },
    { label: 'Instagram (1080 * 1080)', value: 'ig' },
    { label: 'Fit on screen', value: 'suitable' }
  ],
  value: 'suitable'
})
)});
  main.variable(observer("size")).define("size", ["Generators", "viewof size"], (G, _) => G.input(_));
  main.variable(observer("viewof title")).define("viewof title", ["text"], function(text){return(
text({
  title: "Chart Title",
  //placeholder: "Placeholder text",
  value: "CoinDesk 20 Asset Returns",
  description: "Recommend to use less than 20 words for the title"
})
)});
  main.variable(observer("title")).define("title", ["Generators", "viewof title"], (G, _) => G.input(_));
  main.variable(observer("viewof startdate")).define("viewof startdate", ["date"], function(date){return(
date({
  title: "Start Date",
  min: "2020-01-01",
  value: "2021-04-08",
  description: "The data before April 8, 2021 might be missing for some assets"
})
)});
  main.variable(observer("startdate")).define("startdate", ["Generators", "viewof startdate"], (G, _) => G.input(_));
  main.variable(observer("viewof enddate")).define("viewof enddate", ["date"], function(date){return(
date({
  title: "End Date",
  value: "2021-04-27"
})
)});
  main.variable(observer("enddate")).define("enddate", ["Generators", "viewof enddate"], (G, _) => G.input(_));
  main.variable(observer("viewof ch")).define("viewof ch", ["checkbox"], function(checkbox){return(
checkbox({
  description: "CoinDesk 20 assets are in <b>bold font</b>",
  options: [
    { value: "BTC", label: "<b>Bitcoin</b>" },
    { value: "ETH", label: "<b>Ethereum</b>" },
    { value: "XRP", label: "<b>XRP</b>" },
    { value: "BCH", label: "<b>Bitcoin Cash</b>" },
    { value: "LTC", label: "<b>Litecoin</b>" },
    { value: "XTZ", label: "<b>Tezos</b>" },
    { value: "EOS", label: "<b>EOS</b>" },
    { value: "LINK", label: "<b>Chainlink</b>" },
    { value: "BSV", label: "Bitcoin SV" },
    { value: "ETC", label: "Ethereum Classic" },
    { value: "XLM", label: "<b>Stellar</b>" },
    { value: "ZRX", label: "0x" },
    { value: "XMR", label: "Monero" },
    { value: "ZEC", label: "Zcash" },
    { value: "DASH", label: "Dash" },
    { value: "BAT", label: "Basic Attention Token" },
    { value: "TRX", label: "Tron" },
    { value: "OXT", label: "Orchid" },
    { value: "ADA", label: "<b>Cardano</b>" },
    { value: "OMG", label: "OMG Network" },
    { value: "ALGO", label: "<b>Algorand</b>" },
    { value: "KNC", label: "Kyber Network" },
    { value: "ATOM", label: "Cosmos" },
    { value: "AAVE", label: "<b>Aave</b>" },
    { value: "FIL", label: "<b>Filecoin</b>" },
    { value: "GRT", label: "<b>The Graph</b>" },
    { value: "NU", label: "<b>NuCypher</b>" },
    { value: "DOT", label: "<b>Polkadot</b>" },
    { value: "UNI", label: "<b>Uniswap</b>" },
    { value: "YFI", label: "<b>Yearn Finance</b>" }
  ],
  value: [
    "BTC",
    "ETH",
    "XRP",
    "BCH",
    "LTC",
    "XTZ",
    "EOS",
    "LINK",
    "XLM",
    "ADA",
    "ALGO",
    "AAVE",
    "FIL",
    "GRT",
    "NU",
    "DOT",
    "UNI",
    "YFI"
  ]
})
)});
  main.variable(observer("ch")).define("ch", ["Generators", "viewof ch"], (G, _) => G.input(_));
  main.variable(observer("chart")).define("chart", ["d3","width","height","addWebFont","returns","coindesk_color","x","y","format","margin","title","yAxis"], function(d3,width,height,addWebFont,returns,coindesk_color,x,y,format,margin,title,yAxis)
{
  const svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .style("background-color", "white")
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
    );

  svg
    .append("g")
    .selectAll("rect")
    .data(returns)
    .join("rect")
    .attr("fill", d => coindesk_color[d.value >= 0 ? 2 : 3])
    .attr("x", d => x(Math.min(d.value, 0)))
    .attr("y", (d, i) => y(i))
    .attr("width", d => Math.abs(x(d.value) - x(0)))
    .attr("height", y.bandwidth());

  svg
    .append("g")
    .attr("font-family", "Acumin Pro")
    .attr("font-size", 19)
    .selectAll("text")
    .data(returns)
    .join("text")
    .attr("text-anchor", d => (d.value < 0 ? "end" : "start"))
    .attr("x", d => x(d.value) + Math.sign(d.value - 0) * 4)
    .attr("y", (d, i) => y(i) + y.bandwidth() / 2)
    .attr("dy", "0.35em")
    .text(d => format(d.value));

  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", margin.top - 20)
    .attr("text-anchor", "middle")
    .style("font-size", 26)
    .style("font-family", "Acumin Pro Bold")
    .style("font-weight", "bold")
    .text(title);

  svg.append("g").call(yAxis);

  return svg.node();
}
);
  main.variable(observer()).define(["DOM","button","returns"], function(DOM,button,returns)
{
  const div = DOM.element('div');
  const csvBtn = button(returns, 'vertical_returns.csv');

  div.appendChild(csvBtn);

  return div;
}
);
  main.variable(observer("width")).define("width", ["size_input","size"], function(size_input,size){return(
size_input(size)["width"]
)});
  main.variable(observer("height")).define("height", ["size_input","size"], function(size_input,size){return(
size_input(size)["height"]
)});
  main.variable(observer("x")).define("x", ["d3","returns","margin","width"], function(d3,returns,margin,width){return(
d3.min(returns, d => d.value) > 0
  ? d3
      .scaleLinear()
      .domain([0, d3.max(returns, d => d.value)])
      .rangeRound([margin.left, width - margin.right])
  : d3
      .scaleLinear()
      .domain(d3.extent(returns, d => d.value))
      .rangeRound([margin.left, width - margin.right])
)});
  main.variable(observer("y")).define("y", ["d3","returns","margin","height"], function(d3,returns,margin,height){return(
d3.scaleBand()
    .domain(d3.range(returns.length))
    .rangeRound([margin.top, height - margin.bottom])
    .padding(0.1)
)});
  main.variable(observer("xAxis")).define("xAxis", ["margin","d3","x","width","tickFormat","addWebFont"], function(margin,d3,x,width,tickFormat,addWebFont){return(
g =>
  g
    .attr("transform", `translate(0,${margin.top})`)
    .call(
      d3
        .axisTop(x)
        .ticks(width / 80)
        .tickFormat(tickFormat)
    )
    .call(g => g.select(".domain").remove())
    .style("font-family", "Acumin Pro")
    .style("font-size", 19)
    .call(
      addWebFont,
      'Acumin Pro',
      'https://gist.githubusercontent.com/coindesk-research/2bf8eddda40303351c9f02f73b661cca/raw/2aa621a1be6cc12cc572fd390027839254b166a3/Acumin-RPro.otf',
      'opentype'
    )
)});
  main.variable(observer("yAxis")).define("yAxis", ["x","d3","y","returns","addWebFont"], function(x,d3,y,returns,addWebFont){return(
g =>
  g
    .attr("transform", `translate(${x(0)},0)`)
    .style("font-family", "Acumin Pro")
    .style("font-size", 19)
    .call(
      d3
        .axisLeft(y)
        .tickFormat(i => returns[i].name)
        .tickSize(0)
        .tickPadding(6)
    )
    .call(g =>
      g
        .selectAll(".tick text")
        //.filter(i => returns[i].value < 0)
        .attr("text-anchor", "start")
        .attr("x", -x(0))
    )
    .call(
      addWebFont,
      'Acumin Pro',
      'https://gist.githubusercontent.com/coindesk-research/2bf8eddda40303351c9f02f73b661cca/raw/2aa621a1be6cc12cc572fd390027839254b166a3/Acumin-RPro.otf',
      'opentype'
    )
)});
  main.variable(observer("format")).define("format", ["d3"], function(d3){return(
d3.format(".1%")
)});
  main.variable(observer("tickFormat")).define("tickFormat", ["d3"], function(d3){return(
d3.format(".0%")
)});
  main.variable(observer("margin")).define("margin", function(){return(
{ top: 50, right: 80, bottom: 30, left: 130 }
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Data`
)});
  main.variable(observer("cors_head")).define("cors_head", function(){return(
""
)});
  main.variable(observer("data")).define("data", ["d3","cors_head","startdate","enddate"], async function(d3,cors_head,startdate,enddate){return(
await d3.csv(
  `${cors_head}https://qa.api.coindesk.com/v2/metrics/price?assets=BTC,ETH,XRP,LTC,BCH,EOS,LINK,XTZ,XLM,ZRX,BSV,ETC,XMR,ZEC,DASH,BAT,TRX,OXT,ADA,OMG,ALGO,KNC,ATOM,AAVE,FIL,GRT,NU,DOT,UNI,YFI&start_date=${startdate}T00:00&end_date=${enddate}T00:00&interval=1d&format=csv`
)
)});
  main.variable(observer("returns")).define("returns", ["calcuate_returns","data","d3"], function(calcuate_returns,data,d3){return(
calcuate_returns(data, 0).sort((a, b) =>
  d3.descending(a.value, b.value)
)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Appendix`
)});
  const child1 = runtime.module(define1);
  main.import("date", child1);
  main.import("text", child1);
  main.import("radio", child1);
  main.import("checkbox", child1);
  const child2 = runtime.module(define2);
  main.import("swatches", child2);
  const child3 = runtime.module(define3);
  main.import("button", child3);
  const child4 = runtime.module(define4);
  main.import("addWebFont", child4);
  main.variable(observer("coindesk_color")).define("coindesk_color", function(){return(
["#19284D", "#FCC117", "#7CEE00", "#FF0000"]
)});
  main.variable(observer("calcuate_returns")).define("calcuate_returns", ["ch"], function(ch){return(
(data, method) => {
  const last_index = data.length - 1;
  var returns = ch.map(currentValue => {
    if (method == 0) {
      return {
        name: currentValue,
        value:
          (data[last_index][currentValue] - data[0][currentValue]) /
          data[0][currentValue]
      };
    } else {
      return {
        name: currentValue,
        value: Math.log(data[last_index][currentValue] / data[0][currentValue])
      };
    }
  });
  return returns;
}
)});
  main.variable(observer("size_input")).define("size_input", ["returns","margin"], function(returns,margin){return(
size => {
  if (size == "post") {
    return {
      width: 1420,
      height: 916
    };
  } else if (size == "social") {
    return {
      width: 1200,
      height: 675
    };
  } else if (size == "ig") {
    return {
      width: 1080,
      height: 1080
    };
  } else {
    return {
      width: document.body.clientWidth,
      height:
        Math.ceil((returns.length + 0.1) * 25) + margin.top + margin.bottom
    };
  }
}
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  return main;
}
