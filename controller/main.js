// controllers/dataController.js

const db = require('../model/db');

exports.getData = async (req, res) => {
  try {
    const pool = await db.poolPromise;
    const result = await pool.request().query('SELECT * FROM AcGrp'); 
    res.status(200).send({
        status:"done",
        data:result
    });
  } catch (err) {
    console.error('SQL error', err);
    res.status(500).send('Server Error');
  }
};
