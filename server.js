const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

require("./routes/routes")(app);

app.listen(PORT, () => {
  console.log(`App listening at port http://localhost:${PORT}`);
});
