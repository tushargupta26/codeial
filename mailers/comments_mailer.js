const nodeMailer = require('../config/nodemailer');

// this is another way of exporting a method
exports.newComment = (comment) => {
    let htmlString = nodeMailer.renderTemplate({comment:comment},'/comments/new_comments.ejs');
    console.log('inside newComment mailer' , comment);
    nodeMailer.tranporter.sendMail({
        from: 'tushar@codeial.com',
        to: comment.user.email,
        subject: "New Comment Published",
        html: htmlString,
    },(err,info) => {
        if(err){
            console.log('Error in sending mail',err);
            return;
        }
        console.log("MEssage Sent");
        return;
    })
}