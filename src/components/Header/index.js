import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import {useState} from 'react'
import Spinner from 'react-bootstrap/Spinner';
import axios from "axios"
import "./index.css"
import { useRef } from 'react';


const Header=()=>{
  const apiStatusConstants = {
    initial: 'INITIAL',
    inProgress: 'IN_PROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE',
  }
    const [apiResponse, setApiResponse] = useState({
        status: apiStatusConstants.initial,
        data: null,
        errorMsg: null,
      })
    const [images, setImages]=useState([])
    const searchInput =useRef(null)
    const onSubmitbutton=(event)=>{
        event.preventDefault();
        console.log(searchInput.current.value)
        fetchImages()
    }
    const fetchImages = async () => {
      setApiResponse({
        status: apiStatusConstants.inProgress,
        data: null,
        errorMsg: null,
      })

      const url = 'https://api.unsplash.com/search/photos'
      const access="k3E-4jT59w4qXRuwE7Z_r88Q3H1Xflgcf_2vE58pqgU"
      const IMAGES_PER_PAGE = 24;
      
      const {data}  = await axios.get(
        `${url}?query=${
          searchInput.current.value
        }&page=1&per_page=${IMAGES_PER_PAGE}&client_id=${access}`);
        setImages(data.results)
        
        setApiResponse({
          status: apiStatusConstants.success,
          data: null,
        })

    }
   
    const buttonText= async (text)=>{
        searchInput.current.value=text;
        fetchImages();
    }

    const renderSuccessView = () => 
      
      (
        <div className='img-container'>
        {images.map((images)=>(
          
          <img key={images.id} alt={images.alt_description} src={images.urls.small} className='each-image'/>
        ))}
      </div>
    )
    

    const renderLoadingView = () => (
      <Spinner className='mt-5' animation="border" role="status">
      <span className="visually-hidden ">Loading...</span>
    </Spinner>
    )

    const renderLeaderboard = () => {
      const {status} = apiResponse
  
      switch (status) {
        case apiStatusConstants.inProgress:
          return renderLoadingView()
        case apiStatusConstants.success:
          return renderSuccessView()
        default:
          return null
      }
    }
    return(
        <div className='header-container'>
            <div className='form-container'>
               <h1 className="main-heading mb-3">Search Images</h1>
               <Form className='form-search' onSubmit={onSubmitbutton}>
                    <Form.Control type="search" placeholder="Type any thing..." ref={searchInput} />
                </Form>
                <div className='pt-3'>
                    <Button className='mb-3 mt-3' variant="primary" onClick={()=>buttonText("Animals")}>Animals</Button>{' '}
                    <Button className='mb-3 mt-3' variant="secondary" onClick={()=>buttonText("Mountains")}>Mountains</Button>{' '}
                    <Button className='mb-3 mt-3' variant="success" onClick={()=>buttonText("Trees")}>Trees</Button>{' '}
                    <Button className='d mb-3 mt-3' variant="warning" onClick={()=>buttonText("ELectronics")}>Electronics</Button>{' '}
                    <Button className='a mb-3 mt-3' variant="danger" onClick={()=>buttonText("Birds")}>Birds</Button>{' '}
                    <Button className='b mb-3 mt-3' variant="info" onClick={()=>buttonText("Mobiles")}>Mobiles</Button>{' '}
                    <Button className='c mb-3 mt-3' variant="dark" onClick={()=>buttonText("Houses")}>Houses</Button>{' '}
                    
                </div>
            </div>
            <div className='responsive-container'>
            {renderLeaderboard()}
            </div>
        </div>
    )
} 
export default Header;