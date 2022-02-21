
# Dynamic form


## Features

- Create attribute with all details and save them in database
- Create form with attributes and other information
- Any changes in  attributes will be reflect on form's attribute
- All forms will be print in react template 
- All attributes and form design will be dynamic
- After submit all form data will be saved in database
# Behind the scene:
If you open this you can see a todo button.This button rendering dynamicly with form name.  Fetching all dynamic forms from database while home page loaded. But there is only todo form exist in database. 
When you click the button dynamic form will be render.All attributes contain with this form will generate component based on
attributes, style, id, classname etc and render.
if dynamic attribute component is input than value will change by react state and attach onchange event.
if attribute component is submit button then click on this form will be submit.
When you submit, form will be upload through provided url by form. Upload form data property will be attribute name and value will be component value.
Click see all todos to see uploaded form data. Todo added for sample to use dynmaic form.
##  Attribute Details
A single attribute can be create with id, class, style, input, text, button, style label, name, placeholder,readOnly.
Any time you can change this attributes any properties with API. And there all linked form with this attribute also be changed. 
#### API
Bse URL: http://localhost:5000/api/v1
```sh
End Points: /attribute/add
Method: post
Data: 
type: button | input | text,
inputType: date,
className: "btn btn-primary",
name: "Submit",
placeHolder:"Enter Email",
label:"Enter Email",
attId: "some-id",
readOnly: false
style: {
        marginTop: "10px",
        marginBottom: "10px"
    }
```
- ``type``: can be button input and text. If type is input then placehoolder, inputType, label will work. `Required`
- ``inputType``: all input types
- ``className``: any class name
- ``name``: Name is your api properties. assume if your api propertis need Email, then name must be Email.So this form can
dynamicly fill and submit. `Required`.
- ``attId``: id of component
- ``readOnly``: Boolean . It can only only reflect in button and input.
- ``style``: Object. style property must be valid react camelcase react style patter.
```
End Points: /attribute/edit-by-id/:id
Method: post
Params id: id of attribute
```
You can change anything above as add attribute structure. Any changes with attribute will be also change all forms related with this Attribute
 
```
End points: /attribute/get-by-id/:id
Method: get
Params id: id of attribute
```
Get attribute with id
```
End points: /attribute/get-all
Method: post
```
Get all attributes
```
End points:/attribute/delete-by-id/:id
Method: get
Params id: id of attribute
```
Delete attributes by id
## Form Details
Form will be create with attributes. Assume you need a signup form. Then you have create first single attributes.
Attributes for - User name, Email, Phone, Password. You need to create 4 Attributes.  if email properties name for register
api then email attribute must have 'name' with 'email'. So it can dynamicly submit the form.
#### API
```
End points: /dynamic-form/add
Method: post
formName: 'Signup Form',
className:'form-container',
style:{
    padding:'10px'
    }
url: Form dubmit url for post request,
attributes:[{
attribute: attributeID
position: 1
}]
```
- ``formName``: Name of the Form  `Required`
- ``className``: classname of form
-  ``style``: Object. style property must be valid react camelcase react style patter.
-  ``url``: Url is api url for submit the form. ``Required``
-   ``attributes`` : attributes will be array containe object with attribute id postion.
 postion is element postion in form when render

```
End Points: /dynamic-form/edit-by-id/:id'
Method: post
Params id is form id.
```
You can any update as add new form

```
End Points: /dynamic-form/get-by-id/:id'
Method: get
Params id is form id.
```
Response will be form details with include all attributes details.

```
End Points: /dynamic-form/get-all
Method: get
Method: get
```
Response will be All form details with include all attributes details.

```
End Points: /dynamic-form/add-attribute/:id
Method: post
Params id is form id.
body:{
     attribute,
    position
}
```
You can  add new attribute with attribute id and postion


```
End Points: /dynamic-form/delete-attribute/:id
Method: post
Params id is form id.
body:{
     attribute,
    position
}
```
You can  delete a exiting attribute with attribute id and postion

```
End Points: /dynamic-form//delete-by-id/:id
Method: post
Params id is form id.
```
Delete form by id

### Todo
I have create a simple todo form and api for testing dynamic form
#### API
```sh
Endpoints: /todo/add
Method: post
body: 
    userName: Tariq,
    title: Marketing,
    description: Buy shirt and others,
    date: a date
```
- userName : name of user
- title: title of todo
- description: description of to do
- date : date of todo
```sh
Endpoints: /todo/all
Method: get
get all todo
```
