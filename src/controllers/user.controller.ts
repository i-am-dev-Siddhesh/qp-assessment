import argon2 from 'argon2';
import { prisma } from '../clients/prisma';
import { EMAIL_PASSWORD_INVALID } from '../constants/messages';
import { createJWTToken } from '../utils/auth';
import { generalError, generalErrorStatusCode } from '../utils/errorResponse';

// @desc    GET User
// @route   GET /v1/auth/user/me
// @access  Protected
export const userMeApi = async (req: any, res: any) => {
  try {
    if (req.user && req.user.password) {
      // @ts-ignore
      delete req.user.password;
    }
    return res.status(200).json({ status: true, data: req.user });
  } catch (error: any) {
    return res.status(generalErrorStatusCode(error)).json(generalError(error));
  }
};

// @desc    Login user
// @route   POST /v1/auth/user/login
// @access  Public
export const userLoginApi = async (req: Request, res: any) => {
  try {
    const { email, password }: any = req.body;
    let user: any = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw {
        message: EMAIL_PASSWORD_INVALID,
      };
    }

    const isValid = await argon2.verify(user?.password!, password);

    if (!isValid) {
      throw {
        status_code: 404,
        message: EMAIL_PASSWORD_INVALID,
      };
    }

    const token = createJWTToken(
      {
        id: user.id,
        email: user?.email,
      },
      'user'
    );

    res.cookie('val', token, {
      maxAge: 3600000,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      domain: process.env.DOMAIN,
    });

    delete user.password;
    return res.status(200).json({ status: true, data: user });
  } catch (error: any) {
    return res.status(generalErrorStatusCode(error)).json(generalError(error));
  }
};

// @desc    Book grocery items
// @route   Post /v1/user/grocery/book
// @access  Protected
export const bookGroceryItems = async (req: any, res: any) => {
  try {
    const items = req.body;
    const userId = Number(req.user.id);

    const bookedItems = await Promise.all(
      items.map(async (item: any) => {
        const { groceryItemId, quantity } = item;
        return prisma.bookedItem.create({
          data: {
            quantity: quantity,
            bookedBy: userId,
            groceryItemId: groceryItemId,
          },
        });
      })
    );

    res.status(201).json(bookedItems);
    return;
  } catch (error: any) {
    return res.status(generalErrorStatusCode(error)).json(generalError(error));
  }
};

// @desc    Get all grocery items
// @route   GET /v1/user/grocery
// @access  Protected
export const getAllGroceryItems = async (_req: any, res: any) => {
  try {
    const groceryItems = await prisma.groceryItem.findMany();
    return res.status(200).json(groceryItems);
  } catch (error: any) {
    return res.status(generalErrorStatusCode(error)).json(generalError(error));
  }
};
