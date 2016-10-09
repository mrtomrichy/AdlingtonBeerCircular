(function(ABC, ko, $){
	var MapViewModel = function(){
		var self = this;

		self.pubs = ko.observableArray([]);
		var locations = [];
		var map = null;
		var markers = [];
		var infowindow = null;

		$.get(Utils.config.baseUrl + '/static/data/pubs.json', function(data){
			self.pubs(data.pubs);
			locations = [];

			for(var i = 0; i < self.pubs().length; i++){
				var pub = self.pubs()[i];

				var location = [pub.name, pub.lat, pub.lon, i];

				locations.push(location);
			}

			updateMap(locations);
		});

		self.showPub = function(index){
			if(map === null) return;
			infowindow.setContent(locations[index][0]);
			infowindow.open(map, markers[index]);
		};

		var updateMap = function(locations){
			map = new google.maps.Map(document.getElementById('map'), {
			    zoom: 12,
			    center: new google.maps.LatLng(53.617543, -2.596625),
			    mapTypeId: google.maps.MapTypeId.ROADMAP
			});
			markers = [];
			infowindow = new google.maps.InfoWindow();
			var marker, i;
			for (i = 0; i < locations.length; i++) {
			    marker = new google.maps.Marker({
			        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
			        map: map,
			        title: locations[i][0]
			    });
			    google.maps.event.addListener(marker, 'click', (function (marker, i) {
			        return function () {
			            infowindow.setContent(locations[i][0]);
			            infowindow.open(map, marker);
			        };
			    })(marker, i));
			    markers.push(marker);
			}
		};


		return self;
	};

	$(document).ready(function(){
  		ABC.MapsView = new MapViewModel();
  		ko.applyBindings(ABC.MapsView);
	});

})(ABC = window.ABC || {}, ko, $);
