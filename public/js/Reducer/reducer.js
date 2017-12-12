let result;
const initialState = {
    isRegistrationSuccessFull: false,
    loginDetails: null,
    resultObj: null,
    userObj: null,
    loginStatus: false,
    profileInformation: null,
    errorObj: null,
    showLoader:false
}
export default (state = initialState, action) => {
    switch (action.type) {
        case 'get':
            return state;
        case 'handle_service':
              return Object.assign({},state,{isRegisStrationSuccessFull:action.data.isRegistrationSuccessFull?action.data.isRegistrationSuccessFull:state.isRegistrationSuccessFull,errorObj:action.data.errorMsg,userObj:action.data.userObj});
        case 'post':
            return state;
       case 'show_loader':
            return Object.assign({},state,{showLoader:true});
        case 'hide_loader':
            return Object.assign({},state,{showLoader:false});
        default:
            return state;
    }
}