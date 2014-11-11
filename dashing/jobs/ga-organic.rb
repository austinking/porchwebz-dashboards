require "net/http"
require "uri"
require "json"

current_total_pageviews = 0
current_total_users = 0
current_new_users = 0

SCHEDULER.every '1m' do

  uri = URI.parse("http://porch-ga-super-proxy.appspot.com/query?id=ahZzfnBvcmNoLWdhLXN1cGVyLXByb3h5chULEghBcGlRdWVyeRiAgICAmdKFCgw")
  response = Net::HTTP.get_response(uri)
  json = JSON.parse(response.body)


  last_month_uri = URI.parse("http://porch-ga-super-proxy.appspot.com/query?id=ahZzfnBvcmNoLWdhLXN1cGVyLXByb3h5chULEghBcGlRdWVyeRiAgICAvNWTCgw&format=json")
  last_month_response = Net::HTTP.get_response(last_month_uri)
  last_month_json = JSON.parse(last_month_response.body)

  current_total_pageviews = json["totalsForAllResults"]["ga:pageviews"]
  last_total_pageviews = last_month_json["totalsForAllResults"]["ga:pageviews"]
  
  current_total_users = json["totalsForAllResults"]["ga:users"]
  last_total_users = last_month_json["totalsForAllResults"]["ga:users"]
  
  current_new_users = json["totalsForAllResults"]["ga:newUsers"]
  last_new_users = last_month_json["totalsForAllResults"]["ga:newUsers"] 
 
# puts "current current_total_users:" + current_total_users
# puts "last current_total_users:" + last_total_users

  send_event('organic_users', { current: current_total_users, last: last_total_users })
  send_event('organic_pageviews', { current: current_total_pageviews, last: last_total_pageviews })
  send_event('organic_new_users', { current: current_new_users, last: last_new_users })

end