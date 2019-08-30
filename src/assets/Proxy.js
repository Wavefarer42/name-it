const cors = require("cors-anywhere");
const host = "localhost";
const port = 57412;
let isRunning = false;

export default {
    async start() {
        if (!isRunning) {
            await cors.createServer().listen(port, host);
            isRunning = true;
            console.log(`Running CORS proxy on ${host}:${port}`)
        }
    }
}
