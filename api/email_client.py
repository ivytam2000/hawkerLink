import os
import smtplib
from email.message import EmailMessage

SENDER_EMAIL = os.environ.get('SENDER_EMAIL')
SENDER_PASSWORD = os.environ.get('SENDER_PASSWORD')

def send_email(target_email):
    # Set up email message
    print("Making email...")
    msg = EmailMessage()
    msg.set_content("Hello world.")
    msg['Subject'] = "Hello!"
    msg['From'] = SENDER_EMAIL
    msg['To'] = target_email

    try:
        print("Sending email...")
        server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        server.ehlo()
        server.login(SENDER_EMAIL, SENDER_PASSWORD)
        server.send_message(msg)
        server.quit()
        print("Sent email!")
        return 0
    except:
        print('Something went wrong...')
        return 1