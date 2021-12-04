const Job = require('../models/Job')



const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt')
        res.status(200).json({ jobs, count: jobs.length })

    } catch (error) {
        res.status(400).json({ msg: error })
    }
}

const getJob = async (req, res) => {
    try {
        const {
            user: { userId },
            params: { id: jobId },
          } = req

          const job = await Job.findOne({
            _id: jobId,
            createdBy: userId,
          })
          if (!job) {
            throw new NotFoundError(`No job with id ${jobId}`)
          }
          res.status(200).json({ job })
    } catch (error) {
        res.status(400).json({ msg: error })
    }

}
const createJobs = async (req, res) => {
    try {
        req.body.createdBy = req.user.userId
        const job = await Job.create(req.body)
        res.status(200).json({ job })
    } catch (error) {
        res.status(400).json({ msg: error })
    }
}
const updateJob = async (req, res) => {
    try {
        const {
            body: { company, position },
            user: { userId },
            params: { id: jobId },
        } = req

        if (company === '' || position === '') {
            res.status(400).send('Company or Position fields cannot be empty')
        }
        const job = await Job.findByIdAndUpdate(
            { _id: jobId, createdBy: userId },
            req.body,
            { new: true, runValidators: true }
        )
        if (!job) {
            res.status(400).send(`No job with id ${jobId}`)
        }
        res.status(200).json({ job, Update: "Update Scuccessfully" })

    } catch (error) {
        res.status(400).json({ msg: error })
    }

}
const deleteJobs = async (req, res) => {
    try {
        const {
            user: { userId },
            params: { id: jobId },
        } = req

        const job = await Job.findByIdAndRemove({
            _id: jobId,
            createdBy: userId,
        })
        if (!job) {
            throw new NotFoundError(`No job with id ${jobId}`)
        }
        res.status(200).send({Msg : "Job Deleted"})
    } catch (error) {
        res.status(400).json({ msg: error })
    }
}

module.exports = { getAllJobs, getJob, createJobs, updateJob, deleteJobs }