import mysql = require('mysql');

export default class MySQL {
    private static _instance: MySQL;

    private _conn: mysql.Connection;

    private host = 'localhost';
    private user = 'node_user';
    private password = '123456';

    private database = 'node_db';

    private constructor() {
        this._conn = mysql.createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database
        });

        this.connectDB();
    }

    static get instance(): MySQL {
        return this._instance || (this._instance = new this);
    }

    static executeQuery(query: string, callback: Function) {
        this.instance._conn.query(query, (err, results: Object[], fields) => {
            if (err) {
                console.log('Error en query');
                return callback(err);
            }
            if (results.length === 0) {
                return callback('El registro solicitado no existe');
            }
            callback(null, results);
        });
    }

    private connectDB() {
        this._conn.connect((err: mysql.MysqlError) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log('MySQL DB online')
            }
        });
    }

    public get conn(): mysql.Connection {
        return this._conn;
    }

}