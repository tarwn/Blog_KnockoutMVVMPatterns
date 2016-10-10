define([], function(){
	return function(ko){

		ko.extenders.validate = function (target, options) {
			return createValidatedFormattedInput(target, options);
		};

		function createValidatedFormattedInput(target, options){
			var type = options.type;

			// see note in component for why this is an observable
			var validationProperties = ko.observable({
				isError: ko.observable(false),
				errorMessage: ko.observable(null)
			});

			var forceReadDirty = ko.observable("");

			var readFunction = function(){
				return type.format(target()) + forceReadDirty();
			};

			var writeFunction = function(newValue){
				// allow empty values if this is a non-required field
				if(options.required === false && newValue === ''){
					target(type.emptyValue);
					validationProperties().isError(false);
					validationProperties().errorMessage(null);
					return;
				}

				// will it parse?
				var parseResult = type.tryParse(newValue);
				if(parseResult.isError){
					validationProperties().errorMessage(parseResult.errorMessage);
					validationProperties().isError(true);
					return;
				}

				// will it validate for type validation?
				var validationResult = type.tryValidate(parseResult.value, options);
				if(validationResult.isError){
					validationProperties().errorMessage(validationResult.errorMessage);
					validationProperties().isError(true);
					return;
				}

				// custom validation?
				if(options.validate != null){
					validationResult = options.validate(validationResult.value);
					if(validationResult.isError){
						validationProperties().errorMessage(validationResult.errorMessage);
						validationProperties().isError(true);
						return;
					}
				}

				// must be good, write it through
				if(target() == validationResult.value){
					// Only occurs when we overwrite a value from a
					// bad one back to it's original value. Does not
					// impact the underlying model, only the formatted
					// output.
					forceReadDirty(" ");
					forceReadDirty("");
				}
				else{
					target(validationResult.value);
				}
				validationProperties().isError(false);
				validationProperties().errorMessage(null);
			};

			var computed = ko.computed({
				read: readFunction,
				write: writeFunction
			});
			computed.validation = validationProperties;
			return computed;
		}

	}
});