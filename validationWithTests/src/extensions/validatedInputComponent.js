define([], function(){
	return function(ko){
	
		ko.components.register('validated-input', {
			viewModel: function(params){
				this.field = params.field;
				// component define each field as a new computed or value,
				// so we have to pass validation in in parallel and define it
				// as an observable in the extension so we don't have a stale
				// value when the next line is replaced or table rows are removed
				this.validation = params.validation;
			},
			template: 
				'<input type="text" data-bind="value: field, css: { \'error\': validation().isError }" />' +
				'<div class="error-message" style="display: none;" data-bind="text: validation().errorMessage, style: { display: validation().isError() ? \'block\' : \'none\' }"></div>'
		});

	}
});