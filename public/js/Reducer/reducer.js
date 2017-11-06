import axios from 'axios';

export default (state = {}, action) => {
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
            return { loginDetails: action.obj, errorList: resultObj };
        default:
            return {}
    }
}