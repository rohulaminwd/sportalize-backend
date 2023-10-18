import bcrypt from 'bcrypt';

export const isPasswordMatched = async function (
  givenPassword: string,
  hashedPassword: string
): Promise<boolean> {
  const isMatch = await bcrypt.compare(givenPassword, hashedPassword);
  return isMatch;
};
