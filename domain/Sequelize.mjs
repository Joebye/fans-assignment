import { Sequelize } from "sequelize";
import config from 'config';

const collection = config.get('seqDb.collection');
const userName = config.get('seqDb.username');
const password = config.get('seqDb.password');
const host = config.get('seqDb.host');
const dialect = config.get('seqDb.dialect');



export class SequelizeDb {
    clientDb;
    constructor() {
        this.clientDb = new Sequelize(collection, userName, password, {
            host: host,
            dialect: dialect,

        })
    }
}