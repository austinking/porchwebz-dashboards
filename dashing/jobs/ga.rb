require "net/http"
require "uri"
require "json"

current_organic_visitors = 90726; 

SCHEDULER.every '2s' do

  # uri = URI.parse("http://porch-ga-proxy.appspot.com/query?id=ahBzfnBvcmNoLWdhLXByb3h5chULEghBcGlRdWVyeRiAgICAvKGCCgw")

  # response = Net::HTTP.get_response(uri)
	
  # json = JSON.parse(response.body)
  
  # puts response.body
  
  # new_organic_visitors = json["rows"][0][0]

  new_organic_visitors = current_organic_visitors + 100

  last_organic_visitors = current_organic_visitors

  current_organic_visitors = new_organic_visitors
  
  send_event('organic_visitors', { current: current_organic_visitors, last: last_organic_visitors })
end