import * as reviewController from './api/review.controller.js';
import * as reviewService from './core/review.service.js';
import * as reviewRepository from './data/review.repository.js';
import reviewRoutes from './api/review.routes.js';

export default {
  basePath: '/reviews',
  router: reviewRoutes,
  controller: reviewController,
  service: reviewService,
  repository: reviewRepository,
};
