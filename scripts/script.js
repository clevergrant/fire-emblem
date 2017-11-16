let first = true;

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
				.replaceAll("{{ADDRESS}}", obj[key].BitCode + obj[key].Address.Decimal.toString(16));
			else thisPane = thisPane.replaceAll("{{SHOWACTIVE}}", "")
				.replaceAll("{{ADDRESS}}", obj[key].BitCode + (obj[key].Address.Decimal + Math.pow(4, i)).toString(16));
			first = false;
			return thisPane;
		}
		else {
			$("#v-pills-tabContent").append(addItem(obj[key], Templates, i));
			first = false;
		}
	}
}