require "net/http"
require "uri"
require "json"

current_pro_pages = 0; 

SCHEDULER.every '10m' do


  uri = URI.parse("http://porch-ga-super-proxy.appspot.com/query?id=ahZzfnBvcmNoLWdhLXN1cGVyLXByb3h5chULEghBcGlRdWVyeRiAgICAvKGCCgw")
  response = Net::HTTP.get_response(uri)
	
  json = JSON.parse(response.body)
    
  pages = json["totalResults"]
  
  last_pro_pages = current_pro_pages
  current_pro_pages = pages
  
  
  
  send_event("pros_organic_traffic", { current: current_pro_pages, last: last_pro_pages })
  
end