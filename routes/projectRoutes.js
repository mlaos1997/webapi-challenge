const express = require('express');
const actionDB = require('../data/helpers/projectModel');
const projectDb = require('../data/helpers/projectModel');

const router = express.Router();

router.get('/', async(req, res) => {

});

// middleware
async function validateActionId(req, res, next) {
    const {id} = req.params;
    try {
        const getId = await actionDB.get(id);
        if (!getId || Object.keys(action).length === 0) {
            res
                .status(400)
                .json({message: 'could not get ID'})
        }
        req.action = action;
    } catch (err) {
        res
            .status(500)
            .json({err});
    };
    next();
};

async function validateAction(req, res, next) {
    const {project_id, description, notes} = req.body;

    if (!project_id || !description || !notes) {
        res
            .status(400)
            .json({message: 'Please provide project ID, description, or notes'})
    };

    const project = await projectDb(project_id);

    if (!project || Object.keys(project).length === 0) {
        res
            .status(400)
            .json({message: 'could not retrieve project from database'});
    }

    req.action = req.body;
    next();
}

module.exports = router;