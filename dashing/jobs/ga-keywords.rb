require "net/http"
require "uri"
require "json"


SCHEDULER.every '2s' do

  #uri = URI.parse("http://porch-ga-proxy.appspot.com/query?id=ahBzfnBvcmNoLWdhLXByb3h5chULEghBcGlRdWVyeRiAgICA3pCBCgw")

  #response = Net::HTTP.get_response(uri)
	
  #json = JSON.parse(response.body)
  
  #puts response.body
  
  #data = json["rows"]
  
  keywords = Array.new
  
  #data.each do |keyword|
  #  keywords.push({
  #    label: keyword[0],
  #    value: keyword[1]
  #  })
  #end
  
  keywords.push({
	label: "(not provided)", 
	value: "1265289"
  })
  keywords.push({
	label: "(not provided", 
	value: "170209"
  })
    keywords.push({
	label: "porch.com", 
	value: "16327"
  })
    keywords.push({
	label: "porch", 
	value: "4465"
  })
    keywords.push({
	label: "porch .com lowes", 
	value: "1502"
  })
    keywords.push({
	label: "www.porch.com", 
	value: "1237"
  })
    keywords.push({
	label: "plomari general contractors", 
	value: "491"
  })
    keywords.push({
	label: "pro.porch.com", 
	value: "447"
  })
    keywords.push({
	label: "porch.com/lowes", 
	value: "372"
  })
    keywords.push({
	label: "porch .com contractors", 
	value: "312"
  })

     
  send_event('ga_top_keywords', { items: keywords })
  
end