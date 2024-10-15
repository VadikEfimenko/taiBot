import { Markup, Scenes } from 'telegraf';
import Condo from '../../db/models/condo';

const greeterScene = new Scenes.BaseScene<Scenes.SceneContext>("greeterScene");

greeterScene.enter(async (ctx) => {
    await ctx.reply('Приветствую, в этом боте вы можете найти себе жилье в Тайланде', Markup.inlineKeyboard([
        Markup.button.callback('Найди мне кондо', 'start_second_message'),
    ]));
});

greeterScene.action('start_second_message', async (ctx) => {
    // @ts-ignore
    const condos = await Condo.find({}).limit(5);

    ctx.reply(`Все, что нашел ${condos}`);
});

export default greeterScene;