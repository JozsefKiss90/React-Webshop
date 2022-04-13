const handleCheckout=()=>{
    navigate('/checkout',{state:{id:1,name:'sabaoon'}});
      }


      {loading ? (
        <h2>Loading...</h2>
        ) : error ? (
            <h2>{error}</h2>
        ) : ( 
        <>
        { imageArray.map((image) => (
    <Row className="item-side">
        <Fade>
            <img src={image.img} onClick={()=>(setItem(image.img), setInProp(!inProp))} className={(item==product.img && product.img == image.img ) || item==image.img ? "red-border" : " "}/>
        </Fade>
    </Row>
        ))}  
            </>
        )}

        {array.map((img, idx) => (
            setIndexValue(array[idx]),
            <div className={[idx === imageIndex ? "slide activeSlide" : "slide"].join(' ')}>
            {idx === imageIndex ?
                <Link to={`/item/${array[idx]._id}`}>
                    <img src={img.img} alt={img}  />
                </Link> :
             <img src={img.img} alt={img} />
            }
            </div>
        ))}



        <Row className="d-flex flex-column align-self-center mt-1 same-row">
        <Row className="d-flex flex-column"> 
            <CheckoutSteps style={{position:"absolute", left:"-2px", top:"30px"}} step1 step2 step3/>
        </Row>
        <Row style={{position:"relative", height:"2rem"}}>
            <p style={{position:"absolute", left:"-2px", fontSize:"1.1rem"}}>
                Contact information
            </p>
        </Row>
        <Row>
        <Form.Group style={{width:"500px"}}  className="checkout-contact ">
            <Row  className="shipping-details d-flex">
            <Col lg={2} className="d-flex align-items-center justify-content-start">
                <input className="custom-form" value="Contact"/>
            </Col>
            <Col lg={8} className="d-flex align-items-center justify-content-start">
                <input className="custom-form" value={email}/>
            </Col>
            <Col lg={2} className="d-flex align-items-end">
                <div style={{fontSize:"0.8rem"}}>
                    Change
                </div>
            </Col>
            </Row>
            <svg height="1" width="450" className="justify-self-center" style={{position:"relative", top:"1px"}}>
                <path d="M 0 1 l 445 0" stroke="#adb5bd" stroke-width="2"fill="none" />
            </svg> 
            <Row className="shipping-details d-flex">
            <Col lg={2} className="d-flex align-items-center">
                <input className="custom-form" value="Ship to"/>
            </Col>
            <Col lg={8} className="d-flex align-items-center justify-content-start">
                <input style={{width:"100%"}} className="custom-form" value={
                    `${ zip}, ${ city}, ${ address} ${housenumber}., ${ country}`
                    }/>
            </Col>
            <Col lg={2} className="d-flex align-items-center">
                <div style={{fontSize:"0.8rem"}}>
                    Change
                </div>
            </Col>
            </Row>
            <svg height="1" width="450" className="justify-self-center" style={{position:"relative", top:"1px"}}>
                <path d="M 0 1 l 445 0" stroke="#adb5bd" stroke-width="2"fill="none" />
            </svg> 
        </Form.Group>
        </Row>
    </Row>
    <Row className="d-flex flex-column align-self-center mt-3 same-row">
        <Row style={{position:"relative", height:"2rem"}}>
            <p style={{position:"absolute", left:"-2px", fontSize:"1.1rem"}}>
                Shipping
            </p>
        </Row>
        <Row>
        <Form.Group style={{width:"500px"}} className="checkout-contact">
            <Row className="shipping-details d-flex">
            <Col lg={1} className="d-flex align-items-center justify-content-start">
                <Form.Check type={"radio"} checked="true"/>
            </Col>
            <Col lg={9} className="d-flex align-items-center justify-content-start">
                <input className="custom-form" value="Express"/>
            </Col>
            <Col lg={2} className="d-flex align-items-end">
                <div style={{fontSize:"0.9rem", fontWeight:"600"}}>
                    $5.99
                </div>
            </Col>
            </Row>
        </Form.Group>
        </Row>
        <Row>
            <Col style={{padding:"1rem 0"}} className="d-flex justify-content-start">
            <div>
                <button type="button" className="btn-rounded-7" onClick={handleCheckout}>
                    Continue to payment
                </button> 
            </div>
            <div>
                <button type="button" className="btn-rounded-in-7">
                    Return to information
                </button> 
            </div>
            </Col>
        </Row>
    </Row>

<Row className="d-flex flex-column align-self-center same-row">
<Row className="d-flex flex-column"> 
    <CheckoutSteps style={{position:"absolute", left:"-2px", top:"30px"}} step1 step2/>
</Row>
<Row style={{position:"relative", height:"2rem"}}>
    <p style={{position:"absolute", left:"-2px",}}>
        Contact information
    </p>
</Row>
<Form style={{width:"auto"}} className="checkout-contact">
    <Form.Group className="pt-3 pb-2" controlId="formBasicEmail">
        <Form.Control style={{color: "black", fontSize:"0.9rem"}} type="email" placeholder="Enter email" 
        onChange={e => (setEmail(e.target.value), setLocalEmail(e.target.value))} value={localEmail ? localEmail : email}/>
    </Form.Group>

    <Form.Group className=" d-flex pt-2 pb-3 gap-2" controlId="formBasicPassword">
        <Form.Control type="firstname" placeholder="First Name" onChange={e => (setSingleName('firstName', e.target.value),
         setLocalFirstName(e.target.value))} value={localFirstName ? localFirstName : names.firstName}/>
        <Form.Control type="lastname" placeholder="Last Name" onChange={e => (setSingleName('lastName', e.target.value),
         setLocalLastName(e.target.value))} value={localLastName ? localLastName : names.lastName}/>
    </Form.Group>
</Form>
</Row> 
<Row className="d-flex flex-column align-self-center  mt-3 same-row">
<Row style={{position:"relative", height:"2rem"}}>
  <p style={{position:"absolute", left:"-2px", fontSize:"1rem"}}>
        Shipping Adress
    </p> 
</Row>
<Form style={{width:"auto"}} className="checkout-contact">
    <Countries country={localCountry ? localCountry : ""} sendDataToParent={sendDataToParent}/>
    <Form.Group className="pt-3 pb-2" controlId="formBasicEmail">
        <Form.Control type="city" name="city" placeholder="City" value={localCity ? localCity : theObject.code} onChange={e => (handleChangeUpdateAddObject, setLocalCity(e.target.value))}/>
    </Form.Group>

    <Form.Group className=" d-flex pt-2 pb-3 gap-2" controlId="formBasicPassword">
        <Form.Control type="county" name="county" placeholder="State or county"  value={theObject.code} onChange={(handleChangeUpdateAddObject)}/>
        <Form.Control type="zip" name="zip" placeholder="ZIP code"  value={localZip ? localZip : theObject.code} onChange={e => (handleChangeUpdateAddObject, setLocalZip(e.target.value))}/>
    </Form.Group>

    <Form.Group className=" d-flex pt-2 pb-3 gap-2" controlId="formBasicPassword">
        <Form.Control type="address" name="address" placeholder="Street adress" value={localAddress ? localAddress :theObject.code} onChange={handleChangeUpdateAddObject}/>
        <Form.Control type="housenumber" name="housenumber" placeholder="Apartment or house number" value={localHousenumber ? localHousenumber : theObject.code} onChange={handleChangeUpdateAddObject}/>
    </Form.Group>
</Form>
<Row>
    <Col style={{padding:"1rem 0"}} className="d-flex justify-content-start">
        <div>
            <button type="button" className="btn-rounded-6" onClick={handleShipping}>
               Shipping
            </button> 
        </div>
        <div>
            <button type="button" className="btn-rounded-in-6">
                Return to cart
            </button> 
        </div>
    </Col>
</Row>
</Row>

<ShopItem image={Mobile} image2={Mobile_2} className={"item-mobile"}/>


<Row style={{height:'15rem', padding:'0'}}>
<Carousel fade controls={false} variant="dark">
    <Carousel.Item >
      <Col className="customer-row mt-3">
        <h3 >
        Satisfied Customers
        </h3>
      </Col>
      <Col>
      <Row className="d-flex justify-items-center">
        <p style={{position:'relative', top:'10px'}} className="text-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-quote" viewBox="0 0 16 16">
          <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z"/>
        </svg>
        </p>
      </Row>
      <Row>
        <p className="text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
        </p>
      </Row>
      <Row>
        <p className="text-center">
          -Saca
        </p>
      </Row>
    </Col>
    </Carousel.Item>
    <Carousel.Item>
      <Col className="customer-row  mt-3">
        <h3 >
        Satisfied Customers
        </h3>
      </Col>
      <Col>
      <Row className="d-flex justify-items-center">
        <p style={{position:'relative', top:'10px'}} className="text-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-quote" viewBox="0 0 16 16">
          <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z"/>
        </svg>
        </p>
      </Row>
      <Row>
        <p className="text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
        </p>
      </Row>
      <Row>
        <p className="text-center">
          -Saca
        </p>
      </Row>
    </Col>
    </Carousel.Item>
    <Carousel.Item>
      <Col className="customer-row  mt-3">
        <h3>
        Satisfied Customers
        </h3>
      </Col>
      <Col>
      <Row className="d-flex justify-items-center">
        <p style={{position:'relative', top:'10px'}} className="text-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-quote" viewBox="0 0 16 16">
          <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z"/>
        </svg>
        </p>
      </Row>
      <Row>
        <p className="text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
        </p>
      </Row>
      <Row>
        <p className="text-center">
          -Saca
        </p>
      </Row>
    </Col>
    </Carousel.Item>
  </Carousel>
</Row>