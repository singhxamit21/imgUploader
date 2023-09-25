import { useEffect, useRef, useState } from 'react';
import './App.css'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { SOMETHING_WENT_WRONG, defaultAPI } from './constant';
import ApiResponseModal from './modals/ApiResponseModal';
import CustomPagination from './Pagination';
import searchBar from '../public/searchBar.svg'

function App() {
  const [file, setFile] = useState(null)
  const [images, setImages] = useState([])
  const [imageName, setImageName] = useState("")
  const fileInputRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [modal, setModal] = useState({});
  const [errors, setErrors] = useState({})
  const itemsPerPage = 3;

  const indexOfLastImage = currentPage * itemsPerPage;
  const indexOfFirstImage = indexOfLastImage - itemsPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

  useEffect(() => {
    fetchImage()
  }, [])

  const fetchImage = () => {
    axios.get(`${defaultAPI}/v1/api/getImage`)
      .then(res => setImages(res.data))
      .catch(err => console.log(err))
  }

  const handleUpload = (ev) => {
    ev.preventDefault()
    if (!file) {
      setErrors({ ...errors, ["fileError"]: "Please Select a File" })
    }

    if (!imageName) {
      setErrors({ ...errors, ["imageNameError"]: "Please Enter a Title" })
    }
    if (file && imageName) {
      const formdata = new FormData()
      formdata.append('file', file)
      formdata.append('name', imageName)
      axios.post(`${defaultAPI}/v1/api/upload`, formdata)
        .then(res => {
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
          setImageName("")
          fetchImage()
          setModal({ ["show"]: true, ["message"]: "Image Added Successfully", ["responseTypeSuccess"]: true })
        })
        .catch(err => {
          setModal({ ["show"]: true, ["message"]: SOMETHING_WENT_WRONG, ["responseTypeSuccess"]: false })
        })
    }
  }

  const handleChange = (ev) => {
    const { name, value } = ev.target
    setErrors({})
    setImageName(value)
  }


  return (
    <Container>
      <Row>
        <Col>
          <h1 className='my-4 text-center'>Photo Gallery</h1>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={12}>
          <Card>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Row>
                    <Col md={4}>
                      <Form.Label>Title <span style={{ color: "red" }}>*</span></Form.Label>
                      <Form.Control type="email" placeholder="Please Enter Image Title" onChange={handleChange} value={imageName} />
                      <span style={{ color: "red" }}>{errors.imageNameError}</span>
                    </Col>
                    <Col md={4}>
                      <Form.Label>Choose Image <span style={{ color: "red" }}>*</span></Form.Label>
                      <Form.Control ref={fileInputRef} type="file" accept="image/x-png,image/jpeg" onChange={ev => {
                        setErrors({})
                        setFile(ev.target.files[0])
                      }} />
                      <span style={{ color: "red" }}>{errors.fileError}</span>
                    </Col>
                    <Col md={4}>
                      <Button variant="primary" onClick={handleUpload} className='uploadBtn'>Upload</Button>
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* <Row className="d-flex justify-content-end">
        <Col md={4}>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Search...."
            />
            <Button variant="warning" id="button-addon2">
                <img src={searchBar} className='searchBarIcon'/>
            </Button>
          </InputGroup>
        </Col>
      </Row> */}
      <Row>
        {currentImages.map((item, index) => {
          return (
            <Col md={4} key={index}>
              <Card>
                <Card.Img variant="top" src={`${defaultAPI}/Images/` + item.image} className='img-fluid' />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          )
        })}


      </Row>
      <Row>
        <Col>
          {images.length > 0 ?
            <div className='mt-2 paginationParentdiv'>
              <CustomPagination
                images={images}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div> : null}
        </Col>
      </Row>

      {modal.show ?
        <ApiResponseModal
          show={modal.show}
          onHide={() => setModal({})}
          message={modal.message}
          responseTypeSuccess={modal.responseTypeSuccess}
        /> : null}
    </Container>
  )
}

export default App
