import path from "path"
import nodemailer from "nodemailer"
import fs from "fs"
import { NextFunction, Request, Response } from "express"

export const myfunction = async (req:Request, res:Response , next:NextFunction) => {
    try {

        const data = [
          {
            "Name": "Harsh",
            "Email": "hy945196@gmail.com"
          },
        ]

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.SMTP_EMAIL,
              pass: process.env.SMTP_PASS
            }
          });

        let a=0
        for (let i of data) {
            a=a+1
            const mailOptions = {
                from: "Big Data Centre of Excellence <BDCOE@akgec.ac.in>",
                to: i.Email,
                subject: "Certificate of Participation",
                html: `<!DOCTYPE html>
                <html lang="en">
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Registration Mail</title>
                    <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
                    <style>
                        body {
                            border-radius: 5px;
                            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
                        }
                        .containerButton {
                            display: flex;
                            justify-content: center;
                            width: "100%";
                        }
                        .content {
                            border: 1px solid rgba(0,0,0, 0.1);
                            border-radius: 3px;
                            overflow: hidden;
                        }
                        .image {
                            max-width: 100%;
                            border-radius: 8px;
                        }
                        .boxInfos {
                            padding: 20px;
                        }
                        .container {
                            /* margin-left :auto; */
                            margin: auto;
                            margin-top:4vh;
                            /* background-image: url("https://res.cloudinary.com/dhy42cidp/image/upload/v1712752808/996873_daekw1.jpg"); */
                            /* background-repeat: no-repeat; */
                            /* background-size: cover; */
                            background: linear-gradient(to top, #D5DCED, #FFFFFF);
                            width: 50vw;
                        }
                        p {
                            font-size:1vw;
                        }
                        .first{
                            text-align: center;
                            width: 100%;
                            font-size: 1.5vw;
                        }
                        .list{
                            font-size:1.3vw;
                        }
                
                        .whatslink{
                            font-size: 1.5vw;
                        }
                
                        .prize{
                                font-weight: 700;
                                font-size: 1.5vw;
                            }
                
                            .whatsIcons{
                                width: 100%;
                            }
                
                            .whatsIcons img{
                              width: 2.4vw;
                            }
                
                            .data{
                                font-size: 1.5vw;
                                font-weight: 600;
                            }
                            .whatsapp{
                                font-weight: 700;
                            }
                      
                        @media (max-width:600px) {
                            p {
                                font-size:3.8vw;
                            }
                
                            .whatsapp{
                                font-weight: 700;
                                font-size: 3.2vw;
                                
                            }
                
                            .whatslink {
                                font-size: 3.4vw;
                            }
                
                            .first {
                                font-size: 3vw;
                            }
                
                            .congo {
                                font-size: 4.1vw;
                                text-align: center;
                            }
                
                            .prize{
                                font-weight: 700;
                                /* font-size: 4.5vw; */
                                font-size: 4.1vw;
                                text-align: center;
                            }
                
                            .container {
                            margin-left :auto;
                            width: 100%;
                            }
                
                            ul li {
                                font-size: 3vw;
                            }
                
                            .whatsIcons {
                                display: flex;
                                justify-content: center;
                                align-items: center;
                            }
                
                            .whatsIcons img{
                              width: 10vw;
                            }
                
                            .data{
                                font-size: 3.5vw;
                                font-weight: 600;
                            }
                
                            
                        }
                        /* Add more styles as needed */
                    </style>
                </head>
                <body>
                    <div class="container mt-16">
                        <div class="content">
                            <!-- <div class="row">
                                <img class="image" width="100%" src="https://ucarecdn.com/20f7ac95-dcb3-4f32-a3ae-08f95db85189/Group46442.png" alt="Email Banner">
                            </div> -->
                            <div class="row boxInfos" style="padding-bottom: 0;">
                                <div class="column px-12">
                                    <!-- BadgeCheck icon replacement needed -->
                                    <p class="whatsapp">Hi ${i.Name}, <br>
                                        Greetings from team BDCOE
                                        </p>
                                    <h2 class="congo">CONGRATULATIONS!! As you have successfully completed the 2 days workshop organised by us, we present you the certificate of completion for the event!</h2>
                                    <p class="whatsapp">"Looking forward to see you at the recruitement drive ${i.Name}!!!"</p>
                                     <p style="font-weight: 700;">Regards,</p>
                                     <p style="font-weight: 700;">TEAM BDCOE</p>
                                </div>
                            </div>
                            <div class="row boxInfos" style="padding-top: 5px;">
                                <div class="containerButton" colSpan="2">
                                    <div class="flex gap-5 mt-4">
                                        <!-- Instagram icon replacement needed -->
                                        <!-- Linkedin icon replacement needed -->
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>
                </body>
                </html>`,
            }
            await transporter
                .sendMail(mailOptions)
                .then(() => {
                    console.log(`Mail sent to ${a} ${i.Name} users`)
                })
                .catch((err) => {
                    console.log(err);
                    console.log(i);
                })
        }
        next();
        // return res.status(200).json({ msg: 'All mail sent' })
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: 'Error registering the user' })
    }
}
