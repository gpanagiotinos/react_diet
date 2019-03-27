export default (sequelize, DataTypes) => {
    return sequelize.define('role', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        role_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}