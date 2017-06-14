// AJAX = Asynchronous JavaScript And XML

$(function (){

  // Function that runs when form is submitted
  $('#ajax_submit').submit(function(event){  // use submit instead of click for using enter key to submit

    // prevent the default behavior for form submit with id="ajax_form"
    // allows interception of submitted data for additional processing before sending to server
    event.preventDefault();

    // serialize() forms a query string that can be sent to Sinatra in an AJAX request
    // $(this) = form that has id="ajax_submit"
    console.log( "serialized string: " + $(this).serialize() );
    // example user_hash from form: {"f_name"=>"Jane", "l_name"=>"Smith", "age"=>"37"}
    // example serialized value: user%5Bf_name%5D=Jane&user%5Bl_name%5D=Smith&user%5Bage%5D=37

    // values parsed out of serialized string for console logging
    serialize_to_console( $(this).serialize() );

    // different logging method - access values submitted in form fields by id
    // backup approach in case serialize() not feasible
    // var f_name = $("#f_name").val();
    // console.log("first name: " + f_name );  // ex: Jane
    // var l_name = $("#l_name").val();
    // console.log("last name: " + l_name );  // ex: Smith
    // var age = $("#age").val();
    // console.log("age: " + age );  // ex: 37

    // an AJAX request to send form data to a Sinatra route (/update) via an URL
    // ex: /update?user%5Bf_name%5D=Jane&user%5Bl_name%5D=Smith&user%5Bage%5D=37
    $.ajax({

      // Sinatra "get" route (not "post" route) to send data URL to
      // in production - if no need to redisplay form info, erb can be empty
      // note: don't point to "/" or will reload the form in index.erb
      url: "/update",

      // serialize (prepare) the form data for use in URL
      data: $(this).serialize(),
      
      // same output as using $(this).serialize()
      // backup approach in case serialize() not feasible
      // data: {
      //   f_name: $("#f_name").val(),
      //   l_name: $("#l_name").val(),
      //   age: $("#age").val()
      // },

      // type of data expecting back from server, 
      dataType: "html",
      
      // if AJAX request successful, populate div (line 28 in index.erb) with response data
      success: function(populate_div) {
        $('#ajax_div').html(populate_div);
      }

      // // in production will just log something to console
      // // AJAX still posts to Sinatra, but won't want to redisplay form data in view
      // success: function() {
      //   console.log("Success!")  // log status
      // }

    });
  });

  // Function that transforms serialized string to array and logs non-empty field/value pairs to console
  function serialize_to_console(serialized_string) { 

    var split_string = serialized_string.split('&');

    $.each( split_string, function(index, key) { 

        var field = key.substr(key.indexOf('%5B') + 3, key.indexOf('%5D') - 7)
        var value = key.substr( key.indexOf('=') + 1 ); 
      
        if( value !== '' )
        console.log( '[' + field + '] = \'' + value + '\'' );
    });
  }

});