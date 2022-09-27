// beer list section start
const beerData = [ // /public/v1/products/beers/ GET
	{
    id: 1,
		name: "Alivaria",
		price: 2.5,
	},
	{
    id: 2,
		name: "Kozel Sv.",
    price: 2.5,
	},
	{
    id: 3,
		name: "Kozel Ch.",
    price: 2.5,
	},
	{
    id: 4,
		name: "Grimbergen",
    price: 2.5,
	},
	{
    id: 5,
		name: "Obolon",
    price: 2.5,
	},
  {
    id: 6,
		name: "Korol Jan Ruby",
    price: 2.5,
	},
  {
    id: 7,
		name: "Korol Jan Wheat",
    price: 2.5,
	}
];

const beerToAdd = [];
const beerSelector = document.getElementById("beerSelector");
beerData.map((beerItem) => { 
  const option = document.createElement("option");
  option.value = beerItem.id;
  option.text = beerItem.name;
  beerSelector.appendChild(option);
});

function addBeerToList() {
	const beerId = $('#beerSelector').val();
	const beerObj = beerData.find(({id}) => (id === +beerId));

	const beerList = document.getElementById('beerList');
  const newEl = document.createElement('div');

	if (document.querySelector(`#output-${beerObj.id}`)) {
		return;
	}

  newEl.setAttribute("id", beerObj.id);
	newEl.classList.add("d-flex", "mb-3");
  newEl.innerHTML = `
		<div style="width:60%;">Название: ${beerObj.name}</div>
		<div style="width:20%;">Цена: ${beerObj.price}</div>
		<button id="subtract-${beerObj.id}" style="width:5%;height:5%;">-</button>
		<span id="output-${beerObj.id}" style="margin: 0px 10px;">0.5</span>
		<button id="add-${beerObj.id}" style="width:5%;height:5%;">+</button>`;
  // newEl.setAttribute("onclick", "removeBeerFromList(this)");
  beerList.appendChild(newEl);
	beerToAdd.push(beerObj);
	console.log(beerId, beerObj);

	let add = document.getElementById(`add-${beerObj.id}`);
	let sub = document.getElementById(`subtract-${beerObj.id}`);

	add.addEventListener("click", function () {
		let output = document.getElementById(`output-${beerObj.id}`);
		let result = Number(output.innerText) + 0.5;

		output.innerText = result;
	});

	sub.addEventListener("click", function () {
		let output = document.getElementById(`output-${beerObj.id}`);
		let result = Number(output.innerText) - 0.5;

		if (result < 0.5) {
			result = 0;
		}

		output.innerText = result;
	});
}

function removeBeerFromList(el) {
	console.log(el);
  const element = el;
  element.remove();
}

// beer list section end

document.getElementById("defaultOpen").click();
let currentClient = null;
if (!currentClient) {
	document.getElementById("withdrawCashbackTabBtn").setAttribute("disabled", "");
	document.getElementById("addCashbackTabBtn").setAttribute("disabled", "");
}

function openTab(evt, tabName) {
  let i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

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
	fetch( 
		"http://164.92.187.95:8080/public/v1/users", 
		{
			method: "POST",
			headers: {
				accept: 'application/json'
			},
			body: JSON.stringify(newClient)
		})
		.then(res => console.log(res))
		.catch(e => console.log(e));
});

// /public/v1/users/byphone GET - GET CLIENTS BY 4 LAST DIGITS
const getClientsButton = document.getElementById("getClientsButton");
getClientsButton.addEventListener('click', (evt) => {
	evt.preventDefault();
	const phoneNumber = $('#getUser').serializeArray()
		.reduce((obj, item) => {
			obj[item.name] = item.value;
			return obj;
		}, {});

	console.log(phoneNumber?.last4digits);

	const clientList = document.getElementById("clientList");
	if (phoneNumber && phoneNumber.last4digits.length === 4) {
		fetch( 
			`http://164.92.187.95:8080/public/v1/users/byphone?last4digits=${phoneNumber?.last4digits}`)
			.then(res => res.json())
			.then((clientData) => {
				while (clientList.firstChild) {
					clientList.firstChild.remove();
				}
				if (!clientData || clientData === "") return;
				clientData?.forEach(item => {
					const client = document.createElement('div');
			
					client.setAttribute("id", item.id);
					client.classList.add("d-flex", "mb-3");
					client.innerHTML = `
						<div style="width:30%;">Имя: ${item.firstName} ${item.lastName}</div>
						<div style="width:30%;">Телефон: ${item.phoneNumber}</div>
						<div style="width:20%;">Бонусы: ${item.cashback} р.</div>
						<button id="chooseClient-${item.id}" style="width:25%;height:5%;">Выбрать клиента</button>`;
					clientList.appendChild(client);
			
					let chooseClient = document.getElementById(`chooseClient-${item.id}`);
					chooseClient.addEventListener("click", function () {
						currentClient = item;
						console.log(currentClient);
						document.getElementById("withdrawCashbackTabBtn").removeAttribute("disabled");
						document.getElementById("addCashbackTabBtn").removeAttribute("disabled");
			
						const parent = clientList;
						while (parent.firstChild) {
								parent.firstChild.remove();
						}
						document.getElementById("currentClientName").innerHTML = `${currentClient.firstName} ${currentClient.lastName}`;
						document.getElementById("clientName").innerHTML = `${currentClient.firstName} ${currentClient.lastName}`;
						document.getElementById("currentClientCashback").innerHTML = `${currentClient.cashback}`;

						document.getElementById("withdrawCashbackTabBtn").click();
					});
				});
				console.log(clientData);
			})
			.catch(e => console.log(e));
	}
});