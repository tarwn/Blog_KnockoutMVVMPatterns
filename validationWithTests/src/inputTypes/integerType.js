define(['inputTypes/inputResult'],
function(inputResult){


	return {
		emptyValue: null,
		format: function(value){
			if(value == null){
				return '';
			}
			else{
				return value.toFixed(0);
			}
		},
		tryParse: function(value){
			var parsedResult = parseInt(value.replace(/,/g,''));
			if(isNaN(parsedResult)){
				return inputResult.failedInput("'" + value + "' is not a valid integer");
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