//- User Dialog Example

function OrderHistoryViewModel(dataService, userDialogService, pastOrdersRawData){
	var self = this;

	self.orderStatus = ko.observable();
	self.userDialogService = userDialogService;

	pastOrdersRawData = pastOrdersRawData || [];
	var pastOrders = pastOrdersRawData.map(function(rawOrder){
		return new OrderModel(rawOrder);
	});
	self.orders = ko.observableArray(pastOrders);

	self.isReordering = ko.observable(false);

	self.reorder = function(priorOrder){
		var newOrder = new OrderModel({ id: 'pending', contents:[], price: 0 });
		self.isReordering(true);

		//= 1: begin checks on each product to verify we have stock for each of them
		var stockChecks = priorOrder.contents().map(function(product){
			return dataService.verifyStock(product);
		});

		//= 2: add in stock items to list, ask user about out of stock products
		return Promise.all(stockChecks)
		.then(function(results){
			//= 2.1: add in-stock products to the new order
			results.filter(function(result){
				if(result.status == 'in stock'){
					newOrder.contents.push(result.product);
				}
			});

			//= 2.2: Pass the list of 'out of stock' products to the next step to determine alternatives
			var outOfStockResults = results.filter(function(result){
				return result.status == 'out of stock';
			});

			return outOfStockResults;
		})
		.then(function(outOfStockResults){
			//= 3: If there are ;out of stock' products, ask the user what to do for each of them
			if(outOfStockResults.length > 0){
				return userDialogService.askAboutOutOfStockProductAlternatives(outOfStockResults)
				.then(function(answers){
					if(answers == 'cancel'){
						//= 3.1: if the user cancelled, cancel the order
						newOrder = null;	
					}
					else{
						//= 3.2 if alternatives were chosen, add them to the order
						answers.forEach(function(selectedChoice){
							if(selectedChoice != null){
								newOrder.contents.push(selectedChoice.product);
							}
						});
					}
				});
			}
		})
		.then(function(){
			//= 4: the order hasn't been cancelled, add it to the order list
			if(newOrder != null){
				self.orders.unshift(newOrder);
			}
			self.isReordering(false);
		});
	};
}

function OrderModel(rawOrder){
	var self = this;

	self.id = ko.observable(rawOrder.id);
	self.contents = ko.observableArray(rawOrder.contents);
	self.price = ko.observable(rawOrder.price);

	self.isNew = ko.computed(function(){
		return self.id() == 'pending';
	});
}
