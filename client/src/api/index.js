import axios from "../axios/index.js";

import handleErrors from "../utils/handleError.js";

class LIB_API {
    async runOperation({ query = '', variables }) {
        const response = await axios({
            data: {
                query,
                variables
            }
        })
        const { data, errors } = response.data
        if (errors?.length) {
            return handleErrors(errors)
        }
        if (data) return data
    }

}

export default new LIB_API()