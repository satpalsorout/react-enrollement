import React, { Component } from 'react'
import HTTP_Client from '../API/HTTP_Client.js';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import style from '../CSS/Enrollement.css'

class EnrollementTable extends Component {
  constructor(props){
    super(props);
    this.state={
      columns:[
        { key: 'name', name: 'Name'  }, 
        { key: 'phone', name: 'Phone' },
        { key: 'email', name: 'Email' },
        { key: 'edit', name: 'Edit' },
        { key: 'delete', name: 'Delete' }
      ],
      rows:[],
      updateData:true,
      showModal: false,
      currentId:'',
      currentSelectedRow:{}
    };
  this.deleteRow=this.deleteRow.bind(this);
  this.editRow=this.editRow.bind(this);
  } 
  
  componentDidUpdate() {
    if(this.state.updateData && this.state.updateData)
    {
      this.setState({ updateData: false });
      this.getServiceData();
    }
    
  }
  componentDidMount()
  {
    this.getServiceData();
}
  getServiceData()
  {
    new HTTP_Client().GetEnrollementData(result => {
      const { data, error } = result;
      if (error) {
        // Handle error
        return;
      }
      if (data) {
        this.setState({ rows: data });
      }
    });
 
  }

UpdateEnrollementServie()
{
   var data= {name: this.refs.name.value,
         email:this.refs.email.value,
         phone:this.refs.phone.value
    }
    new HTTP_Client().UpdateEnrollement(this.state.currentId,data);
}
_saveModal()
{
  this.UpdateEnrollementServie();
  this.setState({
    updateData:false
  })
  var oldRows=this.state.rows;
  var self=this;
  var id=''
 for(var i=0;i<oldRows.length;i++)
 {
  if(oldRows[i].id==self.state.currentId){
    id=i
 }
 }
 oldRows.splice(id,1);
var newRows=oldRows;
newRows.push({name: this.refs.name.value,
  email:this.refs.email.value,
  phone:this.refs.phone.value
});
 

  this.setState({
    rows:newRows,
    currentId:''});

  this._closeModal();
}
  
  editRow(i) {
 this.setState({showModal:true,currentId:this.state.rows[i].id,
  currentSelectedRow:this.state.rows[i]
})
  }
  deleteRow(i) {
    this.setState({
      updateData:false
    })
  new HTTP_Client().DeleteEnrollement(this.state.rows[i].id);
  this.state.rows.splice(i,1);
   var newrows=this.state.rows;
   this.setState({
     rows:newrows
   })
 
  }
  _closeModal()
  {
    this.setState({showModal:false})
  }
  render () {
    return (
      <div>
        <table class="table table-striped table-hover" >
        <thead>
          <tr>
            <th>
          <span class="custom-checkbox">
                  <input type="checkbox" id="selectAll" />
                  <label for="selectAll"></label>
                </span>
                </th>
            {
            this.state.columns.map(function(text,i)
            {
              return (<th key={i}> {text.name}</th>)
            })
          }
          </tr>
        </thead>
  
        <tbody>
          {
            this.state.rows.map((text, i)=>
             {
              return (<tr> 
                         {
                           <td>
                           <span class="custom-checkbox">
                           <input type="checkbox" id={"checkbox"+i} name="options[]" value={i} />
                           <label for={"checkbox"+i}></label>
                         </span>
                         </td>
                          }
                          {
                            Object.keys(text).map((key, index) =>{
                              if(key!='editFlag' && key!='id')
                              {
                              return (<td key={index} > {text[key]} </td>)
                            }
                           })
                          }
                          {
                            <td>
                            <a   class="edit" onClick={this.editRow.bind(this,i)} data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>  
                        </td>
                          }
                          {
                            <td>
                            <a key={i} id={"Delete_"+i}  class="delete" onClick={this.deleteRow.bind(this,i)}  data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                          </td>
                          }
                </tr>)
             })
          }
  
        </tbody>
  
      </table> 
     <div>
     <Modal
          isOpen={this.state.showModal}
          onDismiss={this._closeModal.bind(this)}
          isBlocking={false}
          containerClassName="ms-modalExample-container"
         
        >
        
          <div className="ms-modalExample-body" style={{width: 600}} >
           
          <div className="docs-TextFieldExample" style={{width: 590}}>
        <TextField ref="name" label="Name" value={this.state.currentSelectedRow.name}required={true}  />
        <TextField ref="email" label="Email" value={this.state.currentSelectedRow.email} required={true}   />
        <TextField ref="phone" label="Phone" value={this.state.currentSelectedRow.phone} required={true}    />
        <PrimaryButton type="submit" onClick={this._saveModal.bind(this)}>Save</PrimaryButton>
      </div>
          </div>
        </Modal>
       </div>
      </div>
    );
  }

}

export default EnrollementTable
