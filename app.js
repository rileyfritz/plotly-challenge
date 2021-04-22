function InitDashboard() {

    d3.json("./data/samples.json").then(function (data) {
        // Load and inspect data
        // console.log(data);

        // Get only the sample data 
        var samples = data.samples;
        // console.log(samples);

        // // Remove all options currently in the dropdown
        // var options = document.querySelectorAll('#selDataset option');
        // options.forEach(o => o.remove());

        // Select and populate the dropdwon
        var select = document.getElementById("selDataset");
        var options = document.querySelectorAll('#selDataset option');
        console.log(options);

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

        otuIDs.forEach(function (part, index, otuIDs) {
            otuIDs[index] = `OTU ${otuIDs[index]}`;
        });

        var data = [{
            type: 'bar',
            x: sampleValues,
            y: otuIDs,
            text: otuLabels,
            orientation: 'h'
        }];

        Plotly.newPlot('bar', data);

    });
};

InitDashboard();


















