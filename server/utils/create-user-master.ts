import { UserModel } from './../models/User.model';
import { RoleUserModel } from './../models/RoleUser.model';
// const genPassHash = require('../helpers/user/generate-password-hash');
const config = useRuntimeConfig();
const roles = config.ROLES_TYPE;

// Create Roles to users if it doesn't exist
async function createRoles() {
  const rolesData = await RoleUserModel.findAll({ raw: true });

  if (!rolesData.length) {
    for (const role of roles) {
      try {
        await RoleUserModel.create({ type: role });
      } catch (err) {
        console.log(err);
      }
    }
  }

  return await RoleUserModel.findAll({ raw: true });
}

// creating a master user if it doesn't exist
export const createAdmin = async () => {
  const checkUserExists = await UserModel.findOne({where: {email: config.ADMIN_EMAIL}});

  if(!checkUserExists) {
    const rolesData = await createRoles();
    const adminMaterRole = rolesData.find((role) => roles[0] === role.type).type;
  
    const user = {
      name: config.ADMIN_NAME,
      email: config.ADMIN_EMAIL,
      // password: await genPassHash(config.ADMIN_PASS).then((hash) => hash),
      password: 1234,
      role: adminMaterRole,
    }

    try {
      await UserModel.create(user);
    } catch (err) {
      console.log(err);
    }
  }
}