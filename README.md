# To run this project
> Enter the project and type these in the terminal respectively and run
```
npm install
```
```
npm run watch
```
# Usage
## User operations 🙍
### User create
> ```http
> POST http://localhost:3000/user/register
> ````
> Sample Request
>```json
> {
>    "name": "sample name",
>    "age": 20,
>    "email": "sample@mail.com",
>    "password": "12345678"
> }
>```
> Returning Answer
>```json
> {
>   "id": "65b5307b1007553fd139666e",
>   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjUzMDdiMTAwNzU1M2ZkMTM5NjY2ZSIsImVtYWlsIjoibWVobWV0NDNAbWFpbC5jb20iLCJpYXQiOjE3MDYzNzQ4MTAsImV4cCI6MTcwNjM3ODQxMH0.RgyJXqfZDl8fxoESDdHfKeviQpggQg4frdV3S8bv7fc"
> }
>```
### User login
> ```http
> POST http://localhost:3000/user/login
> ````
> Sample Request
>```json
> {
>    "email": "sample@mail.com",
>    "password": "12345678"
> }
>```
> Returning Answer
>```json
> {
>   "id": "65b5307b1007553fd139666e",
>   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjUzMDdiMTAwNzU1M2ZkMTM5NjY2ZSIsImVtYWlsIjoibWVobWV0NDNAbWFpbC5jb20iLCJpYXQiOjE3MDYzNzQ4MTAsImV4cCI6MTcwNjM3ODQxMH0.RgyJXqfZDl8fxoESDdHfKeviQpggQg4frdV3S8bv7fc"
> }
>```
### User update
> **⚠ Add the token information returned from the API to the headers.**
> ```bash
> authorization: token returned from api
> ```
> ```http
> PATCH http://localhost:3000/user/update
> ````
> Sample Request
>```json
> {
>   "name": "leo updated",
>   "age": 24,
>   "profilePicture": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
> }
>```
### User password update
> **⚠ Add the token information returned from the API to the headers.**
> ```bash
> authorization: token returned from api
> ```
> ```http
> PATCH http://localhost:3000/user/change-password
> ````
> Sample Request
>```json
> {
>   "oldPassword": "12345678",
>   "newPassword": "87654321"
> }
>```
### User delete
> **⚠ Add the token information returned from the API to the headers.**
> ```bash
> authorization: token returned from api
> ```
> ```http
> DELETE http://localhost:3000/user/delete
> ````

## Blog operations 📑
### Blog create
> **⚠ Add the token information returned from the API to the headers.**
> ```bash
> authorization: token returned from api
> ```
> ```http
> POST http://localhost:3000/blog
> ````
> Sample Request
>```json
> {
>   "title": "sample title",
>   "content": "sample content"
> }
>```
### Get blog with pagination
> + limit and page queries are optional
> ```http
> GET http://localhost:3000/blog?limit=2&page=2
> ````
### Get blog by blog id
> ```http
> GET http://localhost:3000/blog/:blogId
> ````
### Search blog
> + limit and page queries are optional
> ```http
> GET http://localhost:3000/blog/search?limit=2&page=3
> ````
### Update blog by blog id
> **⚠ Add the token information returned from the API to the headers.**
> ```bash
> authorization: token returned from api
> ```
> ```http
> PATCH http://localhost:3000/blog/:blogId
> ````
> Sample Request
> + At least one of the title and content must be entered
>```json
> {
>   "title": "sample title updated",
>   "content": "sample content updated"
> }
>```
### Like and unlike blog by blog id
> **⚠ Add the token information returned from the API to the headers.**
> ```bash
> authorization: token returned from api
> ```
> ```http
> PATCH http://localhost:3000/blog/like/:blogId
> ````
### Delete blog by blog id
> **⚠ Add the token information returned from the API to the headers.**
> ```bash
> authorization: token returned from api
> ```
> ```http
> DELETE http://localhost:3000/blog/:blogId
> ````

## Comment operations 🖊️
### Comment create
> **⚠ Add the token information returned from the API to the headers.**
> ```bash
> authorization: token returned from api
> ```
> ```http
> POST http://localhost:3000/comment
> ````
> Sample Request
>```json
> {
>   "content": "sample content",
>   "blog": "65b359111fcf3d02b3d8f6a9" (use your own blog id)
> }
>```
### Get comment by blog id
> ```http
> GET http://localhost:3000/comment/blog/:blogId
> ````
### Get comment by user id
> ```http
> GET http://localhost:3000/comment/user/:userId
> ````
### Update comment by comment id
> **⚠ Add the token information returned from the API to the headers.**
> ```bash
> authorization: token returned from api
> ```
> ```http
> PATCH http://localhost:3000/comment/:commentId
> ````
> > Sample Request
>```json
> {
>   "content": "sample content updated"
> }
>```
### Like and unlikecomment by comment id
> **⚠ Add the token information returned from the API to the headers.**
> ```bash
> authorization: token returned from api
> ```
> ```http
> PATCH http://localhost:3000/comment/like/:commentId
> ````
### Delete comment by comment id
> **⚠ Add the token information returned from the API to the headers.**
> ```bash
> authorization: token returned from api
> ```
> ```http
> DELETE http://localhost:3000/comment/:commentId
> ````
