import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT , REMOVE_ALERT } from "./types";
export const set_alert = (msg, alertType) => dispatch =>{
    // payload contains the message and type of alert.
    const id = uuidv4();
    dispatch({
        type: SET_ALERT,
        payload: {msg, alertType, id}
    })
    setTimeout(()=>dispatch({type: REMOVE_ALERT, payload: id}),5000);
}

