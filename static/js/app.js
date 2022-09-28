const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Initialize function that pulls the subject ID numbers and adds them to the drop-down to feed into building the charts.
// Function codes built up from tutoring session with Kelli Kennedy
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
        // Define variables needed for the charts
        var allSamples = data.samples;
        var sampleInfo = allSamples.filter(row => row.id == sample);
        var sampleValues = sampleInfo[0].sample_values;
        var sampleValuesSlice = sampleValues.slice(0,10).reverse();
        var otuIds = sampleInfo[0].otu_ids;
        var otuIdsSlice = otuIds.slice(0,10).reverse();
        var otuLabels = sampleInfo[0].otu_labels;
        var otuLabelsSlice = otuLabels.slice(0,10).reverse();
        var metaData = data.metadata;
        var metaDataSample = metaData.filter(row => row.id == sample);
        var wash = metaDataSample[0].wfreq;

        // console.log(metaData);

        // Create the first chart (bar chart)
        var trace1 = {
            x: sampleValuesSlice,
            y: otuIdsSlice.map(item => `OTU ${item}`),
            type: "bar",
            orientation: "h",
            text: otuLabelsSlice,
        };
        var data = [trace1];
        Plotly.newPlot("bar", data)

        // Create the second chart (bubble chart)
        var trace2 = {
            x: otuIds,
            y: sampleValues,
            mode: "markers",
            marker: {
                size: sampleValues,
                color: otuIds,
                colorscale: "Earth"
            },
            text: otuIds
        };
        var data2 = [trace2];
        var layout = {
            showlegend: false
        };

        Plotly.newPlot("bubble", data2, layout);

        // Create the gauge chart.
        var data3 = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: wash,
              title: {text: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week" },
              type: "indicator",
              mode: "gauge+number",
              gauge: {
                axis: { range: [null, 9] },
                bar: { color: "black" },
                steps: [
                  { range: [0, 1], color: "rgba(114, 70, 28, 0.9)" },
                  { range: [1, 2], color: "rgba(169, 146, 48, 0.9)" },
                  { range: [2, 3], color: "rgba(199, 188, 58, 0.9)" },
                  { range: [3, 4], color: "rgba(221, 226, 68, 0.9)" },
                  { range: [4, 5], color: "rgba(66, 206, 58, 0.9)" },
                  { range: [5, 6], color: "rgba(29, 184, 122, 0.9)" },
                  { range: [6, 7], color: "rgba(15, 155, 165, 0.9)" },
                  { range: [7, 8], color: "rgba(11, 117, 154, 0.9)" },
                  { range: [8, 9], color: "rgba(0, 34, 125, 0.9)" },
                ],
                threshold: {
                  line: { color: "black", width: 4 },
                  thickness: 0.75,
                  value: wash
                }
              }
            }
          ];
          
          var layout2 = { width: 600, height: 450, margin: { t: 0, b: 0 } };
          Plotly.newPlot('gauge', data3, layout2);
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