// Wrap everything in a makeResponsive function to make sure the chart is always sized correctly
function makeResponsive() {

  // ===========================
  // IMPORT DATA ===============
  var xView = "poverty";
  var yView = "obesity";

  d3.csv(".\\assets\\data\\data.csv").then(function(dataset){
    showVisual(dataset, xView, yView);
  });

  // ============================
  // SVG ELEMENT MODULE =========

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
}

  // make svg height/width using visible window and padding
  var height = svgHeight - margin.top - margin.bottom;
  var width = svgWidth - margin.left - marging.right;

  // add the svg element to the HTML
  var svg = d3.select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth)
    .attr("class", "scatter")
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // ============================
  // CSV FILE PARSING ===========

  // Read CSV
  d3.csv("data.csv", function(error, stateData) {
    if(error) return console.warn(error);

    // create list of states
    var states = stateData.map(data => data.state);
    console.log("State - ", states);

    stateData.foreach(function(data) {
      data.poverty = +data.poverty;
      data.age = +data.age;
      console.log("Poverty - ", data.poverty);
      console.log("Age - ", data.age);
    });
  });
};

// Call makeresponsive when Browser loads
makeResponsive();

// call it again should browser be resized
d3.select(window).on("resize", makeResponsive);