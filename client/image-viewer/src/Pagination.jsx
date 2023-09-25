import React from 'react'
import { Pagination } from 'react-bootstrap'

const CustomPagination = ({...props}) => {
    const {images,itemsPerPage,currentPage,setCurrentPage} = props
    const totalPages = Math.ceil(images.length / itemsPerPage);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  console.log(currentPage,totalPages,"currentPage")
  return (
    <Pagination>
      <Pagination.First onClick={() => handlePageClick(1)} />
      <Pagination.Prev onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage == 1 ? true :false}/>
      
    
      {Array.from({ length: totalPages }).map((_, index) => (
        <Pagination.Item
          key={index}
          onClick={() => handlePageClick(index + 1)}
          active={currentPage === index + 1}
        >
          {index + 1}
        </Pagination.Item>
      ))}

      <Pagination.Next onClick={() => handlePageClick(currentPage + 1)} disabled={currentPage == totalPages ? true :false} />
      <Pagination.Last onClick={() => handlePageClick(totalPages)} />
    </Pagination>
  )
}

export default CustomPagination