<Modal
size='xl'
show={show}
onHide={handleClose}
backdrop="static"
keyboard={false}
>
<Modal.Header closeButton>
<Modal.Title>Add/Edit new claim</Modal.Title>
</Modal.Header>
<Modal.Body>
    <form class="row g-3  needs-validation" onSubmit={handleSubmit}>
                <div class="col-md-4">
                    <label for="validationCustom01" class="form-label">Intern ID* :</label>
                    <input type="text" class="form-control" id="validationCustom01" onChange={(e)=>setInternal_ID(e.target.value)} value={internal_ID} required />
                    <div class="valid-feedback">
                    Looks good!
                    </div>
                </div>
                <div class="col-md-4">
                    <label for="validationCustom02" class="form-label">Customer Claim ref* :</label>
                    <input type="text" class="form-control" id="validationCustom02" onChange={(e)=>setRefRecClient(e.target.value)}  value={refRecClient} required />
                    <div class="valid-feedback">
                    Looks good!
                    </div>
                </div>
                <div class="col-md-4">
                    <label for="validationCustom02" class="form-label">Product reference* :</label>
                    <input type="text" class="form-control" id="validationCustom02" onChange={(e)=>setProduct_ref(e.target.value)}  value={product_ref} required />
                    <div class="valid-feedback">
                    Looks good!
                    </div>
                </div>
                <div class="col-md-4">
                    <label for="validationCustom02" class="form-label">Product engraving* : </label>
                    <input type="text" class="form-control" id="validationCustom02" onChange={(e)=>setEngraving(e.target.value)}   value={engraving} required />
                    <div class="valid-feedback">
                    Looks good!
                    </div>
                </div>
                <div class="col-md-4">
                    <label for="validationCustom02" class="form-label">Date of Production* : </label>
                    <input type="date" class="form-control" id="validationCustom02" onChange={(e)=>setProd_date(e.target.value)}   value={prod_date} required />
                    <div class="valid-feedback">
                    Looks good!
                    </div>
                </div>
                <div class="col-md-4">
                    <label for="validationCustom02" class="form-label">Object* : </label>
                    <textarea class="form-control" id="validationCustom02" onChange={(e)=>setObject(e.target.value)}   value={object} required />
                    <div class="valid-feedback">
                    Looks good!
                    </div>
                </div>
                <div class="col-md-4">
                    <label for="validationCustom02" class="form-label">Opening date* :</label>
                    <input type="date" class="form-control" id="validationCustom02"  onChange={(e)=>setOpening_date(e.target.value)}  value={opening_date} required />
                    <div class="valid-feedback">
                    Looks good!
                    </div>
                </div>
                <div class="col-md-4">
                    <label for="validationCustom02" class="form-label">Final customer :</label>
                    <input type="text" class="form-control" id="validationCustom02"  onChange={(e)=>setFinal_cusomer(e.target.value)}  value={final_cusomer}  />
                    <div class="valid-feedback">
                    Looks good!
                    </div>
                </div>
                <div class="col-md-4">
                    <label for="validationCustom02" class="form-label">Claim details :</label>
                    <textarea  class="form-control" id="validationCustom02"  onChange={(e)=>setClaim_details(e.target.value)}  value={claim_details}  />
                    <div class="valid-feedback">
                    Looks good!
                    </div>
                </div>
                <div class="col-md-4">
                    <label for="validationCustom02" class="form-label">Number of Claimed parts* :</label>
                    <input type='number'  class="form-control" id="validationCustom02"  onChange={(e)=>setNbr_claimed_parts(e.target.value)}  value={nbr_claimed_parts} required />
                    <div class="valid-feedback">
                    Looks good!
                    </div>
                </div>
                <div class="col-md-4">
                    <label for="validationCustom02" class="form-label">Date of returned parts :</label>
                    <input type='date'  class="form-control" id="validationCustom02"  onChange={(e)=>setReturned_parts(e.target.value)}  value={returned_parts} />
                    <div class="valid-feedback">
                    Looks good!
                    </div>
                </div>
                
                <div class=" col-12">
                    <button class="btn btn-primary" type="submit">Add Claim</button>
                    <button onClick={updateClaim} className='btn btn-outline-primary' type='submit'>Edit<i class="fa-solid fa-pen-to-square"></i></button>
                    
                </div>
            </form>
    </Modal.Body>
    <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
        Annuler
    </Button>
    {/* onClick={ajouteAbs} */}<Button variant="success" >Valider</Button>
    </Modal.Footer>
</Modal>