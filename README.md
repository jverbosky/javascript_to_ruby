## JavaScript to Ruby ##

A prototype to demonstrate how to pass data from JavaScript to Ruby using an AJAX request.

----------

**View Overview**

----------

The main view (*index.erb*) consists two parts:

1. A multi-field form where a user can submit data
	- The form element is assigned an id to trigger a jQuery function call on submit.
	- Each field's **name** value is assigned to "user[value]" which outputs a hash when the form is submitted.
2. An initially hidden div that is populated with another view (*update.erb*) by the AJAX request.

----------

**Data Flow**

----------

Data flows from the multi-field form to the hidden div (populated by *update.erb*) in the following steps:

1. The user opens main route (**/**) and does the following:
	- enters values into the multi-field form
	- clicks **Submit**
2. On clicking **Submit**, the JavaScript (jQuery) function runs and does the following:
	- prevents a POST request from being made (to a Sinatra route)
	- intercepts the submitted form data
		- currently a hash
	- serializes the data to send to the **/update** route via an URL
		- hash: *{"f_name"=>"Jane", "l_name"=>"Smith", "age"=>"37"}*
		- serialized: *user%5Bf\_name%5D=Jane&user%5Bl\_name%5D=Smith&user%5Bage%5D=37*
	- if the URL is sent successfully:
		- displays *index.erb*'s hidden div (populated by *update.erb*)
3. The **/update** route in *app.rb* is called by the AJAX request and does the following:
	- receives the URL (populated with the serialized form data hash) from AJAX
	- translates the serialized data back into a standard Ruby hash
	- passes the hash to a Ruby method (in *output_data.rb*), which processes the hash
	- passes the Ruby method's output (a string) to *update.erb*, which is displayed in the hidden div

----------

**Running the App Locally**

----------

To run the app locally:

1. Make sure that [Ruby](https://www.ruby-lang.org/en/documentation/installation/) is installed.
2. Make sure that the [Sinatra](https://github.com/sinatra/sinatra) gem is installed.  *Note that installing the Sinatra gem will install other gems necessary to run the app locally, such as rack.*
3. Navigate to the directory which contains **app.rb** in a terminal (command prompt) session.
4. Run the following command to launch the Sinatra web server:

	`ruby app.rb`

To open the app locally once it is running via *ruby*, use the following URL:

[http://localhost:4567](http://localhost:4567/)

----------

**Logging**

----------

Data is logged in the following places:

1.  The terminal via the output\_ajax\_data() function in *output\_data.rb*
	- after running the app and submitting form data:

    PS C:\prototype\_javascript\_to\_ruby> ruby .\app.rb  
    [2017-06-14 15:15:02] INFO  WEBrick 1.3.1  
    [2017-06-14 15:15:02] INFO  ruby 2.3.3 (2016-11-21) [i386-mingw32]  
    == Sinatra (v2.0.0) has taken the stage on 4567 for development with backup from WEBrick  
    [2017-06-14 15:15:02] INFO  WEBrick::HTTPServer#start: pid=8580 port=4567  
    ::1 - - [14/Jun/2017:15:15:04 -0400] "GET / HTTP/1.1" 200 1112 0.0810  
    ::1 - - [14/Jun/2017:15:15:04 Eastern Daylight Time] "GET / HTTP/1.1" 200 1112  
    \- -> /  
    Jane Smith is 37 years old.
    ::1 - - [14/Jun/2017:15:07:24 -0400] "GET /update?user%5Bf\_name%5D=Jane&user%5Bl\_name%5D=Smith&user%5Bage%5D=37 HTTP/1.1" 200 202 0.0110
    ::1 - - [14/Jun/2017:15:07:24 Eastern Daylight Time] "GET /update?user%5Bf\_name%5D=Jane&user%5Bl\_name%5D=Smith&user%5Bage%5D=37 HTTP/1.1" 200 202
    http://localhost:4567/ -> /update?user%5Bf\_name%5D=Jane&user%5Bl\_name%5D=Smith&user%5Bage%5D=37  

2. In the JavaScript console (Chrome DevTools JavaScript Console):

    serialized string: user%5Bf\_name%5D=Jane&user%5Bl\_name%5D=Smith&user%5Bage%5D=37  
    [f_name] = 'Jane'  
    [l_name] = 'Smith'  
    [age] = '37'

----------