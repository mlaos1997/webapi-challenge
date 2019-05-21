const express = require('express');
const projectDb = require('../data/helpers/projectModel');

const router = express.Router();

router.get('/', async(req, res) => {
    const projects = await projectDb.get();
    res.json(projects);
});

router.get('/:id', validateProjectId, (req, res) => {
    res.json(req.project);
});

router.get('/:id/actions', validateProjectId, async(req, res) => {
    res.json(req.project.actions);
});

router.post('/', validateProjectBody, async(req, res) => {
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

router.put('/:id', validateProjectId, async(req, res) => {
    try {
        const project = await projectDb.update(req.project.id, req.body);
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

router.delete('/:id', validateProjectId, async(req, res) => {
    try {
        const deleteProject = await projectDb.remove(req.project.id);
        if (!deleteProject) {
            res
                .status(400)
                .json({message: 'could not delete the project'})
        }
        res
            .status(200)
            .json(result);
    } catch (err) {
        res
            .status(500)
            .json({err});
    }
})

// middleware
async function validateProjectId(req, res, next) {
    const {id} = req.params;

    try {
        const project = await projectDb.get(id);

        if (!project || Object.keys(project).length === 0) {
            res
                .status(400)
                .json({err});
        }
        req.project = project;
    } catch (err) {
        res
            .status(500)
            .json({err});
    }
    next();
};

async function validateProjectBody(req, res, next) {
    const {name, description} = req.body;

    if (!name || !description) {
        res
            .status(400)
            .json({message: 'please provide name and description'});
    }
    req.project = {
        name,
        description
    };
    next();
};

module.exports = router;