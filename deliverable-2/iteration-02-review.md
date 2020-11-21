# CancerChat/Team 11

 > _Note:_ This document is meant to be written during (or shortly after) your review meeting, which should happen fairly close to the due date.      
 >      
 > _Suggestion:_ Have your review meeting a day or two before the due date. This way you will have some time to go over (and edit) this document, and all team members should have a chance to make their contribution.


## Iteration XX - Review & Retrospect

 * When: November 19
 * Where: Online

## Process - Reflection


#### Q1. Decisions that turned out well

List **process-related** (i.e. team organization and how you work) decisions that, in retrospect, turned out to be successful.
 
1. We decide to divide features into things to be done in D2 and D3 before we started. This gives us a set of more concrete goals of what we need to accomplish for D2. 

    D2: register/login, profile, match, chat(only text), admin notification, main page, request page

    D3: block, report, rich text editor for chat, geolocation, storing pictures on AWS S3

2. We are having a task board to assign work to each other. 
    - This enables us to have fewer conflicts when working on one codebase. For instance, if someone finds a bug when running other team member's code, they can find out who is in charge of that part and ask them for fixing the bug, instead of trying to fix it on their own. Changing other people's code without notifying them ahead may results in conflicts and more bugs.
    - Also, the goals are trackable and everyone can see the concrete progress of our team. https://docs.google.com/spreadsheets/d/1IbYSnSneb-Hv0m9sljIn_qT3puhcViF-GEtengPN3bk/edit#gid=0 
    - We chose to use a google sharing spreadsheet for the task board because some other task tracker apps, such as JIRA and Asana, require set-ups or learning processes, whereas we can just jump in and use google spreadsheet without any prior preparation. 
 * 2 - 4 decisions.
 * Ordered from most to least important.
 * Explain why (i.e. give a supporting argument) you consider a decision to be successful.
 * Feel free to refer/link to process artifact(s).


#### Q2. Decisions that did not turn out as well as we hoped

List **process-related** (i.e. team organization and how you work) decisions that, in retrospect, were not as successful as you thought they would be.

1. We underestimated the time needed to finish D2 and started late. In the end, everyone was exhausted in order to implement the functionalities before the deadline. 

2. In order to save time, the team has decided to not spending time designing the parameters of APIs and start directly. Because the frontend and backend were implemented asynchronously, sometimes we had to change the API that has been written to meet the needs of the frontend, which wasted a lot of time, and also produced some hard-to-find bugs.

 * 2 - 4 decisions.
 * Ordered from most to least important.
 * Explain why (i.e. give a supporting argument) you consider a decision to be unsuccessful
 * Feel free to refer/link to process artifact(s).


#### Q3. Planned changes

List any **process-related** (i.e. team organization and how you work) changes you are planning to make (if there are any)

1. Share deadlines, organize better:  
Though in the past few months, we are doing fine organizing and splitting the work, we think that we can organize our group work better if we share our deadlines and our time schedules ahead. Since our group members are in different time zones and we have different course works, 
we are planning to take every member's personal schedule and project deadlines into consideration when planning and assigning works. Dividing the work into several small milestones might also be beneficial for us. We will plan to do this, too.
2. Agree on API before developing new features:  
At deliverable-2, we started our coding work before designing APIs. This means overtimes, members who work at the front-end will need to communicate with back-end members on deciding APIs. This is more time consuming than we thought due to the timezone issue. It will be efficient if we can agree on complete APIs before doing our work.
3. More meetings, more communication:  
At deliverable-2, we have weekly meetings with MaleCare and have a lot of group meetings. However, we still think this is not enough. We need to have more communication with group members as well as MaleCare. We can know our group members' working progress even better. If some of the group members need help, we can help them.

 * Ordered from most to least important.
 * Explain why you are making a change.


## Product - Review

#### Q4. How was your product demo?
 * How did you prepare your demo?
 * What did you manage to demo to your partner?
 * Did your partner accept the features?
 * Were there change requests?
 * What did you learn from the demo from either a process or product perspective?
 * *This section will be marked very leniently so keep it brief and just make sure the points are addressed*

We prepared our demo by practicing going through the whole demo process several times. We did not prepare any slides but just showing the product itself. 

We did the demo by sharing a screen on Zoom meeting with our partner. We managed to demo some basic functionalities of our product. We showed our partner how a non-admin user uses our app to chat, to find matches, and to customize personal profiles. We also showed him how an administrator sends messages to selected users. Our partner accepted the features. He also gave some suggestions on how to improve the product to make it more user-friendly.

We learned from this demo that it is important to have a stable version of the product to do the demo. We did not encounter any technical issues while doing the demo since we had our product well prepared. Also, from our customer's suggestions, we learned how to make our UI more user-friendly.