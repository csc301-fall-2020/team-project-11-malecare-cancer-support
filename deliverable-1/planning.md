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
 
We are planning to build a website, providing matches to cancer patients to hook-up, look for a mentor, or become other patients' mentors.

#### Q: How to provide matches for users?
	First, Our product will provide several tags (e.g. Need-Mentor, Want-Hookup, etc) to let users choose from, users can define  
	their purpose by choosing the correct tags for themselves.  
	Then the product can provide matches for users. (see below)

#### Q: How to match up users?
	Our product will have a setting(tags, ages, gender, location, etc) on the main page.  
	It makes sure that the matches we provide meet the user's will. 

#### Q:  How to show matches?
	On the main page, our product will display a person's photos and profiles once a time. 

#### Q:  What operations can users do for matches?
	Users can make these decisions: 
 	- Chat with him
 	- Show more about him
 	- Swap to next person
 
(The mock-ups needed)

#### Q2: Who are your target users?
	The target users are cancer patients who have (one or multiple) below needs: 
	- Want to hook-up 
	- Want to have a mentor 
	- Want to be a mentor

  > Short (1 - 2 min' read max)
 * Be specific (e.g. a 'a third-year university student studying Computer Science' and not 'a student')
 * **Feel free (but not obligated) to use personas.         
   You can create your personas as part of this Markdown file, or add a link to an external site (for example, [Xtensio](https://xtensio.com/user-persona/)).**
   



#### Q3: Why would your users choose your product? What are they using today to solve their problem/need?
	The product provides several matches as user required.
	Users will see the tags for this match in the profile section, to verify the requirement. 
	Moreover, the product provides a chatroom for users who have an agreement on matches to chat.

	Since there are no similar apps available now, we are providing a new platform for them to use. 
	The product also requires the user to define themselves' need and use filter to search,   
	in this way we can provide users with matches that meet user's requirements.
	
	This product follows the instruction that the partner provided and the main functionality  
	are decided on the meeting with the partner.

> Short (1 - 2 min' read max)
 * We want you to "connect the dots" for us - Why does your product (as described in your answer to Q1) fits the needs of your users (as described in your answer to Q2)?
 * Explain the benefits of your product explicitly & clearly. For example:
    * Save users time (how much?)
    * Allow users to discover new information (which information? And, why couldn't they discover it before?)
    * Provide users with more accurate and/or informative data (what kind of data? Why is it useful to them?)
    * Does this application exist in another form? If so, how does your differ and provide value to the users?
    * How does this align with your partner's organization's values/mission/mandate?
    
No similar apps and they have needs
(what the app can do: find people also have cancer and can understand each other)

#### Q4: How will you build it?

> Short (1-2 min' read max)
 * What is the technology stack? Specify any and all languages, frameworks, libraries, PaaS products or tools. 
 * How will you deploy the application?
 * Describe the architecture - what are the high level components or patterns you will use? Diagrams are useful here. 
 * Will you be using third party applications or APIs? If so, what are they?
 * What is your testing strategy?
#### Q: What is the technology stack? Specify any and all languages, frameworks, libraries, PaaS products or tools. 
	We will use javascript for the entire software, and choose react and nodejs as frameworks to complete 
	the front-end and back-end respectively. We may use antd as our frontend library. Also, AWS EC2, heroku, and mangodb 
	are Paas tools which may use in our project.
	
#### Q: How will you deploy the application?
	After complementation, we may deploy our web app through aws or heroku.
	
#### Q: Describe the architecture - what are the high level components or patterns you will use? Diagrams are useful here. 
	We use mango db as our online database, which is high level component.
	
#### Q: Will you be using third party applications or APIs? If so, what are they?
	As a dating app, we hope to provide users with the approximate distance between other users, which requires 
	the google map API.
	
#### Q: What is your testing strategy?
	-Not Sure
 

#### Q5: What are the user stories that make up the MVP?

 * At least 5 user stories concerning the main features of the application - note that this can broken down further
 * You must follow proper user story format (as taught in lecture) ```As a <user of the app>, I want to <do something in the app> in order to <accomplish some goal>```
 * If you have a partner, these must be reviewed and accepted by them
 * The user stories should be written in Github and each one must have clear acceptance criteria.
 
#### 5 user story
	1. As a 25-year-old patient who has just been found to have cancer, I want to find a mentor in the app, who can 
	guide me to fight the disease more optimistically.
	2. As a 54-year-old single man with terminal cancer, whose wife has left, I hope to find a lover in the app in 
	order to accompany me for the rest of my life.
	3. As a 32-year-old male cancer patient, who prefer male lover, I hope to meet other men with cancer in the app and 
	fall in love with him, then we fight with cancer togather.
	4. As a 58-year-old patient who has been suffering from cancer for 20 years, I hope to find people in need of mentor in 
	the app and share my experience with the disease to them, so that they can be as optimistic and happy as I am.
	5. As a 28-year-old cancer patient who has just come to Canada from the UK, I hope to make some like-minded friends in the 
	app to expand my social circle and quickly integrate into the life around me。
	6. As a 22-year-old cancer patient, whose boyfriend me because I was found to be suffering from cancer, I hope to find a 
	boyfriend who is also a cancer 	patient, who will understand me better, as well as guiding me on how to face cancer.

----

## Process Details

#### Q6: What are the roles & responsibilities on the team?

Describe the different roles on the team and the responsibilities associated with each role. 
 * Roles should reflect the structure of your team and be appropriate for your project. Not necessarily one role to one team member.

List each team member and:
 * A description of their role(s) and responsibilities including the components they'll work on and non-software related work
 * 3 technical strengths and weaknesses each (e.g. languages, frameworks, libraries, development methodologies, etc.)
 Xiaomeng: frontend
 Ruikai: tbd
 Rui: backend
 Jiayueran: backend
 Meilin: tbd

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

We'll stay in touch via WeChat and zoom so that...
time difference
What's the purpose of each meeting? : stay on the same page and divide up the work

  
#### Q8: What artifacts will you use to self-organize?

List/describe the artifacts you will produce in order to organize your team.       

 * Artifacts can be To-Do lists, Task boards, schedule(s), meeting minutes, etc.
 * We want to understand:
   * How do you keep track of what needs to get done?
   * How do you prioritize tasks?
   * How do tasks get assigned to team members?
   * How do you determine the status of work from inception to completion?

todo list(a shared google doc)

#### Q9: What are the rules regarding how your team works?

Describe your team's working culture.

**Communications:**
 * What is the expected frequency? What methods/channels are appropriate? 
 * If you have a partner project, what is your process (in detail) for communicating with your partner?
 
**Meetings:**
 * How are people held accountable for attending meetings, completing action items? Is there a moderator or process?
 
**Conflict Resolution:**
 * List at least three team scenarios/conflicts you discussed in lecture and how you decided you will resolve them. Indecisions? Non-responsive team members? Any other scenarios you can think of?




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
 
 1. we had a vote on the technology stacks we are going to use
 3. divide up the work(personal preference)
 4. product details from the meeting with the customer
