import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ReviewService } from './wishlist.service';

const createWishlist = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.createWishlist(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review Created Successfully',
    data: result,
  });
});

const getWishlistFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.getWishlistFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Reviews Data Fetched Successfully',
    data: result,
  });
});

const getSingleWishlist = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ReviewService.getSinglWishlist(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Review Data Fetched Successfully',
    data: result,
  });
});

const updateWishlistDataToDB = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ReviewService.updatWishlistDataToDB(id, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Review Updated Successfully',
      data: result,
    });
  }
);

const deleteWishlistFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ReviewService.deletWishlistFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review Deleted Successfully',
    data: result,
  });
});

export const ReviewController = {
  createWishlist,
  getWishlistFromDB,
  getSingleWishlist,
  updateWishlistDataToDB,
  deleteWishlistFromDB,
};
