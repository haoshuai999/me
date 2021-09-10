import define1 from "./450051d7f1174df8@254.js";
import define2 from "./a33468b95d0b15b0@739.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["seats_by_women@1.json",require("./files/883d83b92b5e94816b4b9c67c1fa3e0c5f423d4989dcf5a93a2b479c5750053261dc68b92f17706b067985f7c4e1fdbeb214bc603b3c55753b8e679cc2c4f938").default],["candidates2020.json",require("./files/c4acaa2e22e5600d22c6c4a8f337dca860ad37d38b3bfa9654d4514b5eb0dade6eb0ad2c845c99330129e86e9ec1938580f3a2484a5e51f90ccab9bee76dd7e2").default],["countries-50m.json",require("./files/254a99fef9cfdc739794cf276a25ffce226b9d17d64789497bbed4935f1fda7d621149894d3a06e546f0e5c53beda2580db0166433ff2fac65397af1aa3627ea").default],["leader.csv",require("./files/4c2d4cb3aa3800c60244e5d55d02bfc4eebbab6696edd4438d000cbc20ea5b4d3bba3fd6a7b91c9b11800b6564b7b21e14836dae4629b3279c1d627401ce0ad2").default],["age.csv",require("./files/ab9e81b50933310631d81e909acad3544ed98f8867576a096fbdf0a1d128ec226d1a7d079957910e4d24c545b12d1374ebb380b8aa620f097dc08ad0587cfc0d").default],["newcomer@1.csv",require("./files/1aa1f923cfda9be3481e3b71f037884b4e8e983a62e1b1187d68e1010e4b09379f10ac3174ec26d482c82a5ce8c4f677c0f367484f8d067f16349cf8d3cd324e").default],["Race.jpg",require("./files/cd82c7fc4cba90a1139d3809b18946197782e5ccd906d0e9f271e9acbde286ecff33b07a80554abe96176d3bfc184515a7d0aa9b3619f84e4712f05f1b1d36c2").default],["Party.jpg",require("./files/683b7d47d2d818dfac5c5c0f13c7e7c71a577c5a4f925037ade55993b7c11033e9895e7e089be4a60143d1a2e573bbe9c30a4c1258d791a6c3d93410fc4aa2f1").default]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# More Women Ran for Political Office in Singapore
## Singapore still has a long way to go compared to other countries in the world
Candidate profile data in the 2020 Singaporean general election show Singapore is witnessing a growing female representation. But globally, some countries already have over 40% of seats held by women in the parliament. while Singapore has slightly over 20% in 2019.`
)});
  main.variable(observer("title1")).define("title1", ["md"], function(md){return(
md`### Candidate Profile in 2020 Singaporean General Election`
)});
  main.variable(observer("viewof profile")).define("viewof profile", ["Inputs"], function(Inputs){return(
Inputs.radio(["Age", "Seniority", "Role"], {value: "Age", label: "Category"})
)});
  main.variable(observer("profile")).define("profile", ["Generators", "viewof profile"], (G, _) => G.input(_));
  main.variable(observer("barkey")).define("barkey", ["legend","barcolor"], function(legend,barcolor){return(
legend({color: barcolor, title: "Gender of Candidates"})
)});
  main.variable(observer("barchart")).define("barchart", ["d3","width","height","series","barcolor","x","profile","y","xAxis","yAxis","margin","callout","formatValue"], function(d3,width,height,series,barcolor,x,profile,y,xAxis,yAxis,margin,callout,formatValue)
{
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height]);

  svg.append("g")
    .selectAll("g")
    .data(series)
    .join("g")
      .attr("fill", d => barcolor(d.key))
    .selectAll("rect")
    .data(d => d)
    .join("rect")
      .attr("class", "bar")
      .attr("x", (d, i) => x(d.data[profile]))
      .attr("y", d => y(d[1]))
      .attr("height", d => y(d[0]) - y(d[1]))
      .attr("width", x.bandwidth());

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  if (profile == "Age") {
    svg
      .append("line")
      .style("stroke", "#000000")
      .style("stroke-width", 1)
      .attr("x1", x(50) + x.bandwidth() / 2 + x.bandwidth() * 0.119 / 2)
      .attr("y1", margin.top)
      .attr("x2", x(50) + x.bandwidth() / 2 + x.bandwidth() * 0.119 / 2)
      .attr("y2", height - margin.bottom);

    svg
      .append("text")
      .attr("x", x(50) + x.bandwidth())
      .attr("y", margin.top - 5)
      .attr("dy", "0em")
      .attr("text-anchor", "start")
      .attr("font-size", 12)
      .text("Male Candidates");

    svg
      .append("text")
      .attr("x", x(50) + x.bandwidth())
      .attr("y", margin.top - 5)
      .attr("dy", "1em")
      .attr("text-anchor", "start")
      .attr("font-size", 12)
      .text("Mean Age: 50.1");
    
    svg
      .append("line")
      .style("stroke", "#000000")
      .style("stroke-width", 1)
      .attr("x1", x(45) + x.bandwidth() / 2 + x.bandwidth() * 0.175 / 2)
      .attr("y1", margin.top)
      .attr("x2", x(45) + x.bandwidth() / 2 + x.bandwidth() * 0.175 / 2)
      .attr("y2", height - margin.bottom);

    svg
      .append("text")
      .attr("x", x(45))
      .attr("y", margin.top - 5)
      .attr("dy", "0em")
      .attr("text-anchor", "end")
      .attr("font-size", 12)
      .text("Female Candidates");

    svg
      .append("text")
      .attr("x", x(45))
      .attr("y", margin.top - 5)
      .attr("dy", "1em")
      .attr("text-anchor", "end")
      .attr("font-size", 12)
      .text("Mean Age: 45.2");
  }
  
  const tooltip = svg.append("g");
    
  svg
    .selectAll(".bar")
    .on("touchmove mousemove", function(event, d) {
      const mouse = d3.pointer(event, this);
      
      tooltip.call(
          callout,
          `${profile}: ${d.data[profile]}
Gender: ${d.key}
Number of Candidates: ${formatValue(d.data[d.key])}`
      );
      tooltip.attr("transform", `translate(${mouse[1] > 350 ? [mouse[0], mouse[1] - 50] : mouse})`);
      d3.select(this)
        .attr("stroke", "red")
        .raise();
    })
    .on("touchend mouseleave", function() {
      tooltip.call(callout, null);
      d3.select(this)
        .attr("stroke", null)
        .lower();
    });

  return svg.node();
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`### More Female Candidates in Singapore

In recent years, women start to play a more and more important role in Singapore politics and more young women have decided to run for political office for the first time. Data from the 2020 Singaporean general election show that the average age of female candidates was 45.2, almost five years younger than male candidates. Meanwhile, among the new candidates, 24.7% of them are female. Only 18.3% of experienced candidates are women.

Singapore still has a long way to go when it comes to gender equality. There are not a lot of female party leaders in the parliament. Only 5.4% of party leaders are women, while 24.5% of non-leaders are women.
`
)});
  main.variable(observer("title2")).define("title2", ["md"], function(md){return(
md`### Women Representation in National Parliaments Around the World (1990-2019)`
)});
  main.variable(observer("viewof year")).define("viewof year", ["Scrubber","years"], function(Scrubber,years){return(
Scrubber(years, {
  delay: 500,
  loop: false,
  autoplay: false
})
)});
  main.variable(observer("year")).define("year", ["Generators", "viewof year"], (G, _) => G.input(_));
  main.variable(observer()).define(["legend","color","data"], function(legend,color,data){return(
legend({color, title: data.get("China")["Indicator Name"]})
)});
  main.variable(observer("dataviz")).define("dataviz", ["d3","width","height","countries","data","year","color","path","topojson","world","callout"], function(d3,width,height,countries,data,year,color,path,topojson,world,callout)
{
  const svg = d3.create("svg")
      .style("display", "block")
      .attr("viewBox", [0, 0, width, height]);

  const g = svg.append("g");

  g.append("g")
    .selectAll("path")
    .data(countries.features)
    .join("path")
      .attr("class", "country")
      .attr("fill", d => {
        if (data.get(d.properties.name) && data.get(d.properties.name)[year]) {
          return color(data.get(d.properties.name)[year])
        } else {
          return "#ccc"
        }        
      })
      .attr("d", path)
      .attr("stroke", "white")
      .attr("stroke-width", 0.2)
      .attr("stroke-linejoin", "round");

  g.append("path")
      .datum(topojson.mesh(world, world.objects.countries, (a, b) => a !== b))
      .attr("fill", "none")
      .attr("d", path);

  const tooltip = svg.append("g");
  
  svg
    .selectAll(".country")
    .on("touchmove mousemove", function(event, d) {
      if (data.get(d.properties.name)[year]) {
        tooltip.call(
          callout,
          `${d.properties.name}
  ${year}: ${data.get(d.properties.name)[year]}%`
        );
      } else {
        tooltip.call(
          callout,
          `${d.properties.name}
  ${year}: N/A`
        );
      }
      tooltip.attr("transform", `translate(${d3.pointer(event, this)})`);
      d3.select(this)
        .attr("stroke", "red")
        .raise();
    })
    .on("touchend mouseleave", function() {
      tooltip.call(callout, null);
      d3.select(this)
        .attr("stroke", null)
        .lower();
    });

    let zoom = d3.zoom()
          .scaleExtent([1, 8])
          .on('zoom', function(event) {
              g.selectAll('path')
               .attr('transform', event.transform);
              //tooltip.attr("transform", event.transform);
    });
    
    svg.call(zoom);

  return svg.node();
}
);
  main.variable(observer()).define(["md"], function(md){return(
md `### Women in National Parliaments Around the World
The rise of women's voices in politics has been a trend in Singapore and around the world. 

Back in 1990, over 30% of seats in national parliaments of Scandinavian countries were women, while some other countries had 0 women in their parliament. Women only held 4.9% of the seat in the Parliament of Singapore back then, lower than the world average (12.7%).

After that, quite a few Latin American and African countries started to catch up. For example, in 2003, women held over 30% of seats in Cuba, and Mexico reached the 30% benchmark in 2012. Meanwhile, in Singapore, Lim Hwee Hua became the first female Cabinet minister in 2009.

By 2019, European, Latin American, and African countries have more women in national parliaments than the rest of the world. Among them, Bolivia, Cuba, and Rwanda have more women than men in their national parliaments. In East and Southeast Asia, Singapore, China, Vietnam, Laos, and Phillippines are the countries with higher female representations in the parliament. On the other hand, Japan and Myanmar are on the lower side.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Sketch 
For the rest of my story, I would like to explore the following points:
1. Collect more data about education and [gender equality](http://hdr.undp.org/en/content/gender-development-index-gdi) to answer why more women chose to run for office in Singapore over the years.
2. Briefly review the history of women in Singapore politics. Some female Singaporean politicians like Lim Hwee Hua are going to be used as examples. I would like to create a timeline like [my article at USA Today](https://www.usatoday.com/pages/interactives/women-suffrage-timeline/) to mark the important time points.
3. Explore the relationship between race and gender or party and gender for the candidates. I created a few data visualisations on Tableau but only found that there is a high percentage of women among Chinese-origin candidates and candidates from the People's Action Party. I probably need to collect more historical data to answer why. (Tableau visualisations are attached)
`
)});
  main.variable(observer()).define(["html","FileAttachment"], async function(html,FileAttachment){return(
html`<img src="${await FileAttachment("Party.jpg").url()}" style="height: 200px"/>`
)});
  main.variable(observer()).define(["html","FileAttachment"], async function(html,FileAttachment){return(
html`<img src="${await FileAttachment("Race.jpg").url()}" style="height: 200px"/>`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Questions
1. Among all these candidates, who eventually lost and who won the election. I could download the data about the result of the election to compare the successful candidates with lost ones. I can also use the existing background data to further analyze candidates with what background is favored by voters.
2. What made the women's representation in Latin American and African countries grow so fast in recent years. I would use some countries as examples and read more about their history to answer the question.
3. I found it interesting that a lot of candidates come from business or law industry. I could look into the percentage of candidates coming from these two industries in the previous elections and visualise the percentage changes over the years. Given that business and law are two fields traditionally dominated by men, it will be interesting to compare the female candidates to male candidates with their background or occupation.
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Issues
1. When users zoom into the map, the locations of the tooltips change and become not accurate. If I have time, I would add a transform function to move tooltips when readers zoom in and zoom out.
2. When users pan on the map, they can easily move away from the map. I would like to set a boundary to the map panning if I have time.
3. I was thinking about directly using Javascript to process the data. However, I found it much easier to use Excel to group the data and upload the processed version to Observable. I also believe that reduces the loading time of the notebook because JavaScript is not supposed to be used for data analysis.
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md `### Your aim is ... 

Using this data and data you can collect on other general elections in the region, provide a quick story that focuses on **Singapore’s female candidates** and gender representation in parliaments around the world.

Please include:
* A completed data visualisation that would be the feature of the piece.
* Headline, deck, and any subheadings where needed. Write at least 1 or 2 paragraphs where necessary.
* A sketch or rough plan on other points you would explore in the story.
* Highlight at least 3 other questions you might ask of the data and some ideas on how to answer them. Imagine you have time & space to include these in the main story, or even propose some as a separate article.
* Point out at least two issues you encounter and how you might resolve them, given time and resources.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md `### Variables`
)});
  main.variable(observer("series")).define("series", ["choose_dataset","profile"], function(choose_dataset,profile){return(
choose_dataset(profile)
)});
  main.variable(observer("x")).define("x", ["choose_xaxis","profile"], function(choose_xaxis,profile){return(
choose_xaxis(profile)
)});
  main.variable(observer("y")).define("y", ["d3","series","height","margin"], function(d3,series,height,margin){return(
d3.scaleLinear()
    .domain([0, d3.max(series, d => d3.max(d, d => d[1]))])
    .rangeRound([height - margin.bottom, margin.top])
)});
  main.variable(observer("barcolor")).define("barcolor", ["d3","series"], function(d3,series){return(
d3.scaleOrdinal()
    .domain(series.map(d => d.key))
    .range(["#f98cae", "#8CF9D7"])
    .unknown("#ccc")
)});
  main.variable(observer("xAxis")).define("xAxis", ["height","margin","d3","x"], function(height,margin,d3,x){return(
g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickSizeOuter(0))
    .call(g => g.selectAll(".domain").remove())
)});
  main.variable(observer("yAxis")).define("yAxis", ["margin","d3","y"], function(margin,d3,y){return(
g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(null, "s"))
    .call(g => g.selectAll(".domain").remove())
    .call(g => g.append("text")
          .attr("x", -margin.left)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("Number of Candidates"))
)});
  main.variable(observer("formatValue")).define("formatValue", function(){return(
x => isNaN(x) ? "N/A" : x.toLocaleString("en")
)});
  main.variable(observer("margin")).define("margin", function(){return(
{top: 30, right: 10, bottom: 20, left: 40}
)});
  main.variable(observer("height")).define("height", ["d3","projection","width","outline"], function(d3,projection,width,outline)
{
  const [[x0, y0], [x1, y1]] = d3.geoPath(projection.fitWidth(width, outline)).bounds(outline);
  const dy = Math.ceil(y1 - y0), l = Math.min(Math.ceil(x1 - x0), dy);
  projection.scale(projection.scale() * (l - 1) / l).precision(0.2);
  return dy;
}
);
  main.variable(observer("outline")).define("outline", function(){return(
{type: "Sphere"}
)});
  main.variable(observer("path")).define("path", ["d3","projection"], function(d3,projection){return(
d3.geoPath(projection)
)});
  main.variable(observer("color")).define("color", ["d3"], function(d3){return(
d3.scaleSequential()
    .domain(d3.extent([0, 60]))
    .interpolator(d3.interpolateRdPu)
)});
  main.variable(observer("countries")).define("countries", ["topojson","world"], function(topojson,world){return(
topojson.feature(world, world.objects.countries)
)});
  main.variable(observer("projection")).define("projection", ["d3"], function(d3){return(
d3.geoNaturalEarth1()
)});
  main.variable(observer("years")).define("years", ["seatsByWomen"], function(seatsByWomen){return(
Object.keys(seatsByWomen[0]).slice(30,-4)
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
        //.style("font-weight", (_, i) => i ? null : "bold")
        .text(d => d));

  const {x, y, width: w, height: h} = text.node().getBBox();

  text.attr("transform", `translate(${-w / 2},${15 - y})`);
  path.attr("d", `M${-w / 2 - 10},5H${w / 2 + 10}v${h + 20}h-${w + 20}z`);
}
)});
  main.variable(observer("data")).define("data", ["process_data","seatsByWomen"], function(process_data,seatsByWomen){return(
process_data(seatsByWomen)
)});
  main.variable(observer("rename")).define("rename", function(){return(
new Map([
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
  // ["Tuvalu", ?],
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
  ["Sint Maarten (Dutch part)","Sint Maarten"]
])
)});
  main.variable(observer()).define(["test"], function(test){return(
test()
)});
  main.variable(observer()).define(["md"], function(md){return(
md `### Functions`
)});
  main.variable(observer("process_data")).define("process_data", ["rename"], function(rename){return(
(data) => {
  let map = new Map();
  data.forEach(element => { 
    map.set(rename.get(element["Country Name"]) ? rename.get(element["Country Name"]) :element["Country Name"], element)
  });

  return map;
}
)});
  main.variable(observer("test")).define("test", ["countries","data"], function(countries,data){return(
() => {
  let missing_country = [];
  countries.features.forEach(element => {
    if (!data.get(element.properties.name)) {
      missing_country.push(element.properties.name)
    }
  });

  return missing_country;
}
)});
  main.variable(observer("choose_dataset")).define("choose_dataset", ["d3","age","seniority","leadership"], function(d3,age,seniority,leadership){return(
(choice) => {
  if (choice == "Age") {
    return d3.stack()
    .keys(age.columns.slice(1))
  (age)
    .map(d => (d.forEach(v => v.key = d.key), d))
  } else if (choice == "Seniority") {
    return d3.stack()
    .keys(seniority.columns.slice(1))
  (seniority)
    .map(d => (d.forEach(v => v.key = d.key), d))
  } else {
    return d3.stack()
    .keys(leadership.columns.slice(1))
  (leadership)
    .map(d => (d.forEach(v => v.key = d.key), d))
  }
}
)});
  main.variable(observer("choose_xaxis")).define("choose_xaxis", ["d3","age","margin","width","seniority","leadership"], function(d3,age,margin,width,seniority,leadership){return(
(choice) => {
  if (choice == "Age") {
    return d3.scaleBand()
    .domain(age.map(d => d[choice]))
    .range([margin.left, width - margin.right])
    .padding(0.1)
  } else if (choice == "Seniority") {
    return d3.scaleBand()
    .domain(seniority.map(d => d[choice]))
    .range([margin.left, width - margin.right])
    .padding(0.5)
  } else {
    return d3.scaleBand()
    .domain(leadership.map(d => d[choice]))
    .range([margin.left, width - margin.right])
    .padding(0.5)
  }
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md `### Here's the data

Feel free to add more datasers and/or use this however you see fit. To attach a new file simply click on the **three dots ...** on top right navigation and open **File Attachments**`
)});
  main.variable(observer("age")).define("age", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("age.csv").csv()
)});
  main.variable(observer("leadership")).define("leadership", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("leader.csv").csv()
)});
  main.variable(observer("seniority")).define("seniority", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("newcomer@1.csv").csv()
)});
  main.variable(observer("candidates2020")).define("candidates2020", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("candidates2020.json").json()
)});
  main.variable(observer("seatsByWomen")).define("seatsByWomen", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("seats_by_women@1.json").json()
)});
  main.variable(observer("world")).define("world", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("countries-50m.json").json()
)});
  main.variable(observer()).define(["md"], function(md){return(
md `### Libraries`
)});
  const child1 = runtime.module(define1);
  main.import("Scrubber", child1);
  const child2 = runtime.module(define2);
  main.import("legend", child2);
  main.variable(observer("topojson")).define("topojson", ["require"], function(require){return(
    require("topojson-client@3")
  )});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  return main;
}
