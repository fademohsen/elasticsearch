const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const elasticClient = require('./config/elastic.config');
router.use((req, res, next) => {
    elasticClient.index({
        index: 'logs',
        body: {
            url: req.url,
            method: req.method,
        }
    }).then((resp) => {
        console.log(resp);
    }
    ).catch((err) => {
        console.log(err);
    }
    );
})
app.use(bodyParser.json());
require('./routes/product.routes')(app);
app.listen(8080, () => {
    console.log(`Server is running on port ${8080}`);
})

module.exports = elasticClient;