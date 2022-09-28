const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Initialize function that pulls the subject ID numbers and adds them to the drop-down to feed into building the charts.
function init() {
    var dropDown = d3.select("#selDataset");
    // Fetch the JSON data
    d3.json(url).then(function (data) {
        var sampleId = data.names;
        sampleId.forEach((sample) => {
            dropDown.append("option").text(sample).property("value", sample)
        });
        var initSample = sampleId[0];
        buildDemo(initSample);
        buildCharts(initSample);
        // console.log(data);
    });
};

// Build charts function using the sample from the initialize function to create each of the charts.
function buildCharts(sample) {
    d3.json(url).then(function (data) {
        let trace1 = {
            x: data.sample_values
        }
    });
};

// Build the demographic box again using the sample from the initialize function to create the demographic box that includes
// the subject's information
function buildDemo(sample) {
    var demo = d3.select("#sample-metadata");
    d3.json(url).then(function (data) {
        var metaData = data.metadata;
        // Code adapted during study group with Doug
        // Filter code adapted from https://observablehq.com/@observablehq/learn-javascript-introduction?collection=@observablehq/tutorial
        var metaDataSample = metaData.filter(row => row.id == sample);
        demo.selectAll("p").remove();
        metaDataSample.forEach((row) => {
            for (const [key, value] of Object.entries(row)) {
                demo.append("p").text(`${key}: ${value}`);
            };
        });
    });
};

// Option changed function pulled from HTML file and used to update build charts and build demo functions when the value in the drop-down
// changes
function optionChanged(sample) {
    buildDemo(sample);
    buildCharts(sample);
};

// Calling the initialize function to run.
init();
