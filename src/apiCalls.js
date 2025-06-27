import axios from "axios";

export const loginCall = async (UserCredentials, dispatch)=>{
    dispatch({type: "LOGIN_START"});
    try {
        const res = await axios.post("/auth/login", UserCredentials);
        dispatch({type: "LOGIN_SUCCESS", payload: res.data})
    } catch (error) {
        dispatch({type: "LOGIN_FAILURE", payload: error})
    }
}