import axios from 'axios';
import $ from 'jquery';
export default (state, action) => {
    switch (action.type) {
        case 'get':
            return state;
        case 'validate':
            var resultObj = new Array(),
                valid = false;
            for (var keys in action.obj) {
                if (action.obj[keys]) {
                    valid = true;
                } else {
                    valid = false;
                }
                if (!valid) {
                    resultObj.push({
                        keyName: keys,
                        valid: valid
                    })
                }

            }
            return { loginDetails: action.obj, errorObj: resultObj };
        case 'post':
        	let result=null;
        	$.ajax({
        		url:action.url,
        		async:false,
        		type:'post',
        		data:action.requestObj,
        		success:function(response){
        			 result =response;

        		}
        	});
        	console.log(result);
        	state.isRegisStrationSuccessFull =result.errorMessage?false:true;
        	state.errorObj = result;
        	return {isRegisStrationSuccessFull :result.errorMessage?false:true,errorObj:result};
        default:
            return {};
    }
}