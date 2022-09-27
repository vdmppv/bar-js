// counting bonuses to add
const addBonusesBtn = document.getElementById("addCashback");
addBonusesBtn.addEventListener('click', (evt) => {
	evt.preventDefault();

	let addCashback = $('#addBonuses').serializeArray()
	.reduce((obj, item) => {
		obj[item.name] = item.value;
		return obj;
	}, {});

	addCashback = {userId: currentClient.id, ...addCashback};
	fetch( 
		"http://164.92.187.95:8080/public/v1/users/cashback/add", 
		{
			method: "PUT",
			headers: {
				accept: 'application/json'
			},
			body: JSON.stringify(addCashback)
		})
		.then(res => {
			document.getElementById("defaultOpen").click();
			console.log(res);
		})
		.catch(e => console.log(e));
});