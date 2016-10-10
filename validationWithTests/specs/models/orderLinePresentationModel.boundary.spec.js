define(['models/orderLinePresentationModel',
		'models/orderLineModel'],
function(OrderLinePresentationModel,
		OrderLineModel
){

	describe('boundary tests', function(){
	
		var testCases = [
			{ name: 'name input - shorter than min', field: 'name', input: '', isError: true },
			{ name: 'name input - longer than min', field: 'name', input: '1', isError: false },
			{ name: 'name input - shorter than max', field: 'name', input: '123456789012345678901234', isError: false },
			{ name: 'name input - max', field: 'name', input: '1234567890123456789012345', isError: false },
			{ name: 'name input - longer than max', field: 'name', input: '12345678901234567890123456', isError: true },

			{ name: 'quantity input - less than min', field: 'quantity', input: '-1', isError: true },
			{ name: 'quantity input - min', field: 'quantity', input: '1', isError: false },
			{ name: 'quantity input - above min', field: 'quantity', input: '2', isError: false },
			{ name: 'quantity input - below max', field: 'quantity', input: '499', isError: false },
			{ name: 'quantity input - max', field: 'quantity', input: '500', isError: false },
			{ name: 'quantity input - above max', field: 'quantity', input: '501', isError: true },

			{ name: 'price input - less than min', field: 'price', input: '-1', isError: true },
			{ name: 'price input - min', field: 'price', input: '1', isError: false },
			{ name: 'price input - above min', field: 'price', input: '2', isError: false },
			{ name: 'price input - below max', field: 'price', input: '99', isError: false },
			{ name: 'price input - max', field: 'price', input: '100', isError: false },
			{ name: 'price input - above max', field: 'price', input: '101', isError: true },

		];

		testCases.forEach(function(testCase){
			var testName = testCase.name + ': is a ' + (testCase.isError ? 'validation error' : 'successful input');

			it(testName, function(){
				var testLine = new OrderLineModel({});
				var testLineP = new OrderLinePresentationModel(testLine);
				var inputUnderTest = testLineP[testCase.field];

				inputUnderTest(testCase.input);				

				expect(inputUnderTest.validation().isError()).toBe(testCase.isError);
			});

		});

	});

});