import axios from 'axios'

const setAuthToken = token => {
    if(token){
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete axios.defaults.headers.common['x-atuh-token'];
    }
}

export default setAuthToken 