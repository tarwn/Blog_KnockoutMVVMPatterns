define(['knockout'],
function(ko){

	function OrderLineModel(rawDTO){
		var self = this;

		self.name = ko.observable(rawDTO.name || '');
		self.quantity = ko.observable(rawDTO.quantity);
		self.price = ko.observable(rawDTO.price);
		self.total = ko.pureComputed(function(){
			if(self.quantity() != null && self.price() != null){
				return self.quantity() * self.price();
			}
			else{
				return 0;
			}
		});
	}

	return OrderLineModel;

});