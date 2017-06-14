require 'sinatra'
require_relative 'output_data.rb'

get '/' do
  erb :index
end

# route that receives data from JavaScript via AJAX request
get '/update' do
  user_hash = params[:user]
  readback = output_ajax_data(user_hash)
  erb :update, locals: {readback: readback}
end