// controllers/dataController.js

const db = require("../model/db");

exports.getData = async (req, res) => {
  try {
    const pool = await db.poolPromise;
    const result = await pool
      .request()
      .query(
        " SELECT g.acid, SUM(g.totalmeter) as totalMeterSum, a.acname FROM GRY_Inward g INNER JOIN ac a ON g.acid = a.acid GROUP BY g.acid, a.acname"
      );
    console.log(result.recordset.length);
    res.status(200).send({
      status: "done",
      data: result,
    });
  } catch (err) {
    console.error("SQL error", err);
    res.status(500).send("Server Error");
  }
};
