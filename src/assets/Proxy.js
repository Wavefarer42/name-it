const host = "0.0.0.0";
const port = 57412;
let isRunning = false;

export default {
    async start() {
        if (!isRunning) {
            const cors = require("cors-anywhere");

            await cors.createServer().listen(port, host);
            isRunning = true;
        }
        return {host: host, port: port}
    }
}
