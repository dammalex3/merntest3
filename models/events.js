module.exports = function (sequelize, DataTypes) {
    var Events = sequelize.define("Events", {
        eventName: DataTypes.STRING,
        eventDate: DataTypes.STRING,
        eventMessage: DataTypes.STRING,
        eventType: DataTypes.STRING
    },
    {
        timestamps: true
    });

    Events.associate = function (models) {
        models.Events.belongsTo(models.Users, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        })
        models.Events.hasMany(models.Posts, {
                    onDelete: "Cascade"
                });
    }
    return Events;
};