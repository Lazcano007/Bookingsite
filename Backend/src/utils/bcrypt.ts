import bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashPassword = async (password: string) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error('We failed to hash the password');
  }
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
) => {
  try {
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    return passwordMatch;
  } catch (error) {
    throw new Error('We failed to verify the password');
  }
};
