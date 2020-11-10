import mongoengine as db

# MONGO_URL = "mongodb+srv://user1:user1@cluster0.gjkej.mongodb.net/test"

MONGO_URL = "mongodb+srv://dbUser:CancerChat@cluster0.4ppll.mongodb.net/test"

db.connect('malecare-dev', host=MONGO_URL, username='dbUser',
           password='CancerChat', authentication_source='admin',
           ssl=True, ssl_cert_reqs='CERT_NONE')
