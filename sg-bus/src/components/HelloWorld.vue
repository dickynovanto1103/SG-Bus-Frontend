<template>
  <div class="hello">
    <h1>166: Next bus arrival: {{ msg }}</h1>
  </div>
</template>

<script>
var val = ""
var request = new XMLHttpRequest()

request.open('POST', "http://localhost:8081/nextBusStop", false)

request.onload = function() {
    var data = JSON.parse(this.response)

    if (request.status == 200) {
        console.log("success in getting data, data:", data)
        val = data["Services"][0]["NextBus"]["EstimatedArrival"]
        console.log("val: ", val)
    } else {
        console.log("error in getting response, request status: ", request.status)
        val = "fail"
    }
}

request.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
request.send("busStopCode=19091")

export default {
  name: 'HelloWorld',
  data: function() {
    return {
      msg: val,
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
