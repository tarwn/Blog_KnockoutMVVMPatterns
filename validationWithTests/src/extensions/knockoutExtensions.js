define(['knockout-core',
		'extensions/validatedInputExtension'
], 
function(ko,
		validatedInputExtension
){

	// add extensions
    validatedInputExtension(ko);

	return ko;
});