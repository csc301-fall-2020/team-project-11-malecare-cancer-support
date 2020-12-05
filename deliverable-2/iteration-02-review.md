# CancerChat/Team 11

## Iteration XX - Review & Retrospect

 * When: November 19
 * Where: Online

## Process - Reflection


#### Q1. Decisions that turned out well

 
1. We decide to divide features into things to be done in D2 and D3 before we started. This gives us a set of more concrete goals of what we need to accomplish for D2. 

    D2: register/login, profile, match, chat(only text), admin notification, main page, request page

    D3: block, report, rich text editor for chat, geolocation, storing pictures on AWS S3

2. We are having a task board to assign work to each other. 
    - This enables us to have fewer conflicts when working on one codebase. For instance, if someone finds a bug when running other team member's code, they can find out who is in charge of that part and ask them for fixing the bug, instead of trying to fix it on their own. Changing other people's code without notifying them ahead may results in conflicts and more bugs.
    - Also, the goals are trackable and everyone can see the concrete progress of our team. https://docs.google.com/spreadsheets/d/1IbYSnSneb-Hv0m9sljIn_qT3puhcViF-GEtengPN3bk/edit#gid=0 
    - We chose to use a google sharing spreadsheet for the task board because some other task tracker apps, such as JIRA and Asana, require set-ups or learning processes, whereas we can just jump in and use google spreadsheet without any prior preparation. 


#### Q2. Decisions that did not turn out as well as we hoped

1. We underestimated the time needed to finish D2 and started late. In the end, everyone was exhausted to implement the functionalities before the deadline. 

2. We decided to have only weekly group meetings because we wanted every team member to schedule their time freely according to their calendar, as long as they can finish their assigned work. However, some team members struggled to finish the task on time and the other team members didn't find out till near the deadline because our meetings were not frequent enough. In D3, we need to have more frequent meetings so we can better keep track of everyone's progress and adjust the delivery plan accordingly. 

3. To save time, the team has decided to not spending time designing the parameters of APIs and start directly. Because the frontend and backend were implemented asynchronously, sometimes we had to change the API that has been written to meet the needs of the frontend, which wasted a lot of time, and also produced some hard-to-find bugs.


#### Q3. Planned changes

1. Share deadlines, organize better:  
Though in the past few months, we are doing fine organizing and splitting the work, we think that we can organize our group work better if we share our deadlines and our time schedules ahead. Since our group members are in different time zones and we have different coursework, 
we think it would be a good idea to take every member's personal schedule and project deadlines into consideration when planning and assigning works. We have also planned to divide the work into several small milestones.
2. Agree on API before developing new features:  
At deliverable-2, we started our coding work before designing APIs. This means overtimes, members who work at the front-end will need to communicate with back-end members on deciding APIs. This is more time consuming than we thought due to the timezone issue. It will be efficient if we can agree on complete APIs before doing our work.
3. More meetings, more communication:  
At deliverable-2, we have weekly meetings with MaleCare and have a lot of group meetings. However, we still think this is not enough. We need to have more communication with group members as well as MaleCare. We can know our group members' working progress even better. If some of the group members need help, we can help them. In the following meetings, we will discuss with the client which features they would like to prioritize in development.
4. Divide milestones:  
At deliverable-2, we did not deploy the app soon enough which caused many problems when we finally deployed the app and found out that the production environment is very different from the development environment. In the following deliverables, we will try to divide the milestones and push to master branch more often, and also deploy the app earlier to see if any problem shows up after switching to the production environment.

## Product - Review

#### Q4. How was your product demo?

We prepared our demo by practicing going through the whole demo process several times. We did not prepare any slides but just showing the product itself. 

We did the demo by sharing a screen on Zoom meeting with our partner. We managed to demo some basic functionalities of our product. We showed our partner how a non-admin user uses our app to chat, to find matches, and to customize personal profiles. We also showed him how an administrator sends messages to selected users. Our partner accepted the features. He also gave some suggestions on how to improve the product to make it more user-friendly.

We learned from this demo that it is important to have a stable version of the product to do the demo. We did not encounter any technical issues while doing the demo since we had our product well prepared. Also, from our customer's suggestions, we learned how to make our UI more user-friendly.
