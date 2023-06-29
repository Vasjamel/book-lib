const getToken = () => {
    const token = localStorage.getItem('Lib-access-token') || ''
    return token
}

export default getToken