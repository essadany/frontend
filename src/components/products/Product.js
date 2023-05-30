import React from 'react';
import './Product.css';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import Table from '../filter/Table';

export default function Product() {
    const options = [
        { value: 'Clapet', label: 'Clapet' },
        { value: 'Clapet', label: 'Gicleur' },
        { value: 'Clapet', label: 'Bobine' }
        ]

    // Get Product list ---------------------------------------------------------------------------------------------------------------
        const [error, setError] = useState(null);
        const [isLoaded, setIsLoaded] = useState(false);
        const [products, setProducts] = useState([]);
      
        // Note: the empty deps array [] means
        // this useEffect will run once
        // similar to componentDidMount()
        function getProducts(){
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
        }
        useEffect(() => {
          getProducts();
        }, [])
        // Add Product ------------------------------------------------------------------------------------------------
        const [product_ref, setProduct_ref] = useState("");
        const [customer_ref, setCustomer_ref] = useState("");
        const [name, setName] = useState("");
        const [zone, setZone] = useState(options[1]);
        const [uap, setUap] = useState("");
        const [message, setMessage] = useState("");


        let handleSubmit = async (e) => {
            e.preventDefault();
            try {
              let res = await fetch("http://127.0.0.1:8000/api/product", {
                method: "POST",
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                  product_ref : product_ref,
                  customer_ref : customer_ref,
                  name: name,
                  zone: zone,
                  uap: uap
                }),
              })
              let resJson = await res.json();
              
              if (res.status === 200) {
                setProduct_ref("");
                setCustomer_ref("");
                setZone("");
                setName("");
                setUap("");
                alert("Product Added successfully");
              } else {
                alert("Some error occured, try again!");
              }
            } catch (err) {
              console.log(err);
            }
          };
          //Update Product -------------------------------------------------------------------------------------------------
          const [id,setId] = useState('');
          function selectProduct(id){
            let product=products[id-1];
            setProduct_ref(product.product_ref);
                setCustomer_ref(product.customer_ref);
                setName(product.name);
                setZone(product.zone);
                setUap(product.uap);
                setId(product.id)
          }
          function updateProduct(){
            let item={product_ref ,customer_ref ,name ,zone ,uap }
            console.warn("item",item)
            fetch(`http://127.0.0.1:8000/api/product/${id}`, {
              method: 'PUT',
              headers:{
                'Accept' : 'application/json',
                'Content-Type':'application/json'
              },
              body:JSON.stringify(item)
            }).then((result) => {
                result.json().then((resp) => {
                  console.warn(resp)
                  getProducts()
                })
              })
            }
          // Delete Product ------------------------------------------------------------------------------------------------------------------------
          function deleteProduct(id) {
            fetch(`http://127.0.0.1:8000/api/product/${id}`, {
              method: 'DELETE'
            }).then((result) => {
              result.json().then((resp) => {
                console.warn(resp)
                getProducts()
                alert('Product Deleted Successfully')
              })
            })
          }
          // Filter Products --------------------------------------------------------------------------------------------------------------------------
          const [filter, setFilter] = useState("");
          const handleChange = (e) => {
            setFilter(e.target.value);
          };

          const filteredData = products.filter((item) =>
            Object.values(item).some((value) =>
              String(value).toLowerCase().includes(filter.toLowerCase())
            )
          );
          

  return (
    <div className='main product'>
        <h2>Products</h2>
        <div className='border'>
            <legend>ADD PRODUCT</legend>
            <form class="row g-3  needs-validation" onSubmit={handleSubmit}>
                
                <div class="col-md-4">
                    <label for="validationCustom01" class="form-label">Intern reference* :</label>
                    <input type="text" class="form-control" id="validationCustom01" onChange={(e)=>setProduct_ref(e.target.value)} value={product_ref} required />
                    <div class="valid-feedback">
                    Looks good!
                    </div>
                </div>
                <div class="col-md-4">
                    <label for="validationCustom02" class="form-label">Customer reference* :</label>
                    <input type="text" class="form-control" id="validationCustom02" onChange={(e)=>setCustomer_ref(e.target.value)}  value={customer_ref} required />
                    <div class="valid-feedback">
                    Looks good!
                    </div>
                </div>
                <div class="col-md-4">
                    <label for="validationCustom02" class="form-label">Product name* : </label>
                    <input type="text" class="form-control" id="validationCustom02" onChange={(e)=>setName(e.target.value)}   value={name} required />
                    <div class="valid-feedback">
                    Looks good!
                    </div>
                </div>
                <div class="col-md-4">
                    <label for="validationCustom02" class="form-label">Zone* :</label>
                    <Select options={options} class="form-select"  value={zone} aria-label="Default select example" onChange={(e)=>setZone(e.label)} />
                    
                </div>
                <div class="col-md-4">
                    <label for="validationCustom02" class="form-label">UAP Engineer* :</label>
                    <input type="text" class="form-control" id="validationCustom02"  onChange={(e)=>setUap(e.target.value)}  value={uap} required />
                    <div class="valid-feedback">
                    Looks good!
                    </div>
                </div>
                
                <div class=" col-12">
                    <button class="btn btn-primary" type="submit">Add Product</button>
                    <button onClick={updateProduct} className='btn btn-outline-primary' type='submit'>Edit<i class="fa-solid fa-pen-to-square"></i></button>
                    
                </div>
            </form>
            
            <div >
                <legend >LIST OF PRODUCTS</legend>
                <input
                  type="text"
                  placeholder="Filter table"
                  value={filter}
                  onChange={handleChange}
                />
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
                    {filteredData.map((item, i) => (
                            <tr key={i}>
                                <td>{item.product_ref}</td>
                                <td>{item.customer_ref}</td>
                                <td>{item.name}</td>
                                <td>{item.zone}</td>
                                <td>{item.uap}</td>
                                <td><button onClick={()=>selectProduct(item.id)} className='btn btn-outline-primary'>Edit<i class="fa-solid fa-pen-to-square"></i></button></td>
                                <td><button onClick={()=>deleteProduct(item.id)} className='btn btn-outline-danger' >Delete<i class="fa-solid fa-user-xmark"></i></button></td>

                    </tr>
                    ))}
                    </tbody>
                </table>

            </div>
        </div>
        
    </div>
  )
}
