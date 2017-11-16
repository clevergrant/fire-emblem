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

		for (let i = 0; i < 16; i++) {
			$("#v-pills-tab").append(Templates.pill
				.replaceAll("{{NUMBER}}", i)
				.replaceAll("{{SELECTED}}", "false")
			);

			let thisPane = Templates.pane.replaceAll("{{NUMBER}}", i);

			function addItem(key, obj) {
				if (typeof obj.Bits === 'number') {
					thisPane = thisPane.replaceAll("{{CONTENT}}", Templates.form
						.replaceAll("{{NUMBER}}", i)
						.replaceAll("{{KEY}}", key)
						.replaceAll("{{ADDRESS}}", obj.BitCode + obj.Address.ToHexString)
					);
					$("#v-pills-tabContent").append(thisPane);
				}
				else for (let key in obj) {
					addItem(obj[key]);
				}
			}

			for (let key in baseSlot) {
				addItem(key, baseSlot[key]);
			}

		}
	});
});

String.prototype.replaceAll = function (search, replacement) {
	let target = this;
	return target.replace(new RegExp(search, 'g'), replacement);
};