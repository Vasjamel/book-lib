import User from "../../../db/models/user.js";

const users = async (parent, { find }, context) => {
    const users = await User.findAll({ where: find })
    return users
}

export default users