const startMarkup = require("../markup/start");
const ManageAd = (ctx) => {
  ctx.reply("شما آگهی تا به حال ثبت نکرده اید!", startMarkup);
};

module.exports = ManageAd;
