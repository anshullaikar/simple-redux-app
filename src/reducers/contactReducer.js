import * as actionTypes from "../actions/actionTypes"

export default (state = [], action) => {
    switch(action.type){
        case actionTypes.CREATE_NEW_CONTACT:
            return [
                ...state, 
                Object.assign({},action.contact)
            ];
        case actionTypes.REMOVE_CONTACT:
            //remove items if they are the same id as one in action
            return state.filter((data, i) => action.id !== i)
        default: 
            return state;
    }
}