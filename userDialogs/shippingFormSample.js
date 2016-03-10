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