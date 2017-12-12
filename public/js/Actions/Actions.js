import axios from 'axios';
const ajaxService = axios.create({
    timeout: 1000,
    headers: { 'Authorization': window.localStorage.getItem('user_token') }
});
export default {
    getProfileInformation: function(userObj) {
        return {
            type: 'get',
            requestObj: null,
            url: '/api/profile'
        }
    },
    validations: function(obj) {

        return {
            type: 'validate',
            obj: obj
        }
    },
    registerUser: function(obj) {
        //console.log(dispatch)
        return {
            type: 'post',
            url: location.origin + '/api/register',
            requestObj: obj
        }
    },
    handleServiceRequest: function(dispatch, userObj) {
        dispatch({ type: 'show_loader' });
        ajaxService({
            method: userObj.requestType,
            url: userObj.url,
            data: userObj.data
        }).then(function(response) {
            dispatch({ type: 'hide_loader' });
            switch (response.status) {
                case 200:
                    if (response.headers.auth) {
                        window.localStorage.setItem('user_token', response.headers.auth)
                    }
                    dispatch({ type: userObj.actionType, data: response.data });
                    break;
                default:
                    dispatch({ type: userObj.actionType, data: response.data });
                    break;
            }
        }).catch(function() {
            dispatch({ type: 'hide_loader' });
        })
    }
}