
// Unfortunately we have to turn off warnings to suppress well-meaning 
// 'you didn't return a null from your promise chain' behavior at the
// potential cost of missing a real problem we could have caught with
// unit tests, but bluebird has chosen against
// more info: https://github.com/petkaantonov/bluebird/issues/832
Promise.config({
    warnings: false
});

describe("ShippingFormViewModel", function(){
	
	describe("save()", function(){
	
		it("clears saving status when server save is successful", function(done){
			// arrange
			var fakeService = {
				saveShippingAddress: function(){ return Promise.resolve('Success'); }
			};
			var vm = new ShippingFormViewModel(fakeService);

			// act
			var afterSave = vm.save();
			
			// assert
			afterSave.then(function(){			
				expect(vm.saveStatus()).toBeNull();
				expect(vm.isSaving()).toBe(false);
			}).finally(done, done.fail);
		});

	});

});

describe("OrderHistoryViewModel", function(){
	
	describe("reorder()", function(){
	
		it("verifies stock for all products in old order", function(done){
			// arrange
			var fakeDataService = {
				verifyStock: function(product){ 
					return Promise.resolve({ product: product, status: 'in stock' });
				}
			};
			spyOn(fakeDataService, 'verifyStock').and.callThrough();
			var fakeUserService = {
				askAboutOutOfStockProductAlternatives: function(){ return Promise.resolve('cancel'); }
			};
			var sampleOrder = { id: '1', price: 2, contents: [ 'ABC', 'DEF', 'GHI' ] };
			var vm = new OrderHistoryViewModel(fakeDataService, fakeUserService, [ sampleOrder ]);

			// act
			var afterReorder = vm.reorder(vm.orders()[0]);
			
			// assert
			afterReorder.then(function(){
				expect(fakeDataService.verifyStock).toHaveBeenCalled()
				expect(fakeDataService.verifyStock.calls.count()).toEqual(sampleOrder.contents.length);
			}).finally(done, done.fail);
		});

		it("immediately creates the new order when no products are out of stock", function(done){
			// arrange
			var fakeDataService = {
				verifyStock: function(product){ 
					return Promise.resolve({ product: product, status: 'in stock' });
				}
			};
			var fakeUserService = {
				askAboutOutOfStockProductAlternatives: function(){ return Promise.resolve('cancel'); }
			};
			spyOn(fakeUserService, 'askAboutOutOfStockProductAlternatives').and.callThrough();
			var sampleOrder = { id: '1', price: 2, contents: [ 'ABC', 'DEF', 'GHI' ] };
			var vm = new OrderHistoryViewModel(fakeDataService, fakeUserService, [ sampleOrder ]);

			// act
			var afterReorder = vm.reorder(vm.orders()[0]);
			
			// assert
			afterReorder.then(function(){
				expect(vm.orders().length).toBe(2);
				expect(fakeUserService.askAboutOutOfStockProductAlternatives).not.toHaveBeenCalled()
			}).finally(done, done.fail);
		});
	
		it("creates the order with the user alternatives for out of stock products when options are selected", function(done){
			// arrange
			var altProduct = { product: 'JKL'};
			var fakeDataService = {
				verifyStock: function(product){ 
					return Promise.resolve({ product: product, status: 'out of stock', alternatives: [ altProduct ] });
				}
			};
			var fakeUserService = {
				askAboutOutOfStockProductAlternatives: function(){ return Promise.resolve([altProduct, altProduct, altProduct]); }
			};
			var sampleOrder = { id: '1', price: 2, contents: [ 'ABC', 'DEF', 'GHI' ] };
			var vm = new OrderHistoryViewModel(fakeDataService, fakeUserService, [ sampleOrder ]);

			// act
			var afterReorder = vm.reorder(vm.orders()[0]);
			
			// assert
			afterReorder.then(function(){
				expect(vm.orders().length).toBe(2);
				expect(vm.orders()[1].contents()).toEqual(sampleOrder.contents);
				expect(vm.orders()[0].contents()).toEqual([altProduct.product, altProduct.product, altProduct.product]);
			}).finally(done, done.fail);
		});
			
		it("creates the order without out of stock products when users selects one alternative but opts out of selecting the rest", function(done){
			// arrange
			var altProduct = { product: 'JKL'};
			var fakeDataService = {
				verifyStock: function(product){ 
					return Promise.resolve({ product: product, status: 'out of stock', alternatives: [ altProduct ] });
				}
			};
			var fakeUserService = {
				askAboutOutOfStockProductAlternatives: function(){ return Promise.resolve([altProduct, null, null]); }
			};
			var sampleOrder = { id: '1', price: 2, contents: [ 'ABC', 'DEF', 'GHI' ] };
			var vm = new OrderHistoryViewModel(fakeDataService, fakeUserService, [ sampleOrder ]);

			// act
			var afterReorder = vm.reorder(vm.orders()[0]);
			
			// assert
			afterReorder.then(function(){
				expect(vm.orders().length).toBe(2);
				expect(vm.orders()[1].contents()).toEqual(sampleOrder.contents);
				expect(vm.orders()[0].contents()).toEqual([altProduct.product]);
			}).finally(done, done.fail);
		});
					
		it("cancels the order when the user cancels the dialog", function(done){
			// arrange
			var altProduct = { product: 'JKL'};
			var fakeDataService = {
				verifyStock: function(product){ 
					return Promise.resolve({ product: product, status: 'out of stock', alternatives: [ altProduct ] });
				}
			};
			var fakeUserService = {
				askAboutOutOfStockProductAlternatives: function(){ return Promise.resolve('cancel'); }
			};
			var sampleOrder = { id: '1', price: 2, contents: [ 'ABC', 'DEF', 'GHI' ] };
			var vm = new OrderHistoryViewModel(fakeDataService, fakeUserService, [ sampleOrder ]);

			// act
			var afterReorder = vm.reorder(vm.orders()[0]);
			
			// assert
			afterReorder.then(function(){
				expect(vm.orders().length).toBe(1);
			}).finally(done, done.fail);
		});
	});

});