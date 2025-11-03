const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

// Mock placements database
let placements = require('../../src/data/mockData').placements || [];

// @route   GET /api/placements
// @desc    Get all placements
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { branch, year, company } = req.query;
    
    let filteredPlacements = [...placements];
    
    if (branch) {
      filteredPlacements = filteredPlacements.filter(p => p.branch === branch);
    }
    
    if (year) {
      filteredPlacements = filteredPlacements.filter(p => p.year === parseInt(year));
    }
    
    if (company) {
      filteredPlacements = filteredPlacements.filter(p => 
        p.company.toLowerCase().includes(company.toLowerCase())
      );
    }

    res.json({
      success: true,
      count: filteredPlacements.length,
      placements: filteredPlacements
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/placements/stats
// @desc    Get placement statistics
// @access  Public
router.get('/stats', async (req, res) => {
  try {
    const { year } = req.query;
    
    let filteredPlacements = year 
      ? placements.filter(p => p.year === parseInt(year))
      : placements;

    const stats = {
      totalPlacements: filteredPlacements.length,
      companiesVisited: [...new Set(filteredPlacements.map(p => p.company))].length,
      averagePackage: filteredPlacements.reduce((sum, p) => sum + p.package, 0) / filteredPlacements.length || 0,
      highestPackage: Math.max(...filteredPlacements.map(p => p.package), 0),
      lowestPackage: Math.min(...filteredPlacements.map(p => p.package), 0),
      byBranch: {
        CSE: filteredPlacements.filter(p => p.branch === 'CSE').length,
        IT: filteredPlacements.filter(p => p.branch === 'IT').length,
        ECE: filteredPlacements.filter(p => p.branch === 'ECE').length
      }
    };

    res.json({
      success: true,
      stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/placements/:id
// @desc    Get placement by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const placement = placements.find(p => p._id === req.params.id);
    
    if (!placement) {
      return res.status(404).json({
        success: false,
        message: 'Placement not found'
      });
    }

    res.json({
      success: true,
      placement
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   POST /api/placements
// @desc    Add new placement record
// @access  Private/Teacher
router.post('/', protect, authorize('teacher', 'admin'), async (req, res) => {
  try {
    const { studentName, company, package: pkg, role, branch, year, selectionProcess } = req.body;

    const newPlacement = {
      _id: `placement${Date.now()}`,
      studentName,
      company,
      package: pkg,
      role,
      branch,
      year,
      selectionProcess: selectionProcess || [],
      placedDate: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    placements.push(newPlacement);

    res.status(201).json({
      success: true,
      message: 'Placement record added successfully',
      placement: newPlacement
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   PUT /api/placements/:id
// @desc    Update placement record
// @access  Private/Teacher
router.put('/:id', protect, authorize('teacher', 'admin'), async (req, res) => {
  try {
    const placementIndex = placements.findIndex(p => p._id === req.params.id);
    
    if (placementIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Placement not found'
      });
    }

    placements[placementIndex] = {
      ...placements[placementIndex],
      ...req.body,
      updatedAt: new Date().toISOString()
    };

    res.json({
      success: true,
      message: 'Placement record updated successfully',
      placement: placements[placementIndex]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   DELETE /api/placements/:id
// @desc    Delete placement record
// @access  Private/Teacher
router.delete('/:id', protect, authorize('teacher', 'admin'), async (req, res) => {
  try {
    const placementIndex = placements.findIndex(p => p._id === req.params.id);
    
    if (placementIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Placement not found'
      });
    }

    placements.splice(placementIndex, 1);

    res.json({
      success: true,
      message: 'Placement record deleted successfully'
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
