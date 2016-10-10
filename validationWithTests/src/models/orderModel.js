define(['knockout',
		'models/orderLineModel'],
function(ko,
		OrderLineModel
){

	function OrderModel(){
		var self = this;

		self.items = new ko.observableArray([]);
		self.total = ko.pureComputed(function(){
			return self.items().reduce(function(subTotal, item){
				return subTotal + item.total();
			}, 0);
		});

		self.addNewLine = function(){
			var newLine = new OrderLineModel({
				name: 'new item',
				price: 0,
				quantity: 1
			});
			self.items.push(newLine);
			return newLine;
		};
	}

	return OrderModel;

});