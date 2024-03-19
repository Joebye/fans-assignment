import { DataTypes } from "sequelize";
import { SequelizeDb } from "./Sequelize.mjs";


const sequelize = new SequelizeDb();

const User = sequelize.clientDb.define('User', {
    id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    },
    name: {
    type:  DataTypes.STRING,
    allowNull: false
    },
    email: {
    type: DataTypes.STRING,
    allowNull: false 
    },
    phone: {
    type: DataTypes.STRING,
    allowNull: false,
    },
        
}
)

export default User;
