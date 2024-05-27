import bcrypt from "bcrypt";
export const passwordHelper = {
  hashPassword: async (userPass) => {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(userPass, salt);
    return password;
  },
  verifyPassword: async (passwordFromClient, verifyWith) => {
    await bcrypt.compare(passwordFromClient, verifyWith);
    return;
  },
};
