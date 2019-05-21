const express = require('express');
const actionDb = require('../data/helpers/actionModel');

const router = express.Router();

router.get('/', async(req, res) => {
    try {
        const actions = await actionDb.get();

        if (!actions || Object.keys(actions).length === 0) {
            res
                .status(400)
                .json({message: 'could not retrieve actions'});
        }

        res.json(actions);
    } catch (err) {
        res
            .status(500)
            .json(err);
    }
});

router.put('/:id', validateAction, async(req, res) => {
    try {
        const action = await actionDb.update(req.action.id, req.body);

        if (!action || Object.keys(action).length === 0) {
            res
                .status(400)
                .json({message: 'Unable to update action'});
        }
        res.json(action);
    } catch (err) {
        res
            .status(500)
            .json(err);
    }
});

router.delete('/:id', validateActionId, async(req, res) => {
    try {
        const deleteAction = await actionDb.remove(req.action.id);
        if (!deleteAction) {
            res
                .status(400)
                .json({message: 'Unable to delete that'});
        }
    } catch (err) {
        res
            .status(500)
            .json({err})
    }
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
};

module.exports = router;
