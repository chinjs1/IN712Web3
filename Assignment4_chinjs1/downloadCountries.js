// Loading the google bar chart
google.charts.load('current', {'packages':['bar']});

// Downloading the list of countries
$.getJSON( " http://api.population.io:80/1.0/countries", function( data ) {
	// Creating an autocomplete on the country textfield
	$("[name=country]").autocomplete({
		// Set the source to be the array of countries downloaded
		source: data["countries"]
	});
});

// On click
$("#buttonFind").click(function(event) {
	// Prevents the default form action happening when button is clicked
	event.preventDefault();
	// Get the current value of the country
	var country = $("[name=country]").val();
	// Escapes characters to be valid for a URL
	country = encodeURIComponent(country);
	// Make an ajax request to pull the population data
	$.ajax({
		method: "GET",
		url: "http://api.population.io:80/1.0/population/2015/" + country + "/",
	}).done(function( data ) {
		// Create a google chart datatable once ajax is complete
		var chartData = new google.visualization.DataTable();

		// Declare columns
		chartData.addColumn('string', 'Age');
		chartData.addColumn('number', 'Population');
		
		// Get the length of the array and add rows to the table
		chartData.addRows(data.length);
		// Loop over the data received from the ajax request
		$.each(data, function(index, e) {
			chartData.setCell(index, 0, String(e["age"]));
			chartData.setCell(index, 1, e["total"]);
		});		
	
		// Options for the chart 
		var options = {
			chart: {
				title: 'Country Age Distribution',
				subtitle: country,
			}
		};	

		// Grab the div from the HTML page to make a bar chart
		var chart = new google.charts.Bar(document.getElementById('columnchart_material'));
		// Draw the bar chart to the div with the data in options
		chart.draw(chartData, google.charts.Bar.convertOptions(options));

	});
});