import React from 'react';
import './Product.css';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import Table from '../filter/Table';
import { Button } from 'react-bootstrap';

export default function Product() {
 
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
        const [customers,setCustomers]= useState([]);
        function getCustomers(){
          fetch("http://127.0.0.1:8000/api/customers")
            .then(res => res.json())
            .then(
              (result) => {
                setIsLoaded(true);
                setCustomers(result);
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
          getCustomers();
        }, []);
          // Afficher la liste des clients et des zones des produits dans le formulaire        
        const customer_names = customers.map((item)=>({ value : item.name, label : item.name}));
        const product_zones = [
          {value: 'Module', label: 'Module'},
          {value: 'Gicleur', label: 'Gicleur'},
          {value: 'Clapet', label: 'Clapet'},
          {value: 'Vanne', label: 'Vanne'},
          {value: 'Faiscaux', label: 'Faiscaux'},
          {value: 'Bobine', label: 'Bobine'}
        ]
      
        const [product_ref, setProduct_ref] = useState("");
        const [customer_id, setCustomer_id] = useState("");
        const [customer_ref, setCustomer_ref] = useState("");
        const [customer_name, setCustomer_name] = useState("");
        const [name, setName] = useState("");
        const [zone, setZone] = useState("");
        const [uap, setUap] = useState("");
        const [message, setMessage] = useState("");
        const [editB,setEditB] = useState(true);


        let handleSubmit = async (e) => {
            e.preventDefault();
            try {
              
              
              setCustomer_id(2);
              console.log(customer_id);
              //2.
              let res = await fetch("http://127.0.0.1:8000/api/product", {
                method: "POST",
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                  product_ref : product_ref,
                  customer_ref : customer_ref,
                  customer_id : customer_id,
                  name: name,
                  zone: zone,
                  uap: uap
                }),
              })
              
              
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
              //setCustomer_name(customer_name);
              setName(product.name);
              setZone(product.zone);
              setUap(product.uap);
              setId(product.id)
          };
          function updateProduct(){
            let item={product_ref ,customer_ref , customer_id,name ,zone ,uap }
            console.warn("item",item)
            try{
                fetch(`http://127.0.0.1:8000/api/product/${id}`, {
                  method: 'PUT',
                  headers:{
                    'Accept' : 'application/json',
                    'Content-Type':'application/json'
                  },
                  body:JSON.stringify(item)
                }).then((result) => {
                    if (result.ok){
                      getProducts();
                      setProduct_ref("");
                      setCustomer_ref("");
                      setCustomer_name("");
                      setZone("");
                      setName("");
                      setUap("");
                      alert("Product Updated successfully");
                      setEditB(true);
                    }else{
                      result.json().then((resp) => {
                        console.warn(resp)
                        alert("Some error occured, Verify that : - All fields required are typed -The product reference is not duplicated! - The customer reference exists in customers table (if not than add it in product interface)");

                      })
                    }
                    
                  })
                
              } catch (err) {
              console.log(err);
            }
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
        <fieldset>
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
                  <label for="validationCustom02" class="form-label">Customer name* :</label>
                  <Select options={customer_names} class="form-select"  label={customer_name} aria-label="Default select example" onChange={(e)=>setCustomer_name(e.label)} />
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
                    <Select options={product_zones} class="form-select"  label={zone} aria-label="Default select example" onChange={(e)=>setZone(e.label)} />
                    
                </div>
                <div class="col-md-4">
                    <label for="validationCustom02" class="form-label">UAP Engineer* :</label>
                    <input type="text" class="form-control" id="validationCustom02"  onChange={(e)=>setUap(e.target.value)}  value={uap} required />
                    <div class="valid-feedback">
                    Looks good!
                    </div>
                </div>
                
                <div style={{marginTop:40}} class=" col-md-4">
                    <Button style={{marginRight:20}} variant='primary' type="submit">Add Product</Button>
                    <Button  onClick={updateProduct} disabled={editB} variant='success' type='submit'>Update<i class="fa-solid fa-pen-to-square"></i></Button>
                    
                </div>
            </form>
            </fieldset>
            <div >
                <legend >LIST OF PRODUCTS</legend>
                <div className='row md-4 filter'>
                  <div  className='col-md-4'></div>
                  <div  className='col-md-4'></div>
                  <div  className='col-md-4'>
                    <input  class="form-control " type="text" placeholder="Filter table" value={filter} onChange={handleChange} />
                  </div>
                </div>
                <table className="table table-striped" >
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
                                <td><Button onClick={()=>{selectProduct(item.id);setEditB(false)}} variant='primary'>Edit<i class="fa-solid fa-pen-to-square"></i></Button></td>
                                <td><Button onClick={()=>deleteProduct(item.id)} variant='danger' >Delete<i class="fa-solid fa-user-xmark"></i></Button></td>
                                

                    </tr>
                    ))}
                    </tbody>
                </table>

            </div>
        </div>
        
    </div>
  )
}
