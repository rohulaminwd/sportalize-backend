import { z } from 'zod';

const create = z.object({
  body: z.object({
    name: z.string({
      required_error: 'name is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
    profileImage: z.string({
      required_error: 'Profile image is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    contactNo: z.string({
      required_error: 'Contact no is required',
    }),
    role: z.string({
      required_error: 'role is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    name: z.string().optional(),
    profileImage: z.string().optional(),
    email: z.string().optional(),
    contactNo: z.string().optional(),
    role: z.string().optional(),
    password: z.string().optional(),
  }),
});

export const UserValidation = {
  create,
  update,
};
