import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import success from "../../public/success.png"
import reject from "../../public/reject.png"
import '../App.css'

const ApiResponseModal = ({...props}) => {
    const {message,responseTypeSuccess} = props
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body className='imageBody'>
      {responseTypeSuccess ? <img variant="top" src={success}/>:<img variant="top" src={reject}/>}

      </Modal.Body>
      <h3 className='imageText'>
          {message}
        </h3>
      <Modal.Footer className='modalFooter'>
        <Button variant="primary" onClick={props.onHide} className='modalFooterText'>OK</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ApiResponseModal