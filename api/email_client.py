import os
import smtplib
from email.message import EmailMessage
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

SENDER_EMAIL = os.environ.get('SENDER_EMAIL')
SENDER_PASSWORD = os.environ.get('SENDER_PASSWORD')

def generate_body(volunteer_name, hawker_name, store_name, address, number, reason):
    return """
    <html>
    Hello <b>{volunteer_name}</b>, <br>
    <br>
    Thank you for indicating your interest in helping out hawkers in need through HawkerLink! We are happy to inform you that you have been allocated a hawker. The hawker details are:<br>
    <br>
    Hawker name: <b>{hawker_name}</b><br>
    Store name: <b>{store_name}</b><br>
    Address: <b>{address}</b><br>
    Phone number: <b>{number}</b> <br>
    Reason they need help: <b>{reason}</b><br>
    <br>
    Please make contact with the hawker as soon as possible using a suitable avenue based on their technology familiarity (Give them a call / Send them a voice recording / Drop them a text).<br>
    <br>
    If this is your first volunteer experience with us, please sign up for a training class that will be held at our offices. Training classes are held every week on Saturdays and Sundays at 2pm - 5pm. Please reply to this email with your preferred date of training. You will be awarded 3 hours of community service hours for attending the training. Training will include live Q&A, in depth review of resources and role play to maximise your capability to help hawkers. <br>
    <br>
    Here is a <a href="jqpoon.xyz/resources">link</a> to our resources page to familiarise the material before the training session or hawker meeting. <br>
    Once you have scheduled a meeting with the hawker, please click on <a href="jqpoon.xyz/resources-verified"> here </a> to confirm. <br>
    <br>
    Regards, <br>
    The HawkerLink Team<br>
    </html>
    """.format(volunteer_name=volunteer_name, hawker_name=hawker_name, store_name=store_name, address=address, number=number, reason=reason)

def send_email(target_email, volunteer_name, hawker_name, store_name, address, number, reason):
    # Set up email message
    print("Making email...")
    msg = MIMEText(generate_body(volunteer_name, hawker_name, store_name, address, number, reason), 'html')
    msg['Subject'] = "Hello from HawkerLink!"
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