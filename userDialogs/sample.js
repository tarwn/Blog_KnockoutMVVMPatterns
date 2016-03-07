
//- Fake API Service

var fakeService = {
	// a slow shipping addres save that simulates a real save
	saveShippingAddress: function(data){
		return Promise.delay(500)
		.then(function(){
			return "Complete!";
		});			
	},
	// a verify stock function that reports an outage for 'ABC Red Paint #12' and alternatives
	verifyStock: function(product){
		return Promise.delay(500)
		.then(function(){
			if(product == 'ABC Red Paint #12'){
				return {
					product: product,
					status: 'out of stock',
					alternatives: [
						{ product: 'New ABC Red Paint #12', price: 5.99 },
						{ product: 'XYZ Red Paint', price: 4.49 },
						{ product: 'XYZ Red Paint #12 Alternative', price: 5.59 }
					]
				};
			}
			else{
				return {
					product: product,
					status: 'in stock'
				};
			}
		});
	}
}

//- Super Basic User Dialog Service
function BasicUserDialogService(){
	var self = this;

	self.isVisible = ko.observable(false);
	self.template = ko.observable(null);
	self.viewmodel = ko.observable(null);

	self.buttonActions = ko.observableArray();

	self.askAboutOutOfStockProductAlternatives = function(productAlternatives){
		var viewmodel = new ProductAlternativesViewmodel(productAlternatives);

		self.template('product-alternative-dialog');
		self.viewmodel(viewmodel);

		return new Promise(function(resolve){ 
			self.buttonActions([
				{ 
					text: 'cancel', 
					action: function(){
						clear();
						resolve('cancel');
					} 
				},
				{ 
					text: 'done', 
					action: function(){
						clear();
						resolve(viewmodel.getResults());
					} 
				}
			]);
			self.isVisible(true);
		});
	};

	function clear(){
		self.isVisible(false);
		self.template(null);
		self.viewmodel(null);
	}
};

function ProductAlternativesViewmodel(productAlternatives){
	var self = this;

	self.productChoices = productAlternatives.map(function(alternative){
		return {
			product: alternative.product,
			alternatives: alternative.alternatives,
			selection: ko.observable()
		}
	});
	self.getResults = function(){
		return self.productChoices.map(function(choice){
			return choice.selection();
		});
	};
}

//- Parent Viewmodel to hold samples

function ConversationsViewModel(dataService, userDialogService, pastOrdersRawData){
	var self = this;

	self.userDialogService = userDialogService;

	self.shippingForm = new ShippingFormViewModel(dataService);

	self.orderHistory = new OrderHistoryViewModel(dataService, userDialogService, pastOrdersRawData);
}

//- Shipping Form Example
function ShippingFormViewModel(dataService){
	var self = this;

	self.isSaving = ko.observable(false);
	self.saveStatus = ko.observable(null);
	self.saveText = ko.computed(function(){
		return self.saveStatus() || "Save";
	});

	self.newEntry = ko.observable(new AddressEntryModel());

	self.save = function(){
		if(self.isSaving())
			return;

		self.isSaving(true);
		self.saveStatus("Saving...");

		return dataService.saveShippingAddress(self.newEntry())
		.then(function(status){
			self.isSaving(false);
			self.saveStatus(status);
		})
		.delay(750)
		.then(function(){
			self.saveStatus(null);
		});
	};
}

function AddressEntryModel(){
	var self = this;

	self.name = ko.observable();
	self.address1 = ko.observable();
	self.address2 = ko.observable();
	self.city = ko.observable();
	self.state = ko.observable();
	self.zipCode = ko.observable();
}

//- User Dialog Example

function OrderHistoryViewModel(dataService, userDialogService, pastOrdersRawData){
	var self = this;

	self.orderStatus = ko.observable();

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
