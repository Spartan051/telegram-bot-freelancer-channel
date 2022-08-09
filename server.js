const { Telegraf, Scenes, session } = require("telegraf");
const Roles = require("./src/commands/roles");
const Start = require("./src/commands/start");
const ManageAd = require("./src/commands/manageAd");
const NewAd = require("./src/commands/newad");
const token = "5525807756:AAEV2JqUpaFLK1wGrJhnHTWLLuf6Dy_Ug7E";
const { backToMenu } = require("./src/markup/backToMeno");
const { acceptRules } = require("./src/markup/acceptRules");
const TextRoles = require("./src/messages/roles");

const bot = new Telegraf(token);
const stage = new Scenes.Stage([NewAd]);
bot.use(session());
bot.use(stage.middleware());

bot.start((ctx) => {
  Start(ctx);
});

bot.hears("مدیریت آگهی ها", (ctx) => {
  ManageAd(ctx);
});

bot.hears("ثبت آگهی جدید", (ctx) => {
  ctx.reply(TextRoles(), {
    reply_markup: {
      inline_keyboard: [backToMenu, acceptRules],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  });
  // ctx.scene.enter("1");
});

bot.hears("بازگشت به منو", (ctx) => {
  Start(ctx);
});

bot.action("backToMenu", (ctx) => {
  ctx.reply("بازگشت به منو");
  Start(ctx);
});

bot.action("acceptRules", async (ctx) => {
  await ctx.editMessageReplyMarkup({
    reply_markup: { remove_keyboard: true },
  });
  await ctx.editMessageText(TextRoles() + "\n\n✅قوانین توسط شما پذیرفته شد.");
  ctx.scene.enter("1");
});

bot.action("pay", (ctx) => {
  ctx.reply("درگاه پرداخت");
});

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
