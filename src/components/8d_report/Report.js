import React from 'react'
import Tab from '../tabs/Tab'
import './Report.css';
import { Button } from 'react-bootstrap';
import { CloudDownload, Download } from 'react-bootstrap-icons';
import { FontDownload, FontDownloadSharp } from '@material-ui/icons';
export default function Report() {
  return (
    <div className='main'>
        <Tab />
        <h2 >8D Report</h2>
        <div className='border'>
          <div className='report_header'>
          <div>
            <form className='row g-3'>
              <div class="col-md-2">
                  <label   className="col-sm-3 col-form-label">opening date :</label>
                  <input type="date" class="form-control"  required />
                  
              </div>
              <div class="col-md-2">
                  <label  className="col-sm-3 col-form-label">Update date :</label>
                  <input type="date" class="form-control" required />
              </div>
            </form>
          </div>
          <div><Button variant='success'><Download /></Button></div>
          <div>
            <form className='row g-3'>
              <div class="col-md-2">
                  <label  class="form-label">Reported by :</label>
                  <textarea type="date" class="form-control"  required />
              </div>
            
            </form>
          </div>
          </div>

          <div>
            <form></form>
          </div>

          <div>
            <form></form>
          </div>

          <div><form></form></div>

          <div>
            <div></div>
            <div></div>
          </div>
          
          <div>
            <div></div>
            <div></div>
          </div>
            
          <div>
            <div></div>
            <div></div>
          </div>
        </div>
    </div>
  )
}
