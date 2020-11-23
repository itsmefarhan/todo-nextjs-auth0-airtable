const { table, formatRecords } = require("../../formatdb");

export default async (req, res) => {
  const { title } = req.body;

  try {
    const record = await table.create([{ fields: { title } }]);
    const getRecord = {
      id: record[0].id,
      fields: record[0].fields,
    };

    res.statusCode = 200;
    res.json(getRecord);
  } catch (err) {
    console.log(err);
    res.statusCode = 500;
    res.json({ msg: "Something went wrong" });
  }
};
