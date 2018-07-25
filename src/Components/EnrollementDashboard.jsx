import React, { Component } from 'react'
import style from '../CSS/Enrollement.css'
import EnrollementTable from '../Components/EnrollementTable.jsx';


class EnrollementDashboard extends React.Component {
  constructor(props){
    super(props);
   
}
  addNewEnrollement(){
    debugger;
    this.props.AddEnrollementChange(false);
   
  }

  render () {
    return (
      <div class="container">
       <div class="table-wrapper">
           <div class="table-title">
               <div class="row">
                   <div class="col-sm-6">
           <h2>Manage <b>Enrollements</b></h2>
         </div>
         
         <div class="col-sm-6">
           <a  class="btn btn-success" data-toggle="modal" onClick={this.addNewEnrollement.bind(this)}><i class="material-icons" >&#xE147;</i> <span >Add New Enrollement</span></a>    		
         </div>
               </div>
           </div>
     <EnrollementTable  />
    </div>
    </div>
    )
  }
}

export default EnrollementDashboard
