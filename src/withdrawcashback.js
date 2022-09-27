// withdraw bonuses from client
const withdrawBonusesBtn = document.getElementById("currentClientWithdrawButton");
withdrawBonusesBtn.addEventListener('click', (evt) => {
	evt.preventDefault();

	let withdrawCashback = $('#withdrawBonuses').serializeArray()
	.reduce((obj, item) => {
		obj[item.name] = item.value;
		return obj;
	}, {});

	const isNullishWithDrawCashback = Object.values(withdrawCashback).some(value => {
		if (value === null || value === "") {
			popupErrorNotification({
				title: "Неправильный ввод",
				message: "Количество бонусов не может быть пустым"
			});
			return true;
		}
		return false;
	});

	if (isNullishWithDrawCashback) return;

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
			popupSuccessNotification({
				title: "Бонусы были списаны"
			});
			console.log(res);
		})
		.catch(e => console.log(e));
});

$('.decimal').keyup(function(){
	var val = $(this).val();
	if(isNaN(val)){
			 val = val.replace(/[^0-9\.]/g,'');
			 if(val.split('.').length>2) 
					 val =val.replace(/\.+$/,"");
	}
	$(this).val(val); 
});

function withdrawAmountChange() {
	const withdrawAmount = +document.getElementById("currentClientWithdrawAmount").value;
	const totalCashback = +currentClient.cashback;

	if (!isNaN(withdrawAmount)) {
		document.getElementById("currentClientCashback").innerHTML = `${(totalCashback - withdrawAmount).toFixed(1)}`;
	}
}