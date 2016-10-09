(function(ABC, ko, $){

	var PubsViewModel = function(){
		var self = this;
		self.pubList = ko.observableArray([]);
		self.activePub = ko.observable();

		self.changePub = function(pub){
			self.activePub(pub);
		};

		$.get(config.baseUrl + '/static/data/pubs.json', function(data){
			self.pubList(data.pubs);
			self.activePub(self.pubList()[0]);
		});

		return self;
	};

$(document).ready(function(){
	ABC.PubsView = new PubsViewModel();
	ko.applyBindings(ABC.PubsView);
});

})(ABC = window.ABC || {}, ko, $);
