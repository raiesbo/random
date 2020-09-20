import smtplib
from email.message import EmailMessage
from string import Template  # using the $ we can substitute variables within text
from pathlib import Path  # allows us to access the html file

# here comes all the personal info
email_sender_name = ""
email_sender = ""
email_sender_password = ""
email_receiver = ""

html = Template(Path('./index.html').read_text())  # link to html template
email = EmailMessage()
email['from'] = email_sender_name
email['to'] = email_receiver
email['subject'] = 'You won a Kiss!!!!'

email.set_content(html.substitute({"name": 'Tintin'}), "html")

with smtplib.SMTP(host='smtp.gmail.com', port=587) as smtp:  # this is one of those things that we can simply copy/paste
    smtp.ehlo()
    smtp.starttls()  # this is an encrypting mechanism
    smtp.login(email_sender, email_sender_password)
    smtp.send_message(email)
    print('Email sent successfully.')
