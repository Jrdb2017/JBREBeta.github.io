import React, { Component } from "react"
import { Typeahead } from "react-bootstrap-typeahead"

import "react-bootstrap-typeahead/css/Typeahead.css"

class Search extends Component {
  state = {
    fullStrAddress: [],
    strAddress: [],
    selected: "",
  }
  componentDidMount() {
    fetch("https://data.cityofnewyork.us/resource/yjxr-fw8i.json")
      .then(function(res) {
        return res.json()
      })
      .then(function(jsonRes) {
        var strAdd = jsonRes.map(a =>
          a.staddr !== undefined &&
          a.borough !== undefined &&
          a.zip !== undefined
            ? a.staddr
            : ""
        )
        strAdd = strAdd.filter(a => a !== "")
        strAdd = [...new Set(strAdd)]

        var fullStrAdd = jsonRes.map(a =>
          a.staddr !== undefined &&
          a.borough !== undefined &&
          a.zip !== undefined
            ? a.staddr + " " + a.borough + " NY " + a.zip
            : ""
        )
        fullStrAdd = fullStrAdd.filter(a => a !== "")
        fullStrAdd = [...new Set(fullStrAdd)]
        //process here
        return [strAdd, fullStrAdd]
      })
      .then(streetAddresses =>
        this.setState({
          fullStrAddress: streetAddresses[1],
          strAddress: streetAddresses[0],
        })
      )
  }
  componentDidUpdate(prevProps, prevState) {
    // console.log(prevProps.strAdd)
    //console.log(this.props.strAdd)
    //console.log(prevState.selected)
    // console.log(this.state.selected)
    //console.log(this.state.selected.length)
    if (this.state.selected.length < 1) {
    } else if (this.state.selected !== prevState.selected) {
      var address
      var i = 0
      for (i in prevState.strAddress) {
        if (this.state.selected[0].includes(prevState.strAddress[i])) {
          address = prevState.strAddress[i]

          // this.props.strAdd(this.state.strAddress[i])
        }

        fetch(
          "https://data.cityofnewyork.us/resource/yjxr-fw8i.json?staddr=" +
            address
        )
          .then(function(res) {
            return res.json()
          })
          .then(function(jsonRes) {
            // console.log(jsonRes)
            prevProps.strAdd(jsonRes)
          })
      }
    }
  }
  handleChange = e => {
    this.props.selected(e)
    this.setState({ selected: e })

    //console.log(e)
    //console.log(this.state.strAddress)
    //filter e out of strAdd
  }
  render() {
    return (
      <div id="search">
        <Typeahead
          onChange={this.handleChange}
          options={this.state.fullStrAddress}
          placeholder="Search"
        />
      </div>
    )
  }
}
export default Search
