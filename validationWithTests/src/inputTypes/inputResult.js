define([], function(){

	// define some standard shapes for input results for readability and
	// consistency elsewhere in the code. In a larger application, we might
	// choose to use defined classes for better debuggability + error messages

	return {
	
		failedInput: function(message){
			return {
				isError: true,
				errorMessage: message
			};
		},

		successfulInput: function(value){
			return {
				isError: false,
				value: value
			};
		}

	};

});