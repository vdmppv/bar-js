// counting bonuses to add
const addBonusesBtn = document.getElementById("addCashback");
addBonusesBtn.addEventListener('click', (evt) => {
	evt.preventDefault();

	let addCashback = $('#addBonuses').serializeArray()
	.reduce((obj, item) => {
		obj[item.name] = item.value;
		return obj;
	}, {});

	const isNullishCashback = Object.values(addCashback).some(value => {
		if (value === null || value === "") {
			popupErrorNotification({
				title: "Неправильный ввод",
				message: "Сумма заказа не может быть пустой"
			});
			return true;
		}
		return false;
	});

	if (isNullishCashback) return;

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
			popupSuccessNotification({
				title: "Бонусы были начислены"
			});
			document.getElementById("defaultOpen").click();
			console.log(res);
		})
		.catch(e => console.log(e));
});