<template>
  <div class="hello">
    <h1>166 Departure: Next bus arrival: {{ msg1 }}</h1>
    <h1>166 Go Home: Next bus arrival: {{ msg2 }}</h1>
  </div>
</template>

<script>
var val1 = ""
var request = new XMLHttpRequest()

request.open('POST', "http://localhost:8081/nextBusStop", false)

request.onload = function() {
    var data = JSON.parse(this.response)

    if (request.status == 200) {
        console.log("success in getting data, data:", data)
        val1 = data["Services"][0]["NextBus"]["EstimatedArrival"]
        console.log("val: ", val1)
    } else {
        console.log("error in getting response, request status: ", request.status)
        val1 = "fail"
    }
}

request.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
request.send("busStopCode=19091")

var val2 = ""

request.open('POST', "http://localhost:8081/nextBusStop", false)

request.onload = function() {
    var data = JSON.parse(this.response)

    if (request.status == 200) {
        console.log("success in getting data, data:", data)
        val2 = data["Services"][0]["NextBus"]["EstimatedArrival"]
        console.log("val: ", val2)
    } else {
        console.log("error in getting response, request status: ", request.status)
        val2 = "fail"
    }
}

request.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
request.send("busStopCode=18101")

export default {
  name: 'HelloWorld',
  data: function() {
    return {
      msg1: val1,
      msg2: val2,
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
