$(() => {
	var promiseArr = [];

	promiseArr[0] = $.getJSON("../database/items.json");
	promiseArr[1] = $.getJSON("../database/portraits.json");
	promiseArr[2] = $.getJSON("../database/classes.json");
	promiseArr[3] = $.getJSON("../database/base-slot.json");

	Promise.all(promiseArr).then(dataArr => {

		var items = dataArr[0];
		var portraits = dataArr[1];
		var classes = dataArr[2];
		var baseSlot = dataArr[3];

	});

});