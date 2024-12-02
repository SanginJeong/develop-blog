const express = require('express');
const porfolioController = require('../controllers/portfolio.controller');
const authController = require('../controllers/auth.controller');
const router = express.Router();

router.post('/', authController.authenticate,porfolioController.appendPortfolio);
router.get('/', porfolioController.getPortfolio);
router.put('/:portfolioId', authController.authenticate ,porfolioController.updatePortfolio);
router.delete('/:portfolioId', authController.authenticate ,porfolioController.deletePortfolio);

module.exports = router;