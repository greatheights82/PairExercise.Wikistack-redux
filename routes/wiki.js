const express = require('express');
const {
  addPage,
  editPage,
  main,
  userList,
  userPages,
  wikiPage,
} = require('../views');
const { Page } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const pages = await Page.findAll();
    res.send(main(pages));
  } catch (err) {
    next(err);
  }
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug,
      },
    });

    const author = await page.author;
    res.send(wikiPage(page, author));
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const page = await Page.create(req.body, {
      returning: true,
      plain: true,
    });

    console.log(page.dataValues);
    res.redirect(`/wiki/${page.slug}`);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
