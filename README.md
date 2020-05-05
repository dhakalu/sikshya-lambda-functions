# Sikshya Application

Sikshya is an service that powers an educational application.

This service is built using `GraphQL` - a query launage for `APIs`. The endpoint is deployed in `AWS Lambda` service using `serverless`.

## Stack

This application was originally intended to run in [`AWS Lambda`](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html). Lambda functions are writtern using  `GraphQL` in `NodeJS` with `Apollo-Lambda` library. These lambda functions are invoked by `AWS API gateway` when `**/api/**` path is called from anywhere (front-end, another service). Each requests that get routed to our `API Gateway` are authenticated using `AWS Cognito`. Therefore it is very important for the api caller to make sure they are passing a valid `JWT` token as the `Authorization` header while making the request. Once the request reaches it interacts with other `AWS services` to fulfill the request.

In data layer we are using `DynamoDB` to store our data. Other services used include: `AWS Parameter Store`, `AWS Cloudromation`, [`serverless`](https://www.serverless.com/examples/). 

### Helpful Links

 * [Conginto Docs](https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html)
 * [AWS.CognitoIdentityServiceProvider API](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html)
 * [AWS API Gateway Docs](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html)
 * [AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html)
 * [DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html)
 * [AWS.DynamoDB API](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html)



## Develop/Contribute

To start developing this application, you will have to clone this project on your computer using the git command `git clone https://github.com/dhakalu/sikshya-lambda-functions.git`. To run this application in local we need to make sure that following are insatlled:
* `NodeJS v12.16.1`
* `yarn`: To install `yarn`, once node is installed, run the command `npm i -g yarn`

Once the required softwares/packages are installed, you can `cd` into the root directory of this project and run the command `yarn start`. Then you can start developing.

## TDD

We are using jset as our testing framework to get our code tested. Every `module exports` need to be tested. If any functions that are used within file are complex we need to move the logic to its own file, export from that file and have that code tested. This idea comes from private methods not needing the test. Before commiting aything test MUST be ran and passed. Test is a MUST have to make sure that we have the flexibility to make some code changes in one part of the application have a roboust breaking point detector. A peer reviewer has to make sure that every functions have sufficient tests.

## Auth Management System

The first feature that this service provides is user authentication and authorization flows, using AWS cognito as the underlying service.

### Helpful Links

 * [Conginto Docs](https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html)
 * [AWS.CognitoIdentityServiceProvider API](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html)

### User Grups

There are different types of users who can be grouped together using Cognito Groups.   **Needs Discussion**

* **SikshyaDevelopers** : This group ohttps://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.htmlf users are the developers who are responsible for the development of the Sikshya application. These users have the uttmost access level.
* **SikshyaSupport**: This group of users are people who work at `Sikshya` to support it. These people can do anything in the app incase they get contacted by the users for help.
* **SikshyaInstitutionAdmins**: This group of users are people who involve in different administrative job in one or more educational institution.
* **SikshyaEducators**: This group of users are teachers who teach our `Students` group
* **SikshyaParents**: Parents who signup to monitor their childrens
* **SikshyaStudents**: This group of users are people who study with our *SikshyaEducators*

A user can belong to multiple groups at the same time. For example a teacher teaching in institution might also be responsible for the administrative work so he can belong to both *SikshyaEducators* as well as *SikshyaInstitutionAdmins*. If the same user starts studing in some other institution, In addition to *SikshyaEducators* and *SikshyaInstitutionAdmins* he will be added to *SikshyaStudents* group.

In above case, the user should be allowed to perform the administrative actions only in the institution whose administration he works at. He should be able to post `assignments/take attendence/and other teachrs` actions only to the courses he teaches. And he should be able to do all the students actions on the courses he studies.

## School Query Patterns

* I wat to see all the schools listed
* `TODO` Find All schools around where I live
* Find All the schools in certain area that are of a particulart type
* `TODO` Find All the school that match certain name pattern
* `TODO` Find All students enrolled in a chool 

## Class Query Patterns

* CRUD
* Get All the classes of a school
* Get ALl the classes of a class type/level
* Find all students who are enrolled in a particular class
* Show attedence students enrolled in the class: Diplaying the list of students should be good enough for this

SK: ATTNEDENCE_schoolId_ClassType_StudentId_[#jsalkfjasdf]

## Assignments Query Patterns

* CRUD
* Show all the assignments of a class
* Show all the assignements due for a student
* Show all the assignements posted by a teacher

## Student Features

* `TODO` List all of my classes
* `TODO` Show my schedule
* `TDOD` Show all of my assignments
* `TODO` Show all my graders
