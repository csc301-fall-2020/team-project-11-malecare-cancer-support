# CancerChat/Team 11

> _Note:_ This document is intended to be relatively short. Be concise and precise. Assume the reader has no prior knowledge of your application and is non-technical. 

## Description 
 * Provide a high-level description of your application and it's value from an end-user's perspective
 * What is the problem you're trying to solve?
 * Is there any context required to understand **why** the application solves this problem?
 
 CancerChat is a Tinder-like app that serves as a platform, on which the cancer patients can be matched to other cancer patients that meet their requirements.
 
 Our app focuses on a social issue that has long been ignored -- the social problem of cancer patients. Because of their cancer, it could be difficult for them to find dates on other social platforms. As cancer patients, they have more social needs than many people may have, to help them through the difficult cancer treatment, and to relieve their inner loneliness.
 
 To address this problem, our app provides a platform where the cancer patients can meet other cancer patients, either they want to date or find themselves a mentor or mentee. There is no such app on the market currently that does what our app does. We will match users who are close to each other and having the same type(s) of cancer since they may be interested in meeting each other in reality to expand their social circles and significantly improve their life quality.

## Key Features
 * Described the key features in the application that the user can access
 * Provide a breakdown or detail for each feature that is most appropriate for your application
 * This section will be used to assess the value of the features built
 
Create Account/ Signup:  
For the first time, the users who visit CanerChat can use the button on the front page to create an account for them.
At the signup page, users will be asked to enter some basic account information (enter email, user name, birth date and password) and also choose the purpose of using this app as well as the cancer type. After register accounts, it will be automatically directed to the app main page.

Login:  
On the front page, Users can login with their email and password. Besides, users can click on the checkbox and let CancerChat app to remember your email account.

Navigation bar:  
After logging in, there is a navigation bar on the top, users can click on them and users will be redirected to the chosen page.

Browse matches:  
On the main page, there will be matches provided by CancerChat app which shows another user's profile. Users can choose to view the full profile of the matched user or request to have a chat with this user.
Since CancerChat app will provide multiple matches for users, they can make decisions to either view previous matches or the next matches.
Moreover, next to the match, users can change the filter setting(for ideal match user) to ask for matches that meet their requirements.

Chat:  
On the message page, users can find their friends on the left. (after both users agree on the chat request, they are friends, unless one of them has been blocked). Users can click on a friend's user name and start a chat by sending texts to friends.

Update Profile:  
On the profile page, users can modify their profile here. Profile not only includes the basic information but also includes some extra information such as the greeting message users want to show on the match, adding detailed information such as cancer's medication and treatment. (For receiving latest news)

Admin sends news:  
Administrators can send cancer news to target users. [TODO]

Admin handle report:  
Administrators can handle reports for users, and make decisions. [TODO]

 

## Instructions
 * Clear instructions for how to use the application from the end-user's perspective
 * How do you access it? Are accounts pre-created or does a user register? Where do you start? etc. 
 * Provide clear steps for using each feature described above
 * This section is critical to testing your application and must be done carefully and thoughtfully
 
 A user can visit our app at [TODO:url]
 
 Our app has two types of users: normal users and administrators.
 
 As a normal user, one can either register a new account or log in as an existing user. [TODO: add a demo user] 
 
 After logging in, the user will see this page[TODO: a matches page screen shot].
 
 As an admin, we have provided a pre-set admin account: 
 
 email: CancerChatAdmin@gmail.com
 password: Admin
 
  After logging in, the user will see this page[TODO: a send message page screen shot].
 
 ## Development requirements
 * If a developer were to set this up on their machine or a remote server, what are the technical requirements (e.g. OS, libraries, etc.)?
 * Briefly describe instructions for setting up and running the application (think a true README).
 
 Technical requirements:
    astroid           2.4.2\n
    atomicwrites      1.4.0
    attrs             20.2.0
    bcrypt            3.2.0
    certifi           2020.6.20
    cffi              1.14.3
    chardet           3.0.4
    click             7.1.2
    colorama          0.4.3
    coverage          5.3
    dnspython         2.0.0
    Flask             1.1.2
    Flask-Cors        3.0.9
    Flask-Excel       0.0.7
    Flask-Ext         0.1
    Flask-Login       0.5.0
    flask-mongoengine 0.9.5
    Flask-SocketIO    4.3.1
    Flask-WTF         0.14.3
    gevent            20.9.0
    gevent-websocket  0.10.1
    greenlet          0.4.17
    idna              2.10
    iniconfig         1.1.1
    isort             5.5.3
    itsdangerous      1.1.0
    Jinja2            2.11.2
    lazy-object-proxy 1.4.3
    lml               0.1.0
    MarkupSafe        1.1.1
    mccabe            0.6.1
    mongoengine       0.20.0
    packaging         20.4
    passlib           1.7.4
    Pillow            8.0.1
    pip               20.2.4
    pluggy            0.13.1
    py                1.9.0
    pycparser         2.20
    pyexcel           0.6.5
    pyexcel-io        0.6.4
    pyexcel-webio     0.1.4
    pylint            2.6.0
    pymongo           3.11.0
    pyparsing         2.4.7
    pytest            6.1.1
    pytest-cov        2.10.1
    python-engineio   3.13.2
    python-socketio   4.6.0
    requests          2.24.0
    setuptools        47.1.0
    six               1.15.0
    texttable         1.6.3
    toml              0.10.1
    urllib3           1.25.11
    Werkzeug          1.0.1
    wheel             0.35.1
    wrapt             1.12.1
    WTForms           2.3.3
    zope.event        4.5.0
    zope.interface    5.2.0
 
 Instructions for setting up and running the application:
 Open the deliverable-2 folder
     Open one terminal for backend:
     Step 1:
        if your system is Mac/Linux, please 
        export FLASK_APP=backend/app/cancer_chat.py
        if your system is Windows, please
        set FLASK_APP=backend/app/cancer_chat.py
     Step 2:
        flask run
     Open another terminal for frontend:
     Step 1:
        cd frontend
     Step 2:
        npm i
     Step 3:
        npm start
 
 ## Deployment and Github Workflow

Describe your Git / GitHub workflow. Essentially, we want to understand how your team members shares a codebase, avoid conflicts and deploys the application.
 * Be concise, yet precise. For example, "we use pull-requests" is not a precise statement since it leaves too many open questions - Pull-requests from where to where? Who reviews the pull-requests? Who is responsible for merging them? etc.
 * If applicable, specify any naming conventions or standards you decide to adopt.
 * Describe your overall deployment process from writing code to viewing a live application
 * What deployment tool(s) are you using and how
 * Don't forget to **briefly explain why** you chose this workflow or particular aspects of it!
 
The main part of the development take place in the develop branch, preventing from contaiminating the master branch. We use pull-requests to merge develop branch to the master branch once we have a bug-less, testable and working app. We have a taskboard assigning tasks to members, it already reduces conflicts. Also, when someone is going to make big changes to codebase and it has the potential of contaminated the whole codebase, they start a new branch from develop. Then they do a pull-request when finished and tested that change to the develop branch. They usually invites some other group members who is available at the time to do a review. After the review, the person who does the review would merge the branch. Most of the time, back-end developers stays on the develop branch to stay sync with front-end and made quick response to their suggestions. Before every push and pull-request, we deploy our app at local machine to make sure it can run. Finally, we deploy our app through AWS EC2. We push our app to AWS EC2 and run pre-written scripted to deploy it there. <br><br/>
We are using snake case for back-end and camel case for front-end.

 ## Licenses 

 Keep this section as brief as possible. You may read this [Github article](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/licensing-a-repository) for a start.

 * What type of license will you apply to your codebase?
 * What affect does it have on the development and use of your codebase?
 * Why did you or your partner make this choice?

We will apply MIT license to our codebase. 
Further development and use of our codebase have to also stay under MIT license and include the copyright notice. 
Apart from that, the codebase can be used in any way the users wish. 
We made this choice because our partner may want to further develop this software and we also want a copyright notice for our software.
