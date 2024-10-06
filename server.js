const express = require('express');
const indexRouter = require("./routes");

const app = express();
const port = 8080 || process.env.PORT;


app.use("/", indexRouter);
app.use(express.json())


app.get('/', (req, res) => {
  res.send('Hello World!')

})
app.listen( port, () => {
  console.log(`Server running on port ${port}`);
})
