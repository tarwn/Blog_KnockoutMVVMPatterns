define(['inputTypes/inputResult'],
function(inputResult){

	return {
		emptyValue: '',
		format: function(value){
			return value;
		},
		tryParse: inputResult.successfulInput,
		tryValidate: function(value, options){
			if(options.min != undefined && value.length < options.min){
				return inputResult.failedInput("'" + value + "' is shorter than the require minimum of " + options.min + " characters long");
			}

			if(options.max != undefined && value.length > options.max){
				return inputResult.failedInput("'" + value + "' is longer than  the supported " + options.max + " characters");
			}	

			return inputResult.successfulInput(value);
		}
	};

});