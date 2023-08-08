const TelegramBot = require('node-telegram-bot-api')
const token = '6302016552:AAHjCBScZoExOQ-53r7G6MggtXCi7EueGAc'

const express = require('express');
const cors = require('cors')

const app = express();

app.use(express.json())
app.use(cors());

const bot = new TelegramBot(token, { polling: true });

const botStart = () => {

    bot.setMyCommands([
        { command: '/start', description: "Kurslar haqida ma'lumot" },
        { command: "/courses", description: "Barcha kurslar" }
    ])

    bot.on("message", async msg => {
        const chatId = msg.chat.id;
        const text = msg.text;

        if (text === '/start') {
            await bot.sendMessage(
                chatId, 'CyberXoja platformasiga xush kelibsiz. ',
                {
                    reply_markup: {
                        keyboard: [
                            [
                                {
                                    text: "Kurslarni ko'rish",
                                    web_app: {
                                        url: 'https://cyberxojastore.vercel.app/'
                                    }
                                }
                            ]
                        ]
                    }
                }
            )
        }

        if (text === '/courses') {
            await bot.sendMessage(
                chatId,
                'CyberXoja platformasida eng mukammal kurslarni sotib olishingiz mumkin',
                {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: "Kurslarni ko'rish",
                                    web_app: {
                                        url: "https://cyberxojastore.vercel.app/"
                                    }
                                }
                            ]
                        ]
                    }
                }
            )
        }


        if (msg.web_app_data?.data) {
            try {
                const data = JSON.parse(msg.web_app_data?.data);

                await bot.sendMessage(chatId, `Siz sotib olgan kurslar ro'yhati`)

                for (item of data) {
                    await bot.sendPhoto(chatId, item.Image)
                    await bot.sendMessage(
                        chatId,
                        `${item.title} - ${item.quantity}x`
                    )
                }

                await bot.sendMessage(
                    chatId,
                    `Umumiy narx - ${data
                        .reduce((a, c) => a + c.price * c.quantity, 0)
                        .toLocaleString('en-US', {
                            style: 'currency', currency: 'USD'
                        })}`
                );
            } catch (error) {
                console.log(error)
            }
        }
    })
}

botStart();

app.post('/web-data', async (req, res) => {
    const { queryId, products } = req.body;

    try {
        await bot.answerWebAppQuery(queryId, {
            type: 'article',
            id: queryId,
            title: 'Muvaffaqiyatli xarid qildingiz',
            input_message_content: {
                message_text: `Xaridingiz uchun rahmat, siz 
                ${products
                    .reduce((a, c) => a + c.price * c.quantity, 0)
                    .toLocaleString('en-US', { style: 'currency', currency: 'USD' })} 
                    qiymatga ega mahsulot sotib oldingiz, 
                    ${products.map(c => `${c.title} ${c.quantity}x`)
                    .join(', ')
                }`
            }
        })
    } catch (error) {

    }
})

app.listen(process.env.PORT || 8080, () => {
    console.log('Server Started')
})