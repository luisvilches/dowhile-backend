const nodemailer = require('nodemailer');

exports.mail = function(req,res,next){
	var smtpConfig = {
	    host: 'smtp.gmail.com',
	    port: 465,
	    secure: true, // use SSL
	    auth: {
	        user: 'info@dowhile.cl',
	        pass: 'dowhile16'
	    }
	};

	var transporter = nodemailer.createTransport(smtpConfig);
	var template = '<b style="color:#ff2145; font-size: 14px">Nombre:<span style="color:#333; margin-left:10px;">'+req.body.nombre+
					'</span></b><br><br><b style="color:#ff2145; font-size: 14px">Correo:<span style="color:#333 !important; margin-left:10px; text-decoration:none;">'+req.body.correo+
					'</span></b><br><br><b style="color:#ff2145; font-size: 14px">Telefono:<span style="color:#333; margin-left:10px;">'+req.body.telefono+
					'</span></b><br><br><b style="color:#ff2145; font-size: 14px">Mensaje:<br><br><span style="color:#333; margin-left:10px;">'+req.body.mensaje+'</span></b><br>';
	var mailOptions = {
	    from: '"Sitio Web Dowhile" <info@dowhile.cl>', // sender address
	    to: 'luis@dowhile.cl, laura@dowhile.cl', // list of receivers
	    subject: req.body.asunto, // Subject line
	    text: 'Hello world', // plaintext body
	    html: template // html body
	};

		transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        return console.log(error);
	    }
	    console.log('Message sent: ' + info.response);
	    res.send('success');
	});
}