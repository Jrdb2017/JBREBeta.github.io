import React, { Component } from "react"
import { Form, Button, Col, Row } from "react-bootstrap"

class NoteSubmit extends Component {
  state = {
    textRows: 1,
    comment: "",
    commentList: [],
  }

  onSubmit(e, list) {
    e.preventDefault()
    ///var list = this.state.commentList
    list.push(this.state.comment)
    //console.log(list)
    this.setState({ commentList: list })
    this.setState({ comment: "" })
    document.getElementById("CommentInput").value = ""
    //console.log(e.value)
  }
  onCommentChange(e) {
    var comment = e.target.value
    this.setState({ comment: comment })
  }
  addComment(comments) {
    var c = ""
    for (var prop in comments) {
      c = c + comments[prop] + "\n"
      //c.push(comments[prop] + "\n")
    }
    return c
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.location !== prevProps.location) {
      console.log("location change detect")
      document.getElementById("CommentInput").value = ""
      this.setState({ commentList: [] })
      document.getElementById("CommentList").value = ""
      // document.getElementById("CommentList").readOnly = true
    }
  }
  render() {
    return (
      <Form>
        <Row>
          <Col xl={4}>
            <Form.Group>
              <Form.Label>Submit notes on the property</Form.Label>
              <Form.Control
                id="CommentInput"
                as="textarea"
                rows="3"
                //value={this.state.comment}
                onChange={this.onCommentChange.bind(this)}
              />
            </Form.Group>
            <Button
              id="button"
              variant="dark"
              type="submit"
              onClick={e => this.onSubmit(e, this.state.commentList)}
            >
              Submit
            </Button>
          </Col>
          <Col xl={8}>
            <Form.Group>
              <Form.Control
                id="CommentList"
                readOnly
                as="textarea"
                rows={this.state.rows}
                value={this.addComment(this.state.commentList)}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default NoteSubmit
