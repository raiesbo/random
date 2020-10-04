const button = document.querySelector('button');


button.addEventListener('click', () => {
	//Variable definition
	let bill = document.getElementById('bill').value;
	let service = document.getElementById('service').value;
	let people = document.getElementById('people').value;
	const result = document.getElementById('tip');

	// Service sorting
	let tipPercentage= 0;
	if (service == "Very good") {
		tipPercentage = 0.15;
	} else if ( service == "Good") {
		tipPercentage = 0.10;
	} else if ( service == "Regular") {
		tipPercentage = 0.05;
	} else {
		tipPercentage = 0;
	}

	//tip calculation


	let tip = (bill * tipPercentage / people);

	// Tip printing
	if (Number(tip) >= 0) {
		result.textContent = `${tip.toFixed(1)} €/Person`;
	} else {
		result.textContent = `0 €/Person`;
	}
	
	console.log(tip)
	console.log(typeof(tip))
});
