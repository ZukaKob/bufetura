const nodeMailer = require('nodemailer')

exports.SendVerificationEmail = (to, url, txt) => {
    const smtpTransport = nodeMailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.SENDER_EMAIL_ADDRESS,
            pass: process.env.SENDER_EMAIL_PASS
        },
        port: 465,
        host: 'smtp.gmail.com'
    })

    const mailOptions = {
        from: process.env.SENDER_EMAIL_ADDRESS,
        to: to, 
        subject: `Bufeteria`,
        html: `
        <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
        <h2 style="text-align: center; text-transform: uppercase;color: teal;">მოგესალმებით ბუფეტერიაში</h2>
        <p>გაიარე ვერიფიკაცია რათა შეძლო გამოიყენო ჩვენი უთესლესი აპლიკაცია</p>
        
        <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
        </div>
        `
    }
    smtpTransport.sendMail(mailOptions, (err, infor) => {
        if(err) console.log(err)
        return infor 
    })
}

exports.SendForgotPasswordEmail = (to, url, txt) => {
    const smtpTransport = nodeMailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.SENDER_EMAIL_ADDRESS,
            pass: process.env.SENDER_EMAIL_PASS
        },
        port: 465,
        host: 'smtp.gmail.com'
    })

    const mailOptions = {
        from: process.env.SENDER_EMAIL_ADDRESS,
        to: to,
        subject: 'Bufeteria',
        html: `
        <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
        <h2 style="text-align: center; text-transform: uppercase;color: teal;">მოგესალმებით</h2>
        <p>რომ აღადგინოთ სასურველი ანგარიში, დააკლილე ქვემოთ მოცემულ ღილაკს შენი ლამაზი თითუკა</p>
        
        <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
        </div>
        `
    }

    smtpTransport.sendMail(mailOptions, (err, info) => {
        if(err) console.log(err)
        return info 
    })
}