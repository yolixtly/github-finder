import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';

import {
    SET_ALERT,
    REMOVE_ALERT
} from '../types';
// Has the initial State and Actions

const AlertState = props => {
    // Global State for any Github related data
    const initialState = null;

    const [state, dispatch] = useReducer(AlertReducer, initialState);

    const showAlert = (msg, type) => {
        dispatch({
            type: SET_ALERT,
            payload: {
                msg,
                type
            }
        })

        setTimeout(() => {
            dispatch({
                type: REMOVE_ALERT
            });
        }, 5000);
    }
    // Set Alert
    return <AlertContext.Provider
        // any piece of state we want to make available to the application
        value={{
            alert: state,
            showAlert
        }}
    >
        {props.children}
    </AlertContext.Provider>
};

export default AlertState;

