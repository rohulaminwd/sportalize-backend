import { BookingItem } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { BookFilterAbleFileds } from './bookingItem.constants';
import { BookingItemService } from './bookingItem.service';

const createBookingItem = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingItemService.createBookingItem(req.body);

  sendResponse<BookingItem>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book Created Successfully',
    data: result,
  });
});

const getAllBookingItems = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, BookFilterAbleFileds);
  const options = pick(req.query, paginationFields);

  const result = await BookingItemService.getAllBookingItems(filters, options);

  sendResponse<BookingItem[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Books Data Retrieved Successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getBookingItemById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookingItemService.getBookingItemById(id);

  sendResponse<BookingItem>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Book Data Fetched Successfully',
    data: result,
  });
});

const updateBookingItem = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const id = req.params.id;
  const result = await BookingItemService.updateBookingItem(id, data);

  sendResponse<BookingItem>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book Updated Successfully',
    data: result,
  });
});

const deleteBookingItem = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BookingItemService.deleteBookingItem(id);

  sendResponse<BookingItem>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book Deleted Successfully',
    data: result,
  });
});

export const BookingItemController = {
  createBookingItem,
  getAllBookingItems,
  getBookingItemById,
  updateBookingItem,
  deleteBookingItem,
};
