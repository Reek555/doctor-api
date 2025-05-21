RESTful api for a platform that links between patiants and doctors, built with Express js and PostgreSQL for the database;

setup environment variables, and start the server with : <code>npm start</code>


<h1>End points</h1>

<li><b>GET /home</b></li>

<br>

Curl example:

<pre><code>
  curl http://localhost:4000/home
  
</code></pre>

respone 200:

<pre><code>
  {"message": "welcom home"}  
  
</code></pre>




<br>
<li><b>POST /account/register</b></li>

<br>

request body: 

<pre><code>
{
  "name": "user33", "email": "user33@gmail.com", "password": "123456", "userType": "normal"
}  
  
</code></pre>



Curl example:

<pre><code>
curl -X POST https://localhost:4000/account/register \
  -H "Content-Type: application/json" \
  -d '{"name": "user33", "email": "user33@gmail.com", "password": "123456", "userType": "normal"}'  
  
</code></pre>



respone 200:

<pre><code>
{
    "message": "account created successfully"
}  
  
</code></pre>





<br>
<li><b>POST /account/login</b></li>

<br>

request body: 

<pre><code>
{
  "email": "user33@gmail.com", "password": "123456"
}  
  
</code></pre>



Curl example:

<pre><code>
curl -X POST https://localhost:4000/account/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user33@gmail.com", "password": "123456"}'  
  
</code></pre>



respone 200 returns jwt token:

<pre><code>
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... JNaUp9P5h1VWBxLe5Qgb9YJTjGsFvIZTncGLFdPw"
}
  
</code></pre>








<br>
<li><b>GET /account/me</b></li>

<br>

get user porfile profile details.


request example (Curl), authorization header must contain jwt tokent:

<pre><code>
curl -X GET https://localhost:4000/account/login \
  -H "authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6... j7FLhxoPAfSicbKJc"
</code></pre>



respone 200:

<pre><code>
{
    "id": 25,
    "name": "user33",
    "email": "user33@gmail.com",
    "userType": "normal",
    "latitude": null,
    "longitude": null,
    "createdAt": "2025-05-20T21:55:30.796Z",
    "updatedAt": "2025-05-20T21:55:30.796Z"
}
  
</code></pre>






<br>
<li><b>PUT /account/update</b></li>

<br>

update user profile info.

request body: 

<pre><code>
  {
    name: 'new username'
  }
</code></pre>


request example (Curl):

<pre><code>
curl -X PUT https://localhost:4000/account/update \
  -H "Content-Type: application/json"
  -H "authorization: Bearer eyJhbGciOiJIUzI1NiI9.WzDU9s6hJjfiJGj-Xkfnb_9foZj7FLhxoPAfSicbKJc
  -d '{"name": "new usernaem"}'

</code></pre>



respone 200:

<pre><code>
{
    "msg": "profile is updated."
}
  
</code></pre>









<br>
<li><b>DELETE /account/delete</b></li>

<br>

delete the account.


request example (Curl):

<pre><code>
curl -X DELETE https://localhost:4000/account/delete \
  -H "authorization: Bearer eyJhbGciOiJIUzI1NiI9.WzDU9s6hJjfiJGj-Xkfnb_9foZj7FLhxoPAfSicbKJc

</code></pre>



respone 200:

<pre><code>
{
    "msg": "account deleted."
}
  
</code></pre>




