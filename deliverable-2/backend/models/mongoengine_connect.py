import mongoengine as db

# MONGO_URL = "mongodb+srv://user1:user1@cluster0.gjkej.mongodb.net/test"

# MONGO_URL = "mongodb+srv://dbUser:CancerChat@cluster0.4ppll.mongodb.net/test"

MONGO_URL = "mongodb+srv://DarrylDarryl:e9Jx3Nya^45@cluster0.02idn.mongodb.net/test"
db.connect('malecare-dev', host=MONGO_URL, username='DarrylDarryl',
           password='e9Jx3Nya^45', authentication_source='admin',
           ssl=True, ssl_cert_reqs='CERT_NONE')
