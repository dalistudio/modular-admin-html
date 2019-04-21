// 找回表单验证
$(function() {
	if (!$('#reset-form').length) {
        return false;
    }

    var resetValidationSettings = {
	    rules: {
	        email1: {
	            required: true,
	            email: true
	        }
	    },
	    messages: {
	        email1: {
	            required: "请输入邮箱地址",
	            email: "请输入正确的邮箱地址"
	        }
	    },
	    invalidHandler: function() {
			animate({
				name: 'shake',
				selector: '.auth-container > .card'
			});
		}
	}

	$.extend(resetValidationSettings, config.validations);

    $('#reset-form').validate(resetValidationSettings);
})