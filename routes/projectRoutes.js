const express = require('express');
const projectDb = require('../data/helpers/projectModel');

const router = express.Router();

router.get('/', async(req, res) => {
    const projects = await projectDb.get();
    res.json(projects);
});

router.get('/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const project = await projectDb.get(id);
        if (!project) {
            res
                .status(404)
                .json({message: 'Could not find project with ID in database'});
        }
        res
            .status(200)
            .json(project);
    } catch (err) {
        res
            .status(500)
            .json({err})
    }
});

router.get('/:id/actions', async(req, res) => {
    res.json(req.project.actions);
});

router.post('/', async(req, res) => {
    try {
        const project = await projectDb.insert(req.project);
        res
            .status(200)
            .json(project);
    } catch (err) {
        res
            .status(500)
            .json({err});
    }
});

router.put('/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const project = await projectDb.update(id, req.body);
        if (!project || Object.keys(project).length === 0) {
            res
                .status(400)
                .json({message: 'cannot update'});
        }
        res
            .status(200)
            .json(project);
    } catch (err) {
        res
            .status(500)
            .json({err});
    }
});

router.delete('/:id', async(req, res) => {
    const { id } = req.params;

    try {
        const deleteProject = await projectDb.remove(id);
        if (!deleteProject) {
            res
                .status(400)
                .json({message: 'could not delete the project'})
        }
        res
            .status(200)
            .json({ message: 'project removed from database' });
    } catch (err) {
        res
            .status(500)
            .json({err});
    }
});

module.exports = router;