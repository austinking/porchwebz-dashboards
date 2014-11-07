require "net/http"
require "uri"
require "json"


SCHEDULER.every '2s' do

  uri = URI.parse("http://porch-ga-proxy.appspot.com/query?id=ahBzfnBvcmNoLWdhLXByb3h5chULEghBcGlRdWVyeRiAgICA3pCBCgw")

  response = Net::HTTP.get_response(uri)
	
  json = JSON.parse(response.body)
  
  puts response.body
  
  data = json["rows"]
  
  keywords = Array.new
  
  data.each do |keyword|
    keywords.push({
      label: keyword[0],
      value: keyword[1]
    })
  end
     
  send_event('ga_top_keywords', { items: keywords })
  
end