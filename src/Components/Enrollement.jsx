import React, { Component } from 'react'
import EnrollementForm from '../Components/EnrollementForm.jsx';
import EnrollementDashboard from '../Components/EnrollementDashboard.jsx';
class Enrollement extends Component {
    constructor(){
      super();
      this.state = {
        formSubmitted: true
      }
   }
   OnEnrollementSubmitted(newFormSubmitted,newEnrollement){
     this.setState({
      formSubmitted:newFormSubmitted
     })
    }
    OnNewEnrollement(newFormSubmitted){
      this.setState({
       formSubmitted:newFormSubmitted
      })
   }
    render () {
      if(!this.state.formSubmitted){
        return (<EnrollementForm  EnrollementChange={ this.OnEnrollementSubmitted.bind(this) }/>)
      }
      else{
        return (<EnrollementDashboard 
           AddEnrollementChange={ this.OnNewEnrollement.bind(this) } />)  
      }
  
      
    }
  }
  
  export default Enrollement
  