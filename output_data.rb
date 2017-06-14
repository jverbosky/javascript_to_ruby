# Method to demonstrate multi-field form data passed from AJAX to Sinatra route
def output_ajax_data(user_hash)

  # example user_hash: {"f_name"=>"Jane", "l_name"=>"Smith", "age"=>"37"}

  f_name = user_hash["f_name"]
  l_name = user_hash["l_name"]
  age = user_hash["age"]
  
  puts "#{f_name} #{l_name} is #{age} years old."  # log to terminal during testing
  return "#{f_name} #{l_name} is #{age} years old."

end