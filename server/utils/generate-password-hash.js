import bcrypt from 'bcrypt';
const saltRounds = 10; // number of rounds of jumping

export const genPassHash = async (password) => {
  try {
    // Generate a random "salt"
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password with "salt"
    const hash = await bcrypt.hash(password, salt);

    return hash;
  } catch (error) {
    console.error("Erro ao criar hash da senha:", error);
    throw error;
  }
};
