define(['knockout',
		'models/orderPresentationModel'],
function(ko,
		OrderPresentationModel
){

	function OrderViewModel(orderService){
		var self = this;
		
		self.order = ko.observable();

		self.addNextItem = function(){
			if(self.order() == null){
				self.createNewOrder();
			}

			self.order().addNewLine();
		};

		self.removeItem = function(orderLine){
			self.order().removeLine(orderLine);
		};

		self.createNewOrder = function(){
			var newOrder = orderService.getNewOrder()
			self.order(new OrderPresentationModel(newOrder));
		};

		self.saveToServer = function(){
			if(self.order() != null && self.order().isSaveAvailable()){
				orderService.saveOrder(self.order().model);
			}
		};
	}

	return OrderViewModel;

});