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
Administrators can send news to target users using the filters including ages, genders, types of cancer, types of treatment, and types of medication. For example, administrators can send a news about the lastest lung cancer treatment to users with lung cancer aged 20-50.

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
<<<<<<< HEAD
    <br>astroid           2.4.2<br/>
    <br>atomicwrites      1.4.0<br/>
    <br>attrs             20.2.0<br/>
    <br>bcrypt            3.2.0<br/>
    <br>certifi           2020.6.20<br/>
    <br>cffi              1.14.3<br/>
    <br>chardet           3.0.4<br/>
    <br>click             7.1.2<br/>
    <br>colorama          0.4.3<br/>
    <br>coverage          5.3<br/>
    <br>dnspython         2.0.0<br/>
    <br>Flask             1.1.2<br/>
    <br>Flask-Cors        3.0.9<br/>
    <br>Flask-Excel       0.0.7<br/>
    <br>Flask-Ext         0.1<br/>
    <br>Flask-Login       0.5.0<br/>
    <br>flask-mongoengine 0.9.5<br/>
    <br>Flask-SocketIO    4.3.1<br/>
    <br>Flask-WTF         0.14.3<br/>
    <br>gevent            20.9.0<br/>
    <br>gevent-websocket  0.10.1<br/>
    <br>greenlet          0.4.17<br/>
    <br>idna              2.10<br/>
    <br>iniconfig         1.1.1<br/>
    <br>isort             5.5.3<br/>
    <br>itsdangerous      1.1.0<br/>
    <br>Jinja2            2.11.2<br/>
    <br>lazy-object-proxy 1.4.3<br/>
    <br>lml               0.1.0<br/>
    <br>MarkupSafe        1.1.1<br/>
    <br>mccabe            0.6.1<br/>
    <br>mongoengine       0.20.0<br/>
    <br>packaging         20.4<br/>
    <br>passlib           1.7.4<br/>
    <br>Pillow            8.0.1<br/>
    <br>pip               20.2.4<br/>
    <br>pluggy            0.13.1<br/>
    <br>py                1.9.0<br/>
    <br>pycparser         2.20<br/>
    <br>pyexcel           0.6.5<br/>
    <br>pyexcel-io        0.6.4<br/>
    <br>pyexcel-webio     0.1.4<br/>
    <br>pylint            2.6.0<br/>
    <br>pymongo           3.11.0<br/>
    <br>pyparsing         2.4.7<br/>
    <br>pytest            6.1.1<br/>
    <br>pytest-cov        2.10.1<br/>
    <br>python-engineio   3.13.2<br/>
    <br>python-socketio   4.6.0<br/>
    <br>requests          2.24.0<br/>
    <br>setuptools        47.1.0<br/>
    <br>six               1.15.0<br/>
    <br>texttable         1.6.3<br/>
    <br>toml              0.10.1<br/>
    <br>urllib3           1.25.11<br/>
    <br>Werkzeug          1.0.1<br/>
    <br>wheel             0.35.1<br/>
    <br>wrapt             1.12.1<br/>
    <br>WTForms           2.3.3<br/>
    <br>zope.event        4.5.0<br/>
    <br>zope.interface    5.2.0<br/>
 
 <br>Instructions for setting up and running the application:<br/>
 <br>Open the deliverable-2 folder<br/>
     <br>Open one terminal for backend:<br/>
     <br>Step 1:<br/>
        <br>if your system is Mac/Linux, please<br/> 
        <br>export FLASK_APP=backend/app/cancer_chat.py<br/>
        <br>if your system is Windows, please<br/>
        <br>set FLASK_APP=backend/app/cancer_chat.py<br/>
     <br>Step 2:<br/>
        <br>flask run<br/>
     <br>Open another terminal for frontend:<br/>
     <br>Step 1:<br/>
        <br>cd frontend<br/>
     <br>Step 2:<br/>
        <br>npm i<br/>
     <br>Step 3:<br/>
        <br>npm start<br/>
 
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
