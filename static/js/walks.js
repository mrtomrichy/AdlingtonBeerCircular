(function(ABC, ko, $){

	var WalksViewModel = function(){
		var self = this;
		self.walkList = ko.observableArray([]);

		$.get(config.baseUrl + '/static/data/walks.json', function(data){
			var walks = [];

			for(var i = 0; i < data.walks.length; i++) {
				if(i%3 === 0) {
					walks.push([]);
				}

				walks[walks.length-1].push(data.walks[i]);
			}

			self.walkList(walks);
			console.log(self.walkList());
		});

		return self;
	};

  	$(document).ready(function(){
  		ABC.WalksView = new WalksViewModel();
  		ko.applyBindings(ABC.WalksView);
	});

})(ABC = window.ABC || {}, ko, $);
