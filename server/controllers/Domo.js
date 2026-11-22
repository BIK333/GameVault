const models = require('../models');
const Domo = models.Domo;

const makerPage = (req, res) => {
  if (!req.session || !req.session.account) {
    return res.redirect('/');
  }
  return res.render('app');
};

const makeDomo = async (req, res) => {
    if (!req.session || !req.session.account) {
      return res.status(401).json({
        error: 'You must be logged in to create a Domo.',
      });
    }
  
    if (!req.body.name || req.body.age === undefined
        || String(req.body.age).trim() === ''
        || req.body.level === undefined
        || String(req.body.level).trim() === '') {
      return res.status(400).json({
        error: 'Name, age, and level are required!',
      });
    }
  
    const age = Number(req.body.age);
    const level = Number(req.body.level);
  
    if (!Number.isInteger(age) || age < 0) {
      return res.status(400).json({
        error: 'Age must be a non-negative integer!',
      });
    }

    if (!Number.isInteger(level) || level < 1) {
      return res.status(400).json({
        error: 'Level must be a positive integer!',
      });
    }
  
    const domoData = {
      name: req.body.name,
      age,
      level,
      owner: req.session.account._id,
    };
  
    try {
      const newDomo = new Domo(domoData);
      await newDomo.save();
  
      return res.status(201).json({
        name: newDomo.name,
        age: newDomo.age,
        level: newDomo.level,
      });
    } catch (err) {
      console.log(err);
  
      if (err.name === 'ValidationError') {
        return res.status(400).json({
          error: 'Invalid Domo data!',
        });
      }
  
      return res.status(500).json({
        error: 'An error occurred making Domo!',
      });
    }
};

const getDomos = async (req, res) => {
  if (!req.session || !req.session.account) {
    return res.status(401).json({
      error: 'You must be logged in!',
    });
  }

  try {
    const query = {
      owner: req.session.account._id,
    };

    const docs = await Domo.find(query)
      .select('name age level')
      .lean()
      .exec();

    return res.json({
      domos: docs,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      error: 'Error retrieving domos!',
    });
  }
};

const deleteDomo = async (req, res) => {
  if (!req.session || !req.session.account) {
    return res.status(401).json({
      error: 'You must be logged in!',
    });
  }

  try {
    const deletedDomo = await Domo.findOneAndDelete({
      _id: req.body.id,
      owner: req.session.account._id,
    });

    if (!deletedDomo) {
      return res.status(404).json({
        error: 'Domo not found!',
      });
    }

    return res.json({
      message: 'Domo deleted!',
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      error: 'Error deleting Domo!',
    });
  }
};

module.exports = {
    makerPage,
    makeDomo,
    getDomos,
    deleteDomo,
};