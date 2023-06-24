import User from "../../../db/models/user.js";

const userQuery = async (parent, { find = {} }, context) => {
    const user = await User.findOne({ where: find })
    return user.toJSON()
}

export default userQuery