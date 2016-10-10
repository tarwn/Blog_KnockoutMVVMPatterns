define(['knockout',
		'inputTypes/currencyType',
		'models/orderLinePresentationModel'],
function(ko, 
		currencyType,
		OrderLinePresentationModel ){
		
	function OrderPresentationModel(orderModel){
		var self = this;

		var items = orderModel.items().map(function(itemModel){
			return new OrderLinePresentationModel(itemModel);
		});

		self.model = orderModel;
		self.items = ko.observableArray(items);

		self.addNewLine = function(lineModel){
			var newOrderLine = self.model.addNewLine();
			self.items.push(new OrderLinePresentationModel(newOrderLine));
		};

		self.removeLine = function(linePresModel){
			// assume indexes are the same
			var index = this.model.items().indexOf(linePresModel.model);
			console.log(index);
			self.items.splice(index, 1);
			self.model.items.splice(index, 1);
		};

		self.total = ko.pureComputed(function(){
			return currencyType.format(self.model.total());
		});

		self.isValid = ko.pureComputed(function(){
			var firstInvalid = self.items().find(function(item){
				return item.isValid() == false;
			});
			if(firstInvalid != null){
				return false;
			}
			else{
				return true;
			}
		});

		self.isSaveAvailable = ko.pureComputed(function(){
			return self.isValid() && self.items().length > 0;
		});
	}

	return OrderPresentationModel;

});