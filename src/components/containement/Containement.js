import React from 'react'
import Tab from '../tabs/Tab'
import { Download } from 'react-bootstrap-icons'
import { Button } from 'react-bootstrap'
import { Add, Edit } from '@material-ui/icons'

export default function Containement() {
  return (
    <div className='main'>
        <Tab />
        <h2 ><img className='report_icon' src='../icons/container.png'/>  Containement List - Risk Assesment</h2>
    <div className='border'>
      <div>
        <form className='row'>
          <div className='col-2'>
            <label >Update date : </label>
            <input type='date' className='form-control form-control-sm' />
          </div>
          <div className='col-1'></div>
        <div className='col-6'>
          <Button variant='success'><Download /> </Button>
        </div>
        </form>
      </div>

      <div>
        <legend>Sorting Method</legend>
        <div>
          <form className='row '>
            <div>
              <label className='label-control'>Method description</label>
              <textarea rows={4} className='form-control '/>
            </div>
            <div >
              <label className='label-control'>Method validation</label>
              <textarea rows={4} className='form-control '/>
            </div>
          </form>
        </div>
      </div>

      <div>
        <legend>Risk Assesment</legend>
        <div>
          <form className='row'>
            <div>
              <textarea rows={6} className='form-control '/>
            </div>
          </form>
        </div>
      </div>

      <div>
        <legend>Sorting List</legend>
        <div>
          <table className='table'>
            <thead>
              <tr>
                <th>Location and company</th>
                <th>Qty to sort</th>
                <th>Qty sorted</th>
                <th>Qty NOK</th>
                <th>Scrap</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><Button><Edit /></Button></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div><Button variant='success'><Add /></Button></div>

      </div>
      <div>
            <Button style={{marginRight:10}} variant="success" >Edit</Button>
            <Button variant='primary' >Save</Button>
        </div>
    </div>
    </div>
  )
}
