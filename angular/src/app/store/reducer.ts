import {IAppState} from './state'
import {SAVE_JWT, SAVE_USER} from './actions'
const initialState: IAppState = {
    user: {username: '', email: '', friends:[]}, 
    jwt:''}
// let nextId=4

function saveJWT(state, action): IAppState{
    return Object.assign({}, state, {
        user: state.user,
        jwt: action.payload 
    })
}

function saveUser(state, action): IAppState{
    return Object.assign({}, state, {
        user: action.payload,
        jwt: state.jwt 
    })
}

export function reducer(state: IAppState = initialState, action){
    switch(action.type){
        case SAVE_USER: return saveUser(state, action)
        case SAVE_JWT: return saveJWT(state, action)
        default: return state
    }
}