const Message = require("../models/messageSchema");
const Chat = require("../models/chatSchema");
const nodeMailer = require('nodemailer');

const sendEmail = async (req, res) => {

    const { email, chatId } = req.body;

    if (!email || !chatId) {
        return res.status(400).json({ error: 'Email and chatId are required' });
    }

    try {
        const chat = await Chat.findById(chatId).populate({
            path: 'messages',
            model: Message, 
            select: 'role content response createdAt'
        });


        if (!chat) {
            return res.status(404).json({ error: 'Chat not found' });
        }

        const aiResponse = chat.messages.find(msg => msg.response)?.response;

        if (!aiResponse) {
            return res.status(404).json({ error: 'AI response not found' });
        }

        const mailOptions = {
            from: process.env.SMPT_MAIL,
            to: email,
            subject: 'Your AI-Generated Greeting',
            text: `AI's Response: ${aiResponse}`,
        };

        const transporter = nodeMailer.createTransport({
            host: process.env.SMPT_HOST,
            port: process.env.SMPT_PORT,
            secure: false,
            service: process.env.SMPT_SERVICE,
            auth: {
                user: process.env.SMPT_MAIL,
                pass: process.env.SMPT_PASSWORD,
            },
        });


        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return res.status(500).json({ error: 'Error sending email' });
            } else {
                return res.status(201).json({
                    email,
                    aiResponse,
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { sendEmail };