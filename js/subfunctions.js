var tmp;
// Add error message element after input.
$('#some-number').after('<span class="error-message">Please enter numbers only!</span>')

$('.matrix-element').on('input', function (evt) {
	console.log("fasd");
	var value = evt.target.value;
	if (value.length === 0) {
	
		evt.target.className = ''
		return;
	}

	if ($.isNumeric(value)) {
		evt.target.className = 'valid';
		tmp = value;
		$('#some-number').after('<span>' + tmp + '</span>');
	} else {
		evt.target.className = 'invalid';
	}
})

//************************************** Model matrix modifications **************************************
//*************************** Translate modification ***************************
$('#Md_xtranslate').on('change mousemove', function (evt) {
	$(this).next().html($(this).val());
	Md_transX = $(this).val();
})

$('#Md_ytranslate').on('change mousemove', function (evt) {
	$(this).next().html($(this).val());
	Md_transY = $(this).val();
})

$('#Md_ztranslate').on('change mousemove', function (evt) {
	$(this).next().html($(this).val());
	Md_transZ = $(this).val();
})
//*************************** Rotation modification ***************************
$('#Md_xrotate').on('change mousemove', function (evt) {
	$(this).next().html($(this).val());
	Md_rotX = $(this).val();
})

$('#Md_yrotate').on('change mousemove', function (evt) {
	$(this).next().html($(this).val());
	Md_rotY = $(this).val();
})

$('#Md_zrotate').on('change mousemove', function (evt) {
	$(this).next().html($(this).val());
	Md_rotZ = $(this).val();
})

//************************************** View matrix modifications **************************************
//*************************** Translate modification ***************************
$('#Vi_xtranslate').on('change mousemove', function (evt) {
	$(this).next().html($(this).val());
	Vi_transX = -1 * $(this).val();
	console.log(Vi_transX);
})

$('#Vi_ytranslate').on('change mousemove', function (evt) {
	$(this).next().html($(this).val());
	Vi_transY = -1 * $(this).val();
})

$('#Vi_ztranslate').on('change mousemove', function (evt) {
	$(this).next().html($(this).val());
	Vi_transZ = -1 * $(this).val();
})
//*************************** Rotation modification ***************************
$('#Vi_xrotate').on('change mousemove', function (evt) {
	$(this).next().html($(this).val());
	Vi_rotX = -1 * $(this).val();
})

$('#Vi_yrotate').on('change mousemove', function (evt) {
	$(this).next().html($(this).val());
	Vi_rotY = -1 * $(this).val();
})

$('#Vi_zrotate').on('change mousemove', function (evt) {
	$(this).next().html($(this).val());
	Vi_rotZ = -1 * $(this).val();
})
