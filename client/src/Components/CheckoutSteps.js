import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='justify-content-start py-3' style={{fontSize:"0.9rem"}}>
      <Nav.Item>
        {step1 ? (
          <LinkContainer to='/cart' style={{padding:"0"}}>
            <Nav.Link style={{padding:"0"}}>
            <div className="d-flex" >
                Cart
              <div style={{position:"relative", bottom:"1px"}} className="px-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                </svg>
               </div>
            </div>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <LinkContainer to='/cart' style={{padding:"0"}} disabled>
            <Nav.Link style={{padding:"0"}}>
            <div className="d-flex" >
                Cart
                <div style={{position:"relative", bottom:"1px"}} className="px-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"  fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                </svg>
               </div>
            </div>
            </Nav.Link>
          </LinkContainer>
        )}
      </Nav.Item>

      <Nav.Item className="step-parent">
        {step2 ? (
          <LinkContainer to='/information'  >
           <Nav.Link >
           <div  className='d-flex'>
                {step3 ? "Infrormation" : <strong>Information</strong>}
                <div style={{position:"relative", bottom:"1px"}} className="px-1">
                <svg xmlns="http://www.w3.org/2000/svg"  width="14" height="14"  fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                </svg>
               </div>
            </div>
          </Nav.Link>
          </LinkContainer>
        ) : (
          <LinkContainer to='/information' style={{padding:"0"}}  >
          <Nav.Link style={{padding:"0"}}  disabled>
          <div  className='d-flex'>
               Information
               <div style={{position:"relative", bottom:"1px"}} className="px-1">
               <svg xmlns="http://www.w3.org/2000/svg"  width="14" height="14"  fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                 <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
               </svg>
              </div>
           </div>
         </Nav.Link>
         </LinkContainer>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to='/shipping' style={{padding:"0"}} >
            <Nav.Link style={{padding:"0"}}>
            <div className='d-flex'>
            {step4 ? "Shipping" : <strong>Shipping</strong>}
                <div style={{position:"relative", bottom:"1px"}} className="px-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"  fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                </svg>
               </div>
              </div>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <LinkContainer to='/shipping' style={{padding:"0"}} >
            <Nav.Link style={{padding:"0"}} disabled>
            <div className='d-flex'>
                Shipping
                <div style={{position:"relative", bottom:"1px"}} className="px-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"  fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                </svg>
              </div>
              </div>
            </Nav.Link>
        </LinkContainer>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to='/checkout' style={{padding:"0"}} >
            <Nav.Link style={{padding:"0"}}>
            <div className="d-flex">
            <strong>Payment</strong>
            </div>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <LinkContainer to='/checkout' style={{padding:"0"}} >
            <Nav.Link style={{padding:"0"}} disabled>
            <div className="d-flex">
              Payment
            </div>
            </Nav.Link>
          </LinkContainer>
        )}
      </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps