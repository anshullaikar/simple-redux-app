import React, {Component} from "react"
import {connect} from "react-redux"
import * as contactAction from "./actions/contactAction"

class App extends Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.deleteContact = this.deleteContact.bind(this)
    this.state = {
      name: ""
    }
  }

  handleChange(e){
    this.setState({
      name: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault();
    let contact = {
      name: this.state.name
    }
    this.props.createContact(contact)
    this.setState({name: ""})
  }
  listView(data, index){
    return (
      <div className = "row list-object">
        <div className="col-md-10">
          <li key={index} className = "list-group-item clearfix">
            {data.name}
          </li>
        </div>
        <div className = "col-md-2">
          <button onClick = {(e) => this.deleteContact(e, index)} className = "btn btn-danger">
            Remove
          </button>
        </div>
      </div>
    )
  }

  deleteContact(e, index){
    e.preventDefault();
    this.props.deleteContact(index)
  }

  render(){
    
    return (
      <div className="container">
        <h1>Clientside Contacts Application</h1>
        <hr/>
        <div>
          <h3>Add Contact Form</h3>
          <form onSubmit={this.handleSubmit} >
            <input type="text" className = "form-control" onChange = {this.handleChange} value = {this.state.name}/>
            <input type="submit" className = "btn btn-success" value = "ADD"/>
              {
                <ul className = "list-group">
                  {this.props.contacts.map((contact, i) => this.listView(contact, i))}
                </ul>
              }
          </form>
        </div>        
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) =>{
  return {
    contacts: state.contacts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteContact: id => dispatch(contactAction.deleteContact(id)),
    createContact: contact => dispatch(contactAction.createContact(contact))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
