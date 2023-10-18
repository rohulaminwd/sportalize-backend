import { ReviewRating } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createReview = async (payload: ReviewRating): Promise<ReviewRating> => {
  const result = await prisma.reviewRating.create({
    data: payload,
    include: {
      user: true,
      bookingItem: true,
    },
  });
  return result;
};

const getReviewsFromDB = async (): Promise<Partial<ReviewRating>[]> => {
  const result = await prisma.reviewRating.findMany({
    include: {
      user: true,
      bookingItem: true,
    },
  });
  return result;
};

const getSingleReview = async (
  id: string
): Promise<Partial<ReviewRating | null>> => {
  const result = await prisma.reviewRating.findFirst({
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

const updateReviewDataToDB = async (
  id: string,
  payload: Partial<ReviewRating>
): Promise<Partial<ReviewRating | null>> => {
  const result = await prisma.reviewRating.update({
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

const deleteReviewFromDB = async (
  id: string
): Promise<Partial<ReviewRating | null>> => {
  const result = await prisma.reviewRating.delete({
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
  createReview,
  getReviewsFromDB,
  getSingleReview,
  updateReviewDataToDB,
  deleteReviewFromDB,
};
