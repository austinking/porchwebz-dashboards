require "net/http"
require "uri"
require "json"

current_total_pageviews = 0
current_total_users = 0
current_new_users = 0

SCHEDULER.every '10s' do

  uri = URI.parse("https://porch-ga-super-proxy.appspot.com/query?id=ahZzfnBvcmNoLWdhLXN1cGVyLXByb3h5chULEghBcGlRdWVyeRiAgICAmdKFCgw")

  response = Net::HTTP.get_response(uri)
	
  json = JSON.parse(response.body)

  new_total_pageviews = json["totalsForAllResults"]["ga:pageviews"]
  if new_total_pageviews != current_total_pageviews
  	last_total_pageviews = current_total_pageviews
  	current_total_pageviews = new_total_pageviews
  end

  new_total_users = json["totalsForAllResults"]["ga:users"]
  if new_total_users != current_total_users
  	last_total_users = current_total_users
  	current_total_users  = new_total_users
  end

  new_new_users = json["totalsForAllResults"]["ga:newUsers"]
  if new_new_users != current_new_users
  	last_new_users = current_new_users
  	current_new_users = new_new_users
  end

  puts "new total pageviews: " + new_total_pageviews
  puts "new total users: " + new_total_users
  puts "new total new users: " + new_new_users

  puts "current total pageviews: " + current_total_pageviews
  puts "current total users: " + current_total_users
  puts "current total new users: " + current_new_users
  
 send_event('organic_users', { current: current_total_users, last: last_total_users })
 send_event('organic_pageviews', { current: current_total_pageviews, last: last_total_pageviews })
 send_event('organic_new_users', { current: current_new_users, last: last_new_users })
 
end