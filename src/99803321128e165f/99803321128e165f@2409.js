import define1 from "./e93997d5089d7165@2303.js";
import define2 from "./d6e8c0ede802d46c@750.js";
import define3 from "./bedb50933413e557@45.js";
import define4 from "./848ede03e6b8a9d1@163.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Crypto Asset Returns - CD`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### A dashboard visualizing returns on investment of different assets
### Main Source: CoinDesk Research`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### How to use it?
- Choose the size of the chart
  - Some parts of the chart might be cut off for certain chart size
  - Select "Fit on screen" to see the full chart
  - Change chart size when x-axis looks too congested
- Type in the chart title
- Pick a start date and an end date to set the time period of the chart. **The start date should be the last date of the previous month for monthly returns**
- Choose assets you want to visualize in the checkbox (The start date might change when choosing non-crypto assets)
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
  value: "Bitcoin and Macro Assets Returns",
  description: "Recommend to use less than 20 words for the title"
})
)});
  main.variable(observer("title")).define("title", ["Generators", "viewof title"], (G, _) => G.input(_));
  main.variable(observer("viewof startdate")).define("viewof startdate", ["date"], function(date){return(
date({
  title: "Start Date",
  min: "2011-08-18",
  value: "2020-07-31",
  description: "The data before June 2020 might be missing for some assets"
})
)});
  main.variable(observer("startdate")).define("startdate", ["Generators", "viewof startdate"], (G, _) => G.input(_));
  main.variable(observer("viewof enddate")).define("viewof enddate", ["date"], function(date){return(
date({
  title: "End Date",
  value: "2020-08-31",
  description:
    "Be careful when using the lastest date, because some data won't updated until end of day"
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
    { value: "ETC", label: "<b>Ethereum Classic</b>" },
    { value: "XLM", label: "<b>Stellar</b>" },
    { value: "ZRX", label: "<b>0x</b>" },
    { value: "XMR", label: "Monero" },
    { value: "ZEC", label: "Zcash" },
    { value: "DASH", label: "Dash" },
    { value: "BAT", label: "Basic Attention Token" },
    { value: "TRX", label: "Tron" },
    { value: "OXT", label: "<b>Orchid</b>" },
    { value: "ADA", label: "<b>Cardano</b>" },
    { value: "OMG", label: "<b>OMG Network</b>" },
    { value: "ALGO", label: "<b>Algorand</b>" },
    { value: "KNC", label: "<b>Kyber Network</b>" },
    { value: "ATOM", label: "<b>Cosmos</b>" },
    // { value: "Bitcoin", label: "Bitcoin" },
    // { value: "Ethereum", label: "Ethereum" },
    // { value: "XRP", label: "XRP" },
    // { value: "Bitcoin Cash", label: "Bitcoin Cash" },
    // { value: "Litecoin", label: "Litecoin" },
    // { value: "Tezos", label: "Tezos" },
    // { value: "Eos", label: "EOS" },
    // { value: "Chainlink", label: "Chainlink" },
    // { value: "Bitcoin SV", label: "Bitcoin SV" },
    // { value: "Ethereum Classic", label: "Ethereum Classic" },
    // { value: "Stellar", label: "Stellar" },
    // { value: "0x", label: "0x" },
    // { value: "Monero", label: "Monero" },
    // { value: "Zcash", label: "Zcash" },
    // { value: "Dash", label: "Dash" },
    // { value: "Basic Attention Token", label: "Basic Attention Token" },
    // { value: "Tron", label: "Tron" },
    // { value: "Orchid", label: "Orchid" },
    { value: "S&P 500", label: "S&P 500" },
    { value: "Gold", label: "Gold" },
    { value: "Bonds", label: "Bonds" },
    { value: "Silver", label: "Silver" },
    { value: "Nikkei 225", label: "Nikkei 225" },
    { value: "FTSE 100", label: "FTSE 100" }
  ],
  value: ["BTC", "S&P 500", "Gold", "Bonds"]
})
)});
  main.variable(observer("ch")).define("ch", ["Generators", "viewof ch"], (G, _) => G.input(_));
  main.variable(observer("chart")).define("chart", ["d3","width","height","addWebFont","ch","y","returns_map","margin","color_array","line","x","formatValue","swatches","xAxis","yAxis","title","tooltipvalue","formatDate","callout"], function(d3,width,height,addWebFont,ch,y,returns_map,margin,color_array,line,x,formatValue,swatches,xAxis,yAxis,title,tooltipvalue,formatDate,callout)
{
  const svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .style("background-color", "white")
    .call(
      addWebFont,
      "Acumin Pro",
      "https://gist.githubusercontent.com/coindesk-research/2bf8eddda40303351c9f02f73b661cca/raw/2aa621a1be6cc12cc572fd390027839254b166a3/Acumin-RPro.otf",
      "opentype"
    )
    .call(
      addWebFont,
      "Acumin Pro Bold",
      "https://gist.githubusercontent.com/coindesk-research/2bf8eddda40303351c9f02f73b661cca/raw/2aa621a1be6cc12cc572fd390027839254b166a3/Acumin-BdPro.otf",
      "opentype"
    );
  //.attr("preserveAspectRatio", "xMidYMid meet");

  const tooltip = svg.append("g");

  let min_array = [];
  let max_array = [];
  let last_array = [];
  let num_of_macro = 0;
  let flag = 0;

  if (ch.length == 0) {
    y.domain(d3.extent(returns_map.get("BTC"), (d) => d.percentage * 100));
  } else {
    ch.forEach((asset) => {
      min_array.push(d3.min(returns_map.get(asset), (d) => d.percentage * 100));
      max_array.push(d3.max(returns_map.get(asset), (d) => d.percentage * 100));
    });

    y.domain([Math.min(...min_array), Math.max(...max_array)]).nice();
  }

  svg
    .append("line")
    .style("stroke", "#000000")
    .style("stroke-width", 1)
    .style("stroke-dasharray", "3, 3")
    .attr("x1", margin.left)
    .attr("y1", y(0))
    .attr("x2", width - margin.right)
    .attr("y2", y(0));

  if (ch.length > 0) {
    ch.forEach((asset, index) => {
      let last_date = returns_map.get(asset).slice(-1)[0]["date"];
      let last_percentage = returns_map.get(asset).slice(-1)[0]["percentage"];
      last_array.forEach((element) => {
        if (Math.abs(y(element * 100) - y(last_percentage * 100)) < 15) {
          last_percentage -= 0.02;
        }
      });

      svg
        .append("path")
        .datum(returns_map.get(asset))
        .attr("fill", "none")
        .attr("stroke", color_array[index])
        .attr("stroke-width", 3)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("d", line);

      svg
        .append("text")
        .attr(
          "transform",
          "translate(" +
            x(last_date) +
            "," +
            (y(last_percentage * 100) - 15) +
            ")"
        )
        .attr("dy", ".35em")
        .attr("text-anchor", "start")
        .style("fill", color_array[index])
        .style("font-size", 19)
        .style("font-family", "Acumin Pro")
        .text(formatValue(returns_map.get(asset).slice(-1)[0]["percentage"]));

      last_array.push(last_percentage);
    });
  }

  if (width > 768) {
    svg
      .append("svg:image")
      .attr("x", 0)
      .attr("y", height - 60)
      .attr("width", 200)
      .attr("height", 50)
      .attr(
        "xlink:href",
        "https://gist.githubusercontent.com/coindesk-research/a301747be23ca66a7ca79f01cf6a81bd/raw/275080d0a6d73aec9d54a0bb63341f82d4b699fe/Coindesk%25C2%25AE_Logo_RGB.png"
      );
  }

  svg
    .append("g")
    .attr(
      "transform",
      `translate(${width / 2 - 30 * ch.slice(0, 11).length}, ${
        height - 95 - Math.floor(ch.length / 11) * 10
      })`
    )
    .append(() =>
      swatches({
        colour: d3.scaleOrdinal(ch.slice(0, 11), color_array.slice(0, 10)),
        labelFont: "19px Acumin Pro"
      })
    );

  svg
    .append("g")
    .attr(
      "transform",
      `translate(${width / 2 - 30 * ch.slice(10, 21).length}, ${
        height - 75 - Math.floor(ch.length / 11) * 10
      })`
    )
    .append(() =>
      swatches({
        colour: d3.scaleOrdinal(ch.slice(10, 21), color_array.slice(10, 21)),
        labelFont: "19px Acumin Pro"
      })
    );

  svg
    .append("g")
    .attr(
      "transform",
      `translate(${width / 2 - 30 * ch.slice(21).length}, ${height - 75})`
    )
    .append(() =>
      swatches({
        colour: d3.scaleOrdinal(ch.slice(21), color_array.slice(21)),
        labelFont: "19px Acumin Pro"
      })
    );

  svg.append("g").call(xAxis);

  svg.append("g").call(yAxis);

  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", margin.top - 23)
    .attr("text-anchor", "middle")
    .style("font-size", width > 768 ? 26 :18)
    .style("font-family", "Acumin Pro Bold")
    .style("font-weight", "bold")
    .text(title);

  svg
    .append("text")
    .attr("x", 20)
    .attr("y", (height - margin.bottom) / 2)
    .attr("text-anchor", "middle")
    .attr("transform", `rotate(-90,20,${(height - margin.bottom) / 2})`)
    .style("font-size", 19)
    .style("font-family", "Acumin Pro")
    .text("Returns");

  if (ch.includes("Bonds")) {
    flag = 1;
    svg
      .append("text")
      .attr("x", width > 768 ? 175 + 275 * num_of_macro : 275 * num_of_macro)
      .attr("y", height - 25 - 10 * flag)
      .attr("text-anchor", "left")
      .style("font-size", 13)
      .style("font-style", "italic")
      .style("font-family", "Acumin Pro")
      .text("Bonds = iShares 20+ Year Treasury Bond ETF;");
    num_of_macro += 1;
  }

  if (ch.includes("Gold")) {
    flag = 1;
    svg
      .append("text")
      .attr("x", width > 768 ? 175 + 275 * num_of_macro : 275 * num_of_macro)
      .attr("y", height - 25 - 10 * flag)
      .attr("text-anchor", "left")
      .style("font-size", 13)
      .style("font-style", "italic")
      .style("font-family", "Acumin Pro")
      .text("Gold = London Bullion Market pm fixing price;");
    num_of_macro += 1;
  }

  if (ch.includes("Silver")) {
    flag = 1;
    svg
      .append("text")
      .attr("x", width > 768 ? 175 + 275 * num_of_macro : 275 * num_of_macro)
      .attr("y", height - 25 - 10 * flag)
      .attr("text-anchor", "left")
      .style("font-size", 13)
      .style("font-style", "italic")
      .style("font-family", "Acumin Pro")
      .text("Silver = London Bullion Market 12:00 noon fixing price;");
    num_of_macro += 1;
  }

  svg
    .append("text")
    .attr("x", width > 768 ? 175 : 0)
    .attr("y", height - 25 + 10 * flag)
    .attr("text-anchor", "start")
    .style("font-size", 13)
    .style("font-style", "italic")
    .style("font-family", "Acumin Pro")
    .text("Source: CoinDesk Research");

  if (
    ch.includes("Gold") ||
    ch.includes("Silver") ||
    ch.includes("Nikkei 225") ||
    ch.includes("S&P 500") ||
    ch.includes("Bonds") ||
    ch.includes("FTSE 100")
  ) {
    svg
      .append("text")
      .attr("x", width > 768 ? 335 : 160)
      .attr("y", height - 25 + 10 * flag)
      .attr("text-anchor", "start")
      .style("font-size", 13)
      .style("font-style", "italic")
      .style("font-family", "Acumin Pro")
      .text(", St. Louis Fed, Yahoo Finance");
  }

  svg.on("touchmove mousemove", function (event) {
    event.preventDefault();
    const mouse = d3.pointer(event, this);
    const xm = x.invert(mouse[0]);
    const ym = y.invert(mouse[1]);
    var { date, _ } = tooltipvalue(returns_map.get("BTC"), xm);
    var tooltip_string = `${formatDate(date)}`;
    var percentage_array = [];

    if (ch.length == 0) {
      tooltip.call(callout, null);
    } else {
      ch.forEach((asset) => {
        var temp_percentage = Object.values(
          tooltipvalue(returns_map.get(asset), xm)
        )[1];
        tooltip_string += `\n${asset}: ` + formatValue(temp_percentage);
        percentage_array.push(temp_percentage);
      });
    }

    var average_percent =
      percentage_array.reduce((a, b) => a + b) / percentage_array.length;

    tooltip
      .attr("transform", `translate(${x(xm)},${y(average_percent * 100)})`)
      .call(callout, tooltip_string);
  });

  svg.on("touchend mouseleave", () => tooltip.call(callout, null));

  tooltip.raise();

  return svg.node();
}
);
  main.variable(observer()).define(["DOM","button","all_returns"], function(DOM,button,all_returns)
{
  const div = DOM.element('div');
  const csvBtn = button(all_returns , 'returns.csv');
  
  div.appendChild(csvBtn);

  return div;
}
);
  main.variable(observer("all_returns")).define("all_returns", ["array_join","crypto_return","sp500_return","gold_return","tlt_return","silver_return","nikkei_return","ftse_return"], function(array_join,crypto_return,sp500_return,gold_return,tlt_return,silver_return,nikkei_return,ftse_return){return(
array_join(
  crypto_return,
  sp500_return,
  gold_return,
  tlt_return,
  silver_return,
  nikkei_return,
  ftse_return
)
)});
  main.variable(observer("crypto_return")).define("crypto_return", ["d3","cors_head2","cd_startdate","enddate"], async function(d3,cors_head2,cd_startdate,enddate){return(
await d3.csv(
  `${cors_head2}https://qa.api.coindesk.com/v2/metrics/returns?assets=BTC,ETH,XRP,BCH,LTC,XTZ,EOS,LINK,BSV,ETC,XLM,ZRX,XMR,ZEC,DASH,BAT,TRX,OXT,ADA,OMG,ALGO,KNC,ATOM&start_date=${cd_startdate}&end_date=${enddate}&format=csv`
)
)});
  main.variable(observer("width")).define("width", ["size_input","size"], function(size_input,size){return(
size_input(size)["width"]
)});
  main.variable(observer("height")).define("height", ["size_input","size"], function(size_input,size){return(
size_input(size)["height"]
)});
  main.variable(observer("startdate_obj")).define("startdate_obj", ["calcuate_start_date","startdate"], function(calcuate_start_date,startdate){return(
calcuate_start_date(startdate)
)});
  main.variable(observer("enddate_obj")).define("enddate_obj", ["enddate"], function(enddate){return(
new Date(enddate)
)});
  main.variable(observer("line")).define("line", ["d3","x","y"], function(d3,x,y){return(
d3.line()
        .defined(d => !isNaN(d.percentage))
        .x(d => x(d.date))
        .y(d => y(d.percentage * 100))
)});
  main.variable(observer("x")).define("x", ["d3","returns_map","margin","width"], function(d3,returns_map,margin,width){return(
d3
  .scaleUtc()
  .domain(d3.extent(returns_map.get("BTC"), d => d.date))
  .range([margin.left, width - margin.right])
)});
  main.variable(observer("y")).define("y", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("xAxis")).define("xAxis", ["width","height","margin","d3","x","addWebFont"], function(width,height,margin,d3,x,addWebFont){return(
g =>
  g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .style("font-family", "Acumin Pro")
    .style("font-size", 19)
    .call(
      d3
        .axisBottom(x)
        .ticks(width/ 200)
        .tickSizeOuter(0)
        //.tickFormat(d3.utcFormat('%b. %_d, %Y')) // AP style dates
        .tickFormat(d3.utcFormat('%m/%d/%y'))
    )
    .call(
      addWebFont,
      'Acumin Pro',
      'https://gist.githubusercontent.com/coindesk-research/2bf8eddda40303351c9f02f73b661cca/raw/2aa621a1be6cc12cc572fd390027839254b166a3/Acumin-RPro.otf',
      'opentype'
    )
)});
  main.variable(observer("yAxis")).define("yAxis", ["margin","d3","y","addWebFont"], function(margin,d3,y,addWebFont){return(
g =>
  g
    .attr("transform", `translate(${margin.left},0)`)
    .style("font-family", "Acumin Pro")
    .style("font-size", 19)
    .call(
      d3
        .axisLeft(y)
        .tickFormat(d => d + "%")
        .ticks(8)
    )
    .call(g => g.select(".domain").remove())
    .call(
      addWebFont,
      'Acumin Pro',
      'https://gist.githubusercontent.com/coindesk-research/2bf8eddda40303351c9f02f73b661cca/raw/2aa621a1be6cc12cc572fd390027839254b166a3/Acumin-RPro.otf',
      'opentype'
    )
)});
  main.variable(observer("margin")).define("margin", function(){return(
{ top: 50, right: 80, bottom: 140, left: 80 }
)});
  main.variable(observer("all_assets")).define("all_assets", function(){return(
[
  "BTC",
  "ETH",
  "XRP",
  "BCH",
  "LTC",
  "XTZ",
  "EOS",
  "LINK",
  "BSV",
  "ETC",
  "XLM",
  "ZRX",
  "XMR",
  "ZEC",
  "DASH",
  "BAT",
  "TRX",
  "OXT",
  "ADA",
  "OMG",
  "ALGO",
  "KNC",
  "ATOM",
  "S&P 500",
  "Gold",
  "Bonds",
  "Silver",
  "Nikkei 225",
  "FTSE 100"
]
)});
  main.variable(observer("color_array")).define("color_array", ["d3"], function(d3){return(
["#000000", "#608AD8", "#FCC117", "#FF0000", "#7CEE00", "#D8D8D8"]
  .concat(d3.schemeCategory10)
  .concat(d3.schemeAccent)
  .concat(d3.schemePastel1)
)});
  main.variable(observer("bisect")).define("bisect", ["d3"], function(d3){return(
d3.bisector(function(d) {
  return d.date;
}).right
)});
  main.variable(observer("tooltipvalue")).define("tooltipvalue", ["bisect"], function(bisect){return(
(data, xm) => {
  const i1 = bisect(data, new Date(xm), 1);
  const i0 = i1 - 1;
  const a = data[i0];
  const b = data[i1];
  if (b) {
    return xm - a.date > b.date - xm ? b : a;
  } else {
    return a;
  }
}
)});
  main.variable(observer("callout")).define("callout", function(){return(
(g, value) => {
  if (!value) return g.style("display", "none");

  g.style("display", null)
    .style("pointer-events", "none")
    .style("font", "13px Acumin Pro");

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
    .call(text =>
      text
        .selectAll("tspan")
        .data((value + "").split(/\n/))
        .join("tspan")
        .attr("x", 0)
        .attr("y", (d, i) => `${i * 1.1}em`)
        .style("font-weight", (_, i) => (i ? null : "bold"))
        .text(d => d)
    );

  const { x, y, width: w, height: h } = text.node().getBBox();

  text.attr("transform", `translate(${-w / 2},${15 - y})`);
  path.attr("d", `M${-w / 2 - 10},5H${w / 2 + 10}v${h + 20}h-${w + 20}z`);
}
)});
  main.variable(observer("formatDate")).define("formatDate", function(){return(
function formatDate(date) {
  return date.toLocaleString("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: 'UTC'
  });
}
)});
  main.variable(observer("formatDate2")).define("formatDate2", function(){return(
date => {
  return new Date(date);
}
)});
  main.variable(observer("formatValue")).define("formatValue", ["d3"], function(d3){return(
d3.format(".2%")
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Fetch crypto data from CD API`
)});
  main.variable(observer("cors_head2")).define("cors_head2", function(){return(
"https://observable-cors.glitch.me/"
)});
  main.variable(observer("cd_enddate_obj")).define("cd_enddate_obj", ["enddate"], function(enddate){return(
new Date(enddate)
)});
  main.variable(observer("cd_enddate")).define("cd_enddate", ["cd_enddate_obj"], function(cd_enddate_obj){return(
new Date(cd_enddate_obj.setDate(cd_enddate_obj.getDate() + 1))
  .toISOString()
  .slice(0, 10)
)});
  main.variable(observer("cd_startdate_obj")).define("cd_startdate_obj", ["startdate_obj"], function(startdate_obj){return(
new Date(startdate_obj.getTime())
)});
  main.variable(observer("cd_startdate")).define("cd_startdate", ["cd_startdate_obj"], function(cd_startdate_obj){return(
new Date(
  cd_startdate_obj.setDate(cd_startdate_obj.getDate())
)
  .toISOString()
  .slice(0, 10)
)});
  main.variable(observer("regular_startdate")).define("regular_startdate", ["startdate_obj"], function(startdate_obj){return(
startdate_obj.toISOString().slice(0, 10)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Calculate the returns`
)});
  main.variable(observer("gold_return")).define("gold_return", ["calcuate_return","gold_data"], function(calcuate_return,gold_data){return(
calcuate_return(gold_data, 0)
)});
  main.variable(observer("sp500_return")).define("sp500_return", ["calcuate_return","sp500_data"], function(calcuate_return,sp500_data){return(
calcuate_return(sp500_data, 0)
)});
  main.variable(observer("tlt_return")).define("tlt_return", ["calcuate_return","tlt_data"], function(calcuate_return,tlt_data){return(
calcuate_return(tlt_data, 0)
)});
  main.variable(observer("silver_return")).define("silver_return", ["calcuate_return","silver_data"], function(calcuate_return,silver_data){return(
calcuate_return(silver_data, 0)
)});
  main.variable(observer("nikkei_return")).define("nikkei_return", ["calcuate_return","nikkei_data"], function(calcuate_return,nikkei_data){return(
calcuate_return(nikkei_data, 0)
)});
  main.variable(observer("ftse_return")).define("ftse_return", ["calcuate_return","ftse_data"], function(calcuate_return,ftse_data){return(
calcuate_return(ftse_data, 0)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Fetch non-crypto data from St. Louis Federal Reserve Bank and Nasdaq.com`
)});
  main.variable(observer("gold_data")).define("gold_data", ["d3","cors_head2"], async function(d3,cors_head2){return(
(await d3.csv(
  `${cors_head2}https://fred.stlouisfed.org/graph/fredgraph.csv?id=GOLDPMGBD228NLBM`
)).map(({ DATE, GOLDPMGBD228NLBM }) => ({
  date: new Date(DATE),
  price: GOLDPMGBD228NLBM
}))
)});
  main.variable(observer("sp500_data")).define("sp500_data", ["d3","cors_head2"], async function(d3,cors_head2){return(
(await d3.csv(
  `${cors_head2}https://fred.stlouisfed.org/graph/fredgraph.csv?id=SP500`
)).map(({ DATE, SP500 }) => ({
  date: new Date(DATE),
  price: SP500
}))
)});
  main.variable(observer("silver_data")).define("silver_data", ["d3","cors_head2"], async function(d3,cors_head2){return(
(await d3.csv(
  `${cors_head2}https://fred.stlouisfed.org/graph/fredgraph.csv?id=SLVPRUSD`
)).map(({ DATE, SLVPRUSD }) => ({
  date: new Date(DATE),
  price: SLVPRUSD
}))
)});
  main.variable(observer("nikkei_data")).define("nikkei_data", ["d3","cors_head2"], async function(d3,cors_head2){return(
(await d3.csv(
  `${cors_head2}https://fred.stlouisfed.org/graph/fredgraph.csv?id=NIKKEI225`
)).map(({ DATE, NIKKEI225 }) => ({
  date: new Date(DATE),
  price: NIKKEI225
}))
)});
  main.variable(observer("tlt_data")).define("tlt_data", ["d3","cors_head2","formatDate2"], async function(d3,cors_head2,formatDate2){return(
(await d3.csv(
  `${cors_head2}https://query1.finance.yahoo.com/v7/finance/download/TLT?period1=1027987200&period2=${new Date().getTime()}&interval=1d&events=history`
)).map(({ Date, Close }) => ({
  date: formatDate2(Date),
  price: Close
}))
)});
  main.variable(observer("ftse_data")).define("ftse_data", ["d3","cors_head2","formatDate2"], async function(d3,cors_head2,formatDate2){return(
(await d3.csv(
  `${cors_head2}https://query1.finance.yahoo.com/v7/finance/download/^FTSE?period1=1230768000&period2=${new Date().getTime()}&interval=1d&events=history`
)).map(({ Date, Close }) => ({
  date: formatDate2(Date),
  price: Close
}))
)});
  main.variable(observer("returns_map")).define("returns_map", ["get_data_map","all_returns"], function(get_data_map,all_returns){return(
get_data_map(all_returns)
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
  main.variable(observer("size_input")).define("size_input", function(){return(
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
      height: 600
    };
  }
}
)});
  main.variable(observer("abbreviations")).define("abbreviations", function()
{
  const assets = {
    Bitcoin: "BTC",
    Ethereum: "ETH",
    XRP: "XRP",
    Litecoin: "LTC",
    "Bitcoin Cash": "BCH",
    Eos: "EOS",
    Chainlink: "LINK",
    Tezos: "XTZ",
    Stellar: "XLM",
    "0x": "ZRX",
    "Bitcoin SV": "BSV",
    "Ethereum Classic": "ETC",
    Monero: "XMR",
    Zcash: "ZEC",
    Dash: "DASH",
    "Basic Attention Token": "BAT",
    Tron: "TRX",
    Orchid: "OXT",
    
    Tether: "USDT",
    "USD Coin": "USDC",
    Dai: "DAI",
    "S&P 500": "SP500",
    Gold: "GOLD",
    Bonds: "TLT",
    Silver: "SILVER",
    "Nikkei 225": "NIKKEI",
    "FTSE 100": "FTSE"
  };

  return assets;
}
);
  main.variable(observer("get_data_map")).define("get_data_map", ["all_assets"], function(all_assets){return(
data => {
  var asset_map = new Map();
  var asset_array = [];
  var asset_num = Object.keys(data[0]).length - 1;
  for (var i = 0; i < asset_num; i++) {
    var temp_array = [];
    data.forEach((element, index) => {
      var obj = {
        date: new Date(element["date"]),
        percentage: parseFloat(element[all_assets[i]])
      };
      if (isNaN(obj.percentage) == false) {
        temp_array.push(obj);
      }
    });
    asset_array.push(temp_array);
  }
  for (var i = 0; i < asset_num; i++) {
    asset_map.set(all_assets[i], asset_array[i]);
  }
  return asset_map;
}
)});
  main.variable(observer("array_join")).define("array_join", function(){return(
(Crypto_list, SP500, GOLD, TLT, SILVER, NIKKEI, FTSE) => {
  let SP500_flag = 0;
  let GOLD_flag = 0;
  let TLT_flag = 0;
  let SILVER_flag = 0;
  let NIKKEI_flag = 0;
  let FTSE_flag = 0;

  Crypto_list.forEach((obj, index) => {
    if (SP500[index - SP500_flag]) {
      if (
        obj.date == SP500[index - SP500_flag].date.toISOString().slice(0, 10)
      ) {
        obj["S&P 500"] = SP500[index - SP500_flag].percentage;
      } else {
        SP500_flag += 1;
      }
    }
    if (GOLD[index - GOLD_flag]) {
      if (obj.date == GOLD[index - GOLD_flag].date.toISOString().slice(0, 10)) {
        obj["Gold"] = GOLD[index - GOLD_flag].percentage;
      } else {
        GOLD_flag += 1;
      }
    }
    if (TLT[index - TLT_flag]) {
      if (obj.date == TLT[index - TLT_flag].date.toISOString().slice(0, 10)) {
        obj["Bonds"] = TLT[index - TLT_flag].percentage;
      } else {
        TLT_flag += 1;
      }
    }
    if (SILVER[index - SILVER_flag]) {
      if (
        obj.date == SILVER[index - SILVER_flag].date.toISOString().slice(0, 10)
      ) {
        obj["Silver"] = SILVER[index - SILVER_flag].percentage;
      } else {
        SILVER_flag += 1;
      }
    }
    if (NIKKEI[index - NIKKEI_flag]) {
      if (
        obj.date == NIKKEI[index - NIKKEI_flag].date.toISOString().slice(0, 10)
      ) {
        obj["Nikkei 225"] = NIKKEI[index - NIKKEI_flag].percentage;
      } else {
        NIKKEI_flag += 1;
      }
    }
    if (FTSE[index - FTSE_flag]) {
      if (obj.date == FTSE[index - FTSE_flag].date.toISOString().slice(0, 10)) {
        obj["FTSE 100"] = FTSE[index - FTSE_flag].percentage;
      } else {
        FTSE_flag += 1;
      }
    }
  });
  return Crypto_list;
}
)});
  main.variable(observer("calcuate_start_date")).define("calcuate_start_date", ["ch","sp500_data","tlt_data","gold_data","silver_data","nikkei_data","ftse_data"], function(ch,sp500_data,tlt_data,gold_data,silver_data,nikkei_data,ftse_data){return(
date => {
  let startdate_obj = new Date(date);
  if (ch.includes("S&P 500")) {
    let flag = true;
    while (flag) {
      sp500_data
        .filter(d => d.price != ".")
        .forEach((obj, index) => {
          if (obj.date.getTime() == startdate_obj.getTime()) {
            flag = false;
          }
        });
      if (flag) {
        startdate_obj.setDate(startdate_obj.getDate() - 1);
      }
    }
  }

  console.log(startdate_obj);
  
  if (ch.includes("Bonds")) {
    let flag = true;
    while (flag) {
      tlt_data
        .filter(d => d.price != ".")
        .forEach((obj, index) => {
          if (obj.date.getTime() == startdate_obj.getTime()) {
            flag = false;
          }
        });
      if (flag) {
        startdate_obj.setDate(startdate_obj.getDate() - 1);
      }
    }
  }
  console.log(startdate_obj);
  
  if (ch.includes("Gold")) {
    let flag = true;
    while (flag) {
      gold_data
        .filter(d => d.price != ".")
        .forEach((obj, index) => {
          if (obj.date.getTime() == startdate_obj.getTime()) {
            flag = false;
          }
        });
      if (flag) {
        startdate_obj.setDate(startdate_obj.getDate() - 1);
      }
    }
  }
  console.log(startdate_obj);

  if (ch.includes("Silver")) {
    let flag = true;
    while (flag) {
      silver_data
        .filter(d => d.price != ".")
        .forEach((obj, index) => {
          if (obj.date.getTime() == startdate_obj.getTime()) {
            flag = false;
          }
        });
      if (flag) {
        startdate_obj.setDate(startdate_obj.getDate() - 1);
      }
    }
  }

  if (ch.includes("Nikkei 225")) {
    let flag = true;
    while (flag) {
      nikkei_data
        .filter(d => d.price != ".")
        .forEach((obj, index) => {
          if (obj.date.getTime() == startdate_obj.getTime()) {
            flag = false;
          }
        });
      if (flag) {
        startdate_obj.setDate(startdate_obj.getDate() - 1);
      }
    }
  }

  if (ch.includes("FTSE 100")) {
    let flag = true;
    while (flag) {
      ftse_data
        .filter(d => d.price != ".")
        .forEach((obj, index) => {
          if (obj.date.getTime() == startdate_obj.getTime()) {
            flag = false;
          }
        });
      if (flag) {
        startdate_obj.setDate(startdate_obj.getDate() - 1);
      }
    }
  }

  return startdate_obj;
}
)});
  main.variable(observer("calcuate_return")).define("calcuate_return", ["startdate_obj","enddate_obj"], function(startdate_obj,enddate_obj){return(
(data, method) => {
  data = data.filter(d => d.price != ".");
  var filter = data.filter(
    d => d.date >= startdate_obj && d.date <= enddate_obj
  );
  var returns = filter.map((currentValue, index, array) => {
    if (index == 0) {
      return {
        date: array[index].date,
        percentage: 0
      };
    } else {
      if (method == 0) {
        return {
          date: array[index].date,
          percentage: (array[index].price - array[0].price) / array[0].price
        };
      } else {
        return {
          date: array[index].date,
          percentage: Math.log(array[index].price / array[0].price)
        };
      }
    }
  });
  return returns;
}
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@^6")
)});
  return main;
}
