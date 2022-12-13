from config import Config

from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail


class EmailUtils:
    def __init__(self, config: Config):
        self.email_api_key = config.email_api_key
        self.email_api_key = "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"

    def send_email(self):
        message = Mail(
            from_email='shubham@dappcamp.xyz',
            to_emails='shubhamkanodia123@gmail.com',
            subject='On-chain email domain verification',
            html_content='<strong>Here is your confirmation link<strong>')
        try:
            sg = SendGridAPIClient(self.email_api_key)
            response = sg.send(message)

            print(response.status_code)
            print(response.body)

        except Exception as e:
            print(e.message)

