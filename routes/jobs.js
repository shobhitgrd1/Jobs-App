const {getAllJobs, getJob,createJobs,updateJob,deleteJobs} = require('../controllers/jobs')
const express = require('express')
const routes = express.Router();

routes.route('/').get(getAllJobs).post(createJobs)
routes.route('/:id').get(getJob).delete(deleteJobs).patch(updateJob)
module.exports = routes