import { User } from '@prisma/client';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';

const getAllFromDB = async (): Promise<User[]> => {
  const result = await prisma.user.findMany({
    include: {
      reviewRatings: true,
      WishLists: true,
      Bookings: true,
    },
  });

  return result;
};

const getByIdFromDB = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      reviewRatings: true,
      WishLists: true,
      Bookings: true,
    },
  });
  return result;
};

const getMyProfile = async (token: string): Promise<User | null | string> => {
  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You not authorized');
  }
  let verifyUser = null;
  try {
    verifyUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid token');
  }

  const id = verifyUser?.userId;

  const myProfile = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!myProfile) {
    return 'Profile Not Found';
  } else {
    return myProfile;
  }
};

const updateIntoDB = async (
  id: string,
  payload: Partial<User>
): Promise<User> => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
    include: {
      reviewRatings: true,
      WishLists: true,
      Bookings: true,
    },
  });
  return result;
};

const deleteFromDB = async (id: string): Promise<User> => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
    include: {
      reviewRatings: true,
      WishLists: true,
      Bookings: true,
    },
  });
  return result;
};
export const UserService = {
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  getMyProfile,
};
