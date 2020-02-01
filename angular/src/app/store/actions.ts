export const SAVE_JWT = 'SAVE_JWT'
export const SAVE_USER = 'SAVE_USER'

export function saveJWT(text: String){
    return {type: SAVE_JWT, payload: text}
}
export function saveUser(text: String){
    return {type: SAVE_USER, payload: text}
}