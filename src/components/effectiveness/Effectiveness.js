import React from 'react'
import Tab from '../tabs/Tab'

export default function Effectiveness() {
  return (
    <div className='main'>
        <Tab />
        <h2 ><img className='report_icon' src='icons/effect.png'/>  Detailled Proof of Effectiveness For Long Term Action</h2>
        <div className='border'>
          <form className='row '>
            <div className='col-2'>
              <label>Update date : </label>
              <input type='date' className='form-control form-control-sm'/>
            </div>
            <div className='col-10'></div>
            <div>
              <label>Details : </label>
              <textarea rows={10} className='form-control '/>
            </div>

          </form>
        </div>
    </div>
  )
}
