let first = true;
let cheatNumber = 0;
let cheatList = [];

$(() => {
	//*
	let promiseArr = [];

	promiseArr[0] = $.getJSON("../database/items.json");
	promiseArr[1] = $.getJSON("../database/portraits.json");
	promiseArr[2] = $.getJSON("../database/classes.json");
	promiseArr[3] = $.getJSON("../database/base-slot.json");
	promiseArr[4] = $.get("../templates/pill.html");
	promiseArr[5] = $.get("../templates/pane.html");
	promiseArr[6] = $.get("../templates/form.html");
	promiseArr[7] = $.get("../templates/select.html");
	promiseArr[8] = $.get("../templates/option.html");
	promiseArr[9] = $.get("../templates/number-field.html");

	Promise.all(promiseArr).then(dataArr => {

		let items = dataArr[0];
		let portraits = dataArr[1];
		let classes = dataArr[2];
		let baseSlot = dataArr[3];

		let Templates = {};
		Templates.pill = dataArr[4];
		Templates.pane = dataArr[5];
		Templates.form = dataArr[6];
		Templates.select = dataArr[7];
		Templates.option = dataArr[8];
		Templates.numberField = dataArr[9];

		for (let i = 1; i <= 16; i++) {

			let thispill = Templates.pill.replaceAll("{{NUMBER}}", i);
			if (first) thispill = thispill.replaceAll("{{SELECTED}}", "true")
				.replaceAll("{{ACTIVE}}", "active");
			else thispill = thispill.replaceAll("{{SELECTED}}", "false")
				.replaceAll("{{ACTIVE}}", "");

			$("#v-pills-tab").append(thispill);

			let thisPane = Templates.pane.replaceAll("{{NUMBER}}", i);

			if (first) thisPane = thisPane.replaceAll("{{SHOWACTIVE}}", "show active");
			else thisPane = thisPane.replaceAll("{{SHOWACTIVE}}", "");

			thisPane = thisPane.replaceAll("{{CONTENT}}", getForms(baseSlot, Templates, i, portraits, classes, items));

			$("#v-pills-tabContent").append(thisPane);

			first = false;
		}
	});
	//*/
});

function getForms(obj, Templates, i, portraits, classes, items) {
	let forms = "";
	for (let key in obj) {
		if (typeof obj[key].Bits === "number") {
			let oneform = "";
			oneform = Templates.form.replaceAll("{{KEYNAME}}", key).replaceAll("{{NUMBER}}", i).replaceAll("{{KEY}}", key);

			let options = "";

			switch (key) {
				case "Portrait":
					oneform = Templates.form.replaceAll("{{KEYNAME}}", key).replaceAll("{{NUMBER}}", i).replaceAll("{{KEY}}", key);
					options = "";
					let portKeys = Object.keys(portraits).sort();
					for (let key of portKeys) options += Templates.option.replaceAll("{{KEY}}", key).replaceAll("{{CODE}}", portraits[key]);
					oneform = oneform.replaceAll("{{FIELD}}", Templates.select.replaceAll("{{KEY}}", key).replaceAll("{{OPTIONS}}", options));
					break;
				case "Class":
					oneform = Templates.form.replaceAll("{{KEYNAME}}", key).replaceAll("{{NUMBER}}", i).replaceAll("{{KEY}}", key);
					options = "";
					let classKeys = Object.keys(classes.Usable).sort();
					for (let key of classKeys) options += Templates.option.replaceAll("{{KEY}}", key).replaceAll("{{CODE}}", classes.Usable[key]);
					oneform = oneform.replaceAll("{{FIELD}}", Templates.select.replaceAll("{{KEY}}", key).replaceAll("{{OPTIONS}}", options));
					break;
				case "Level":
					oneform = Templates.form.replaceAll("{{KEYNAME}}", key).replaceAll("{{NUMBER}}", i).replaceAll("{{KEY}}", key);
					oneform = oneform.replaceAll("{{FIELD}}", Templates.numberField
						.replaceAll("{{KEY}}", key).replaceAll("{{NUMBER}}", i)
						.replaceAll("{{MIN}}", "1").replaceAll("{{MAX}}", "20"));
					break;
				case "Experience":
					oneform = Templates.form.replaceAll("{{KEYNAME}}", key).replaceAll("{{NUMBER}}", i).replaceAll("{{KEY}}", key);
					oneform = oneform.replaceAll("{{FIELD}}", Templates.numberField
						.replaceAll("{{KEY}}", key).replaceAll("{{NUMBER}}", i)
						.replaceAll("{{MIN}}", "1").replaceAll("{{MAX}}", "99"));
					break;
				default:
					break;
			}

			if (first) oneform = oneform.replaceAll("{{ADDRESS}}", obj[key].BitCode + obj[key].Address.ToDecimal.toString(16).toUpperCase());
			else {
				let newAddress = obj[key].Address.ToDecimal + (72 * (i - 1));
				oneform = oneform.replaceAll("{{ADDRESS}}", obj[key].BitCode + newAddress.toString(16).toUpperCase());
			}
			if (key != "QuantityType") forms += oneform;
		}
		else {
			switch (key) {
				case "0":
					forms += "<p>Slot 1</p>";
					break;
				case "1":
					forms += "<p>Slot 2</p>";
					break;
				case "2":
					forms += "<p>Slot 3</p>";
					break;
				case "3":
					forms += "<p>Slot 4</p>";
					break;
				case "4":
					forms += "<p>Slot 5</p>";
					break;
				default:
					forms += "<h5 class='form-header'>" + key + "</h5>";
					break;
			}
			forms += getForms(obj[key], Templates, i, portraits, classes, items);
		}
	}
	return forms;
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
		enabled: 1,
		status: 0
	};
	cheatNumber++;
}

function writeToFile() {
	let bar = new Int8Array(8412);
	let version = getHexArr(1);
	bar.set(version);
	let type = getHexArr(0);
	bar.set(type, 4);
	bar.set(getHexArr(cheatNumber), 8);
	for (let i = 0; i < cheatNumber; i++) {
		let offset = 12 + (84 * i);
		bar.set(getHexArr(cheatList[i].size), offset);
		if (cheatList[i].type === 0) bar.set([0xff, 0xff, 0xff, 0xff], offset + 4);
		else bar.set(getHexArr(cheatList[i].type), offset + 4);
		bar.set(getHexArr(cheatList[i].status), offset + 8);
		bar.set(getHexArr(cheatList[i].enabled), offset + 12);
		bar.set(getHexArr(cheatList[i].rawaddress), offset + 16);
		bar.set(getHexArr(cheatList[i].address), offset + 20);
		bar.set(getHexArr(cheatList[i].value), offset + 24);
		bar.set(getHexArr(0), offset + 28);
		bar.set(getHexArr(cheatList[i].codeString), offset + 32);
		bar.set(getHexArr(cheatList[i].description), offset + 52);
	}
	saveByteArray(bar, "Fire Emblem.clt");
}

function getHexArr(value) {
	if (typeof value == 'number') {
		let hexstr = value.toString(16).toUpperCase();
		let even = true;
		if (hexstr.length % 2 !== 0) hexstr = "0" + hexstr;
		let temp = "";
		let res = [];
		for (let i = 0; i < hexstr.length; i++) {
			if (even) temp = hexstr[i];
			else {
				temp += hexstr[i];
				res.push(parseInt(temp, 16));
				temp = "";
			}
			even = !even;
		}
		if (temp != "") {
			temp += "0";
			res.push(parseInt(temp, 16));
		}
		res.reverse();
		while (res.length < 4) res.push(0);
		return res;
	}
	else if (typeof value == 'string') {
		let res = [];
		for (let i = 0; i < value.length; i++) res.push(value.charCodeAt(i));
		while (res.length < 20) res.push(0);
		return res;
	}
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

String.prototype.replaceAll = function (search, replacement) {
	let target = this;
	return target.replace(new RegExp(search, 'g'), replacement);
};

function isHex(string) {
	return /[\da-f ]+/i.test(string);
}
