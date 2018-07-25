import React,{ Component } from 'react'
import HTTP_Client from '../API/HTTP_Client.js';
class EnrollementForm extends Component {
    constructor(props){
        super(props);
 
        this.state = {
            submitted: false,
            fields: {},
            errors: {}
        }
     }
     OnEnrollementSubmittedChange(){
        this.props.EnrollementChange(this.state.submitted,this.state.fields)
      }
     handleValidation(){
         let fields = this.state.fields;
         let errors = {};
         let formIsValid = true;
 
         //Name
         if(!fields["name"]){
            formIsValid = false;
            errors["name"] = "Name is required";
         }
 
         if(typeof fields["name"] !== "undefined"){
            if(!fields["name"].match(/^[a-zA-Z]+$/)){
               formIsValid = false;
               errors["name"] = "Only letters";
            }        
         }
 
         //Phone
         if(!fields["phone"]){
            formIsValid = false;
            errors["phone"] = "phone is required";
         }
 
         if(typeof fields["phone"] !== "undefined"){
            if(!fields["phone"].match(/^[0-9]+$/)){
               formIsValid = false;
               errors["phone"] = "Only degits";
            }        
         }
         //Email
         if(!fields["email"]){
            formIsValid = false;
            errors["email"] = "email is required";
         }
 
         if(typeof fields["email"] !== "undefined"){
            let lastAtPos = fields["email"].lastIndexOf('@');
            let lastDotPos = fields["email"].lastIndexOf('.');
 
            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
               formIsValid = false;
               errors["email"] = "Email is not valid";
             }
        }  
 
        this.setState({errors: errors});
        return formIsValid;
    }
 
    contactSubmit(e){
         
 
         if(this.handleValidation()){
            this.submit();
         }else{
            e.preventDefault();
         }
 
     }
 
     handleChange(field, e){         
         let fields = this.state.fields;
         fields[field] = e.target.value;        
         this.setState({fields});
     }

     submit()
     {
        var data= {name: this.refs.name.value,
            email:this.refs.email.value,
            phone:this.refs.phone.value
       }
       new HTTP_Client().SaveEnrollement(data);
        this.state.submitted=true;
        this.OnEnrollementSubmittedChange();
        
     }
  render () {

    return (
      <div class="container-fluid">
      <h1>Bootcam Enrollement Form</h1>
      <form name="contactform" className="contactform" onSubmit= {this.contactSubmit.bind(this)} >
      <div class="form-group">
          <label >Name</label>
          <input type="text" name="Name" required={true} ref="name"   onChange={this.handleChange.bind(this, "name")} value={this.state.fields["name"]} class="form-control" />
      <small class="text-danger" >{this.state.errors["name"]}</small>
       </div>
      <div class="form-group">
         
          <label >Email</label>
          <input type="email" ref="email" name="Email" class="form-control" onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]} />
          <small class="text-danger" >{this.state.errors["email"]}</small>
      </div>
      <div class="form-group">
          <label >Phone</label>
          <input type="tel" name="Phone" ref="phone" class="form-control" onChange={this.handleChange.bind(this, "phone")} value={this.state.fields["phone"]} />
          <small class="text-danger" >{this.state.errors["phone"]}</small>
      </div>
      <div class="form-group">
      <select  class="custom-select" name="topic" >
      <option  value="default">I am intrested in</option>
      <option ></option>
      </select>
      <small class="text-danger"> </small>
      </div>
      
      <div class="mb-3">
          <label >Time preference</label>
      <div class="form-check">
          <input  name="timePreference"   value="morning" type="radio" class="form-check-input" />
      <label class="form-check-label">Morning (9AM - 12PM)</label>
      </div>
      <div class="form-check">
          <input name="timePreference"  type="radio"  value="evening" class="form-check-input" />
      <label  class="form-check-label">Evening (5PM - 8PM)</label>
      </div>
      </div>
      <div class="form-check mb-3">
          <input name="Subscribe"  type="checkbox" class="form-check-input" />
          <label  class="form-check-label">Send me promotional offers</label>
      
      </div>
      
      <button onClick={this.onSubmit} class="btn btn-primary" type="submit">Submit</button>
      </form>
      </div>
    )
  }
}

export default EnrollementForm
