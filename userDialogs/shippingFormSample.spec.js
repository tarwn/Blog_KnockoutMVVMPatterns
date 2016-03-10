
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

