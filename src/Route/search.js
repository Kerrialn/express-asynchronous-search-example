const express = require('express');
const Job = require('../Model/job')
const router = new express.Router();

router.post("/search", async (req, res) => {

  const title = req.body.keyword;

  try {

    const jobs = await Job.find({"title": new RegExp(title)});
    res.status(200).send({jobs})
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router