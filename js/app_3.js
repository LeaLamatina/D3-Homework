var svgWidth = 700;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 20,
  bottom: 60,
  left: 55
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

	// Append an SVG group to HTML
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("data/data.csv")
  .then(function(chartData) {

		// get data for poverty and smoking
    chartData.forEach(function(data) {
      data.poverty = +data.poverty;
      data.smokes = +data.smokes;
    });

    // CREATE SCALE FUNCTION
    var xLinearScale = d3.scaleLinear()
      .domain([30, d3.max(chartData, d => d.poverty)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([5, d3.max(chartData, d => d.smokes)])
      .range([height, 0]);

		// Something I know we need but dont quite understand
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Add axis to chart
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Make circles for Data Plots
    var circlesGroup = chartGroup.selectAll("circle")
    .data(chartData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.smokes))
    .attr("r", "15")
    .attr("fill", "blue")
    .attr("opacity", ".5");

  chartGroup.append("text")
  .style("text-anchor", "middle")
  .style("font-size", "10px")
  .selectAll("tspan")
  .data(chartData)
  .enter()
  .append("tspan")
      .attr("x", function(data) {
          return xLinearScale(data.poverty - 0);
      })
      .attr("y", function(data) {
          return yLinearScale(data.smokes - 0.2);
      })
      .text(function(d){
        return (`${d.abbr}`)
      });

  // // var circleAbbr = chartGroup.selectAll("circle")
  // chartGroup.selectAll("circle")
  //   .append('text')
    // .attr("cx", d => xLinearScale(d.poverty))
    // .attr("cy", d => yLinearScale(d.smokes))
  //   .attr("r", "15")
  //   .attr("color", "black")
  //   .attr("font-size", "20")
    // .text(function(d){
    //   return (`${d.abbr}`)
    // });
 
   // Step 6: Initialize tool tip
    // ==============================
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`ID: ${d.id}<br>poverty: ${d.poverty}<br>Smokes: ${d.smokes}`);
      });

    // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("mouseover", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left )
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Smokes (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${width/2}, ${height + margin.top +30})`)
      .attr("class", "axisText")
      .text("poverty");
	});