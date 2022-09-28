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
        // Define variables needed for the charts
        var allSamples = data.samples;
        var sampleInfo = allSamples.filter(row => row.id == sample);
        var sampleValues = sampleInfo[0].sample_values;
        var sampleValuesSlice = sampleValues.slice(0,10).reverse();
        var otuIds = sampleInfo[0].otu_ids;
        var otuIdsSlice = otuIds.slice(0,10).reverse();
        var otuLabels = sampleInfo[0].otu_labels;
        var otuLabelsSlice = otuLabels.slice(0,10).reverse();
        // var ylabel = []

        // for (var i = 0; i < 10; i++) {
        //     ylabel.append(`OTU ${otuIdsSlice[i]}`);
        // }

        console.log(sampleValues);

        // Create the first chart (bar chart)
        var trace1 = {
            x: sampleValuesSlice,
            y: [`OTU ${otuIdsSlice[0]}`, `OTU ${otuIdsSlice[1]}`, `OTU ${otuIdsSlice[2]}`, `OTU ${otuIdsSlice[3]}`, `OTU ${otuIdsSlice[4]}`, 
            `OTU ${otuIdsSlice[5]}`, `OTU ${otuIdsSlice[6]}`, `OTU ${otuIdsSlice[7]}`, `OTU ${otuIdsSlice[8]}`, `OTU ${otuIdsSlice[9]}`],

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
            }
        };
        var data2 = [trace2];
        var layout = {
            showlegend: false
        };

        Plotly.newPlot("bubble", data2, layout);
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