const TelegramBot = require('node-telegram-bot-api')
const token = '6302016552:AAHjCBScZoExOQ-53r7G6MggtXCi7EueGAc'

const bot = new TelegramBot(token, { polling: true });

const botStart = () => {
    bot.on("message", async msg => {
        const chatId = msg.chat.id;
        const text = msg.text;

        if (text === '/start') {
            await bot.sendMessage(
                chatId, 'CyberXoja platformasiga xush kelibsiz. '
            )
        }
    })
}

botStart();