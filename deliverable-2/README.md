# CancerChat/Team 11

> _Note:_ This document is intended to be relatively short. Be concise and precise. Assume the reader has no prior knowledge of your application and is non-technical. 

## Description 
 * Provide a high-level description of your application and it's value from an end-user's perspective
 * What is the problem you're trying to solve?
 * Is there any context required to understand **why** the application solves this problem?
 
 CancerChat is a Tinder-like app that serves as a platform, on which the cancer patients can be matched to other cancer patients that meet their requirements. Our app also has a built-in notification functionality where the admin can send cancer-related news to target users. 
 
 Our app focuses on a social issue that has long been ignored -- the social problem of cancer patients. Because of their cancer, it could be difficult for them to find dates on other social platforms. As cancer patients, they have more social needs than many people may have, to help them through the difficult cancer treatment, and to relieve their inner loneliness.
 
 To address this problem, our app provides a platform where the cancer patients can meet other cancer patients, either they want to date or find themselves a mentor or mentee. There is no such app on the market currently that does what our app does. We will match users who are close to each other and having the same type(s) of cancer since they may be interested in meeting each other in reality to expand their social circles and significantly improve their life quality.

What's more, because the administrators from Malecare, a cancer survivor support nonprofit organization, can send news about new treatments on CancerChat, it's also a great platform where the patients can receive the latest information about their cancer. Patients used to get information about new treatments when they met their doctors， while this app allows them to directly access this piece of information. They can then contact the doctor and ask if the new treatment can be applied to them. It can make cancer patients’ lives better and even save their lives.

## Key Features
 * Described the key features in the application that the user can access
 * Provide a breakdown or detail for each feature that is most appropriate for your application
 * This section will be used to assess the value of the features built
 
### Create Account/ Signup:  
For the first time, the users who visit CanerChat can use the button on the front page to create an account for them.
At the signup page, users will be asked to enter some basic account information (enter email, user name, birth date and password) and also choose the purpose of using this app as well as the cancer type. After register accounts, it will be automatically directed to the app main page.

### Login:  
On the front page, Users can login with their email and password. Besides, users can click on the checkbox and let CancerChat app to remember your email account.

### Navigation bar:  
After logging in, there is a navigation bar on the top, users can click on them and users will be redirected to the chosen page.

### Browse matches:  
On the main page, there will be matches provided by CancerChat app which shows another user's profile. Users can choose to view the full profile of the matched user or request to have a chat with this user.
Since CancerChat app will provide multiple matches for users, they can make decisions to either view previous matches or the next matches.
Moreover, next to the match, users can change the filter setting(for ideal match user) to ask for matches that meet their requirements.

### Chat:  
On the message page, users can find their friends on the left. (after both users agree on the chat request, they are friends, unless one of them has been blocked). Users can click on a friend's user name and start a chat by sending texts to friends.

### Update Profile:  
On the profile page, users can modify their profile here. Profile not only includes the basic information but also includes some extra information such as the greeting message users want to show on the match, adding detailed information such as cancer's medication and treatment. (For receiving latest news)

### Admin sends news:  
Administrators can send news to target users using the filters including ages, genders, types of cancer, types of treatment, and types of medication. For example, administrators can send a news about the lastest lung cancer treatment to users with lung cancer aged 20-50.

### Admin handle report:  
Administrators can handle reports for users, and make decisions. [TODO]

 

## Instructions
 * Clear instructions for how to use the application from the end-user's perspective
 * How do you access it? Are accounts pre-created or does a user register? Where do you start? etc. 
 * Provide clear steps for using each feature described above
 * This section is critical to testing your application and must be done carefully and thoughtfully
 
 Note: The pictures here are just for reference. The actual website may be (slightly) different from those pictures.
 
 A user can visit our app at [TODO:url], and will see this welcome page:
 
<img src="pictures/welcome.png" alt="welcome" />
 
 Our app has two types of users: normal users and administrators.
 
 ### Normal user
 As a normal user, one can either register a new account or log in as an existing user. We have created a demo user for testing, and the credentials would be: [TODO: add a demo user], or you can click the Create Account button and be redirected to the register page:
 <img src="pictures/register.png" alt="register" />
 
 After logging in, the user will see the matching page:
 <img src="pictures/match.jpg" alt="matches" />
 To test the chat functionality, we have provided two accounts that are already friended:[TODO: added two credentials]. Please open two incognito windows and sign in as two users respectively and you'll find each other in the chat page. The send emoji and pictures feature has not been implemented, and will be finished in D3.
 <img src="pictures/chat.png" alt="chat" />
 The user can view and update their profile on the profile page. Note that the uploading photos feature has not been supported and will be finished in D3.
  <img src="pictures/profile.png" alt="chat" />
  
  [TODO: requests page]
 
 ### Admin user
 As an admin, we have provided a pre-set admin account: 
 
 email: CancerChatAdmin@gmail.com
 password: Admin
 
  After logging in, the user will be redirected to the admin send message page. The reports page will be implemented in D3.
   <img src="pictures/adminSendMessage.png" alt="adminSendMessage" />
   This page is where the admin can send messages to a specific group of users. we have both a include section and a exclude section to handle the case where the admin may want to send a message to the users who have lung cancer but are not receiving the Antibody treatment. To test this feature, please open an incognitive and sign in as admin, and open another incognitive window and sign in as a normal user. 
 
 ## Development requirements
 * If a developer were to set this up on their machine or a remote server, what are the technical requirements (e.g. OS, libraries, etc.)?
 * Briefly describe instructions for setting up and running the application (think a true README).
 
 - Technical requirements has shown in requirements.txt.
 - Instructions for setting up and running the application:
   - Open the deliverable-2 folder:
     - Open one terminal for backend:
     - Step 1:
        - if your operation system is MacOS/Linux, please `export FLASK_APP=backend/app/cancer_chat.py`
        - if your operation system is Windows, please `set FLASK_APP=backend/app/cancer_chat.py`
     - Step 2:
        - `flask run`
     - Open another terminal for frontend:
     - Step 1:
        - `cd frontend`
     - Step 2:
        - `npm i`
     - Step 3:
        - `npm start`
        
 ## Deployment and Github Workflow

Describe your Git / GitHub workflow. Essentially, we want to understand how your team members shares a codebase, avoid conflicts and deploys the application.
 * Be concise, yet precise. For example, "we use pull-requests" is not a precise statement since it leaves too many open questions - Pull-requests from where to where? Who reviews the pull-requests? Who is responsible for merging them? etc.
 * If applicable, specify any naming conventions or standards you decide to adopt.
 * Describe your overall deployment process from writing code to viewing a live application
 * What deployment tool(s) are you using and how
 * Don't forget to **briefly explain why** you chose this workflow or particular aspects of it!
 

- Main development process happens on the `develop` branch. This is for preventing from contaminating the master branch. https://github.com/csc301-fall-2020/team-project-11-malecare-cancer-support/tree/develop

- If changes that are risky and may contaminate the whole codebase are needed...
   - Start a new branch from the `develop` branch, examples:
      - `tell_user_loading` branch. It adds the functionality to every webpage to tell the user that the resources are being loaded. https://github.com/csc301-fall-2020/team-project-11-malecare-cancer-support/tree/tell_user_loading
      - `import_bug_fix` branch. It changes the file structure of the back-end to resolve some of python's import errors. https://github.com/csc301-fall-2020/team-project-11-malecare-cancer-support/tree/import_bug_fix
      - ...and some more branches can be found under https://github.com/csc301-fall-2020/team-project-11-malecare-cancer-support/branches
   - Do a pull-request when finish fixing the bug/adding new functionalities
      - If an automerge to develop branch is available, do the automerge
      - If a manually merging is needed, merge `develop` branch to the new branch manually. Test the merged code at the local machine and make sure it is stable. Then do a pull-request to merge the new branch back to the `develop` branch. The reason for this is that we do not want any unstable code in the `develop` branch.
      - Examples of the pull-requests can be found here: https://github.com/csc301-fall-2020/team-project-11-malecare-cancer-support/pulls?q=is%3Apr+is%3Aclosed
      - we did not enforce this practice at first. We are adapting to it since we believe that it helps to maintain a cleaner codebase.
   - Invite someone who is available at the time or someone who is in charge of the changed code to do a code review. Sometimes we have to change to the code which was not the part that was assigned to us, thus it is necessary to consult the person who was in charge of the code. However, this does not often happen, since our first instinct is to ask the person who is in charge of the piece of the code to make the change. If this does happen, then the review is definitely needed. The reason is that we do not want our code to be changed without being notified, which could result in hard-to-find bugs.
   - Once the pull-request is approved, go ahead to merge it to the `develop` branch. Usually, the person who creates the pull-requests is responsible for merging the branch, but it does not matter, since the conflicts are resolved earlier and the changes are approved by others.

- Most of the time, developers stay on the develop branch to stay in sync with each other and made quick responses to others' suggestions.

- Once we reach a big milestone(a working MVP for D2 would be considered as a milestone), we use pull-requests to merge the `develop` branch to the `master` branch.

### How and when to test
- Every push and pull-request, we deploy our app at our local machines to test it. 
- UI tests are done by manually clicking on the UI to make sure they are reliable to use and won't crash easily. 
- Postman is used to test the back-end. It is an API testing tool. It is used to manually send requests to the API and see if the correct responses are sent back.
- MongoDBCompass, a GUI for MongoDB, is used to monitoring the changes happen in the database, since some of API test and UI test may result in changes in our database.

### Deployment
- Deploy to AWS EC2.
- AWS console is used to help us deploy the app.
- Deployment process:
   - Create a new EC2 instance
   - Clone our project from Github to the instance
   - Follow the instructions in the development requirement described above to manually run the app in the EC2 instance

 ## Licenses 

 Keep this section as brief as possible. You may read this [Github article](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/licensing-a-repository) for a start.

 * What type of license will you apply to your codebase?
 * What affect does it have on the development and use of your codebase?
 * Why did you or your partner make this choice?

We will apply MIT license to our codebase. 
Further development and use of our codebase have to also stay under MIT license and include the copyright notice. 
Apart from that, the codebase can be used in any way the users wish. 
We made this choice because our partner may want to further develop this software and we also want a copyright notice for our software.
