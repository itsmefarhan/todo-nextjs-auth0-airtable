const { table, formatRecord } = require("../../formatdb");

export default async (req, res) => {
  const { id, fields } = req.body;

  try {
    const record = await table.update([{ id, fields }]);

    res.statusCode = 200;
    res.json(formatRecord(record[0]));
  } catch (err) {
    console.log(err);
    res.statusCode = 500;
    res.json({ msg: "Something went wrong" });
  }
};
