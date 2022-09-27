// /public/v1/users POST - CREATE CLIENT CARD
const createClientButton = document.getElementById("createClient");
createClientButton.addEventListener('click', (evt) => {  
	evt.preventDefault();
	const newClient = $('#createUser').serializeArray()
		.reduce((obj, item) => {
			obj[item.name] = item.value;
			return obj;
		}, {});


  console.log(newClient);

	const isNullishClient = Object.values(newClient).some(value => {
		if (value === null || value === "") {
			popupErrorNotification({
				title: "Неправильный ввод",
				message: "Все поля формы должны быть заполнены"
			});
			return true;
		}
		return false;
	});
  
  console.log(isNullishClient);
	if (!isNullishClient) {
    fetch( 
      "http://164.92.187.95:8080/public/v1/users", 
      {
        method: "POST",
        headers: {
          accept: 'application/json'
        },
        body: JSON.stringify(newClient)
      })
      .then(res => {
        console.log(res);
        popupSuccessNotification({
          title: "Клиент был создан",
        });
        document.getElementById("defaultOpen").click();
      })
      .catch(e => console.log(e));
	}
});