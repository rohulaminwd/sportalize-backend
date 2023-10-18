import { Bookings } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const createOrder = async (payload: Bookings): Promise<Bookings> => {
  const result = await prisma.bookings.create({
    data: payload,
  });
  return result;
};

const getAllOrders = async (): Promise<Bookings[]> => {
  const result = await prisma.bookings.findMany({
    include: {
      user: true,
      bookingItem: true,
    },
  });
  return result;
};

const getSingleOrder = async (orderId: string): Promise<Bookings> => {
  const result = await prisma.bookings.findUnique({
    where: {
      id: orderId,
    },
    include: {
      user: true,
      bookingItem: true,
    },
  });

  if (!result) throw new ApiError(httpStatus.NOT_FOUND, 'Order not found!');

  return result;
};

const deleteOrder = async (id: string): Promise<Bookings> => {
  const result = await prisma.bookings.delete({
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

export const OrderService = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  deleteOrder,
};
