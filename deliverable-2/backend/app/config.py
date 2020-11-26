import os


class Configuration:
    MAIL = "Thestral2017@gmail.com"
    SECRET_KEY = 'my secret'
    API_KEY = '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'
    ROUTE_URL = "http://ec2-52-36-24-67.us-west-2.compute.amazonaws.com:5000" if os.environ.get(
        "PROD") else \
        "http://localhost:5000"
