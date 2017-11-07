export default {
	getDetails:function(obj){
		return{
			type:'get',
			obj:obj
		}
	},
	validations:function(obj){
	
		return {
			type:'validate',
			obj:obj
		}
	},
	registerUser:function(obj){
		return {
			type:'post',
			url:location.origin+'/api/register',
			requestObj:obj
		}
	}
}