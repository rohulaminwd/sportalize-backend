import { BookingItem, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { BookingSearchableFields } from './bookingItem.constants';
import { IBookFilterRequest } from './bookingItem.interfaces';

const createBookingItem = async (data: BookingItem): Promise<BookingItem> => {
  //   console.log(data);
  const result = await prisma.bookingItem.create({
    data,
  });

  return result;
};

const getAllBookingItems = async (
  filters: IBookFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<BookingItem[]>> => {
  const { size, page, skip } = paginationHelpers.calculatePagination(options);
  const {
    search,
    minPrice,
    location,
    title,
    sportCategory,
    maxPrice,
    ...filtersData
  } = filters;

  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: BookingSearchableFields.map(field => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (location) {
    andConditions.push({
      location: location,
    });
  }
  if (title) {
    andConditions.push({
      title: title,
    });
  }

  if (sportCategory) {
    andConditions.push({
      sportCategory: sportCategory,
    });
  }

  if (minPrice !== undefined) {
    andConditions.push({ price: { gte: Number(minPrice) } });
  }

  if (maxPrice !== undefined) {
    andConditions.push({ price: { lte: Number(maxPrice) } });
  }

  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      AND: Object.keys(filtersData).map(key => ({
        [key]: {
          equals: (filtersData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.BookingItemWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.bookingItem.findMany({
    where: whereConditions,
    skip,
    include: {
      reviewRatings: true,
      bookings: true,
    },
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { title: 'desc' },
  });

  const total = await prisma.bookingItem.count();
  // const totalPage = total / skip;
  return {
    meta: {
      total,
      page,
      size,
    },
    data: result,
  };
};

const getBookingItemById = async (id: string): Promise<BookingItem | null> => {
  const result = await prisma.bookingItem.findUnique({
    where: {
      id,
    },
    include: {
      reviewRatings: true,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book Doesn't Exists");
  }

  return result;
};

const updateBookingItem = async (
  id: string,
  data: Partial<BookingItem>
): Promise<BookingItem | null> => {
  const isExists = await prisma.bookingItem.findUnique({
    where: { id },
  });

  if (!isExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book Doesn't Exists");
  }

  const result = await prisma.bookingItem.update({
    where: {
      id,
    },
    data,
    include: {
      reviewRatings: true,
    },
  });

  return result;
};

const deleteBookingItem = async (id: string): Promise<BookingItem | null> => {
  const isExists = await prisma.bookingItem.findUnique({
    where: { id },
  });

  if (!isExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book Doesn't Exists");
  }

  const result = await prisma.bookingItem.delete({
    where: {
      id,
    },
    include: {
      reviewRatings: true,
    },
  });

  return result;
};

export const BookingItemService = {
  createBookingItem,
  getAllBookingItems,
  getBookingItemById,
  updateBookingItem,
  deleteBookingItem,
};
