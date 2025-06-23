const express = require('express');
const allRoutes = require('./routes/index');
const { ServerConfig, ExpressRateLimit } = require('./config/index');
const PORT = ServerConfig.PORT;
const cors = require('cors');
const helmet = require('helmet');

async function init(){


    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(helmet());
    app.use(ExpressRateLimit.limiter);
    app.use('/v1', allRoutes);


    app.listen(PORT, () => {
        console.log(`App is Listening on PORT:${PORT}`);
    })

}

init();