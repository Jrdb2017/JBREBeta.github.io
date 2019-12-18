import React, { useState, useEffect } from "react"
import Search from "../components/search"
import "bootstrap/dist/css/bootstrap.min.css"
import Maps from "../components/googleMap"
import { Table } from "react-bootstrap"
import NoteSubmit from "../components/noteSubmit"
import "../style/style.css"

function IndexPage() {
  const [location, setLocation] = useState("")
  const [address, setAddress] = useState("")
  const [results, setResults] = useState([])
  //useEffect(() => {}, location)
  //console.log(address)
  var tableData = data => {
    const row = data.map(r => {
      var c = []
      for (var prop in r) {
        c.push(<th>{r[prop]}</th>)
      }
      return <tr>{c}</tr>
    })
    //console.log(row)
    return row
  }
  var headers = data => {
    var maxLength = 0
    var headers = []
    for (var i of data) {
      if (Object.keys(i).length > maxLength) {
        maxLength = Object.keys(i).length
        headers = Object.keys(i)
      }
    }

    var c = []
    for (var prop in headers) {
      c.push(<th>{headers[prop]}</th>)
    }
    return <tr>{c}</tr>

    //console.log(row)
  }
  return (
    <div id="page">
      <div id="title">Phase 1</div>
      <Search id={"search"} selected={setLocation} strAdd={setResults}></Search>
      <div
        id="map"
        className="col-6"
        style={({ width: "500px" }, { height: "500px" })}
      >
        <Maps locations={location} />
      </div>
      <Table striped bordered hover size="lg" variant="secondary" responsive>
        <div id="table">
          <thead>{headers(results)}</thead>
          <tbody>{tableData(results)}</tbody>
        </div>
      </Table>
      <NoteSubmit location={location}></NoteSubmit>
    </div>
  )
}

export default IndexPage
