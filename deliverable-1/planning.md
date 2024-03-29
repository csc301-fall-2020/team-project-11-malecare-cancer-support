# CancerChat/TEAM 11

## Product Details
 
#### Q1: What are you planning to build?

We are planning to build a web-based, Tinder-like app that serves as a platform, on which the cancer patients can be matched to other cancer patients that meet their requirements. 

At the moment, there's no similar app in the market and cancer patients lack a way to know each other, so our app would provide a solution to them and solve their socialization problem. 

The users of our app can find someone to date or someone as a mentor who can share their stories fighting with cancer. The users themselves can also be mentors and find their mentees on our app. 

Other than cancer patients, people from MaleCare (our project partner) will play the role of administrators in our app, and they'll have a separate administration page. What administrators can do in our app is that they're able to send out news to specific groups of cancer patients. For example, if a new treatment has just been found to be effective to cure breast cancer, then the administrator can choose to send out this exciting news to the users with breast cancer. 

Below are some brief instructions on how to use our app. We're including some of the mock-ups in this section for demonstration purposes. More mock-ups can be found in ../mock-ups

#### Q: How do normal users use our app?
To start using our app, the user needs to create an account. They should provide some basic information so that our system can find the perfect matches for them. The mock-up sign-up page is as follows:

<img src="https://github.com/csc301-fall-2020/team-project-11-malecare-cancer-support/blob/master/deliverable-1/mock-ups/register.jpg " width="600" height="1200" alt="matches"/>

After they're loggin in, they will see the following page:
	<img src="https://github.com/csc301-fall-2020/team-project-11-malecare-cancer-support/blob/master/deliverable-1/mock-ups/match.jpg " width="800" height="600" alt="matches"/>
	
On the left is a matched user that our system has found for the current user. On the right is the filter section where the user can customize their filters to find someone that meets their requirement. 
	
The user can choose to view the full profile page of the other user or send a request to start chatting. Only when the chatting request has been approved by the other user can they start sending messages to each other. If the user doesn't like this match, then he/she can simply click on the Next button to move on to the next match. If the user clicks on the Next button by mistake, then he/she can click on the Prev button to go back to the previous match. 

The user can view all the chat requests in a separate page:
<img src="https://github.com/csc301-fall-2020/team-project-11-malecare-cancer-support/blob/master/deliverable-1/mock-ups/requests.jpg " width="800" height="600" alt="matches"/>

The messages page is where the users communicate with each other. They can send text, emojis, or even photos. If the user doesn't want to receive messages from another user anymore, then he/she can simply block that user. If during the conversation, a user starts to harass, abuse, or even threaten the other user, then the user can simply report him/her to the administrator and that user's account would be blcoked forever. 
Here's what the messages page look like:
<img src="https://github.com/csc301-fall-2020/team-project-11-malecare-cancer-support/blob/master/deliverable-1/mock-ups/message.jpg " width="800" height="600" alt="matches"/>
	
What's more, every user has a profile page where they can edit their personal information. They are also able to upload up to 3 photos to their profile. The reason why we have a limit on the number of photos is that we don't want this app to be like Facebook or Instagram, where one can share their daily life and upload tons of photos. The main goal for our app is to provide a platform for cancer patients to meet each other, and 3 photos and a brief introduction are enough for people to get a general impression of each other.
<img src="https://github.com/csc301-fall-2020/team-project-11-malecare-cancer-support/blob/master/deliverable-1/mock-ups/profile.jpg " width="600" height="1000" alt="matches"/>

#### Q:  What can administrators do in our app?
We will provide them with pre-set administrator accounts. After login, they would be able to see the administrator page, where they can send the news to the patients of specific groups, or view the patients that has been reported. An administrator has the right to see the conversation that has been reported and make a decision on whether or not to ban a user's account.

<img src="https://github.com/csc301-fall-2020/team-project-11-malecare-cancer-support/blob/master/deliverable-1/mock-ups/admin_reports.jpg" width="800" height="600" alt="admin_reports"/>
<img src="https://github.com/csc301-fall-2020/team-project-11-malecare-cancer-support/blob/master/deliverable-1/mock-ups/admin_sendinfo.jpg" width="800" height="600" alt="admin_sendinfo"/>
 
#### Q2: Who are your target users?

Our target users are listed below:
- Cancer patients who want to find someone who also suffers from the same type(s) of cancer to date
- Cancer patients who just diagnosed with cancer and want to be mentored and comforted by someone who has had the same type(s) of cancer as them for a longer time
- Cancer patients who have experience fighting with cancer and now want to mentor someone who has the same type(s) of cancer as them for a shorter time
- Cancer patients who want to explore more information specific to their cancer type(s)
- Employees from Malecare that would take the role of the administrators. They are able to send news, such as new treatments, new clinical trials, etc., to a specific group of cancer patients, or ban people's accounts for misconducting.

	
#### Q3: Why would your users choose your product? What are they using today to solve their problem/need?

Our app focuses on a social issue that has long been ignored -- the social problem of cancer patients. Because of their cancer, it could be difficult for them to find dates on other social platforms. As cancer patients, they have more social needs than many people may have, to help them through the difficult cancer treatment, and to relieve their inner loneliness.

To address this problem, our app provides a platform where the cancer patients can meet other cancer patients, either they want to date or find themselves a mentor or mentee. There is no such app on the market currently that does what our app does. We will match users who are close to each other and having the same type(s) of cancer since they may be interested in meeting each other in reality to expand their social circles and significantly improve their life quality.

What's more, because the administrators from Malecare can send news about new treatments, it's also a great platform where the patients can receive the latest information about their cancer. Patients used to get information about new treatments when they met their doctors， while this app allows them to directly access this piece of information. They can then contact the doctor and ask if the new treatment can be applied to them. It can make cancer patients’ lives better and even save their lives.

#### Q4: How will you build it?

We will use javascript for the entire software, React for front-end and Node.js for back-end. We may use Material-UI and Ant-Design, which are ui libraries for front-end. Also, we will use mvvm pattern for the front-end. What's more, AWS EC2, heroku, and MongoDB are Paas tools that we may use in our project. Also, google map API could be useful since we need the location of users to match them to each other. As for how we are going to deploy the app, we will deploy our web app through aws. We may use AVA test framework to write unit tests and run the test files with Github Actions for every pull request. Besides, we will perform manual operations on the front-end page as much as possible to mock how users use our web-app to make sure there are no operation bugs. Lastly, we always put the safety and privacy of our users first. All the user credentials would be encrypted before storage. All the user data will be kept confidential and will only be used for matching and receiving news from Malecare.

Here is a high-level architecture diagram:
<img src="https://github.com/csc301-fall-2020/team-project-11-malecare-cancer-support/blob/master/deliverable-1/architecture/architecture.png " alt="matches"/>

Here is a use case uml:
<img src="https://github.com/csc301-fall-2020/team-project-11-malecare-cancer-support/blob/master/deliverable-1/uml/uml.png " alt="matches"/>
 
#### Q5: What are the user stories that make up the MVP?

1. As a 25-year-old man who has just received a cancer diagnosis, I want to find a mentor in the app, who can guide me to fight the disease. After I find balance in my life, I would like to meet people in need of a mentor through the app and share my experience with the disease with them, so that they can be as optimistic as me.
	
2. As a 54-year-old single man with terminal cancer, whose wife left one year ago, I hope to find a lover through the app to accompany me for the rest of life. At the same time, I can also be her mentor and share with her my years of experience in cancer treatment.
	
3. As an employee of Malecare and an administrator of Cancerchat, I just discovered that there is a clinical trial in Toronto for breast cancer treatment looking for volunteers between ages 30 and 40. I would like to send this news through the app to all breast cancer patients who are between the ages of 30 and 40 and live in Toronto so that they can decide whether to take a part in the clinical trial.
	
4. As an employee of Malecare and an administrator of Cancerchat, I found that one user has been reported for spamming. I look at the chat history of the user and find out that the user is bragging about a “latest treatment” on stomach cancer. The user said he/she would share it at a cost of $500. I immediately realize that this is a spamming message so I banned that user's account and put his/her email in the blacklist so he/she can't create another account with this email.
	
5. As a 28-year-old male cancer patient who has just come to Canada from the UK, I hope this app can detect that I have moved, and can recommend me to people who live in the same city as me, preferably no more than 5km away from me. In this way, I can make some like-minded friends staying the same city with me through the app to expand my new social circle and quickly integrate into the new life around me.

6. As a 40-year-old breast cancer patient living in New York City, I would like to receive information about clinical trials and new treatments available close to my living area by using this app. Then, I can access a drug to which I might not have the access/not aware otherwise.

----

## Process Details

#### Q6: What are the roles & responsibilities on the team?

 #### Xiaomeng: 
 Roles: 
 
 Scrum manager: I will keep an eye on the development progress tell people when things fall behind
 
 Communicator: I'm responsible for communicating with the customer because I'm located in Toronto so I don't have any time difference with the customer. 
 
 Front-end developer: Responsible for implementing the login and sign-up page, as well as the administration page.
 
 Technical strengths: 
 1. I worked with React before so I'm familiar with it.
 2. I have taken csc309 so I know what it takes to succeed in a group project (things like keeping in good communication and dividing up the work as evenly as possible)
 3. I have experience working with node.js 
 Technical weaknesses: 
 1. I'm not very good at database-related work
 2. I'm weak at designing UI
 3. I'm not familiar with the deployment process
 
 #### Ruikai:
 Roles: 
 
 Front-end developer: Responsible for implementing the matching page, and the full profile page.
 
 QA: I will write unit tests and test the functionalities with hands
 
 Technical strengths: 
 1. I'm good at database-related work
 2. I worked on some React Native projects, and learning React should be easy for me.
 3. I'm good at designing UI that is comfortable and easy to work with
 Technical weaknesses: 
 1. Not much experience in working on a web app
 2. Never worked with node.js before so this part is quite challenging
 3. I have never worked on a complex project with a group so I'll have to learn how to collaborate with people

 #### Rui: 
 Roles: 
 
 Product manager: I'll design the product, both the functionalities and the UI
 
 Backend developer: I'll come up with a good matching algorithm and implements it so that each user can be matched to people that satisfy their requirements.
 
 Technical strengths: 
 1. I'm good at designing UI
 2. I took many algorithm courses and did well in them, and I have confidence in the matching algorithm that I am going to design.
 3. I'm familiar with database-related work.
 Technical weaknesses: 
 1. I don't have much experience working on a web app, and I haven't taken csc309 (Web Programming) so javascript is new to me
 2. Writing unit tests can be challenging for me
 3. Not familiar with the deployment process
 
 
  #### Jiayueran: 
  Roles: 
  
  Backend developer: I'm responsible for all the database related work
  
  Technical strengths: 
  1. I have taken CSC343 (Intro to Database) and did well in it, so working with SQL is not new to me. I'm also familiar with MongoDB.
  2. I have worked on some node.js projects so I feel comfortable using node.js
  3. I'm good at various algorithms, and they should be useful when working on a project
  Technical weaknesses: 
  1. I don't have much front-end development experience.
  2. I find it hard for me to come up with a good-looking UI.
  3. I have never worked on such a large project with a group.
 
 
 #### Meilin: 
 Roles: 
 
 Communicator: I'm responsible for communicating with the customer
 
 Backend developer: I'm responsible for the rest of the backend work
 
 QA: I will be responsible for writing unit tests 
 
 Technical strengths: 
 1. I'm a careful person and like testing stuff out thoroughly
 2. I'm good at coding and likes learning new technologies, so I'm excited to have the chance to learn node.js
 3. I'm familiar with database-related stuff
 Technical weaknesses: 
 1. I only started learning web development related stuff in assignment 1 so it's still new to me
 2. I'm not very good at design UI
 3. It takes time for me to understand new algorithms.
 
 

#### Q7: What operational events will you have as a team?

Our team members are located in different countries so we can't have in-person meetings. Instead, We'll stay in touch via WeChat and zoom. We have decided to have at least one online zoom meeting a week so that everyone can report on what they have done and what they're planning to do, as well as the problems they have. 
We had our first meeting with our partner, Darryl, on Oct. 7th. During the meeting, we first introduced ourselves and Darryl shared some of his stories and told us how he came up with the idea for the project. He also cleared up our questions, some of which are:
#### Q: Who would be the target user of our product?
People with cancer who wants to date someone, find a mentor or mentee.
#### Q: Do you want this to be a mobile app or web app?
Either is fine. You can make the choice based on your design.
#### Q：Is there any website that we can refer to?
https://cancergraph.com/
We have also agreed on a bi-weekly meeting schedule.

We had a second meeting with Darryl on Oct 14th. The main purpose of the meeting is to present him with our draft D1 and get some feedback. Here are the meeting minutes:

1.Showed the user stories in D1 and the mock-up pages to Darryl to get feedback

2.Not a facebook-like app, just a platform to meet people. All the other things can happen in the background

3.Bigger message icon

4.The user should be able to go back to the previous match

5.Simple simple simple

6.Keep spammers off, report button, administrators should be able to handle this

7.Administrator messages can be pinned till the user reads it, or 72 hours

8.A user should not send too many messages to another user who hasn’t respond (no more than 2 messages for the first time, and 5 in the future), and the user should be able to block other people

9.Send photos and emojis in messages

10.Medication and types of cancer are lists, there might be hundreds of them, with the correct spelling. We don’t want the user to type in whatever they want because they may spell it wrong.

11.What our app can do: add something about new treatment 

12.No logo currently

13.Consider adding permission to chat

14.3 Labels sound good(mentor, mentee, looking for love)

15.Kms vs miles

  
#### Q8: What artifacts will you use to self-organize?

We'll be using a shared google sheet as a task board. Each task would have a status field, and the field value can be Open, In Progress, Resolved, or Blocked. Before we start working on the project, we would have at least 2 meetings on how to divide up the work, and based on the meeting outcome, each task would be assigned to a team member with a status of Open. When he/she starts working on the task, the status of the task would be changed to In Progress. If he/she successfully finished the task, the task status would be updated to Resolved. If some blockers showed up, he/she can change the status to Blocked and the team can discuss it during the next team meeting.

Each task would also have a priority assigned to it, starting from p1 to p3. For a minor bug such as font adjustment, we would prioritize it as P3. For regular tasks, such as implementing the sign-up page, or a bug which leads to failure in sending messages, we will prioritize it as P2. For really serious bugs, such as the server is down, it would be prioritized to P1, and any free group member must be looking at it asap.

#### Q9: What are the rules regarding how your team works?

**Communications:**
 
The teams would be communicating with each other via the WeChat channel and zoom calls. For regular questions, we encourage the members to ask directly in the WeChat group chat to get a quick answer. In terms of the bigger questions, such as a design issue, we would discuss it in the weekly zoom calls. All communications must be conducted in a friendly and peaceful environment. We also encourage meaningful and efficient communications, rather than aimless chat.
In terms of communicating with the partner, we have agreed on a bi-weekly meeting schedule to keep everything on track. Between the meetings, we will communicate via emails to get quick answers to questions. 
 
**Meetings:**
 
There are 5 people in our group and we'll take turns to host the meeting. In each meeting, we'll begin with everyone sharing their working progress. After that, we'll take a look at the action items from the last meeting to see if all of them have been resolved. Next, we'll discuss the blocked tasks on the task board, from highest to lowest priority. At the end of the meeting, we'll come up with the action items to be done before the next meeting and assign them to team members. 
 
**Conflict Resolution:**
 1. What to do if we can't achieve consensus？
We've been in that situation before. When we were discussing what stack technology to use for the backend, we narrowed down the options to two - node.js and flask. They all have their pros and cons, thus the team members cannot decide which one to use. So in the end, we had a vote. 2 people voted flask and 3 voted node.js, so we decided to use node.js for the backend. This is just an example of how to make a decision when we can't achieve consensus, and we'll take a vote whenever we get into that situation again in the future.
 
 2. What to do if any team member is not responsive?
 All of the team members have a strong sense of responsibility so I assume that this is not very likely to happen, but just in case, we did discuss this in our last meeting. If any team member is not responsive in any way for more than 48 hours (this is a rather long time because the time difference among the team members can be up to 12 hours, and we want to be generous on this), we would report the member to the professor immediately and see what's the next step to do.
 
 3. What to do if a team member doesn't contribute to the group work?
 We'll tell how much work a team member has done from the git commit history. If for any Deliverable, a team member has contributed less than 10% of the total changes, then we'll issue a warning to him/her so that they know for the next Deliverable, they are expected to do more work. If a team member contributes less than 10% of the work for successive two Deliverables, then we'll report him/her to the professor and see what's the next step to do.


----
### Highlights

#### 3 key decisions
1. We had a vote on the technology stacks we are going to use.For the frontend, we all agree with using react. The main reason is that all of us are familiar with React, and there are many libraries that can provide many good-looking components to facilitate the design of front-end pages.For the backend and database, we have different opinions on what stack to use. Some people want to choose flask and MySql, others want to choose nodejs and mongoDB.
	- pros of Flask: 
		1. python is the most familiar language
		2. get start quickly
	- pros of Nodejs: 
		1. Nodejs is also based on javascript, which has similar syntax to frontend
		2. Nodejs's runtime is faster than flask
		3. Nodejs is more easily scalable network applications 
	- pros of MySql:
		1. all of us have experience using Sql, there is no need to set up again
		2. get start quickly
	- pros of MongoDB:
		1. allows all sizes organizations, especially as a cloud database
		2. handle highly diverse data types, and manage applications more efficiently at scale
		3. build applications faster

After voting, we choose Node.js and MongoDB, since it's apparent that this combination has more advantages.

**update:** We switched to Flask and MongoDB, because we have worked with Flask in assignment2.

2. Divide up the work through several meetings
Since there are five people in our group and our project is a dating software, the front-end requires more time and coding compared to the backend, so we decided to have three people in charge of the front-end and two other people in charge of the back-end and database. We have made choices based on personal preference. 
Finally determined: front-end: Xiaomeng Hu, Ruikai Fang, Meilin Yang; back-end: Rui Zhu, Jiayueran Sun

3. Product details from the meeting with the customer
	1. Write the user and administrator page respectively
	2. Provide users with the latest cancer-related information. For example, a certain organization has just developed an effective drug to treat skin cancer, but many cancer patients do not know this news in time. Our app will remind users as soon as possible.
	3. Show users the distance between them and other users.
	4. Detect users' latest location and recommend users to people who live in the same city as them.

