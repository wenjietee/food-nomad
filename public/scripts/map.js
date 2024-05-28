/*
    This script will init Google maps and also
    render user data and food sharing data on the map.
*/

function initMap() {
    // set default location
    const SG = { lat: 1.29027, lng: 103.851959 };

    // create new map object and center on user's location
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 17,
        center: SG,
    });

    // get food and user data from server
    $.ajax({
        url: "/food/data",
    }).then((data) => {
        // store data
        const currentUser = data.currentUser;
        const foods = data.foods;
        const users = data.users;

        // iterate food authors' zip code and convert it into lat longs
        users.forEach((user) => {
            $.ajax({
                url: `https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${user.zip}&returnGeom=Y&getAddrDetails=Y&pageNum=1`,
            }).then((zip) => {
                // store user location
                const userLocation = {
                    lat: Number(zip.results[0].LATITUDE),
                    lng: Number(zip.results[0].LONGITUDE),
                };

                // username match current user center map on user
                if (user.username === currentUser.username) {
                    map.setOptions({
                        center: userLocation,
                    });
                }

                const contentString =
                    '<div id="map-info">' +
                    '<a href="/app/profile/' +
                    user.username +
                    '">' +
                    "<h6>" +
                    user.username +
                    "</h6>" +
                    "</a>" +
                    "<h6>is sharing!</h6>" +
                    "<p>Email: " +
                    user.email +
                    "</p>" +
                    "</div>";

                // create info window
                const infowindow = new google.maps.InfoWindow({
                    content: contentString,
                });

                // create marker
                const marker = new google.maps.Marker({
                    position: userLocation,
                    map,
                });

                marker.addListener("click", () => {
                    infowindow.open(map, marker);
                });
            });
        });
    }),
        () => {
            console.log("bad request");
        };
}
