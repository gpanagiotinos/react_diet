import {Model, DataTypes} from 'sequelize'
export default class Food extends Model {
    static init(sequelize) {
        return super.init({
          id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
          ndbno: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false
          },
          sd: {
            type: DataTypes.STRING,
            allowNull: true
          },
          fg: {
            type: DataTypes.STRING,
            allowNull: true
          },
          sn: {
            type: DataTypes.STRING,
            allowNull: true
          },
          cn: {
            type: DataTypes.STRING,
            allowNull: true
          },
          nf: {
            type: DataTypes.STRING,
            allowNull: true
          },
          cf: {
            type: DataTypes.STRING,
            allowNull: true
          },
          ff: {
            type: DataTypes.STRING,
            allowNull: true
          },
          pf: {
            type: DataTypes.STRING,
            allowNull: true
          },
          r: {
            type: DataTypes.STRING,
            allowNull: true
          },
          rd: {
            type: DataTypes.STRING,
            allowNull: true
          },
          ds: {
            type: DataTypes.STRING,
            allowNull: false
          },
          manu: {
            type: DataTypes.STRING,
            allowNull: false
          },
          ru: {
            type: DataTypes.STRING,
            allowNull: false
          }
        }, {
            tableName: 'food',
            sequelize
        })
    }
}