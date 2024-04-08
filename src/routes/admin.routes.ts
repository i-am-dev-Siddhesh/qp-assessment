import express from 'express';
import { checkAdminToken, checkApiKey } from '../middlewares/auth';

import {
  addGroceryItem,
  adminLoginApi,
  adminMeApi,
  deleteGroceryItem,
  getAllGroceryItems,
  getGroceryItemById,
  updateGroceryItem,
} from '../controllers/admin.controller';
import { checkServerHealth } from '../controllers/general.controller';
import { validate } from '../middlewares/validate';
import {
  addGroceryItemValidation,
  updateGroceryItemValidation,
} from '../validations/admin.validation';
import { loginSchema } from '../validations/auth';

const router = express.Router({ mergeParams: true });

router.route('/').get(checkApiKey, checkServerHealth);
router.route('/auth/me').get(checkApiKey, checkAdminToken, adminMeApi);
router
  .route('/auth/login')
  .post(checkApiKey, validate(loginSchema), adminLoginApi);
  

router
  .route('/grocery')
  .post(
    checkApiKey,
    checkAdminToken,
    validate(addGroceryItemValidation),
    addGroceryItem
  )
  .get(checkApiKey, checkAdminToken, getAllGroceryItems);

router
  .route('/grocery/:id')
  .get(checkApiKey, checkAdminToken, getGroceryItemById)
  .put(
    checkApiKey,
    checkAdminToken,
    validate(updateGroceryItemValidation),
    updateGroceryItem
  )
  .delete(
    checkApiKey,
    checkAdminToken,
    deleteGroceryItem
  );

export default router;
