const express = require("express")
const router = express.Router()

const {giveMePromptData} = require("../controller/PromptData");
const {sendEmail} = require("../controller/sendEmail");

router.route("/giveprompt").post(giveMePromptData)
router.route("/send-email").post(sendEmail)

module.exports = router