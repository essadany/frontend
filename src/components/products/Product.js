import React from 'react';
import './Product.css';
import { useState, useEffect } from 'react';
import Table from '../filter/Table';

export default function Product() {
        const [error, setError] = useState(null);
        const [isLoaded, setIsLoaded] = useState(false);
        const [products, setProducts] = useState([]);
      
        // Note: the empty deps array [] means
        // this useEffect will run once
        // similar to componentDidMount()
        useEffect(() => {
          fetch("http://127.0.0.1:8000/api/products")
            .then(res => res.json())
            .then(
              (result) => {
                setIsLoaded(true);
                setProducts(result);
              },
              // Note: it's important to handle errors here
              // instead of a catch() block so that we don't swallow
              // exceptions from actual bugs in components.
              (error) => {
                setIsLoaded(true);
                setError(error);
              }
            )
        }, [])



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
                    {products.map((item, i) => (
                            <tr key={i}>
                                <td>{item.product_ref}</td>
                                <td>{item.customer_ref}</td>
                                <td>{item.name}</td>
                                <td>{item.zone}</td>
                                <td>{item.uap}</td>
                                
                                {/* onClick={modifierS} */}<td><button className='btn btn-outline-primary'>Edit<i class="fa-solid fa-pen-to-square"></i></button></td>
                                {/* onClick={licencier} */}<td><button className='btn btn-outline-danger' >Delete<i class="fa-solid fa-user-xmark"></i></button></td>
                    </tr>
                    ))}
                    </tbody>
                </table>

            </div>
        </div>
        
    </div>
  )
}
