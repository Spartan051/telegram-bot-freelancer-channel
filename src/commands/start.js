const startMarkup = require("../markup/start");
const Start = (ctx) => {
  ctx.reply("startMessage", startMarkup);
};

module.exports = Start;
