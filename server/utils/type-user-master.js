import { UserModel } from "./../models/User.model";
import { RoleUserModel } from "./../models/RoleUser.model";
const config = useRuntimeConfig();
const roles = config.ROLES_TYPE;

export const checkUserMaster = async (event) => {
    if (event.context.auth) {
        const roleUser = await RoleUserModel.findOne({
            where: { type: event.context.auth.role },
        });

        return roleUser.type === roles[0];
    }
};
