get '/' do
  erb :index
end

post '/contacts/new' do
  content_type :json
  return_message = {}
  @contact = Contact.new(first_name: params[:first_name], last_name: params[:last_name], email: params[:email], phone_number: params[:phone_number])

  if @contact.save
    return_message[:result] = 'success'
    return_message[:id] = @contact.id
  else
    return_message[:result] = 'failed - contact not created'
  end

  return_message.to_json
end

get '/contacts/?' do
  content_type :json
  @contacts = Contact.all
  @contacts.to_json
end

get '/contacts/search' do
  content_type :json
  query_term = params[:query].downcase
  results = Contact.where("lower(first_name) LIKE '%#{query_term}%' OR lower(last_name) LIKE '%#{query_term}%' OR email LIKE '%#{query_term}%'")
  return results.to_json
end

get '/contacts/:id' do
  content_type :json
  @contact = Contact.find params[:id]
  @contact.to_json
end

delete '/contacts/:id' do
  content_type :json
  return_message = {}
  @contact = Contact.find params[:id]
  if @contact.destroy
    return_message[:result] = 'success - contact deleted'
  else
    return_message[:result] = 'failed - contact not deleted'
  end
  return_message.to_json
end