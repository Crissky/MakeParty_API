'use strict';

const emailConfig = require('../config/email');
var sendgrid = require('sendgrid')(emailConfig.sendgridKey);

exports.send = async (to, subject, body) => {
    sendgrid.send({
        to: to,
        from: 'hello@makeparty.com',
        subject: subject,
        html: body
    })
}