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

router.get('/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const action = await actionDb.get(id);
        if (!action) {
            res
                .status(404)
                .json({message: 'No action with ID found'})
        }
        res
            .status(200)
            .json(action);
    } catch (err) {
        res
            .status(500)
            .json({err});
    }
});

router.put('/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const action = await actionDb.update(id, req.body);

        if (!action || Object.keys(action).length === 0) {
            res
                .status(400)
                .json({message: 'Unable to update action'});
        }
        res
            .status(200)
            .json(action);
    } catch (err) {
        res
            .status(500)
            .json(err);
    }
});

router.delete('/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const deleteAction = await actionDb.remove(id);
        if (!deleteAction) {
            res
                .status(400)
                .json({message: 'Unable to delete that'});
        }
        res
            .status(201)
            .json({message: 'action removed from database'});
    } catch (err) {
        res
            .status(500)
            .json({err})
    }
});

module.exports = router;
