require "net/http"
require "uri"
require "json"


SCHEDULER.every '1m' do


  uri = URI.parse("http://porch-ga-super-proxy.appspot.com/query?id=ahZzfnBvcmNoLWdhLXN1cGVyLXByb3h5chULEghBcGlRdWVyeRiAgICAvKGCCgw")
  response = Net::HTTP.get_response(uri)
  json = JSON.parse(response.body)


  last_month_uri = URI.parse("http://porch-ga-super-proxy.appspot.com/query?id=ahZzfnBvcmNoLWdhLXN1cGVyLXByb3h5chULEghBcGlRdWVyeRiAgICAvMuKCgw")
  last_month_response = Net::HTTP.get_response(last_month_uri)
  last_month_json = JSON.parse(last_month_response.body)
    
  pages = json["totalResults"]

  last_month_pages = last_month_json["totalResults"]

  puts pages
  puts last_month_pages
  send_event("pros_organic_traffic", { current: pages, last: last_month_pages })
  
end