const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// Mock projects database (in real app, use MongoDB model)
let projects = require('../../src/data/mockData').projects || [];

// @route   GET /api/projects
// @desc    Get all projects
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, status } = req.query;
    
    let filteredProjects = [...projects];
    
    if (category) {
      filteredProjects = filteredProjects.filter(p => p.category === category);
    }
    
    if (status) {
      filteredProjects = filteredProjects.filter(p => p.status === status);
    }

    res.json({
      success: true,
      count: filteredProjects.length,
      projects: filteredProjects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/projects/:id
// @desc    Get project by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const project = projects.find(p => p._id === req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   POST /api/projects
// @desc    Create new project
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { title, description, category, requiredSkills, teamSize } = req.body;

    const newProject = {
      _id: `proj${Date.now()}`,
      title,
      description,
      category,
      requiredSkills: requiredSkills || [],
      teamSize: teamSize || 5,
      members: [req.user.id],
      creatorId: req.user.id,
      status: 'Looking for members',
      createdAt: new Date().toISOString()
    };

    projects.push(newProject);

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      project: newProject
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   PUT /api/projects/:id
// @desc    Update project
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const projectIndex = projects.findIndex(p => p._id === req.params.id);
    
    if (projectIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Check if user is creator
    if (projects[projectIndex].creatorId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this project'
      });
    }

    projects[projectIndex] = {
      ...projects[projectIndex],
      ...req.body,
      updatedAt: new Date().toISOString()
    };

    res.json({
      success: true,
      message: 'Project updated successfully',
      project: projects[projectIndex]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   POST /api/projects/:id/join
// @desc    Join project
// @access  Private
router.post('/:id/join', protect, async (req, res) => {
  try {
    const project = projects.find(p => p._id === req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    if (project.members.includes(req.user.id)) {
      return res.status(400).json({
        success: false,
        message: 'Already a member of this project'
      });
    }

    if (project.members.length >= project.teamSize) {
      return res.status(400).json({
        success: false,
        message: 'Project team is full'
      });
    }

    project.members.push(req.user.id);

    res.json({
      success: true,
      message: 'Joined project successfully',
      project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   DELETE /api/projects/:id
// @desc    Delete project
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const projectIndex = projects.findIndex(p => p._id === req.params.id);
    
    if (projectIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Check if user is creator
    if (projects[projectIndex].creatorId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this project'
      });
    }

    projects.splice(projectIndex, 1);

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;
