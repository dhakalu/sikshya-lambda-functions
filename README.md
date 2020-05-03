# Sikshya Application

Sikshya is an service that powers an educational application.

This service is built using `GraphQL` - a query launage for `APIs`. The endpoint is deployed in `AWS Lambda` service using `serverless`.

## Auth Management System

The first feature that this service provides is user authentication and authorization flows, using AWS cognito as the underlying service.

There are different types of users who can be grouped together using Cognito Groups.   **Needs Discussion**

* **SikshyaDevelopers** : This group of users are the developers who are responsible for the development of the Sikshya application. These users have the uttmost access level.
* **SikshyaSupport**: This group of users are people who work at `Sikshya` to support it. These people can do anything in the app incase they get contacted by the users for help.
* **SikshyaInstitutionAdmins**: This group of users are people who involve in different administrative job in one or more educational institution.
* **SikshyaEducators**: This group of users are teachers who teach our `Students` group
* **SikshyaParents**: Parents who signup to monitor their childrens
* **SikshyaStudents**: This group of users are people who study with our *SikshyaEducators*

A user can belong to multiple groups at the same time. For example a teacher teaching in institution might also be responsible for the administrative work so he can belong to both *SikshyaEducators* as well as *SikshyaInstitutionAdmins*. If the same user starts studing in some other institution, In addition to *SikshyaEducators* and *SikshyaInstitutionAdmins* he will be added to *SikshyaStudents* group.

In above case, the user should be allowed to perform the administrative actions only in the institution whose administration he works at. He should be able to post `assignments/take attendence/and other teachrs` actions only to the courses he teaches. And he should be able to do all the students actions on the courses he studies.


## School Query Patterns

* I wat to see all the schools listed
    * Filterable by Type/Address/State
    * `TODO` Filterable By name
    * `TODO` Sorted b

## Student Features