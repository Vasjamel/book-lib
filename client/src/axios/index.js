import axios from 'axios'

import getToken from '../utils/getToken.js';

const instance = axios.create({
    baseURL: 'http://localhost:4000/graphql/',
    timeout: 1000,
    method: 'POST',
    headers: { 'x-authentication-access': getToken() },
    data: {
        query: '',
        variables: {}
    },
});

instance.interceptors.request.use(config => {
    config.headers['x-authentication-access'] = getToken()
    return config
}, err => { throw new Error(err) })

export default instance