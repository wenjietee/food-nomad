/*
    This script will init Google maps and also
    render user data and food sharing data on the map.
*/

function initMap() {
	// set default location
	const SG = { lat: 1.29027, lng: 103.851959 };

	// create new map object and center on user's location
	const map = new google.maps.Map(document.getElementById('map'), {
		zoom: 17,
		center: SG,
	});

	// get food and user data from server
	$.ajax({
		url: '/food/data',
	}).then((data) => {
		// store data
		const currentUser = data.currentUser;
		const foods = data.foods;

		// iterate food authors' zip code and convert it into lat longs
		foods.forEach((food) => {
			$.ajax({
				url: `https://developers.onemap.sg/commonapi/search?searchVal=${food.zip}&returnGeom=Y&getAddrDetails=Y&pageNum=1`,
			}).then((zip) => {
				// store user location
				const userLocation = {
					lat: Number(zip.results[0].LATITUDE),
					lng: Number(zip.results[0].LONGTITUDE),
				};

				// username match current user center map on user
				if (food.author === currentUser.username) {
					map.setOptions({
						center: userLocation,
					});
				}

				const contentString = `<div id='map-info>
                <h5>${food.author}</h5>
                <p>is sharing</p>
                <p>${food.name}</p>
                <p>Quantity: ${food.quantity}</p>
                <p>Expiry: ${food.expiry}</p>
                </div>`;

				// create info window
				const infowindow = new google.maps.InfoWindow({
					content: contentString,
				});

				// create marker
				const marker = new google.maps.Marker({
					position: userLocation,
					map,
				});
			});
		});
	}),
		() => {
			console.log('bad request');
		};
}
