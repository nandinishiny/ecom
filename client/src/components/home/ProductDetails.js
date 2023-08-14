import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { addItem } from '../../redux/productSlice';
import CartNotify from '../cart/CartNotify';
import {IoIosArrowBack} from 'react-icons/io'
import {IoIosArrowForward} from 'react-icons/io'
import ProductDetailShimmer from './ProductDetailShimmer';
import {FaEdit} from 'react-icons/fa'
import axios from 'axios';
import { newRequest } from '../userAuth/newRequest';
import CartMessage from '../cart/CartMsg';
const ProductDetails = () => {
    const [singleItem,setSingleItem]=useState("");//this variable use to fetch the product from api.
    const [showNotify,setShowNotify]=useState(false);
    const [nextItem,setNextItem] = useState(0);
    const [showAddComment,setShowAddComment] = useState(false);
    const [commentInput,setCommentInput] = useState("");
    const [showConfirmation,setShowConfirmation] = useState(false);//this variable show the confirmation page to delete product.
    const [showCartMessage, setShowCartMessage] = useState(false);//to show a message when an item is added to the cart.

    //editable variables
    const [isAdmin,setIsAdmin] = useState(false);//to check weather edit option available or not.

    {/*getting id from parameters*/}
    const {id}=useParams();
    {/* for navigating*/}
    const navigate = useNavigate();
    {/*Calling api */}
    useEffect(()=>{
        getSingleItemDetails()
    },[]);
    // const getSingleItemDetails =async()=>{
    //     const data = await fetch(`http://localhost:3000/api/v1/product/${id}`);
    //     const jsonData = await data.json();
    //     setSingleItem(jsonData.product) 
    // }
    const getSingleItemDetails = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/v1/product/${id}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const jsonData = await response.json();
          setSingleItem(jsonData.product);
        } catch (error) {
          console.error('Error fetching single item:', error);
          // Handle the error (e.g., show an error message or redirect to an error page)
        }
      };
    
    {/*Destructuring data from api*/}
    const {description,name,price,ratings,images,category,stock,reviews,noOfReviews,offer}= singleItem;
    const [editName,setEditName] = useState(name || '');
    const [editDesc,setEditDesc] = useState(description || '');
    const [editPrice,setEditPrice] = useState(price || '');
    // const [editRatings,setEditRatings] = useState(ratings || '');
    // const [editImage,setEditImage] = useState('');
    const [editImages,setEditImages] = useState(images || []);
    const [editCategory,setEditCategory] = useState(category || '');
    const [editStock,setEditStock] = useState(stock || '');

   {/*Making image corousel */}
    const nextItemView =()=>{
       if(nextItem<(images.length-1)){
           setNextItem(nextItem+1)}

    }
    const previousItem =()=>{
       if(nextItem>0){
           setNextItem(nextItem-1)}
    }
    {/*Dispatching product to redux store*/}
    const dispatch = useDispatch();
    const addItemtoCart=(item)=>{
        dispatch(addItem(item))
        setShowCartMessage(true);
        setTimeout(() => {
            setShowCartMessage(false);
        }, 2000);
    }
    const addComment =(val)=>{
        setShowAddComment(val)
    }
    //Accessing user in local storage
    const userInLst = JSON.parse(localStorage.getItem("currentUser"));

    {/*Editing handler*/}
    const KeepOnEditMode = ()=>{
        setIsAdmin(true);
    } 

    
     {/*Handling images */}
    const handleImages = async(e,index)=>{
        const file = e.target.files[0];
        // const reuploadImages = [];     
        try {
            const formData = new FormData();
            formData.append('file',file);
            formData.append('upload_preset', 'ecomandcohome');
            formData.append('folder', 'ecomandco');
            const res = await axios.post(
                'https://api.cloudinary.com/v1_1/ecomandco/image/upload',
                formData
              );
              alert("Image is uploaded successfully");
              const imageObject = {
                public_id:res.data.public_id,
                url:res.data.secure_url
              }
              // Step 2.1: Create a copy of editedImages array
            const updatedEditedImages = [...editImages];
            updatedEditedImages.push(imageObject);
                // Step 2.3: Update the state with the updated array
            setEditImages(updatedEditedImages);
            console.log(editImages)
        } catch (error) {
            console.log(error);
            
        }

    }
    {/*Submitting form to api - update product -- admin */}
    // Update form handling
const updateProductForm = async (e) => {
    e.preventDefault();
    
    // Create a data object with the updated fields
    const updatedData = {};
    if(editName){
        updatedData.name = editName
    }
    if(editCategory){
        updatedData.category = editCategory
    }
    if(editDesc){
        updatedData.description = editDesc
    }
    if(editPrice){
        updatedData.price = editPrice
    }
    if(editStock){
        updatedData.stock = editStock
    }
    if(editImages.length !== 0){
        updatedData.images = editImages
    }
    try {
      // Make a PUT request to update the product using the API route
      await newRequest.put(`product/${id}`, updatedData);
  
      // You might want to refresh the product details after the update
      // You can do this by calling the getSingleItemDetails function again
      getSingleItemDetails();
  
      alert("Product updated successfully");
    } catch (error) {
      console.log(error);
    }
  };
  //Handle Delete
  const handleDelete = async(e)=>{
    e.preventDefault();
    try {
        await newRequest.delete(`product/${id}`);   
        alert("the product got deleted");
        navigate("/products");    
    } catch (error) {
        console.log(error);
        
    } 
  }
  

    {/*Shimmer in absence of product data */}
    if(!singleItem){
        return <ProductDetailShimmer/>
    }
  return (
    <>
    {showNotify&&<CartNotify />}     

    <div className='w-full h-screen flex justify-center'
     style={{backgroundColor:"rgb(235 242 254)"}}>
        <div className=' w-11/12 shadow-lg border-t-2 flex flex-col sm:flex-row overflow-y-auto' style={{backgroundColor:"#ffffff"}}>

             {/*Images Setup*/}  
            
            <div className='flex flex-col sm:w-2/5 w-full sm:p-10 p-1'>
                <div className='w-full sm:h-3/5 h-60 flex flex-row items-center justify-center 'style={{backgroundColor:"rgb(251 251 251)"}}>
                    <button  onClick={()=>previousItem()}><IoIosArrowBack/></button>
                    <img src={images[nextItem].url} alt="" 
                    className='w-full object-contain p-2 h-full rounded-xl' />
                    <button onClick={()=>nextItemView()}><IoIosArrowForward/></button>
                </div>
                <div className='p-4  flex '>
                   {
                    images.map((item,index)=>{
                        return(
                            <div
                            className='border-2 m-2 flex'
                            // ref={imageRefs[index]}
                            key={item.public_id}>
                                <img src={item.url} alt="ek img"
                                className='h-24 w-fit'/>
                                {isAdmin&&(
                                <div>
                                    <label htmlFor="img"
                                    className='text-blue-400 cursor-pointer'><FaEdit /></label>
                                    <input type="file"id='img' className='hidden'
                                    onChange={(e)=>handleImages(e,index)} />
                                </div>)}
                </div>
                        )
                    })
                   }
                </div>
                <div className='flex justify-center'>
                <button className='m-4 rounded-sm w-fit sm:p-2 p-1 text-center text-lg text-white bg-blue-500 hover:bg-blue-300 font-semibold '
                onClick={()=>addItemtoCart(singleItem)} >Add to cart</button>
                {/*Buy now*/}
                <Link to={`/payment?price=${price}`}><button
                 className='m-4 w-fit  text-center text-lg text-white rounded-sm 
                bg-blue-500 hover:bg-blue-300  font-semibold sm:p-2 p-1 ' 
                >Buy now</button></Link>
                </div>
            </div>

            {/*Details Setup*/}
            <div className='flex flex-col px-2 items-start  sm:w-3/5 w-full sm:pt-12 gap-2'>
                {/*name + editing symbol*/}
                <div className='flex items-center justify-between w-full'>
                    {!isAdmin?
                    <h2 className='text-xl font-bold'>{name}</h2>:
                    <input type="text"
                    value={editName} 
                    onChange={(e)=>{
                        setEditName(e.target.value)
                    console.log(editName)}}
                    placeholder={name}
                    className='border-b-2 outline-none'/>}

                    {/* editing the product --admin*/}
                    {userInLst &&
                    <div
                    onClick={KeepOnEditMode}
                    className='text-blue-500 flex items-center gap-1 cursor-pointer '>
                        <span>Edit </span>
                        <FaEdit/>
                    </div>}
                    {/*Deleting the product*/}
                    {userInLst &&
                    <div
                    onClick={()=>setShowConfirmation(true)}
                    className='text-blue-500 flex items-center gap-1 cursor-pointer '>
                        <span>Delete Product </span>
                    </div>}
                    {showCartMessage && (
                        <CartMessage message="Item added to cart" />
                    )}
                </div>
                {showConfirmation && (
                <div className='fixed  z-50 flex justify-center items-center bg-black bg-opacity-50  inset-0 backdrop-blur'>
                <div className='bg-white p-4 rounded-md shadow-md'>
                <p className='mb-2'>Are you sure you want to delete this product?</p>
                <button className='mr-2 px-4 py-2 bg-red-500 text-white rounded'
                 onClick={handleDelete}>
                    Yes, Delete
                </button>
                <button className='px-4 py-2 bg-gray-300 text-gray-800 rounded' 
                onClick={() => setShowConfirmation(false)}>
                Cancel
                </button>
          </div>
        </div>
      )}
                {/* Category*/}
                {!isAdmin?
                (<p>{`${category[0].toUpperCase()}${category.slice(1,category.length)}`}</p>):
                <input type="text"
                    value={editCategory} 
                    onChange={(e)=>setEditCategory(e.target.value)}
                    placeholder={category}
                    className='border-b-2 outline-none'/>}
                {/* price*/}
                {!isAdmin?
                   (<div className='flex gap-3 items-center'>
                        <p className='text-2xl'>₹{price} </p>
                        <p className='line-through  text-gray-600'>
                            ₹{Math.floor(price *(100/(100-offer))) } </p>
                        <p >{offer} % off</p>
                    </div>):
                    (<input type="text"
                    value={editPrice} 
                    onChange={(e)=>setEditPrice(e.target.value)}
                    placeholder={price}
                    className='border-b-2 outline-none'/>)}
                {/* Ratings*/}
                <div className='flex gap-3 items-center'>
                <p className=' w-fit p-2 text-center text-sm text-white rounded-sm '
                style={{backgroundColor:"#388e3c"}}>
                    {ratings} ★</p>
                    <span>({noOfReviews}) reviews</span>
                </div>
                {/* Description */}
                {!isAdmin?
                    (<div className='flex items-start gap-3'>
                        <h3 className='text-sm font-semibold'>Description: </h3>
                        <p>{description}</p>
                    </div>):
                    (<input type="text"
                    value={editDesc} 
                    onChange={(e)=>setEditDesc(e.target.value)}
                    placeholder={description}
                    className='border-b-2 outline-none'/>)}
                    {/*Stock*/}
                {!isAdmin?
                    (<div className='flex items-start gap-3'>
                        <p className='text-sm font-semibold'>{stock} Only left </p>
                    </div>):
                    (<input type="text"
                    value={editStock} 
                    onChange={(e)=>setEditStock(e.target.value)}
                    placeholder={stock}
                    className='border-b-2 outline-none'/>)}
                {/* Comments */}
                <div className='flex flex-col items-start'>
                    <h5 className='text-lg font-semibold mt-10'>Comments</h5>
                    <button onClick={()=>addComment(true)} className='p-1 bg-yellow-200'>Add your comment
                    </button>
                    {/* Show add comment option*/}
                    {showAddComment&&
                    (<div className='overflow-x-auto'>
                        <input type="text" 
                        className='outline-none border-b w-full border-gray-800 w-fit p-1 '
                         autoFocus style={{width:"800px",whiteSpace:"normal",
                         overflowWrap: "break-word"}} 
                         value={commentInput}
                         onChange={(e)=>setCommentInput(e.target.value)} />
                         <button onClick={()=>addComment(false)}
                         className='p-1 bg-yellow-200 m-1'>Cancel</button>
                         <button className='bg-blue-600 p-1 m-1  text-white'>Submit</button>

                    </div>)}
                    {/*Reviews*/}
                    {reviews.map((item)=>{
                    return(
                    <div className=' border-b p-1 m-1'>
                        <p className='text-sm text-gray-600 font-semibold'>
                        {item.name[0].toUpperCase()+item.name.slice(1,item.name.length)}</p>
                        <div className='flex gap-2 m-1'>
                        <p className=' w-10 py-1 text-center text-xs text-white rounded-sm bg-yellow-700' >{item.rating} ★</p>
                        <p className='text-sm text-gray-600 font-semibold'>{item.comment}</p>
                        </div>
                        
                    </div>)})}
                    {/*the edited images*/}
                    {isAdmin && editImages && editImages.map((item,index)=>{
                        return(
                            <div
                            className='border-2 m-2 flex'
                            key={item.public_id}>
                                <img src={item.url} alt="ek img"
                                className='h-24 w-fit'/>
                            </div>

                        )
                    })}
                    {isAdmin&&(
                        <button type='button'
                            className='bg-blue-500 m-4 rounded-sm p-2 text-white'
                            onClick={updateProductForm}                    >
                            Update the product</button>
                    )}

                </div>

                

            </div>
        </div>
    </div>
    </>
  )
}

export default ProductDetails

{/*using useRef for images*/}
    // const imageRef = useRef(null);
     // Creating an array of refs for each image

     {/* using for surface moving*/}
    // const imageRefs = images?.map(() => useRef(null)); 
    // useEffect(()=>{
    //     const hoverOverImage = (e) => {
    //         imageRefs?.forEach((ref, index) => {
    //           if (ref.current && ref.current.contains(e.target)) {
    //             console.log(`Hovering over image with URL: ${images[index].url}`);
    //           }
    //         });
    //       };      
    //     document.addEventListener('mouseover',hoverOverImage);
    //     return()=>{
    //       document.removeEventListener('mouseover',hoverOverImage);
    //     }
    //   },[])