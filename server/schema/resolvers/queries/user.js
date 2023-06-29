import authenticateUser from "../../../auth/index.js";
import User from "../../../db/models/user.js";

// const userQuery = async (parent, { find }, context) => {
//     // authenticateUser(context)
//     const user = await User.findByPk(find.id)
//     return user.toJSON()
// }

const users = async (parent, { find }, context) => {
    const users = await User.findAll({ where: find })
    return users
}

export default users