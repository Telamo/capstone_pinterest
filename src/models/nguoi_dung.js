const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return nguoi_dung.init(sequelize, DataTypes);
}

class nguoi_dung extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    nguoi_dung_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ho_ten: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    mat_khau: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    tuoi: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    anh_dai_dien: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'nguoi_dung',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nguoi_dung_id" },
        ]
      },
    ]
  });
  }
}
