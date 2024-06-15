import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';

const createSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {},
);
const getAllSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {},
);
const getSingleSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {},
);
const updateSingleSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {},
);

export const SemesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSingleSemesterRegistration,
};
