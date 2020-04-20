import app from "main.js"

var request = new XMLHttpRequest()

request.open('GET', "localhost:8080/nextBusStop", true)

request.onload = function() {
    var data = JSON.parse(this.response)

    if (request.status == 200) {
        console.log("success in getting data, data:", data)
        app.name = data
    } else {
        console.log("error in getting response, request status: ", request.status)
        app.name = "fail to fetch data"
    }
}

request.send()
