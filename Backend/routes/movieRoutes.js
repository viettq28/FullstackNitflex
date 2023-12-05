const express = require('express');
const path = require('path');
const movieCtrl = require(path.join(__dirname, '..', 'controllers', 'movieCtrl'));

const router = express.Router();

router.route('/discover/:genre?/:page?').get(movieCtrl.getMoviesByGenre);

router.route('/video').post(movieCtrl.getVideoByMovieId);

router.route('/search').post(movieCtrl.getMoviesBySearch);

router.route('/:sort').get(movieCtrl.getMoviesByType);

module.exports = router;
