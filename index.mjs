import express from 'express';
import cors from 'cors';
import config from 'config';
import User from './domain/ModelConnection.mjs'
import {faker} from '@faker-js/faker';
import {users} from './routes/users.mjs'
import bodyParser from 'body-parser';
import auth from './middleware/auth.mjs'
import { SequelizeDb } from './domain/Sequelize.mjs';


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(auth);
const port = config.get('server.port');
const server = app.listen(port);
server.on('listening', ()=> console.log(`server is listening on port: ${port}`));

app.use('', users);

connection();


async function connection() {
    const sequelize = new SequelizeDb();
try {
    await sequelize.clientDb.authenticate();
    console.log('Connection has been established successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
    User.sync();
    console.log('the table was synchronized');
    const usersAll = await User.findAll();
    if (usersAll.length == 0) {
    fillTable(config.get('rowCount.count'));
    } else {
    console.log('data in the db already exists: ', usersAll.map(user => {
        return {
            name: user.name,
            email: user.email,
            phone: user.phone
        }
    }
))
}

}
  

  async function fillTable(rowCount) {

    for (let i=0; i<rowCount; i++) {
        const fullName = faker.person.fullName();
        const [firstName, lastName] = fullName.split(' ');
        const row = {
            id: faker.string.uuid(),
            name: fullName,
            email: `${firstName.toLowerCase()}${lastName.toLowerCase()}@example.com`,
            phone: faker.helpers.fromRegExp(/0[0-9]{2}-[0-9]{3}-[0-9]{2}-[0-9]{2}/),
        }
        await User.create(row);
      
    }
  }