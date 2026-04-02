import express from 'express';
import { generate } from '../controllers/readmeController';

const router = express.Router();

router.post('/generate', generate)
router.get('/generate', generate); 
export default router;
