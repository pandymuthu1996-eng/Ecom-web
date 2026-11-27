# ECOM_WEB Learning Journey

# Day 1 - Project Setup
Created Project Structure

# ECOM_WEB
│
├── Backend
│ ├── config
│ ├── controller
│ ├── helper
│ ├── middleware
│ ├── models
│ ├── routes
│ ├── app.js
│ └── server.js
│
└── Frontend
Installed Packages
Shell
npm init -y
npm install express
npm install mongoose
npm install dotenv
npm install nodemon
# Learned

✅ Express Server Setup

✅ Route Structure

✅ Environment Variables

✅ MongoDB Connection

## Day 2 - MongoDB Connection
Setup
JavaScript
dotenv.config();
mongoose.connect(process.env.MONGODB_URI);
 
Learned

✅ MongoDB Compass

✅ MongoDB Community Server

✅ Connection String


mongodb://localhost:27017

✅ Database Auto Creation

✅ Collection Auto Creation

## Day 3 - Product Model
Created Schema
JavaScript
const productSchema = new mongoose.Schema(...)
 
Learned

✅ Schema

✅ Model

✅ Collection

✅ Document

Debugged
JavaScript
type: string ❌
type: String ✅
Learned

Mongoose creates:

JavaScript
mongoose.model("Product")

↓

Plain Text
products
 

collection automatically.

## Day 4 - Create Product API
Routes
JavaScript
POST /api/v1/product/new
Controller
JavaScript
Product.create(req.body)
Tools

✅ Postman

✅ MongoDB Compass

Learned
Sending JSON
HTTP POST
req.body
express.json()
## Day 5 - Read Product APIs
APIs

Get All Products
Get Single Product
Learned---------
JavaScript
Product.find()
Product.findById()
Debugged
Plain Text
Cannot GET

Understanding:-------

Route Matching
Controller Execution
## Day 6 - Update Product API
API
Plain Text
PUT /product/:id
Learned
JavaScript
findByIdAndUpdate()

Options:

JavaScript
{
new: true,
runValidators: true
}
Learned

Valid ID

Plain Text
6920...

Invalid ID

Plain Text
123

Mongoose Error:

Plain Text
CastError
## Day 7 - Global Error Handling
Created
Plain Text
helper/
└── HandleError.js
Created
Plain Text
middleware/
└── ErrorMiddleware.js
Learned
JavaScript
extends Error
JavaScript
super(message)
 
JavaScript
throw
JavaScript
next(error)
Architecture Learned
Plain Text
Controller
↓
next(error)
↓
Express
↓
Error Middleware
## Day 8 - CRUD Complete
Completed

✅ Create

✅ Read

✅ Update

Still Remaining

⬜ Delete

## Day 9 - Search API
Created
JavaScript
ApiHelper
Learned

Method Chaining

JavaScript
.search()
.filter()
.pagination()
Learned
JavaScript
return this;
Search Logic
JavaScript
$regex
$options: "i"

Example:

Plain Text
?keyword=iphone

## Day 10 - Filter API
Learned
JavaScript
delete queryCopy.keyword
Advanced Filtering
JavaScript
gte
gt
lte
lt

Example:

Plain Text
price[gte]=1000

MongoDB:

JavaScript
$gte
Day 11 - Pagination
Learned
JavaScript
limit()
skip()
Formula
JavaScript
skip =
resultPerPage *
(currentPage - 1)
Example
Plain Text
13 Products
10 Per Page

Result:

Plain Text
Page 1 = 10
Page 2 = 3
Learned
JavaScript
Math.ceil()

For Total Pages.

Day 12 - MongoDB Aggregation

MongoDB  aggregate()  $group $count $sort
$project
Analogy


## Day 13 - Password Hashing
created user schema for user, and becript(hashing) the password before saving the bd using mongoose pre function of pre(save) 
Used validator npm package for mail verification . 
Learned
pre("save")
bcrypt.hash()
$2a$10$...
isModified("password") // code in usermodle presave function

## Day 14
used JWT (json web token (header - payload - signature )) generate tokern in the db schema model , the token generated and send as a response to the front end. 

encode - decode 

## Day 15
*login user , Get use req value verified passwordss are same using function inner the db schema file.
Created custom function for the jwt and user request to cut the repeated code (helper-jtwtoken.js).  

sendToken(user, 201, res);

## Day 16
Authentication :
Created middleware function that get the ID form the decode token (cookie-parser) , then verifie the id and reg the details , then send to the res .
add that middlewire before the product controller, so the userauth run then next let run the get all products. 

## Day 17
authorization and Logout
created the user auth file and made function of verify user and authorization middleware function. 
created  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, schema that join the user id to get the get of who add the product. 

# Packages Used So Far
Shell
express
mongoose
dotenv
nodemon
validator
bcryptjs
JWT
cookie-parser
crypto // for emcript data
nodemailer // package for the send mail

Tools Used

Plain Text
VS Code
Postman
MongoDB Compass
MongoDB
Node.js
Nodemon
Draw.io

# Important Concepts Learned
Plain Text
Express Routing
Controllers
MongoDB
Mongoose
Schema
Model
Collection
Document
 
CRUD
 
# Error Handling
Custom Error Class
Middleware
next()
 
Search
Filter
Pagination
 
Aggregation
 
Password Hashing
Pre Middleware
 
User Authentication Preparation