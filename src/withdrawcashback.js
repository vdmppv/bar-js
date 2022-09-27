// withdraw bonuses from client
const withdrawBonusesBtn = document.getElementById("currentClientWithdrawButton");
withdrawBonusesBtn.addEventListener('click', (evt) => {
	evt.preventDefault();

	let withdrawCashback = $('#withdrawBonuses').serializeArray()
	.reduce((obj, item) => {
		obj[item.name] = item.value;
		return obj;
	}, {});

	console.log(withdrawCashback);

	withdrawCashback = {userId: currentClient.id, ...withdrawCashback};
	fetch( 
		"http://164.92.187.95:8080/public/v1/users/cashback/withdraw", 
		{
			method: "PUT",
			headers: {
				accept: 'application/json'
			},
			body: JSON.stringify(withdrawCashback)
		})
		.then(res => {
			document.getElementById("addCashbackTabBtn").click();
			console.log(res);
		})
		.catch(e => console.log(e));
});

function withdrawAmountChange() {
	console.log("change");
}