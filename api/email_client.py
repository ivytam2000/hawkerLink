import os
import smtplib
from email.mime.text import MIMEText
import datetime as DT
import dateutil.relativedelta as REL
from dateutil import parser

SENDER_EMAIL = os.environ.get('SENDER_EMAIL')
SENDER_PASSWORD = os.environ.get('SENDER_PASSWORD')

def generate_confirmation_body(vid, volunteer_name, hawker_name, store_name, address, number, reason):
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
    If this is your first volunteer experience with us, please sign up for a training class that will be held at our offices. Training classes are held every week on Saturdays and Sundays at 2pm - 5pm. Please click <a href="jqpoon.xyz/{vid}/booking">here</a> to book your session. You will be awarded 3 hours of community service hours for attending the training. Training will include live Q&A, in depth review of resources and role play to maximise your capability to help hawkers. <br>
    <br>
    Here is a <a href="jqpoon.xyz/resources">link</a> to our resources page to familiarise the material before the training session or hawker meeting. <br>
    Once you have scheduled a meeting with the hawker, please click on <a href="jqpoon.xyz/resources-verified"> here </a> to confirm. <br>
    <br>
    Regards, <br>
    The HawkerLink Team<br>
    </html>
    """.format(vid=vid, volunteer_name=volunteer_name, hawker_name=hawker_name, store_name=store_name, address=address, number=number, reason=reason)

def generate_booking_body(vid, volunteer_name, booking_time):

    hours_of_training = 3
    day_of_week = booking_time.strftime("%A")
    day = booking_time.day
    month = booking_time.strftime("%B")
    year = booking_time.year
    start_time = booking_time.strftime("%H%M")
    end_time = (booking_time + REL.relativedelta(hours=hours_of_training)).strftime("%H%M")

    return """
    <html>
    Hello <b>{volunteer_name}</b>, <br>
    <br>
    Thank you for choosing a training session! The confirmed details of your training are as follows: <br>
    <br>
    Date: <b>{day} {month} {year}, {day_of_week}</b><br>
    Time: <b>{start_time} - {end_time} hrs</b><br>
    Venue: <b>448 Clementi Ave 3, #11-01</b><br>
    <br>
    If you would like to rebook your sessions, please click <a href="jqpoon.xyz/{vid}/booking">here</a>. Should you have any further queries, please feel free to contact us via email (<a href="mailto:hawkerlinkdrp@gmail.com">hawkerlinkdrp@gmail.com</a>).<br>
    <br>
    We look forward to seeing you!<br>
    <br>
    Regards, <br>
    The HawkerLink Team<br>
    </html>
    """.format(vid=vid, volunteer_name=volunteer_name, day=day, month=month, year=year, day_of_week=day_of_week, start_time=start_time, end_time=end_time)

def send_confirmation_email(target_email, vid, volunteer_name, hawker_name, store_name, address, number, reason):
    # Set up email message
    print("Making email...")
    msg = MIMEText(generate_confirmation_body(vid, volunteer_name, hawker_name, store_name, address, number, reason), 'html')
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

def send_booking_email(target_email, vid, volunteer_name, booking_time):
    # Set up email message
    print("Making email...")
    msg = MIMEText(generate_booking_body(vid, volunteer_name, parser.parse(booking_time)), 'html')
    msg['Subject'] = "HawkerLink Training Confirmation"
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