// Function to initialize script
  function init() {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(data => {

        // Call sample names
        let sampleNames = data.names;
        let dropdown = d3.select("#selDataset");
        sampleNames.forEach(name => {
            dropdown.append("option").text(name).property("value", name);
        });

        plotData(sampleNames[0]);
    });
  }

  function optionChanged(newSample) {
    plotData(newSample);
  }

// Function to create data visualizations
function plotData(sample) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(data => {
        console.log(data);

        // Call sample names
        let samples = data.samples;
        let result = samples.filter(sampleObj => sampleObj.id == sample)[0];
        console.log(result);

        // Create bar chart and plot using Plotly
        let barData = [{
            x: result.sample_values.slice(0, 10).reverse(),
            y: result.otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
            text: result.otu_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h"
        }];

        Plotly.newPlot("bar", barData);

        // Create bubble chart and plot using Plotly
        let bubbleData = [{
            x: result.otu_ids,
            y: result.sample_values,
            text: result.otu_labels,
            mode: "markers",
            marker: {
                size: result.sample_values,
                color: result.otu_ids,
                colorscale: "Earth"
            }
        }];

        Plotly.newPlot("bubble", bubbleData);

        // Fetch metadata for the chosen sample data then display it
        let metadata = data.metadata.filter(sampleObj => sampleObj.id == sample)[0];
        console.log(metadata);

        let metaDataDiv = d3.select("#sample-metadata");
        metaDataDiv.html("");
        Object.entries(metadata).forEach(([key, value]) => {
            metaDataDiv.append("h5").text(`${key}: ${value}`);
        });

        // Create gauge chart and plot using Plotly
        let washingFreq = metadata.wfreq;
        let gaugeData = [{
            domain: { x: [0, 1], y: [0, 1] },
            value: washingFreq,
            title: { text: "Belly Button Washing Frequency<br>Scrubs per Week" },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: { range: [null, 9] },
                steps: [
                    { range: [0, 1], color: "#f8f3ec" },
                    { range: [1, 2], color: "#f4f1e4" },
                    { range: [2, 3], color: "#e9e7c9" },
                    { range: [3, 4], color: "#e5e8b0" },
                    { range: [4, 5], color: "#d5e599" },
                    { range: [5, 6], color: "#b7cd8f" },
                    { range: [6, 7], color: "#8bc086" },
                    { range: [7, 8], color: "#89bc8d" },
                    { range: [8, 9], color: "#84b589" },
                ]
            }
        }];

        Plotly.newPlot("gauge", gaugeData);

    });
  }

  // Call function to initialize script
  init();
