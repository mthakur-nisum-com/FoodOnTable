export default {
	getDetails:function(obj){
		return{
			type:'get',
			obj:obj
		}
	},
	validations:function(obj){
		console.log(obj);
		return {
			type:'validate',
			obj:obj
		}
	}
}