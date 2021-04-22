function InitDashboard() {

    d3.json("./data/samples.json").then(function (data) {
        // Load and inspect data
        // console.log(data);

        // Get only the sample data 
        var samples = data.samples;
        // console.log(samples);

        // Select and populate the dropdwon
        var select = document.getElementById("selDataset");
        
        // check if there are already options in the dropdown. Only add options if options array is empty
        var options = document.querySelectorAll('#selDataset option');
        // console.log(options);

        if (options.length === 0) {
        
            // populate dropdown with loop
            for (var i = 0; i < samples.length; i++) {
                var option = document.createElement('option');
                option.text = samples[i].id;
                // console.log(option.text);
                select.add(option, 0);
            };
        };

        // get current dropdown value
        var dropdownMenu = d3.select("#selDataset");
        var currentID = dropdownMenu.property("value");

        // filter based on id
        var result = samples.filter(obj => {
            return obj.id === currentID
        });

        // Storing vars for chart data
        var sampleValues = result[0].sample_values;
        sampleValues = sampleValues.slice(0, 10); // Add line to reverse so chart is flipped
        var otuIDs = result[0].otu_ids;
        var otuLabels = result[0].otu_labels;

        // adding OTU id to the y axis as f-string
        otuIDs.forEach(function (part, index, otuIDs) {
            otuIDs[index] = `OTU ${otuIDs[index]}`;
        });
        // Create trace for hbar plot
        var hbarData = [{
            type: 'bar',
            x: sampleValues,
            y: otuIDs,
            text: otuLabels,
            orientation: 'h'
        }];
        
        // create the hbar chart
        Plotly.newPlot('bar', hbarData);

        console.log(result[0].otu_ids);
        // var trace1 = {
        //     x: [1, 2, 3, 4],
        //     y: [10, 11, 12, 13],
        //     mode: 'markers',
        //     marker: {
        //       size: [40, 60, 80, 100]
        //     }
        //   };
          
        //   var data = [trace1];
          
        //   var layout = {
        //     title: 'Marker Size',
        //     showlegend: false,
        //     height: 600,
        //     width: 600
        //   };
          
        //   Plotly.newPlot('myDiv', data, layout);

    });
};

InitDashboard();


















