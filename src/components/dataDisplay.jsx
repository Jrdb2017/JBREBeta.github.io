import React, { useState, useEffect, Component } from "react"
import { Table } from "react-bootstrap"
import "react-bootstrap-typeahead/css/Typeahead.css"

function displayData(location) {
  const [address, setAddress] = useState("")
  useEffect(() => {
    setAddress(location)
  })
  return (
    <Table striped bordered hover>
      {address}
    </Table>
  )
}

export default displayData
