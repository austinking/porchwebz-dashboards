require "net/http"
require "uri"
require "json"


SCHEDULER.every '1m' do

  uri = URI.parse("http://porch-ga-super-proxy.appspot.com/query?id=ahZzfnBvcmNoLWdhLXN1cGVyLXByb3h5chULEghBcGlRdWVyeRiAgICA-JaVCgw")
  response = Net::HTTP.get_response(uri)
	
  json = JSON.parse(response.body)
    
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