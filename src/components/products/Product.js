import React from 'react';
import './Product.css';
export default function Product() {
  return (
    <div className='product'>
        <h2>Products</h2>
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
            <table class=" table ">
                <thead className='table-light '>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    </tr>
                    <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    </tr>
                    <tr>
                    <th scope="row">3</th>
                    <td colspan="2">Larry the Bird</td>
                    <td>@twitter</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}
