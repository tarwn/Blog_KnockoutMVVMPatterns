define(['inputTypes/inputResult'],
function(inputResult){

	// a currency type that only supports USD
	return {
		emptyValue: null,
		format: function(value){
			if(value == null){
				return '';
			}
			else{
				return value.toLocaleString('en-US', {
					style: 'currency',
					currency: 'USD',
					currencyDisplay: 'symbol',
					useGrouping: true
				});
			}
		},
		tryParse: function(value){
			// strip out commas and $
			var parsedResult = parseFloat(value.replace(/[\$,]/g,''));
			if(isNaN(parsedResult)){
				return inputResult.failedInput("'" + value + "' is not a valid currency value");
			}
			else{
				return inputResult.successfulInput(parsedResult);
			}
		},
		tryValidate: function(value, options){
			if(options.min != undefined && value < options.min){
				return inputResult.failedInput("'" + value + "' is less than the supported minimum of '" + options.min + "'");
			}

			if(options.max != undefined && value > options.max){
				return inputResult.failedInput("'" + value + "' is greater than the supported maximum of '" + options.max + "'");
			}

			return inputResult.successfulInput(value);		
		}
	};

});