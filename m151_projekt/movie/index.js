import { Router } from 'express';
import {
  listAction,
  removeAction,
  formAction,
  saveAction,
  ratingAction
} from './controller.js';

const router = Router();

router.get('/', listAction);
router.get('/delete/:id', removeAction);
router.get('/form/:id?', formAction);
router.post('/save', saveAction);
router.get('/rating/:movieId/:rating', ratingAction)

export { router };