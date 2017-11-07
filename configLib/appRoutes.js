var validationRules = require('./userValidationRules');
module.exports ={
	homePageHandler:function(req,res,next){
		//console.log(res);
		res.render('index.html')
		//res.send(200);
	},
	userRegistrationHandler:function(errorObj,req,res,next){
		var response =new Object();
		console.log(errorObj.errors.length)
		if(errorObj.errors.length) {
			response.errorMessage='please complete the following fields';
			response.errorMessageList=[];
			errorObj.errors.forEach(function(errorConfig,index){
				response.errorMessageList.push({
					fieldName:errorConfig.field[errorConfig.field.length-1],
					message:errorConfig.messages[errorConfig.messages.length-1]
				})
			})
		}
		else {
			console.log('hello')
		}
		console.log(response.errorMessageList.length)
		res.send(response);
	},
	userProfile:function(req,res,next){
		console.log(req);
		res.send(200);
	},
	appNotifications:function(req,res,next){
		console.log(req);
		res.send(200);
	},
	userLoginHanlder:function(req,res,next){
		console.log(req);
		res.send(200);
	}
}