import { Scenes, Telegraf } from 'telegraf';
import { IConfigService } from './config/config.interface';
import { ConfigService } from './config/config.service';
import mongoose, { ConnectOptions } from 'mongoose';
import { TypesScenes } from './consts';
import greeterScene from './controllers/greetings';
import LocalSession from 'telegraf-session-local';

class Bot {
    bot: Telegraf<Scenes.SceneContext>;

    constructor(private readonly configService: IConfigService) {
        this.bot = new Telegraf<Scenes.SceneContext>(this.configService.get('TOKEN'));
        this.bot.use(
            new LocalSession({ database: 'sessions.json' }).middleware()
        );
        this.bot.use(
            new Scenes.Stage<Scenes.SceneContext>([greeterScene]).middleware()
        );
    }

    init() {
        this.bot.start(async (ctx) => {
            ctx.scene.enter(TypesScenes.Greeters);
        });

        this.bot.launch();
    }
}

mongoose.connect('mongodb://interactmap.su:27017', {
    dbName: 'apartsDB',
    user: 'root1337',
    pass: 'example1337',
    } as ConnectOptions,
).then((data) => {
    console.log('Бот подключен к БД!');
});

const config = new ConfigService();

mongoose.connection.on('open', () => {
    const bot = new Bot(config);
    bot.init();
});