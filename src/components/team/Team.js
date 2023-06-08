import React from 'react'
import Tab from '../tabs/Tab'

export default function Team() {
  return (
    <div className='main'>
        <Tab />
        <h2 >Problem Solving Team</h2>
        <div className='border'>
        <form class="row g-3  needs-validation" onSubmit={handleSubmit}>
                        <div class="col-md-6">
                            <label for="validationCustom02" class="form-label">Reference* :</label>
                            <input type="text" class="form-control" id="validationCustom02" onChange={(e)=>setCustomer_ref(e.target.value)}  value={customer_ref} required />
                            <div class="valid-feedback">
                            Looks good!
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label for="validationCustom02" class="form-label">Customer name* : </label>
                            <input type="text" class="form-control" id="validationCustom02" onChange={(e)=>setName(e.target.value)}   value={name} required />
                            <div class="valid-feedback">
                            Looks good!
                            </div>
                        </div>
                        </form>
        </div>
        
    </div>
  )
}
