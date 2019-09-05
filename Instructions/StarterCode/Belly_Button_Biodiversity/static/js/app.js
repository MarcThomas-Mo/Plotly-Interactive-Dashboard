function buildMetadata(sample) {
  var sampledata = d3.json('/sample/$(sample)'.then(data =>{
    return data;
  }))
  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  var metadata = /metadata/`${sample}`;
    // Use d3 to select the panel with id of `#sample-metadata`
   d3.json(metadata).then(function (sample) {
      var sampleData = d3.select(`#sample-metadata`);

    // Use `.html("") to clear any existing metadata
    sampleData.html("")

    // Use `Object.entries` to add each key and value pair to the panel
    Object.entries(sample).forEach(function ([key, value]) {
      var row = sampleData.append("#sample-metadata");
      row.text(`${key}:${value}`)
    })
   });

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
var plotData = `sampes/${sample}`;

    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart

  d3.json(plotData).then(function(data){
    var values = data.sample_values.slice(0,10);
    var labels = data.otu_ids.slice(0,10);
    var display = data.otu_labels.slice(0,10);
    
    var piechart = [{
      labels: labels,
      values: values,
      hovertext: display,
      type: "pie",
  
    }];
    });

plotly.newPlot("pie", piechart);
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init()};
