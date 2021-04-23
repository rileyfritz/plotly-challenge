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
        var sampleValuesTen = [...sampleValues]
        sampleValuesTen = sampleValuesTen.slice(0, 10); // Add line to reverse so chart is flipped
        var otuIDs = result[0].otu_ids;
        var otuIdNums = [...otuIDs];
        var otuLabels = result[0].otu_labels;

        // adding OTU id to the y axis as f-string
        otuIDs.forEach(function (part, index, otuIDs) {
            otuIDs[index] = `OTU ${otuIDs[index]}`;
        });
        
        // Create trace for hbar plot
        var hbarData = [{
            type: 'bar',
            x: sampleValuesTen,
            y: otuIDs,
            text: otuLabels,
            orientation: 'h'
        }];
        
        // create the hbar chart
        Plotly.newPlot('bar', hbarData);

        // color lists for marker colors
        var colors = ['pink','red', 'orange', 'yellow', 'green', 'blue', 'grey', 'black']
        var markerColors = [];
        
        // put a bunch of colors into an array
        for (var i = 0; i < otuIdNums.length; i++) {
            var counter = i % 8;
            counter = Math.floor(counter);
            console.log(counter);
            markerColors.push(colors[counter]);
        };
        // trace for bubble chart
        var bubbleData = [{
            x: otuIdNums,
            y: sampleValues,
            text: otuLabels,
            mode: 'markers',
            marker: {
              color: markerColors,
              size: sampleValues
            }
          }];
          
          
          var bubbleLayout = {
            title: '',
            showlegend: false,
            xaxis: {
                title: 'OTU ID'
            }
          };
          
          Plotly.newPlot('bubble', bubbleData, bubbleLayout);

    });
};

InitDashboard();


















