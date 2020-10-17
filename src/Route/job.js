const express = require('express');
const Job = require('../Model/job')
const router = new express.Router();


// Get all Jobs
router.get("/", async (req, res) => {
  try {
    res.render('job/index');
  } catch (error) {
    res.status(400).send(error);
  }
});


// Create Job
router.get("/new/job", async (req, res) => {
  const job = new Job(req.body);

  try {
    res.render('job/create')
  } catch (error) {
    res.status(400).send(error);
  }
});

// Create Job
router.post("/new/job", async (req, res) => {

  console.log(req.body);

  try {
    const job = new Job({
      title: req.body.title,
      email: req.body.email,
      employer: req.body.employer,
      description: req.body.description,
      requirements: req.body.requirements
    });
    job.save();
    
    res.render('job/create', {
      message: "job created succesfully"
    })
  } catch (error) {
    res.render('job/create', {
      error
    })
  }
});

// Get single job
router.get("/job/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const job = await Job.findById(_id);
    res.render('job/show', job)
  } catch (e) {
    res.status(400).send(error);
  }
});


// update sigle job
router.patch("/job/:id", async (req, res) => {

const updates = Object.keys(req.body);
const allowedUpdates = ['title','description', 'requirments']
const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))

if(!isValidOperation){
  return res.status(404).send({
    error: "invalid update"
  })
}

  try {
    const job = await Job.findById(req.params.id);
    updates.forEach((update)=> job[update] = req.body[update] )
    await job.save()

    if (!job) {
      return res.status(404).send();
    }

    res.status(201).send(job);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router