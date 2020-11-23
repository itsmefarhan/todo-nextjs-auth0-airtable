const { table, formatRecords } = require("../../formatdb");

export default async (req, res) => {
  try {
    const records = await table.select({}).firstPage();
    const getRecords = formatRecords(records);

    res.statusCode = 200;
    res.json(getRecords);
  } catch (err) {
    console.log(err);
    res.statusCode = 500;
    res.json({ msg: "Something went wrong" });
  }
};
