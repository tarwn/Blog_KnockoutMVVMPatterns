define(['knockout',
		'inputTypes/currencyType',
		'inputTypes/integerType',
		'inputTypes/stringType'
],
function(ko,
		currencyType,
		integerType,
		stringType
){

	describe('boundary tests', function(){
	
		var testCases = [
			{ name: 'currency input - less than min',	options: { type: currencyType, min: 0, max: 10 }, input: '-.5', isError: true },
			{ name: 'currency input - min length',		options: { type: currencyType, min: 0, max: 10 }, input: '0', isError: false },
			{ name: 'currency input - more than min',	options: { type: currencyType, min: 0, max: 10 }, input: '2.5', isError: false },
			{ name: 'currency input - less than max',	options: { type: currencyType, min: 0, max: 10 }, input: '7.5', isError: false },
			{ name: 'currency input - max',				options: { type: currencyType, min: 0, max: 10 }, input: '10', isError: false },
			{ name: 'currency input - more than max',	options: { type: currencyType, min: 0, max: 10 }, input: '10.5', isError: true },

			{ name: 'integer input - less than min',	options: { type: integerType, min: 0, max: 10 }, input: '-1', isError: true },
			{ name: 'integer input - rounds up to min',	options: { type: integerType, min: 0, max: 10 }, input: '-.1', isError: true },
			{ name: 'integer input - min length',		options: { type: integerType, min: 0, max: 10 }, input: '0', isError: false },
			{ name: 'integer input - more than min',	options: { type: integerType, min: 0, max: 10 }, input: '3', isError: false },
			{ name: 'integer input - less than max',	options: { type: integerType, min: 0, max: 10 }, input: '7', isError: false },
			{ name: 'integer input - max',				options: { type: integerType, min: 0, max: 10 }, input: '10', isError: false },
			{ name: 'integer input - rounds down to max',	options: { type: integerType, min: 0, max: 10 }, input: '10.4', isError: false },
			{ name: 'integer input - rounds above max',	options: { type: integerType, min: 0, max: 10 }, input: '10.5', isError: false },
			{ name: 'integer input - more than max',	options: { type: integerType, min: 0, max: 10 }, input: '11', isError: true },

			{ name: 'string input - shorter than min',	options: { type: stringType, min: 5, max: 8 }, input: '1234', isError: true },
			{ name: 'string input - min length',		options: { type: stringType, min: 5, max: 8 }, input: '12345', isError: false },
			{ name: 'string input - longer than min',	options: { type: stringType, min: 5, max: 8 }, input: '123456', isError: false },
			{ name: 'string input - shorter than max',	options: { type: stringType, min: 5, max: 8 }, input: '1234567', isError: false },
			{ name: 'string input - max',				options: { type: stringType, min: 5, max: 8 }, input: '12345678', isError: false },
			{ name: 'string input - longer than max',	options: { type: stringType, min: 5, max: 8 }, input: '123456789', isError: true },

		];

		testCases.forEach(function(testCase){
			var testName = testCase.name + ': is a ' + (testCase.isError ? 'validation error' : 'successful input');

			it(testName, function(){
				var testField = ko.observable();
				var presentableTestField = testField.extend({ validate: testCase.options });

				presentableTestField(testCase.input);

				expect(presentableTestField.validation().isError()).toBe(testCase.isError);
			});
		});

	});

});