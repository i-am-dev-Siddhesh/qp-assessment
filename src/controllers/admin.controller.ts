import argon2 from 'argon2';
import { prisma } from '../clients/prisma';
import { EMAIL_PASSWORD_INVALID } from '../constants/messages';
import { createJWTToken } from '../utils/auth';
import { generalError, generalErrorStatusCode } from '../utils/errorResponse';

// @desc    GET Admin
// @route   GET /v1/auth/admin/me
// @access  Protected
export const adminMeApi = async (req: any, res: any) => {
  try {
    if (req.admin && req.admin.password) {
      // @ts-ignore
      delete req.admin.password;
    }
    return res.status(200).json({ status: true, data: req.admin });
  } catch (error: any) {
    return res.status(generalErrorStatusCode(error)).json(generalError(error));
  }
};

// @desc    login admin
// @route   POST /v1/auth/admin/login
// @access  Public
export const adminLoginApi = async (req: Request, res: any) => {
  try {
    const { email, password }: any = req.body;
    let admin: any = await prisma.admin.findUnique({
      where: {
        email,
      },
    });
    if (!admin) {
      throw {
        message: EMAIL_PASSWORD_INVALID,
      };
    }

    const isValid = await argon2.verify(admin?.password!, password);

    if (!isValid) {
      throw {
        status_code: 404,
        message: EMAIL_PASSWORD_INVALID,
      };
    }

    const token = createJWTToken(
      {
        id: admin.id,
        email: admin?.email,
      },
      'admin'
    );

    res.cookie('val', token, {
      maxAge: 3600000,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      domain: process.env.DOMAIN,
    });

    delete admin.password;
    return res.status(200).json({ status: true, data: admin });
  } catch (error: any) {
    return res.status(generalErrorStatusCode(error)).json(generalError(error));
  }
};

// @desc    Add grocery item
// @route   Post /v1/admin/grocery/add
// @access  Protected
export const addGroceryItem = async (req: any, res: any) => {
  try {
    const { name, price, inventory }: any = req.body;
    const addedBy = Number(req.admin.id);
    const newItem = await prisma.groceryItem.create({
      data: {
        name,
        price,
        inventory,
        addedBy,
      },
    });
    return res.status(201).json(newItem);
  } catch (error: any) {
    return res.status(generalErrorStatusCode(error)).json(generalError(error));
  }
};

// @desc    Get all grocery items
// @route   GET /v1/admin/grocery
// @access  Protected
export const getAllGroceryItems = async (_req: any, res: any) => {
  try {
    const groceryItems = await prisma.groceryItem.findMany();
    return res.status(200).json(groceryItems);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// @desc    Get a single grocery item by ID
// @route   GET /v1/admin/grocery/:id
// @access  Protected
export const getGroceryItemById = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const groceryItem = await prisma.groceryItem.findUnique({
      where: { id: parseInt(id) },
    });
    if (!groceryItem) {
      return res.status(404).json({ error: 'Grocery item not found' });
    }
    return res.status(200).json(groceryItem);
  } catch (error: any) {
    return res.status(generalErrorStatusCode(error)).json(generalError(error));
  }
};

// @desc    Update a grocery item
// @route   PUT /v1/admin/grocery/:id
// @access  Protected
export const updateGroceryItem = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { name, price, inventory }: any = req.body;
    const updatedItem = await prisma.groceryItem.update({
      where: { id: parseInt(id) },
      data: { name, price, inventory },
    });
    return res.status(200).json(updatedItem);
  } catch (error: any) {
    return res.status(generalErrorStatusCode(error)).json(generalError(error));
  }
};

// @desc    Delete a grocery item
// @route   DELETE /v1/admin/grocery/:id
// @access  Protected
export const deleteGroceryItem = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    await prisma.groceryItem.delete({
      where: { id: parseInt(id) },
    });
    return res
      .status(200)
      .json({ message: 'Grocery item deleted successfully' });
  } catch (error: any) {
    return res.status(generalErrorStatusCode(error)).json(generalError(error));
  }
};
