import React from "react";
import {APPEND_VALUE_MAP, appendMap, SET_VALUE, setValue} from "./actions";

const StoreContext = React.createContext();

const initialState = {
    characters: [],
    characterMap: {},
    charactersGetInfo: null,
    locations: [],
    locationsMap: {},
    locationsGetInfo: null,
};

/**
 *
 * @param state {Map<String, Object>}
 * @param action {{type: String, payload: {name: String, value: Object}}}
 * @returns {Map<String, Object>}
 */
function reducer(state, action){
    switch (action.type){
        case SET_VALUE:
            return setValue(state, action.payload);
        case APPEND_VALUE_MAP:
            return appendMap(state,action.payload);
        default:
            throw new Error(`Unhandled action types: ${action.type}`);
    }
}

function Provider({children}){
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const value = {state, dispatch};
    return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

function useStore(){
    const context = React.useContext(StoreContext)
    if (context === undefined) {
        throw new Error('useCount must be used within a StoreProvider')
    }
    return context
}

function useStoreState(){
    const context = React.useContext(StoreContext);
    if (context === undefined) {
        throw new Error('useCount must be used within a StoreProvider')
    }
    return context.state;
}

function useStoreDispatch(){
    const context = React.useContext(StoreContext);
    if (context === undefined) {
        throw new Error('useCount must be used within a StoreProvider')
    }
    return context.dispatch;
}

export {Provider, useStore, useStoreState, useStoreDispatch}