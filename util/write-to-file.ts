const fs = require("fs");
const path = require("path");

module.exports = (data: any) => {
  try {
    fs.writeFileSync(
      path.join(__dirname, "..", "data", "users.json"),
      JSON.stringify(data),
      "utf-8"
    );
  } catch (err) {
    console.log(err);
  }
};
