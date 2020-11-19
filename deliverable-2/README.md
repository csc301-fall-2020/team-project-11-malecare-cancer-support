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