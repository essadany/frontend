import React from 'react'
import Tab from '../tabs/Tab'
import { Button } from 'react-bootstrap'
import Select from 'react-select';

export default function Team() {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    // Add more options as needed
  ];
  return (
    <div className='main'>
        <Tab />
        <h2 >Problem Solving Team</h2>
        <div className='border'>
          <div className='row'>
          <div className='col-md-2'></div>
            <div className='col-md-4 '> 
              <legend style={{borderRadius:20}}>Add a leader</legend>
              <form className='g-3  '>
                  <div class="">
                      <label for="validationCustom02" class="form-label">Leader* :</label>
                      <select   className='form-select' />
                  </div>     
                  <div className=''>
                    <label className='form-label'>Phone :</label> 
                    <input type="text" className="form-control form-control-sm"  required />
                  </div>
                  <Button style={{marginTop:10}} variant='primary'>Add</Button>
              </form>
            </div>
            <div className='col-md-4 '>
              <legend style={{borderRadius:20}}>Add a member</legend>
              <form class="g-3 ">
                    <div className=' '>
                      <label className='form-label'>Member name* :</label> 
                      <select   className='form-select' />
                    </div>
                    <Button  style={{marginTop:10}}  variant='primary'>Add</Button>
                  
                </form>
            </div>
           
          </div>
          <div>
            <legend>Team members</legend>
          <div className='row md-4 filter'>
                <div  className='col-md-4'></div>
                <div  className='col-md-4'></div>
                <div  className='col-md-4'>
                  <input  className="form-control " type="text" placeholder="Filter table" />
                </div>
            </div>
              <div>
                <table className="table table-striped" >
                    <thead>
                        <tr>
                            <th >Name</th>
                            <th >Function</th>   
                        </tr>                   
                    </thead>
                    <tbody>
                        <tr>
                            <td>YASSINE</td>
                            <td>stagiaire</td>
                          
                            <td><Button style={{marginRight:10}} variant='primary'>Edit</Button>
                                <Button  variant='danger' >Delete</Button></td>

                        </tr>
                    </tbody>
                </table>
              </div>
          </div>
            

            </div>
        
        </div>
  )
}
