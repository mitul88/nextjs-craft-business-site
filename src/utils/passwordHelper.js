import bcrypt from "bcrypt";
export const passwordHelper = {
  hashPassword: async (userPass) => {
    const userPassword = userPass.toString();
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(userPassword, salt);
    return password;
  },
  verifyPassword: async (passwordFromClient, verifyWith) => {
    const client = passwordFromClient.toString();
    const app = verifyWith.toString();
    const validation = await bcrypt.compare(client, app);
    return validation;
  },
};
