const Message = require("../models/messageSchema");
const Chat = require("../models/chatSchema");
const Groq = require('groq-sdk')

// Initialize Groq SDK using the API key from environment variables
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const giveMePromptData = async (req, res) => {
    const { email, userMessage } = req.body;

    if (!email && !userMessage) {
        return res.status(400).json({ error: 'User message is required' });
    }

    try {
        // Send the user's message to the Groq API
        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: 'user', content: userMessage }],
            model: 'llama3-8b-8192',
        });

        // Extract AI's response from the API
        const aiResponse = chatCompletion.choices[0]?.message?.content || 'No response from AI';

        // Save user message and AI response
        const userMsg = await Message.create({ role: 'user', content: userMessage });
        const aiMsg = await Message.create({ role: 'assistant', content: aiResponse });

        // Create a new chat record
        const newChat = await Chat.create({
            email: email, 
            messages: [userMsg._id, aiMsg._id],
        });

        res.status(200).json({
            userMessage: userMsg.content,
            aiResponse: aiMsg.content,
            chatId: newChat._id  
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}
module.exports = { giveMePromptData }