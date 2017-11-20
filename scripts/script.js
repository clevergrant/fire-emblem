let first = true;
let cheatNumber = 2;
let codes = {};
let cheatList = [];

$(() => {
	let promiseArr = [];

	promiseArr[0] = $.getJSON("../database/slot.json");
	promiseArr[1] = $.getJSON("../database/codes.json");

	promiseArr[2] = $.get("../templates/pill.html");
	promiseArr[3] = $.get("../templates/pane.html");
	promiseArr[4] = $.get("../templates/form.html");
	promiseArr[5] = $.get("../templates/select.html");
	promiseArr[6] = $.get("../templates/option.html");
	promiseArr[7] = $.get("../templates/number-field.html");

	Promise.all(promiseArr).then(dataArr => {
		let Slot = dataArr[0];
		Codes = dataArr[1];

		let Templates = {};
		Templates.pill = dataArr[2];
		Templates.pane = dataArr[3];
		Templates.form = dataArr[4];
		Templates.select = dataArr[5];
		Templates.option = dataArr[6];
		Templates.numberField = dataArr[7];

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

			thisPane = thisPane.replaceAll("{{CONTENT}}", getForms(Slot, i, Templates, Codes));

			$("#v-pills-tabContent").append(thisPane);

			first = false;
		}

		$("input.Level-field").change(e => {
			let expid = "#" + $(e.target).attr('id').replaceAll("Level", "Experience");
			if ($(e.target).val() >= 20) {
				$(expid).attr('disabled', true).val(255);
				if ($(e.target).val() > 20) $(e.target).val(20);
			}
			else {
				$(expid).attr('disabled', false).val("");
				if ($(e.target).val() < 1) $(e.target).val(1);
			}
		});
		$("input.Experience-field").change(e => {
			if ($(e.target).val() > 99) $(e.target).val(255);
			if ($(e.target).val() < 1) $(e.target).val(1);
		});
		$("input.Maximum-field").change(e => {
			if ($(e.target).val() > 60) $(e.target).val(60);
			if ($(e.target).val() < 1) $(e.target).val(1);
		});
		$("input.Current-field").change(e => {
			let maxid = "#" + $(e.target).attr('id').replaceAll("Current", "Maximum");
			if ($(e.target).val() > $(maxid).val()) $(e.target).val($(maxid).val());
			if ($(e.target).val() < 1) $(e.target).val(1);
		});
		$("input.Strength-field").change(e => {
			if ($(e.target).val() > 30) $(e.target).val(30);
			if ($(e.target).val() < 1) $(e.target).val(1);
		});
		$("input.Skill-field").change(e => {
			if ($(e.target).val() > 30) $(e.target).val(30);
			if ($(e.target).val() < 1) $(e.target).val(1);
		});
		$("input.Speed-field").change(e => {
			if ($(e.target).val() > 30) $(e.target).val(30);
			if ($(e.target).val() < 1) $(e.target).val(1);
		});
		$("input.Defense-field").change(e => {
			if ($(e.target).val() > 30) $(e.target).val(30);
			if ($(e.target).val() < 1) $(e.target).val(1);
		});
		$("input.Luck-field").change(e => {
			if ($(e.target).val() > 30) $(e.target).val(30);
			if ($(e.target).val() < 1) $(e.target).val(1);
		});
		$("input.Constitution-field").change(e => {
			if ($(e.target).val() > 30) $(e.target).val(30);
			if ($(e.target).val() < 1) $(e.target).val(1);
		});
		$("input.Rescue-field").change(e => {
			let conid = "#" + $(e.target).attr('id').replaceAll("Rescue", "Constitution");
			if ($(e.target).val() >= $(maxid).val()) $(e.target).val(parseInt($(maxid).val()) - 1);
			if ($(e.target).val() < 1) $(e.target).val(1);
		});
		$("input.Move-field").change(e => {
			if ($(e.target).val() > 30) $(e.target).val(30);
			if ($(e.target).val() < 1) $(e.target).val(1);
		});
		$("input[class$='Quantity-field']").change(e => {
			if ($(e.target).val() > 255) $(e.target).val(255);
			if ($(e.target).val() < 1) $(e.target).val(1);
		});
	});
});

function getForms(object, i, Templates, Codes) {
	let forms = "";
	for (let key in object) {
		if (typeof object[key].Bits === "number") {
			let oneform = "";
			oneform = Templates.form.replaceAll("{{KEYNAME}}", key);

			let options = "";

			switch (key) {
				case "Portrait":
					options = "";
					let portKeys = Object.keys(Codes.Portraits).sort();
					for (let subkey of portKeys) options += Templates.option.replaceAll("{{SUBKEY}}", subkey).replaceAll("{{VALUE}}", parseInt(Codes.Portraits[subkey], 16));
					oneform = oneform.replaceAll("{{FIELD}}", Templates.select.replaceAll("{{OPTIONS}}", options));
					break;
				case "Class":
					options = "";
					let classKeys = Object.keys(Codes.Classes.Usable).sort();
					for (let subkey of classKeys) options += Templates.option.replaceAll("{{SUBKEY}}", subkey).replaceAll("{{VALUE}}", parseInt(Codes.Classes.Usable[subkey], 16));
					oneform = oneform.replaceAll("{{FIELD}}", Templates.select.replaceAll("{{OPTIONS}}", options));
					break;
				case "Level":
					oneform = oneform.replaceAll("{{FIELD}}", Templates.numberField
						.replaceAll("{{MIN}}", "1").replaceAll("{{MAX}}", "20"));
					break;
				case "Experience":
					oneform = oneform.replaceAll("{{FIELD}}", Templates.numberField
						.replaceAll("{{MIN}}", "1").replaceAll("{{MAX}}", "99"));
					break;
				case "Hidden Status":
					options = "";
					for (let subkey in Codes.Statuses) options += Templates.option.replaceAll("{{SUBKEY}}", subkey).replaceAll("{{VALUE}}", parseInt(Codes.Statuses[subkey], 16));
					oneform = oneform.replaceAll("{{FIELD}}", Templates.select.replaceAll("{{OPTIONS}}", options));
					break;
				case "Maximum":
				case "Current":
					oneform = oneform.replaceAll("{{FIELD}}", Templates.numberField
						.replaceAll("{{MIN}}", "1").replaceAll("{{MAX}}", "60"));
					break;
				case "Strength":
				case "Skill":
				case "Speed":
				case "Defense":
				case "Luck":
					oneform = oneform.replaceAll("{{FIELD}}", Templates.numberField
						.replaceAll("{{MIN}}", "1").replaceAll("{{MAX}}", "30"));
					break;
				case "Constitution":
					oneform = oneform.replaceAll("{{FIELD}}", Templates.numberField
						.replaceAll("{{MIN}}", "1").replaceAll("{{MAX}}", "25"));
					break;
				case "Rescue":
					oneform = oneform.replaceAll("{{FIELD}}", Templates.numberField
						.replaceAll("{{MIN}}", "1").replaceAll("{{MAX}}", "24"));
					break;
				case "Move":
					oneform = oneform.replaceAll("{{FIELD}}", Templates.numberField
						.replaceAll("{{MIN}}", "1").replaceAll("{{MAX}}", "15"));
					break;
				case "Slot 1 Type":
				case "Slot 2 Type":
				case "Slot 3 Type":
				case "Slot 4 Type":
				case "Slot 5 Type":
					options = "";
					let itemKeys = Object.keys(Codes.Items).sort();
					for (let subkey of itemKeys) options += Templates.option.replaceAll("{{SUBKEY}}", subkey).replaceAll("{{VALUE}}", parseInt(Codes.Items[subkey], 16));
					oneform = oneform.replaceAll("{{FIELD}}", Templates.select.replaceAll("{{OPTIONS}}", options));
					break;
				case "Slot 1 Quantity":
				case "Slot 2 Quantity":
				case "Slot 3 Quantity":
				case "Slot 4 Quantity":
				case "Slot 5 Quantity":
					oneform = oneform.replaceAll("{{FIELD}}", Templates.numberField
						.replaceAll("{{NUMBER}}", i)
						.replaceAll("{{MIN}}", "1")
						.replaceAll("{{MAX}}", "255"));
					break;
				case "Sword":
				case "Lance":
				case "Axe":
				case "Bow":
				case "Staff":
				case "Anima":
				case "Light":
				case "Dark":
					options = "";
					for (let subkey in Codes.Ranks) options += Templates.option.replaceAll("{{SUBKEY}}", subkey).replaceAll("{{VALUE}}", parseInt(Codes.Ranks[subkey], 16));
					oneform = oneform.replaceAll("{{FIELD}}", Templates.select.replaceAll("{{OPTIONS}}", options));
					break;
				default:
					break;
			}

			if (first) oneform = oneform.replaceAll("{{ADDRESS}}", object[key].BitCode + object[key].Address.ToDecimal.toString(16).toUpperCase());
			else {
				let newAddress = object[key].Address.ToDecimal + (72 * (i - 1));
				oneform = oneform.replaceAll("{{ADDRESS}}", object[key].BitCode + newAddress.toString(16).toUpperCase());
			}
			oneform = oneform.replaceAll("{{NUMBER}}", i).replaceAll("{{KEY}}", key.split(' ').join('-'));
			if (key != "QuantityType") forms += oneform;
		}
		else {
			switch (key) {
				case "Attributes":
					forms += "<h5 class='form-header'>" + key + "</h5>";
					forms += "<div class='alert alert-warning' role='alert'><b>Warning:</b> If you don't want to break your game, make sure you know the maximum of each value for the character in this slot!</div>";
					break;
				case "Skills":
					forms += "<h5 class='form-header'>" + key + "</h5>";
					forms += "<div class='alert alert-warning' role='alert'><b>Warning:</b> If you don't want to break your game, make sure you only select EITHER the magic fields OR the weapon fields!</div>";
					break;
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
			forms += getForms(object[key], i, Templates, Codes);
		}
	}
	return forms;
}

function getCodes() {
	cheatList = [
		{
			codeString: "00006777 000A",
			description: "[M]",
			rawaddress: 26487,
			address: 26487,
			value: 10,
			size: 512,
			type: 0,
			enabled: 1,
			status: 0
		},
		{
			codeString: "10001BE0 0007",
			description: "[M]",
			rawaddress: 134224864,
			address: 7136,
			value: 7,
			size: 512,
			type: 1,
			enabled: 1,
			status: 0
		}
	];
	cheatNumber = 2;
	$(".code-check").each((index, element) => {
		if ($(element).is(":checked")) {
			let fieldId = $(element).data('field-id');
			let desc = $(fieldId).attr('id');
			let addr = $(element).data('address');
			let val = parseInt($(fieldId).val()).toString(16).toUpperCase();
			while (val.length < 4) val = "0" + val;
			let CB = [addr, val].join(' ');
			addCheat(CB, desc);
		}
	});
	console.log("cheatList", cheatList);
	writeToFile();
}

function addCheat(code, desc) {
	if (code.length != 13 || !isHex(code) || code[8] != ' ') {
		console.error("Wrong Code Syntax. Must be XXXXXXXX YYYY");
		return;
	}

	let codeArr = code.split(' ');
	let type = parseInt(codeArr[0].substr(0, 1), 16);
	let rawaddress = parseInt(codeArr[0], 16);
	let value = parseInt(codeArr[1], 16);

	switch (type) {
		case 0:
			writeCheat(code, desc, rawaddress, rawaddress & 0x0FFFFFFF, value, 512, type);
			break;
		case 1:
			writeCheat(code, desc, rawaddress, (rawaddress & 0x1FFFFFF) | 0x08000000, value, 512, type);
			break;
		case 3:
			writeCheat(code, desc, rawaddress, rawaddress & 0x0FFFFFFF, value, 512, type);
			break;
		case 8:
			writeCheat(code, desc, rawaddress, rawaddress & 0x0FFFFFFE, value, 512, type);
			break;
		default:
			console.error("This site doesn't support that code.");
			break;
	}
}

function writeCheat(codeStr, desc, rawaddress, address, value, size, type) {
	cheatList[cheatNumber] = {
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
		if (cheatList[i].type === 0) bar.set([255, 255, 255, 255], offset + 4);
		else if (cheatList[i].type === 1) bar.set([112, 0, 0, 0], offset + 4);
		else if (cheatList[i].type === 8) bar.set([1, 0, 0, 0], offset + 4);
		else bar.set([0, 0, 0, 0], offset + 4);
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
		setTimeout(function () {
			document.body.removeChild(a);
			window.URL.revokeObjectURL(url);
		}, 100);
	};
}());

String.prototype.replaceAll = function (search, replacement) {
	let target = this;
	return target.replace(new RegExp(search, 'g'), replacement);
};

function isHex(string) {
	return /[\da-f ]+/i.test(string);
}
