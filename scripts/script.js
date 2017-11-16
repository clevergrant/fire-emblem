$(() => {
	var promiseArr = [];

	promiseArr[0] = new Promise((resolve, reject) => { $.get("../database/items.json", json => resolve).fail(err => reject); });
	promiseArr[1] = new Promise((resolve, reject) => { $.get("../database/portraits.json", json => resolve).fail(err => reject); });
	promiseArr[2] = new Promise((resolve, reject) => { $.get("../database/classes.json", json => resolve).fail(err => reject); });
	promiseArr[3] = new Promise((resolve, reject) => { $.get("../database/base-slot.json", json => resolve).fail(err => reject); });

	Promise.all(promiseArr).then(dataArr => {
		var items = dataArr[0];
		var portraits = dataArr[1];
		var classes = dataArr[2];
		var baseSlot = dataArr[3];

		console.log(items.Nothing);

	});

});