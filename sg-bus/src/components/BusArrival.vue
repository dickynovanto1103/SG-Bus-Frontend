<template>
  <div class="hello">
    <h1>Dicky's Bus Trip</h1>
    <h1>Go to Office</h1>
    <h2>166: Next bus arrival: {{ depart }}</h2>
    <hr>
    <h1>Go Home</h1>
    <h2>166: Next bus arrival: {{ home166 }}</h2>
    <h2>33: Next bus arrival: {{ home33 }}</h2>
    <h2>14: Next bus arrival: {{ home14 }}</h2>
  </div>
</template>

<script>
function doRequest(busStopCode, busCode) {
  var val = ""
  var request = new XMLHttpRequest()
  request.open('POST', "http://localhost:8081/nextBusStop", false)

  request.onload = function() {
      var data = JSON.parse(this.response)

      if (request.status == 200) {
          console.log("success in getting data, data:", data)
          var services = data["Services"]
          var serviceData
          for(var i = 0; i < services.length; i++) {
            var busCodeData = services[i]["ServiceNo"]
            console.log("buscodedata: " + busCodeData + " busCodeExpected: "+ busCode)
            if(busCode === busCodeData) {
              serviceData = services[i]
              console.log("serviceData: " + serviceData)
              break
            }
          }
          val = serviceData["NextBus"]["EstimatedArrival"]
          console.log("val: ", val)
      } else {
          console.log("error in getting response, request status: ", request.status)
          val = "fail"
      }
  }

  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
  request.send("busStopCode="+busStopCode)
  return val
}

var depart = doRequest("19091", "166")
var home166 = doRequest("18101", "166")
var home33 = doRequest("18101", "33")
var home14 = doRequest("18101", "14")

export default {
  name: 'HelloWorld',
  data: function() {
    return {
      depart: depart,
      home166: home166,
      home33: home33,
      home14: home14,
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
