import { Router } from 'express';
import contactRouter from './contacts.js';
import authRoter from './auth.js';

const router = Router();

router.use('/contacts', contactRouter);
router.use('/auth', authRoter);

export default router;
