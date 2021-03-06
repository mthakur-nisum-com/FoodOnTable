module.exports={
	loginConfig:{
		url:'/login',
		requestType:'post',
		actionType:'handle_service'
	},
	showLoader:{
		actionType:'show_loader'
	},
	hideLoader:{
		actionType:'hide_loader'
	},
	registrationObj:{
		url:'/register',
		requestType:'post',
		actionType:'handle_service'
	},
	profileObj:{
		url:'/api/profile',
		requestType:'get',
		actionType:'handle_service'
	},
	logOutObj:{
		url:'/api/logOut',
		requestType:'post',
		actionType:'handle_service'
	},
	updateProfileObj:{
		url:'/api/profile',
		requestType:'put',
		actionType:'handle_service'
	}
}