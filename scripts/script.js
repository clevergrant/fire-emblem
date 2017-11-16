let first = true;
let cheatNumber = 1;
let cheatList = [
	{
		codeString: "00006777 000A",
		description: "[m]",
		rawaddress: 26487,
		address: 26487,
		value: 10,
		size: 512,
		type: 0xffffffff,
		enabled: true,
		status: 0
	},
	{
		codeString: "10001BE0 0007",
		description: "[m]",
		rawaddress: 7136,
		address: 134224864,
		value: 7,
		size: 512,
		type: 1,
		enabled: false,
		status: 0
	}
];

$(() => {
	/*
	let promiseArr = [];

	promiseArr[0] = $.getJSON("../database/items.json");
	promiseArr[1] = $.getJSON("../database/portraits.json");
	promiseArr[2] = $.getJSON("../database/classes.json");
	promiseArr[3] = $.getJSON("../database/base-slot.json");
	promiseArr[4] = $.get("../templates/pill.html");
	promiseArr[5] = $.get("../templates/pane.html");
	promiseArr[6] = $.get("../templates/form.html");

	Promise.all(promiseArr).then(dataArr => {

		let items = dataArr[0];
		let portraits = dataArr[1];
		let classes = dataArr[2];
		let baseSlot = dataArr[3];

		let Templates = {};
		Templates.pill = dataArr[4];
		Templates.pane = dataArr[5];
		Templates.form = dataArr[6];

		for (let i = 1; i <= 16; i++) {

			let thispill = Templates.pill.replaceAll("{{NUMBER}}", i);
			if (first) thispill = thispill.replaceAll("{{SELECTED}}", "true")
				.replaceAll("{{ACTIVE}}", "active");
			else thispill = thispill.replaceAll("{{SELECTED}}", "false")
				.replaceAll("{{ACTIVE}}", "");

			$("#v-pills-tab").append(thispill);

			let thisPane = Templates.pane.replaceAll("{{NUMBER}}", i);

			$("#v-pills-tabContent").append(addItem(baseSlot, Templates, i));

		}
	});
	//*/

	writeToFile();
});

String.prototype.replaceAll = function (search, replacement) {
	let target = this;
	return target.replace(new RegExp(search, 'g'), replacement);
};

function addItem(obj, Templates, i) {
	for (let key in obj) {
		if (typeof obj[key]["Bits"] === "number") {
			let thisPane = Templates.pane
				.replaceAll("{{NUMBER}}", i)
				.replaceAll("{{CONTENT}}", Templates.form
					.replaceAll("{{NUMBER}}", i)
					.replaceAll("{{KEY}}", key)
				);
			if (first) thisPane = thisPane.replaceAll("{{SHOWACTIVE}}", "show active")
				.replaceAll("{{ADDRESS}}", obj[key].BitCode + obj[key].Address.ToDecimal.toString(16).toUpperCase());
			else {
				let newAddress = obj[key].Address.ToDecimal + (72 * (i - 1));
				thisPane = thisPane.replaceAll("{{SHOWACTIVE}}", "")
					.replaceAll("{{ADDRESS}}", obj[key].BitCode + newAddress.toString(16).toUpperCase());
			}
			first = false;
			return thisPane;
		}
		else {
			$("#v-pills-tabContent").append(addItem(obj[key], Templates, i));
			first = false;
		}
	}
}

function addCheat(code, desc) {
	if (code.length != 13 || !isHex(code) || code[8] != ' ') {
		console.error("Wrong Code Syntax. Must be XXXXXXXX YYYY");
		return;
	}

	let codeArr = code.split(' ');
	let type = parseInt(codeArr[0].substr(0, 1), 16);
	let address = parseInt(codeArr[0].substr(1), 16);
	let value = parseInt(codeArr[1], 16);

	switch (type) {
		case 0:
			writeCheat(code, desc, address, address & 0x0FFFFFFF, value, 512, type);
			break;
		case 1:
			writeCheat(code, desc, address, (address & 0x1FFFFFF) | 0x08000000, value, 512, type);
			break;
		case 3:
			writeCheat(code, desc, address, address & 0x0FFFFFFF, value, 512, type);
			break;
		case 8:
			writeCheat(code, desc, address, address & 0x0FFFFFFE, value, 512, type);
			break;
		default:
			console.error("This site doesn't support that code.");
			break;
	}
}

function writeCheat(codeStr, desc, rawaddress, address, value, size, type) {
	let j = cheatNumber;
	cheatList[j] = {
		codeString: codeStr,
		description: desc,
		rawaddress: rawaddress,
		address: address,
		value: value,
		size: size,
		type: type,
		enabled: true,
		status: 0
	}
	if (type == 0) cheatList[j].type = type | 0xffffffff;
	console.log(cheatList[j]);
	cheatNumber++;
}

function isHex(string) {
	return /[\da-f]/i.test(string);
}

function writeToFile() {
	// let bar = new Int8Array(8412);
	let bar = new Int8Array(96);

	let version = makeArr(1);
	bar.set(version);
	let type = makeArr(0);
	bar.set(type, 4);
	bar.set(makeArr(cheatNumber), 8);

	for (let i = 0; i < cheatNumber; i++) {

		let offset = 12 + (84 * i);

		bar.set(makeArr(cheatList[i].size), offset);
		bar.set(makeArr(cheatList[i].type), offset + 4);
		bar.set(makeArr(cheatList[i].status), offset + 8);
		bar.set(makeArr(cheatList[i].enabled), offset + 12);
		bar.set(makeArr(cheatList[i].rawaddress), offset + 16);
		bar.set(makeArr(cheatList[i].address), offset + 20);
		bar.set(makeArr(cheatList[i].value), offset + 24);
		bar.set(makeArr(0), offset + 28);
		bar.set(makeArr(cheatList[i].codeString), offset + 32);


		console.log(cheatList[i]);

	}

	console.log(bar);

	//saveByteArray(bar, "test.clt");
}

function makeArr(number) {
	return new Uint8Array(number.toString(16).match(/[\da-f]/i).map(h => parseInt(h, 16)));
}

let saveByteArray = (function () {
	let a = document.createElement("a");
	document.body.appendChild(a);
	a.style = "display: none";
	return function (data, name) {
		let blob = new Blob([data], { type: "application/octet-stream" }),
			url = window.URL.createObjectURL(blob);
		a.href = url;
		a.download = name;
		a.click();
		window.URL.revokeObjectURL(url);
	};
}());