export default (sequelize, DataTypes) => {
  return sequelize.define('nutrition', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nutrition_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nutrition_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })
}