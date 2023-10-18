import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { isPasswordMatched } from '../../../helpers/isPasswordMached';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { ILoginUser, ILoginUserResponse } from './auth.interface';
const signUp = async (payload: User): Promise<User> => {
  const isExists = await prisma.user.findFirst({
    where: {
      email: payload.email,
    },
  });

  if (isExists) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User Already Exists!');
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10); // You can adjust the number of rounds for hashing

  // Replace the plain text password with the hashed password
  const userData = {
    ...payload,
    password: hashedPassword,
  };

  const result = await prisma.user.create({
    data: userData,
  });

  return result;
};

// LOgin user
const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exists');
  }

  if (
    isUserExist.password &&
    !(await isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password do not matched');
  }

  //create access token and refresh token

  const { role, id: userId } = isUserExist;

  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return { accessToken };
};

// Change pass
const ChangePassword = async (
  id: string,
  payload: Partial<any>
): Promise<User> => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exists');
  }

  if (
    isUserExist.password &&
    !(await isPasswordMatched(payload?.currentPass, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is not matched');
  }

  const hashedPassword = await bcrypt.hash(payload.newPass, 10);

  const result = await prisma.user.update({
    where: {
      id,
    },
    data: {
      password: hashedPassword,
    },
  });
  return result;
};

export const authService = {
  signUp,
  loginUser,
  ChangePassword,
};
