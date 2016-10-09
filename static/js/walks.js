(function(ABC, ko, $){

	var WalksViewModel = function(){
		var self = this;
		self.walkList = ko.observableArray([]);

		$.get(Utils.config.baseUrl + '/static/data/walks.json', function(data){
			self.walkList(data.walks);
		});

		return self;
	};

  	$(document).ready(function(){
  		ABC.WalksView = new WalksViewModel();
  		ko.applyBindings(ABC.WalksView);
	});

})(ABC = window.ABC || {}, ko, $);
