# Kingfisher - INTELLIGENT NETWORK SECURITY 
## Introduction
This is single page application to showing how to validate from the  client as well as server side. Fetch IP address of the local user, display it and after sucessful login, redirect user to dashboard, otherwise, show error message.

## Technologies 
1. JavaScript 
2. Typescript
3. NodeJS
4. Express 
5. React / React-dom / React-router /React Transition 
6. Redux
7. RESTful API
8. Axios
9. GraphQL 
10. Charting & Visualization - D3, DC, Highcharts, kibana
11. MongoDB / Robomongo
12. Secure Authentication, OAuth & 2FA)
13. Apache, ActiveMQ (for Messaging)
14. STOMP (JAVA environment), HornetQ, SPRING,
15. Passport
16. Bcrypt
17. JWT
18. Bootstrap
19. HTML5 / CSS3
20. Websocket (socket.io)
21. SASS/LESS
22. Mobile First, Responsive Design, Reactive Design, Adaptive Design
23. Accessibility/Usability
24. TDD
25. BDD
26. Continuous Development / Microservices




## Instructions to run

### Create mongoDB 
install and create mongodb.

Open command prompt with admin rights and 

run : *mongod*, 

create database with the name "users",
create table named "users" and insert the following vlaues as shown in the picture.

![Alt text](https://raw.githubusercontent.com/amir-saeed/ReactJs/master/Authentication-in-react-using-node-and-express/Demo/mongodb.png?raw=true "Mongo DB")



### Run commands
Open two more command prompts / terminals windows (with administrator rights) 

Navigate to this folder

1. run : *NPM install*

2. After installating all dependencies, navigate to the  "server" folder and type

run : *node server*

When server starts running, then

3. run : *NPM run start*

It will automatically open the chrome browser and will open the website. When ever you change any code, it will 
compile automatically and refresh the page.

When you run the app on the browser, the output would be 

![Alt text](https://raw.githubusercontent.com/amir-saeed/ReactJs/master/Show-bootstrap-modal-on-button-click/output.png?raw=true "Bootstrap modal")

##### Home Page

![Alt text](https://raw.githubusercontent.com/amir-saeed/ReactJs/master/Authentication-in-react-using-node-and-express/Demo/home-page.png?raw=true "Bootstrap modal")

##### Client side validation on submit

![Alt text](https://raw.githubusercontent.com/amir-saeed/ReactJs/master/Authentication-in-react-using-node-and-express/Demo/home-submit.png?raw=true "Bootstrap modal")

##### Server side error validation on submit

![Alt text](https://raw.githubusercontent.com/amir-saeed/ReactJs/master/Authentication-in-react-using-node-and-express/Demo/home-submit-error.png?raw=true "Bootstrap modal")

##### Dashboard on successful login

When you submit correct email and password, system will take you to dashboard

![Alt text](https://raw.githubusercontent.com/amir-saeed/ReactJs/master/Authentication-in-react-using-node-and-express/Demo/dashboard.png?raw=true "Bootstrap modal")



### Dependencies
This project uses NodeJS, Express, Mongoose, Bcrypt, JWT, Babel, webpack, react, react-dom, react-router, MongoDB, Passport and bootstrap
