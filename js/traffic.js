function initMap() {
    navigator.geolocation.getCurrentPosition(function (position) {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        var origins = ['Pewaukee, WI'];
        var destinations = [{ lat: 43.075030, lng: -87.882915 }]
        getDrive(origins, destinations);
        setInterval(getDrive, 600000, origins, destinations);
    });
}

function getDrive(origins, destinations) {
    var service = new google.maps.DistanceMatrixService;
    service.getDistanceMatrix({
        origins: origins,
        destinations: destinations,
        travelMode: 'DRIVING',
        drivingOptions: {
            departureTime: new Date(Date.now()),
        },
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        avoidHighways: false,
        avoidTolls: false
    }, function (response, status) {
        if (status !== 'OK') {
            alert('Error was: ' + status);
        } else {
            var originList = response.originAddresses;
            var destinationList = response.destinationAddresses;
            var outputDiv = document.getElementById('drive_duration');
            outputDiv.innerHTML = '';
            for (var i = 0; i < originList.length; i++) {
                var results = response.rows[i].elements;
                for (var j = 0; j < results.length; j++) {
                    var diff = results[j].duration_in_traffic.value - results[j].duration.value;
                    var traffic = '';
                    if (diff <= 120) {
                        traffic = 'No';
                    }
                    else if (diff <= 300) {
                        traffic = 'Light';
                    }
                    else if (diff < 600) {
                        traffic = 'Moderate';
                    } else {
                        traffic = 'Heavy';
                    }

                    traf = '<p>' + traffic + '</p><p>Traffic</p>';
                    $(".traffic").html(traf);
                    outputDiv.innerHTML += results[j].duration_in_traffic.text;

                }
            }
        }
    });
}
