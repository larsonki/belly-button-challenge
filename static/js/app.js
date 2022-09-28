const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

function init() {
    var dropDown = d3.select("#selDataset");

    // Fetch the JSON data
    d3.json(url).then(function (data) {
        var subId = data.names;
        subId.forEach((sample) => {
            dropDown.append("option").text(sample).property("value", sample)
        });
        var initSample = subId[0];
        buildMeta(initSample);
        buildCharts(initSample);
        // console.log(data);
    });
};

function buildCharts(sample) {
    d3.json(url).then(function (data) {
        let trace1 = {
            x: data.sample_values
        }
    });
};

function buildMeta(sample) {
    var demo = d3.select("#sample-metadata");
    d3.json(url).then(function (data) {
        var metaData = data.metadata;
        var metaDataSample = metaData.filter(row => row.id == sample);
        demo.selectAll("p").remove();
        metaDataSample.forEach((row) => {
            for (const [key, value] of Object.entries(row)) {
                demo.append("p").text(`${key}: ${value}`);
            };
        });
    });

};

function optionChanged(sample) {
    buildMeta(sample);
    buildCharts(sample);
};

init();








// d3.select("select").on("change", function(d) {
//     var selected = d3.select("#selDataset").node().value;
//     console.log(selected);
// })

// function optionChanged(val) {

// };

// function push(data) {

// };

// console.log(sampleValues);
// console.log(otuIds);
// console.log(otuLabels);

// let trace1 = {
//     x: 
// }
