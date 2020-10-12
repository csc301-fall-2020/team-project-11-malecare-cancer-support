# YOUR PRODUCT/TEAM NAME
> _Note:_ This document is meant to evolve throughout the planning phase of your project.   That is, it makes sense for you commit regularly to this file while working on the project (especially edits/additions/deletions to the _Highlights_ section). Most importantly, it is a reflection of all the planning you work you've done in the first iteration. 
 > **This document will serve as a master plan between your team, your partner and your TA.**

## Product Details
 
#### Q1: What are you planning to build?

 > Short (1 - 2 min' read)
 * Start with a single sentence, high-level description of the product.
 * Be clear - Describe the problem you are solving in simple terms.
 * Be concrete. For example:
    * What are you planning to build? Is it a website, mobile app,
   browser extension, command-line app, etc.?      
    * When describing the problem/need, give concrete examples of common use cases.
    * Assume your the reader knows nothing about the problem domain and provide the necessary context. 
 * Focus on *what* your product does, and avoid discussing *how* you're going to implement it. 
   For example: This is not the time or the place to talk about which programming language and/or framework you are planning to use.
 * **Feel free (and very much encouraged) to include useful diagrams, mock-ups and/or links**.
 
We are planning to build a web-based, Tinder-like app that serves as a platform, on which the cancer patients can be matched to other cancer patients that meets their requirements. The users of our app can find someone to date, or someone as a mentor who can share their stories fighting with cancer. The users themselves can also be mentors and they're able to find someone who wants to be mentored in our app.

Other than cancer patients, people from MaleCare (our project partner) will play the roles of administrators in our app, and they'll have a separate administration page. The main functionality of administrators is that they're able to send out news to a specific group of cancer patients. For example, if a new treatment has just been found to be effective to treat breast cancer, then the administrator can choose to send out this exciting news to the users with breast cancer. 

#### Q: How to help patients who want to find mentors or find other patients to date?
	Our product will provide matches for patients, they can create accounts and log in. 
	As they create accounts, they need to choose their tags(e.g. Mentor, Mentee, Looking For Love). 
	After login, the matches will be shown on the main page, if they have specific requirements, we provide a filter for them to use.
<img src="https://github.com/csc301-fall-2020/team-project-11-malecare-cancer-support/blob/master/deliverable-1/mock-ups/register.jpg " width="600" height="1350" alt="matches"/>

#### Q: How does the filter works?
	If the patient does not have a specific requirement, it will provide the default filter settings based on the tags 
	in the user's profile. If they have specific requirements, they have a few tags and other settings to set the filter 
	to show the person who meets their requirement.

#### Q:  How can people from Melecare send the news to a specific group of patients?
	We will provide them accounts to login. After login, they can send the news to the patients(specific groups) they want to.
<img src="https://github.com/csc301-fall-2020/team-project-11-malecare-cancer-support/blob/master/deliverable-1/mock-ups/admin.jpg" width="800" height="600" alt="profile"/>

#### Q:  What operations can users do for matches?
	Users can make these decisions: 
 	- Chat with him
 	- Show more about him
 	- Swap to next person
<img src="https://github.com/csc301-fall-2020/team-project-11-malecare-cancer-support/blob/master/deliverable-1/mock-ups/match.jpg " width="800" height="600" alt="matches"/>
 
#### Q2: Who are your target users?
	The target users are cancer patients who have (one or multiple) below needs: 
	- Want to hook-up 
	- Want to have a mentor 
	- Want to be a mentor
	- Malecare staff who want to send the news to specific groups of patients.

  > Short (1 - 2 min' read max)
 * Be specific (e.g. a 'a third-year university student studying Computer Science' and not 'a student')
 * **Feel free (but not obligated) to use personas.         
   You can create your personas as part of this Markdown file, or add a link to an external site (for example, [Xtensio](https://xtensio.com/user-persona/)).**
   



#### Q3: Why would your users choose your product? What are they using today to solve their problem/need?
	The product provides a platform where the cancer patients can meet other cancer patients,
	either they want to date or find themselves a mentor or mentee. Users would be matched based on their tags.
	Malecare staff can log in to this product and send news to groups of patients.
	
	Malecare staff can only use this product since there is no product now for them to send groups of patients news.
	For patients, Since there are no similar apps available now for patients, we are providing a new platform for patients to use.
	
	Since the product provide filter and tags to filter the matches, this will save the patients time searching without 
	tags and also bring patients more accurate matches.
	
	This product will provide our partner's organization's (Malecare) the staff accounts for them 
	to send the news to the specific groups of patients.

> Short (1 - 2 min' read max)
 * We want you to "connect the dots" for us - Why does your product (as described in your answer to Q1) fits the needs of your users (as described in your answer to Q2)?
 * Explain the benefits of your product explicitly & clearly. For example:
    * Save users time (how much?)
    * Allow users to discover new information (which information? And, why couldn't they discover it before?)
    * Provide users with more accurate and/or informative data (what kind of data? Why is it useful to them?)
    * Does this application exist in another form? If so, how does your differ and provide value to the users?
    * How does this align with your partner's organization's values/mission/mandate?
    

#### Q4: How will you build it?

> Short (1-2 min' read max)
 * What is the technology stack? Specify any and all languages, frameworks, libraries, PaaS products or tools. 
 * How will you deploy the application?
 * Describe the architecture - what are the high level components or patterns you will use? Diagrams are useful here. 
 * Will you be using third party applications or APIs? If so, what are they?
 * What is your testing strategy?
#### Q: What is the technology stack? Specify any and all languages, frameworks, libraries, PaaS products or tools. 
	We will use javascript for the entire software, and choose react and node.js as frameworks to complete 
	the front-end and back-end respectively. We may use martial ui as our frontend library. What's more, AWS EC2, heroku, and mangodb 
	are Paas tools which we may use in our project.
	
#### Q: How will you deploy the application?
	We may deploy our web app through aws.
	
#### Q: Describe the architecture - what are the high level components or patterns you will use? Diagrams are useful here. 
	We use MongoDB as our online database, which is a high level component.
	We will use mvvm pattern for the frontend.
	 ????????
	
#### Q: Will you be using third party applications or APIs? If so, what are they?
	As a dating app, we hope to provide users with the approximate distance between other users, which requires 
	the google map API.
	
#### Q: What is your testing strategy?
	We may use AVA test framework to write unit test for our javascript code and run the test file using github actions 
	to test auotomatically. As well as, we will perform manual operations on the front-end page as much as possible to 
	mock how users use our web-app to make sure there are no operation bugs.
 

#### Q5: What are the user stories that make up the MVP?

 * At least 5 user stories concerning the main features of the application - note that this can broken down further
 * You must follow proper user story format (as taught in lecture) ```As a <user of the app>, I want to <do something in the app> in order to <accomplish some goal>```
 * If you have a partner, these must be reviewed and accepted by them
 * The user stories should be written in Github and each one must have clear acceptance criteria.
 
#### 5 user story
	1. As a 25-year-old man who has just been found to have cancer, I want to find a mentor in the app, who can 
	guide me to fight the disease more optimistically.
	
	2. As a 54-year-old single man with terminal cancer, whose wife left one year ago, I hope to find a lover in the app in 
	order to accompany me for the rest of my life.
	
	3. As a 32-year-old male cancer patient, who prefers male lovers, I hope to meet other male cancer patients in the app and 
	fall in love with him, then we fight with cancer togather.
	
	4. As a 58-year-old female patient who has been suffering from cancer for 20 years, I hope to find people in need of mentor in 
	the app and share my experience with the disease to them, so that they can be as optimistic and happy as me.
	
	5. As a 28-year-old male cancer patient who has just come to Canada from the UK, I hope to make some like-minded friends in 
	the app to expand my social circle and quickly integrate into the life around me.
	
	6. As a 22-year-old female cancer patient, whose boyfriend left me because I was found to have cancer, I hope to find a 
	boyfriend who is also a cancer patient, who will understand me better, as well as guide me to face cancer.

----

## Process Details

#### Q6: What are the roles & responsibilities on the team?

Describe the different roles on the team and the responsibilities associated with each role. 
 * Roles should reflect the structure of your team and be appropriate for your project. Not necessarily one role to one team member.

List each team member and:
 * A description of their role(s) and responsibilities including the components they'll work on and non-software related work
 * 3 technical strengths and weaknesses each (e.g. languages, frameworks, libraries, development methodologies, etc.)
 
 #### Xiaomeng: 
 Roles: 
 Scrum manager: I will keep an eye on the development progress tell people when things fall behind
 Communicator: I'm reponsible for communicating with the customer because I'm located in Toronto so I don't have any time difference with the customer. 
 Frontend developer: Responsible for implementing the login and sign-up page, as well as the administration page.
 Technical strengths: 
 1. I worked with React before so I'm familiar with it.
 2. I have taken csc309 so I know what it takes to succeed in a group project (things like keeping in good communication, and dividing up the work as evenly as possible)
 3. I have experience working with node.js 
 Technical weaknesses: 
 1. I'm not very good at database-related work
 2. I'm weak at designing UI
 3. I'm not familiar with the deployment process
 
 #### Ruikai:
 Roles: 
 Frontend developer: Responsible for implementing the matching page, and the full profile page.
 QA: I will write unit tests and test the functionalities with hands
 Technical strengths: 
 1. I'm good at database-related work
 2. I worked on some React Native projects, and learning React should be easy for me.
 3. I'm good at designing UI that are comfortable and easy to work with
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
 2. Writing unit tests can be challenging to me
 3. Not familiar with the deployment process
 
 
  #### Jiayueran: 
  Roles: 
  Backend developer: I'm responsible for all the data-base related work
  Technical strengths: 
  1. I have taken CSC343 (Intro to Database) and did well in it, so working with sql is not new to me. I'm also familiar with MongoDB.
  2. I have worked on some node.js projects so I feel comfortable using node.js
  3. I'm good at various algorithms, and they should be useful when working on a project
  Technical weaknesses: 
  1. I don't have much frontend development experience.
  2. I find it hard for me to come up with a good-looking UI.
  3. I have never worked on such a large project with a group.
 
 
 #### Meilin: 
 Roles: 
 Communicator: I'm reponsible for communicating with the customer
 Backend developer: I'm responsible for the rest of the backend work
 QA: I will be responsible for writing unit tests 
 Technical strengths: 
 1. I'm a careful person and like testing stuff out throughly
 2. I'm good at coding and likes learning new technologies, so I'm excited to have the chance to learn node.js
 3. I'm familiar with database-related stuff
 Technical weaknesses: 
 1. I only started learning web development related stuff in assignment 1 so it's still new to me
 2. I'm not very good at design UI
 3. It takes time for me to understand new algorithms.
 
 

#### Q7: What operational events will you have as a team?

Describe meetings (and other events) you are planning to have. 
 * When and where? Recurring or ad hoc? In-person or online?
 * What's the purpose of each meeting?
 * Other events could be coding sessions, code reviews, quick weekly sync meeting online, etc.
 * You must have at least 2 meetings with your project partner (if you have one) before D1 is due. Describe them here:
   * What did you discuss during the meetings?
   * What were the outcomes of each meeting?
   * You must provide meeting minutes.
   * You must have a regular meeting schedule established by the second meeting.  

Our team members are located in different countries so we can't have in-person meetings. Instead, We'll stay in touch via WeChat and zoom. We have decided to have at least one online zoom meeting a week so that everyone can report on what they have done and what they're planning to do, as well as the problems they have. 
We had our first meeting with our partner, Darryl, on Oct. 7th. During the meeting, we first introduced ourselves and Darryl shared some of his stories and told us how he came up with the idea of the project. He also cleared up our questions, some of which are:
#### Q: Who would be the target user of our product?
        People with cancer who wants to date someone, or wants to find mentors who can share their experience. We would also have some users as adminiatrators from Malecare and they can send messages about things like new treatment to target cancer patients
#### Q: Do you want this to be a mobile app or web app?
	Either is fine. You can make the choice based on your design.
#### Q：Is there any website that we can refer to?
	https://cancergraph.com/
We have also agreed on a bi-weekly meeting schedule.
  
#### Q8: What artifacts will you use to self-organize?

List/describe the artifacts you will produce in order to organize your team.       

 * Artifacts can be To-Do lists, Task boards, schedule(s), meeting minutes, etc.
 * We want to understand:
   * How do you keep track of what needs to get done?
   * How do you prioritize tasks?
   * How do tasks get assigned to team members?
   * How do you determine the status of work from inception to completion?

We'll be using a shared google sheet as a task board. Each task would have a status field, and the field value can be open, in progress, resolved, or blocked. Before we start working on the project, we would have at least 2 meetings on how to divide up the work, and based on the meeting outcome, each task would be assigned to a team member with a status of open. When he/she starts working on the task, the status of the task would be changed to in progress. If he/she successfully finished the task, the task status would be updated to resolved. If some blockers showed up, he/she can change the status to blocked and the team can discuss it during the next team meeting.

Each task would also has a priority assigned to it, starting from p1 to p3. For a minor bug such as font adjustment, we would priotize it as P3. For regular tasks, such as implementing the sign-up page, or a bug which leads to failure in sending messages, we will prioritize it as P2. For really serious bugs, such as the server is down, it woule be priotized to P1, and any free group member must be looking at it asap.

#### Q9: What are the rules regarding how your team works?

Describe your team's working culture.

**Communications:**
 * What is the expected frequency? What methods/channels are appropriate? 
 * If you have a partner project, what is your process (in detail) for communicating with your partner?
 
The teams would be communicating with each other via the WeChat channel and zoom calls. For regular questions, we encourage the members to ask directly in the WeChat group chat to get a quick answer. In terms of the bigger questions, such as a design issue, we would discuss it in the weekly zoom calls. All communications must be conducted in a friendly and peaceful environment. We also encourage meaningful and efficient communications, rather than aimless chat.
In terms of communicating with the partner, we have agreed on a bi-weekly meeting shcedule to keep everything on track. Bewteen the meetings, we will communicate via emails to get quick answers to questions. 
 
**Meetings:**
 * How are people held accountable for attending meetings, completing action items? Is there a moderator or process?
 
There are 5 people in our group and we'll take turns to host the meeting. In each meeting, we'll begin with everyone sharing their working progress. After that, we'll take a look at the action items from last meeting to see if all of them have been resolved. Next, we'll discuss the blocked tasks on the task board, from highest to lowest priority. At the end of the meeting, we'll come up with the action items to be done before the next meeting and assign them to team members. 
 
**Conflict Resolution:**
 * List at least three team scenarios/conflicts you discussed in lecture and how you decided you will resolve them. Indecisions? Non-responsive team members? Any other scenarios you can think of?
 1. What to do if we can't achieve consensus？
We've been in that situation before. When we were duscussing what stack technology to use for the backend, we narrowed down the options to two - node.js and flask. They all have their pros and cons, thus the team members cannot decide which one to use. So in the end, we had a vote. 2 people voted flask and 3 voted node.js, so we decides to use node.js for backend. This is just a example of how to make a decision when we can't achieve consensus, and we'll take a vote whenver we get into that situation again in the future.
 
 2. What to do if any team member is not responsive?
 All of the team members have a strong sense of responsibility so I assume that this is not very likely to happen, but just in case, we did discuss this in our last meeting. If any team member is not responsive in any way for more than 48 hours (this is a rather long time because the time difference among the team members can be up to 12 hours, and we want to be generous on this), we would report the member to the professor immediately and see what's the next step to do.
 
 3. What to do if a team member doesn't contribute to the group work?
 We'll tell how much work a team member has done from the git commit history. If for any Deliverable, a team member has contributed less than 10% of the total changes, then we'll issue a warning to him/her so that they know for the next Deliverable, they are expected to do more work. If a team member contributes less than 10% of the work for successive two Deliverables, then we'll report him/her to the professor and see what's the next step to do.


----
### Highlights

Specify 3 - 5 key decisions and/or insights that came up during your meetings
and/or collaborative process.

 * Short (5 min' read max)
 * Decisions can be related to the product and/or the team process.
    * Mention which alternatives you were considering.
    * Present the arguments for each alternative.
    * Explain why the option you decided on makes the most sense for your team/product/users.
 * Essentially, we want to understand how (and why) you ended up with your current product and process plan.
 * This section is useful for important information regarding your decision making process that may not necessarily fit in other sections. 
#### 3 key decisions
	1. We had a vote on the technology stacks we are going to use.
		For frontend, we all agree with using react. The main reason is that all of us are familiar with React, and there are 
		many libraries that can provide many good-looking components to facilitate the design of front-end pages.
		For backend, we have different oppinions on what stack to use. Some people want to choose flask and mysql, others 
		want to choose nodejs and mangodb.
			pros of Flask and mysql: 
				1. python is the most familiar language and all of us have expereince using sql
				2. get start quickly
			pros of Nodejs and mangodb: 
				1. Nodejs is also based on javascript, which having similar syntax with frontend
				2. Nodejs's runtime is faster than flask
				3. Nodejs is more easily scalable network applications 
		For database, we have different opinions on what stack to use. Some people want to choose flask and mysql, others 
		prefer nodejs and mangodb.
			pros of mysql:
				1. all of us have expereince using sql
				2. get start quickly
			pros of mangodb:
				1. allows all sizes organizations, especially as a cloud database
				2. handle highly diverse data types, and manage applications more efficiently at scale
				3. build applications faster
		After voting, we choose nodejs and mangodb, since it's apparently that this combination has more advantages.
	2. Divide up the work through several meetings
		Since there are five people in our group and our project is a dating software, the front-end requires more time and 
		coding compared to the backend, so we decided to have three people in charge of the front-end and two other people 
		in charge of the back-end and database. We have made choices based on personal preference. 
		Finally determined: front-end: Xiaomeng Hu, Ruikai Fang, Meilin Yang; back-end: Rui Zhu, Jiayueran Sun
 	3. Product details from the meeting with the customer
		1. Write the user and administrator page respectively
		2. Provide users with the latest cancer related information. For example, a certain organization has just developed
		an effective drug to treat skin cancer, but many cancer patients do not know this news in time. Our app will remind
		users as soon as possible.
		3. Show users the distance between them and other users
