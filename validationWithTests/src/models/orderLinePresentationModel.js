define(['knockout',
		'inputTypes/currencyType',
		'inputTypes/integerType',
		'inputTypes/stringType'],
function(ko,
		currencyType,
		integerType,
		stringType ){

	function OrderLinePresentationModel(orderLine){
		var self = this;

		self.model = orderLine;

		self.name = orderLine.name.extend({ validate: { type: stringType, min: 1, max: 25, required: true } });
		self.quantity = orderLine.quantity.extend({ validate: { type: integerType, min: 1, max: 500, required: true } });
		self.price = orderLine.price.extend({ validate: { type: currencyType, min: 0, max: 100, required: true } });

		self.total = ko.pureComputed(function(){
			return currencyType.format(orderLine.total());
		});

		self.isValid = ko.pureComputed(function(){
			return !self.name.validation().isError() &&
				!self.quantity.validation().isError() &&
				!self.price.validation().isError();
		});
	}

	return OrderLinePresentationModel;

});