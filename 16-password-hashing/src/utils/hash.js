import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export const comparePassword = (inputPassword, hashedPassword) =>{
    bcrypt.compare(inputPassword, hashedPassword);
}
  