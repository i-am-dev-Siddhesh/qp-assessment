import express from 'express';
import { checkApiKey, checkToken, checkUserToken } from '../middlewares/auth';

import { getAllGroceryItems } from '../controllers/admin.controller';
import {
  bookGroceryItems,
  userLoginApi,
  userMeApi,
} from '../controllers/user.controller';
import { validate } from '../middlewares/validate';
import { loginSchema } from '../validations/auth';
import { bookGroceryItemValidation } from '../validations/user.validation';

const router = express.Router({ mergeParams: true });

router.route('/auth/me').get(checkApiKey, checkUserToken, userMeApi);
router
  .route('/auth/login')
  .post(checkApiKey, validate(loginSchema), userLoginApi);

router
  .route('/grocery')
  .post(
    checkApiKey,
    checkUserToken,
    validate(bookGroceryItemValidation),
    bookGroceryItems
  )
  .get(checkApiKey, checkUserToken, getAllGroceryItems);

export default router;
