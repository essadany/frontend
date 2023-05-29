import React from 'react';
import './Product.css';
import { useState } from 'react';
import Table from '../filter/Table';

export default function Product() {
      const data = [{
        "ref_interne" : "154264",
        "ref_customer" : "d555f8d6",
        "name" : "gicleur45",
        "zone" : "gicleur",
        "uap" : "Mohamed"
        },
        {
        "ref_interne" : "513263",
        "ref_customer" : "j84s5r8f",
        "name" : "clapet45",
        "zone" : "clapet",
        "uap" : "Amine"
        }];
  return (
    <div className='main product'>
        <h2>Products</h2>
        <div className='border'>
            <legend>ADD PRODUCT</legend>
            <form class="row g-3  needs-validation" novalidate>
                
                <div class="col-md-4">
                    <label for="validationCustom01" class="form-label">Intern reference* :</label>
                    <input type="text" class="form-control" id="validationCustom01" value="Mark" required />
                    <div class="valid-feedback">
                    Looks good!
                    </div>
                </div>
                <div class="col-md-4">
                    <label for="validationCustom02" class="form-label">Customer reference* :</label>
                    <input type="text" class="form-control" id="validationCustom02" value="Otto" required />
                    <div class="valid-feedback">
                    Looks good!
                    </div>
                </div>
                <div class="col-md-4">
                    <label for="validationCustom02" class="form-label">Product name* : </label>
                    <input type="text" class="form-control" id="validationCustom02" value="Otto" required />
                    <div class="valid-feedback">
                    Looks good!
                    </div>
                </div>
                <div class="col-md-4">
                    <label for="validationCustom02" class="form-label">Engraving* :</label>
                    <input type="text" class="form-control" id="validationCustom02" value="Otto" required />
                    <div class="valid-feedback">
                    Looks good!
                    </div>
                </div>
                <div class="col-md-4">
                    <label for="validationCustom02" class="form-label">Production date* :</label>
                    <input type="date" class="form-control" id="validationCustom02" value="Otto" required />
                    <div class="valid-feedback">
                    Looks good!
                    </div>
                </div>
                <div class="col-md-4">
                    <label for="validationCustom02" class="form-label">Zone* :</label>
                    <select class="form-select" aria-label="Default select example">
                    <option selected value="0">Gicleur</option>
                    <option value="1">Clapet</option>
                    <option value="2">Bobine</option>
                    <option value="3">Faiseaux</option>
                    <option value="3">Module</option>
                    </select>
                </div>
                <div class="col-md-4">
                    <label for="validationCustom02" class="form-label">UAP Engineer* :</label>
                    <input type="text" class="form-control" id="validationCustom02" value="Otto" required />
                    <div class="valid-feedback">
                    Looks good!
                    </div>
                </div>
                
                <div class=" col-12">
                    <button class="btn btn-primary" type="submit">Add Product</button>
                </div>
            </form>
            
            <div >
                <legend >LIST OF PRODUCTS</legend>
                <table className="table" >
                    <thead>
                        <tr>
                            <th >Interne ref</th>
                            <th >Customer ref</th>
                            <th >Name</th>
                            <th>Zone</th>
                            <th>UAP Engineer</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((item, i) => (
                            <tr key={i}>
                                <td>{item.ref_interne}</td>
                                <td>{item.ref_customer}</td>
                                <td>{item.name}</td>
                                <td>{item.zone}</td>
                                <td>{item.uap}</td>
                                
                                {/* onClick={modifierS} */}<td><button className='btn btn-outline-primary'>Edit<i class="fa-solid fa-pen-to-square"></i></button></td>
                                {/* onClick={licencier} */}<td><button className='btn btn-outline-danger' ><i class="fa-solid fa-user-xmark"></i></button></td>
                    </tr>
                    ))}
                    </tbody>
                </table>

            </div>
        </div>
        
    </div>
  )
}
