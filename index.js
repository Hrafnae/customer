const express = require('express');
const bodyParser = require('body-parser');
const query = require('./db/customers');
const auth = require('./services/authenticate');

const app = express();
app.use(bodyParser.json());

const port = 3000;

process.env.SECRET_KEY = "5b1a3923cc1e1e19523fd5c3f20b409509d3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84d";

app.get("/api/customers", query.getAllCustomers);
app.get("/api/customers/:id", query.getCustomerById);
app.post("/api/customers", query.addCustomer);
app.delete("/api/customers/:id", query.deleteCustomer);
app.put("/api/customers/:id", query.updateCustomer);
app.put("/api/customers/:id", auth.authenticate, query.updateCustomer);
app.post("/login", auth.login);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${port}.`);
});

// Include helmet
const helmet = require('helmet');
app.use(helmet());

module.exports = app;