// Wrap everything in a makeResponsive function to make sure the chart is always sized correctly
function makeResponsive() {

  /*============================
  ==IMPORT DATA ================*/
  var xView = "poverty";
  var yView = "obesity";

  d3.csv(".\\data\\data.csv").then(function(dataset){
    showVisual(dataset, xView, yView);
  });

  /*=============================
  ===SVG ELEMENT MODULE =========*/

  // create and clear the svg area
  var svgArea = d3.select("body").select("svg");
  if(!svgArea.empty()) {
    svgArea.remove();
  }

  // establish svg width using window size
  var svgWidth = window.innerWidth;
  var svgHeight = window.innerHeight;

  // padding inside visible window
  var margin = {
    top: 50,
    bottom: 50,
    right: 50,
    left: 50
  };

  // padding inside visible window
  var padding = {
    top: -49,
    right: 19,
    left: 0
  };

  // make svg height/width using visible window and padding
  var height = svgHeight - margin.top - margin.bottom;
  var width = svgWidth - margin.left - margin.right;

  // add the svg element to the HTML
  var svg = d3.select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth)
    .attr("class", "scatter")
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  /*=============================
  ===CSV FILE PARSING ===========*/

  // Read CSV
  // d3.csv("data.csv", function(error, stateData) {
  //   if(error) return console.warn(error);

  //   // create list of states
  //   var states = stateData.map(data => data.state);
  //   console.log("State - ", states);

  //   stateData.foreach(function(data) {
  //     data.poverty = +data.poverty;
  //     data.age = +data.age;
  //     console.log("Poverty - ", data.poverty);
  //     console.log("Age - ", data.age);
  //   });
  // });

  function showVisual(data, xView, yView){

    data.map(d =>{
      data.poverty = +d[xView];
      data.obesity = +d[yView];
    });

  /*======================
  ==CREATING SCALE =======*/

  // creating the max and min of the axis
  var xValues  = data.map(d => parseFloat(d[xView]));
  var yValues  = data.map(d => parseFloat(d[yView]));

  // create the scale for x axis
  var xScale = d3.scaleLinear()
    .domain(d3.extent(xValues))
    .range([margin.right, width+margin.right]);

  // create the scale for the y axis
  var yScale = d3.scaleLinear()
    .domain(d3.extent(yValues))
    .range([height-40, margin.top]);

  var xAxis = d3.axisBottom(xScale);
  var yAxis = d3.axisLeft(yScale);

  // adding the above values to the html
  svg.append("g")
    .attr("class", "xAxis")
    .attr("transform", `translate(${padding.top},  ${height - margin.bottom})`)
    .call(xAxis);

  svg.append("g")
    .attr("class", "yAxis")
    .attr("transform", `translate(${padding.left}, ${padding.right})`)
    .call(yAxis);

  /*===========================
  ==CREATE A SCATTER PLOT =====*/
  var scatter = svg.selectAll("circles")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xScale( d[xView] ))
    .attr("cy", d => yScale( d[yView] ))
    .attr("r", 10);

  /* data[xView] is the scale that will be updated on click. You will need to update the bubbles with:

    1. Text for state abbr
    2. Event Handlers
    3. Labels that the user will click to update the chart
    4. colors for bubbles and abbr state letters

  */
console.log("data", data[xView]);
  };
};

// Call makeresponsive when Browser loads
makeResponsive();

// call it again should browser be resized
d3.select(window).on("resize", makeResponsive);