# pavi-nodemailer-backend

# https://pavi-nodemailer-backend.vercel.app/api/auth/signup

Request: 
name: String,
password: String,
email: String

Response:
![image](https://user-images.githubusercontent.com/37231548/199216382-0123977e-4e04-4a53-a97b-901ef1f2fa86.png)

# https://pavi-nodemailer-backend.vercel.app/api/auth/login

Request:
email : String,
password : String

Response:
![image](https://user-images.githubusercontent.com/37231548/199216597-43032c3b-6fc8-4e0f-8602-9f92e609451a.png)

# https://pavi-nodemailer-backend.vercel.app/api/auth/forgetpassword

Request:
email: String,

Response:
![image](https://user-images.githubusercontent.com/37231548/199216707-87d0b02b-01c7-4293-925a-5cc2f55304bc.png)

# https://pavi-nodemailer-backend.vercel.app/api/mail/mailsend

Request:
receiverMail : String,
subject : String,
content : String

Response:
![image](https://user-images.githubusercontent.com/37231548/199216915-274f38ad-3c40-4674-8a61-c51238d338a2.png)
