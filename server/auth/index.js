import checkToken from "./checkToken.js";

const authenticateUser = ({ token }) => {
    const userData = checkToken(token)
    return userData
}

export default authenticateUser