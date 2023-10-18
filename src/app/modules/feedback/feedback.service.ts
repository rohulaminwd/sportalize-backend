import { Feedback } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const createFeedback = async (data: Feedback): Promise<Feedback> => {
  const result = await prisma.feedback.create({
    data,
  });

  return result;
};

const getAllFeedback = async (): Promise<Feedback[]> => {
  const result = await prisma.feedback.findMany({});

  return result;
};

const getFeedbackById = async (id: string): Promise<Feedback | null> => {
  const result = await prisma.feedback.findUnique({
    where: {
      id,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Category Doesn't Exists");
  }

  return result;
};

const updateFeedback = async (
  id: string,
  data: Partial<Feedback>
): Promise<Feedback | null> => {
  const result = await prisma.feedback.update({
    where: { id },
    data,
  });

  return result;
};

const deleteFeedback = async (id: string): Promise<Feedback | null> => {
  const result = await prisma.feedback.delete({
    where: {
      id,
    },
  });

  return result;
};

export const CategoryService = {
  createFeedback,
  getAllFeedback,
  getFeedbackById,
  updateFeedback,
  deleteFeedback,
};
