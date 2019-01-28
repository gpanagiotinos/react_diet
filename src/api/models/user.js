module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        user_id: {
            type: DataTypes.UUID,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: {
                    args: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/i,
                    msg: 'This is not valid username'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}