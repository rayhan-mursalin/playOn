// Import
import 'regenerator-runtime/runtime';
import moment from 'moment';
import axios from 'axios';

// Variables
var response;
var table = document.getElementById("info");
var selectMenu = document.getElementById("dropdown");
var api = 'https://challenge.nfhsnetwork.com/v2/search/events/upcoming?state_association_key=';
var filter = '&card=true&size=50&start=0';
var ghsaKey = '18bad24aaa';
var uilKey = '542bc38f95';
var startDate = document.getElementById("startDate");
var endDate = document.getElementById("endDate");
var key;

// Change association key when different state is selected 
selectMenu.onchange = async () => {
 var chosenOption = selectMenu.options[selectMenu.selectedIndex];

	if (chosenOption.value == "ghsa"){
		key = ghsaKey;
		response = await axios.get(api + key + filter);
	} else if (chosenOption.value == "uil"){
		key = uilKey;
		response = await axios.get(api + key + filter);
	} else {
		return;
	}

	table.innerHTML = "";
	showData(response);
}


// Change result when date is chosen
endDate.onchange = async () => {
	table.innerHTML = "";
	filterData();
}

// Show data on the page
const showData = async (result) => {
	if (result) {
		const data = result.data.items;

		for (var i = 0; i < data.length; i++) {
			// Format date to get desired output
			var formatDate = moment(data[i].date).format('MMMM Do YYYY h:mm');
			var row = `<tr>
							<td data-label="Key">${data[i].key}</td>
							<td data-label="Headline">${data[i].headline}</td>
							<td data-label="SHeadline">${data[i].subheadline}</td>
							<td data-label="StartTime">${formatDate}</td>
						</tr>`
			table.innerHTML += row;
		}
	}
}


// Filter data with date
const filterData = async () => {
	var startTime = startDate.value;
	var endTime = endDate.value;
	// To-do:
	// Convert startTime and endTime in correct format so only the correct date shows in the result 

	response = await axios.get(api + key + filter + '&from=' + startTime + '&to=' + endTime);

	table.innerHTML = "";
	showData(response);
	startDate.value = '';
	endDate.value = '';
}

