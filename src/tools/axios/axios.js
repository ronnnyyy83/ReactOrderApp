import axios from 'axios';
 
const instance = axios.create({
    baseURL: 'http://localhost:44371',
    headers: {
        
    }
});
 
export default instance;