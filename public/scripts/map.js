////////////////////
// Jquery
////////////////////

$(() => {
	$.ajax({
		url: '/food/data',
	}).then((data) => 

		console.log(data);
	}),
		() => {
			console.log('bad request');
		};
});
