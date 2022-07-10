"use strict";
// @ts-ignore
const { app, logger } = require("./app");
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    logger.log({ level: 'info', message: 'Server is running on port ' + PORT });
});
