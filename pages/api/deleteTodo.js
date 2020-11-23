const { table, formatRecord } = require("../../utils/formatdb");

export default async (req, res) => {
  const { id } = req.body;

  try {
    const record = await table.destroy(id);

    res.statusCode = 200;
    res.json(formatRecord(record));
  } catch (err) {
    console.log(err);
    res.statusCode = 500;
    res.json({ msg: "Something went wrong" });
  }
};
