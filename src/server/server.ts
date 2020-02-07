import express = require('express');
import path = require('path');


export default class Server {
    private static _instance: Server;
    app: express.Application;
    port = 3000;

    private constructor() {
        this.app = express();
    }

    public static get instance(): Server {
        return this._instance || (this._instance = new this);
    }

    private publicFolder() {
        const publicPath = path.resolve(__dirname, '../public');
        this.app.use(express.static(publicPath));
    }

    start(callback: () => void) {
        this.app.listen(this.port, callback);
        this.publicFolder();
    }
}