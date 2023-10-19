import { WishList } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createWishlist = async (payload: WishList): Promise<WishList> => {
  const result = await prisma.wishList.create({
    data: payload,
    include: {
      user: true,
      bookingItem: true,
    },
  });
  return result;
};

const getWishlistFromDB = async (): Promise<Partial<WishList>[]> => {
  const result = await prisma.wishList.findMany({
    include: {
      user: true,
      bookingItem: true,
    },
  });
  return result;
};

const getSinglWishlist = async (
  id: string
): Promise<Partial<WishList[] | null>> => {
  const result = await prisma.wishList.findMany({
    where: {
      userId: id,
    },
    include: {
      user: true,
      bookingItem: true,
    },
  });
  return result;
};

const updatWishlistDataToDB = async (
  id: string,
  payload: Partial<WishList>
): Promise<Partial<WishList | null>> => {
  const result = await prisma.wishList.update({
    where: {
      id,
    },
    include: {
      user: true,
      bookingItem: true,
    },
    data: payload,
  });
  return result;
};

const deletWishlistFromDB = async (
  id: string
): Promise<Partial<WishList | null>> => {
  const result = await prisma.wishList.delete({
    where: {
      id,
    },
    include: {
      user: true,
      bookingItem: true,
    },
  });
  return result;
};

export const ReviewService = {
  createWishlist,
  getWishlistFromDB,
  getSinglWishlist,
  updatWishlistDataToDB,
  deletWishlistFromDB,
};
