import os


class Configuration:
    MAIL = "info@malecare.org"
    SECRET_KEY = 'my secret'
    API_KEY = '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'
    ROUTE_URL = "http://ec2-52-36-24-67.us-west-2.compute.amazonaws.com:5000"\
        if os.environ.get("AWS_URL") and os.environ.get("AWS_URL") == "True"\
        else "http://localhost:5000"
    # ROUTE_URL = "http://localhost:5000"
    # ROUTE_URL = "http://ec2-52-36-24-67.us-west-2.compute.amazonaws.com:5000"