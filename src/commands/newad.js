const { Scenes } = require("telegraf");
const { pay } = require("../markup/pay");
const { backToMenu } = require("../markup/backToMeno");
const NewAd = new Scenes.WizardScene(
  "1",

  (ctx) => {
    ctx.reply(
      "خب حالا ابتدا متن آگهیت رو برام بفرست  \n\n مثال : به یک نفر مسلط به نرم افزار متلب برای کمک در انجام پروژه (تمرین) نیازمندم"
    );
    ctx.wizard.state.data = {};

    return ctx.wizard.next();
  },
  (ctx) => {
    ctx.wizard.state.data.project = ctx.update.message.text;

    ctx.reply(
      "خب حالا لطفا آیدی  که میخای برای آگهیت درج بشه رو بفرست \nمثال: \n@project_board"
    );

    return ctx.wizard.next();
  },
  async (ctx) => {
    ctx.wizard.state.data.id = ctx.update.message.text;

    await ctx.reply(
      "درحال تولید آگهی در حساب شما لطفا کمی صبر کنید... \n🚫🚫در صورتی که آگهی تون قوانین ذکر شده رو رعایت نکرده باشه آگهی از کانال پاک میشه و هیچ مسولیتی در قبال وجه پرداختی شما نیست"
    );

    ctx.reply(
      `آگهی شما با موفقیت ایجاد شد. \nشماره یکتا آگهی: 224022 \nمتن نمایشی آگهی: \n\n${ctx.wizard.state.data.project}\n${ctx.wizard.state.data.id} \n📌 قیمت توافقی \n- - - - - - - - - - - - - - \n@project_board \nآگهی  پس از پرداخت شما و تایید ادمین به صورت آنی در کانال منتشر می شود. \n😇 \nپرداخت بانکی مبلغ 10 هزار تومان میباشد.\n⚠️برای کند نبودن روند پرداخت بانکی لطفا VPN  خود را خاموش کنید\n‼️توجه حتما بعد از پرداخت بانکی گزینه "تکمیل فرایند" را کلیک کنید تا فرایند\nخرید شما ثبت شود`,
      {
        reply_markup: {
          inline_keyboard: [backToMenu],
          resize_keyboard: true,
          one_time_keyboard: true,
        },
      }
    );
    ctx.wizard.state.data = {};
    return ctx.scene.leave();
    // return ctx.wizard.next();
  }
);

module.exports = NewAd;
