// controllers/dataController.js

const db = require("../model/db");

exports.getData = async (req, res) => {
  try {
    const pool = await db.poolPromise;
    const query = `
      SELECT g.acid, SUM(g.totalmeter) as totalMeterSum, a.acname 
      FROM GRY_Inward g 
      INNER JOIN ac a ON g.acid = a.acid 
      GROUP BY g.acid, a.acname
    `;
    const result = await pool.request().query(query);

    // Calculate subtotal using Array.reduce method
    const subtotal = result.recordset.reduce((acc, record) => acc + record.totalMeterSum, 0);
    console.log(subtotal);

    res.status(200).json({
      status: "done",
      data: result.recordset,
      subtotal: subtotal // Optionally include subtotal in the response
    });
  } catch (err) {
    console.error("SQL error", err);
    res.status(500).send("Server Error");
  }
};
