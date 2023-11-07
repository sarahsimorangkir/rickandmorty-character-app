export const SET_VALUE = "set-value";

/**
 *
 * @param state {Map<String, Object>}
 * @param payload {{name: String, value: Object}}
 * @returns {Map<String, Object>}
 */
export function setValue(state, payload){
    const {name, value} = payload;
    return {...state, [name]: value};
}

export const APPEND_VALUE_MAP = "append-value-map";


/**
 *
 * @param state {Map<String, Object>}
 * @param payload {{name: String, value: Object}}
 * @returns {Map<String, Object>}
 */
export function appendMap(state, payload){
    const {name, value} = payload;
    let oldData = {};
    if(state[name] !== undefined){
        oldData = state[name];
    }
    console.log({...value, ...oldData})
    return {...state, [name]: {...value, ...oldData}};
}
