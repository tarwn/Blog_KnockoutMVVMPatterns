define(['extensions/knockoutExtensions',
		'extensions/validatedInputComponent'
], 
function(ko,
		validatedInputComponent
){

	// add components
    validatedInputComponent(ko);


	return ko;

});