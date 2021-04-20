d3.json("./data/samples.json").then(function(data) {
    // Load and inspect data
    console.log(data);
    
    // Get only the sample data 
    var samples = data.samples;
    console.log(samples);

    // filter based on id
    var result = samples.filter(obj => {
        return obj.id === "941"
        });
    console.log(result);

    // put chart data in variables
    var sampleValues = result[0].sample_values;
    console.log(sampleValues);
    var otuIDs = result[0].otu_ids;
    console.log(otuIDs);
    // var otuLabels = result.otu_labels

    var data = [{
        type: 'bar',
        x: sampleValues,
        y: otuIDs,
        orientation: 'h'
      }];
      
    Plotly.newPlot('bar', data);
});

