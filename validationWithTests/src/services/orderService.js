define(['knockout-core',
		'models/OrderModel'],
function(ko, 
		OrderModel){

	function OrderService(){
		this.getNewOrder = function(){
			return new OrderModel();
		};
		this.saveOrder = function(order){
			alert(ko.toJSON(order));
		};
	}

	return OrderService;

});