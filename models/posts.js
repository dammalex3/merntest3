module.exports = function (sequelize, DataTypes) {
    var Posts = sequelize.define("Posts", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
          },
        message: DataTypes.STRING,
        message_from: DataTypes.STRING,
        picture_url: DataTypes.STRING
    },
    {
        // This is just here to make testing easier, the real database will need to have the createdat and updated at fields if we want them
        timestamps: false
    });

    Posts.associate = function (models) {
        models.Posts.belongsTo(models.Events, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        })
    }
    return Posts;
};