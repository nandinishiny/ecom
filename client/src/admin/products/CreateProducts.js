import React, { useState } from 'react';
import axios from 'axios';
import picnew from '../../assets/picenter.png';
import { newRequest } from '../../components/userAuth/newRequest';

const CreateProducts = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [offer, setOffer] = useState('');
  const [productNameError, setProductNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [stockError, setStockError] = useState('');
  const [offerError, setOfferError] = useState('');

  const validateForm = () => {
    let isValid = true;

    if (!productName) {
      setProductNameError('Product name is required');
      isValid = false;
    } else {
      setProductNameError('');
    }

    if (!description) {
      setDescriptionError('Description is required');
      isValid = false;
    } else {
      setDescriptionError('');
    }

    if (!price) {
      setPriceError('Price is required');
      isValid = false;
    } else if (parseFloat(price) <= 0) {
      setPriceError('Price must be greater than 0');
      isValid = false;
    } else {
      setPriceError('');
    }

    if (!category) {
      setCategoryError('Category is required');
      isValid = false;
    } else {
      setCategoryError('');
    }

    if (!stock) {
      setStockError('Stock is required');
      isValid = false;
    } else if (parseInt(stock) < 0) {
      setStockError('Stock cannot be negative');
      isValid = false;
    } else {
      setStockError('');
    }

    if (!offer) {
      setOfferError('Offer is required');
      isValid = false;
    } else if (parseFloat(offer) < 0 || parseFloat(offer) > 100) {
      setOfferError('Offer must be between 0 and 100');
      isValid = false;
    } else {
      setOfferError('');
    }

    return isValid;
  };

  const submitCreateProductForm = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        let dataset = {
          productName: productName,
          description: description,
          price: price,
          category: category,
          stock: stock,
          images: images,
          offer: offer,
        };

        await newRequest.post('/product/new', { dataset });
        alert('Created product successfully');
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const handleImages = async (e) => {
    const files = Array.from(e.target.files);
    try {
      const uploadedImages = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ecomandcohome');
        formData.append('folder', 'ecomandco');

        const res = await axios.post(
          'https://api.cloudinary.com/v1_1/ecomandco/image/upload',
          formData
        );

        alert('Image is uploaded successfully');

        const imageObject = {
          public_id: res.data.public_id,
          url: res.data.secure_url,
        };

        uploadedImages.push(imageObject);
      }
      setImages(uploadedImages);
    } catch (error) {
      console.error('Error uploading images to Cloudinary:', error);
    }
  };

  return (
    <div className='h-screen w-full flex justify-center bg-blue-50  '>
      <div className='w-3/4 bg-white m-1 flex justify-center '>
        <form
          className='flex flex-col justify-start items-start pl-4 w-3/4 mt-4 '
          onSubmit={submitCreateProductForm}
        >
          <input
            type='text'
            placeholder='Product Name'
            className='p-1 outline-none border-b-2 w-full m-1 '
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          {productNameError && <p className='text-red-500'>{productNameError}</p>}

          <textarea
            placeholder='Please Enter Product Description'
            rows={7}
            cols={100}
            className='p-1 outline-none border-b-2 border-l-2 border-r-2 m-1 '
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {descriptionError && <p className='text-red-500'>{descriptionError}</p>}

          <input
            type='number'
            placeholder='Price'
            className='p-1 outline-none border-b-2  m-1 '
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            step={10}
          />
          {priceError && <p className='text-red-500'>{priceError}</p>}

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='outline-none border-2 rounded-md mt-2 cursor-pointer'
          >
            <option value='' >Choose Category</option>
            <option value='electronics'>Electronics</option>
            <option value='womenWear'>Women Wear</option>
            <option value='menWear'>Men Wear</option>
            <option value='stationary'>Stationary</option>
            <option value='footWear'>Footwear</option>
          </select>
          {categoryError && <p className='text-red-500'>{categoryError}</p>}

          <input
            type='number'
            placeholder='Stock'
            value={stock}
            className='outline-none border-b-2 m-4'
            onChange={(e) => setStock(e.target.value)}
          />
          {stockError && <p className='text-red-500'>{stockError}</p>}

          <input
            type='number'
            placeholder='Offer'
            className='p-1 outline-none border-b-2  m-1 '
            value={offer}
            onChange={(e) => setOffer(e.target.value)}
          />
          {offerError && <p className='text-red-500'>{offerError}</p>}

          <label htmlFor='pic' className='cursor-pointer'><img src={picnew} alt='' /></label>
          <input type='file' id='pic' className='hidden' multiple onChange={handleImages} />
          <p> <span className='font-bold'>Click</span> here to upload images </p>
          <p> Hold <span className='font-bold'>ctrl </span>for selecting multiple images </p>

          <button type='submit' className='p-2 bg-pink-500 text-white m-1 rounded-md'>
            create product
          </button>
        </form>
      </div>
      {images &&
        images.map((item) => {
          return <img src={item.url} key={item.public_id} className='w-20 object-contain' />;
        })}
    </div>
  );
};

export default CreateProducts;


// import React, { useState } from 'react'
// import axios from 'axios';
// import picnew from '../../assets/picenter.png'
// // import cookie from 'react-cookie';
// import { newRequest } from '../../components/userAuth/newRequest';
// const CreateProducts = () => {
//   const [productName,setProductName] = useState('');
//   const [description,setDescription] = useState('');
//   const [images,setImages] = useState([]);
//   const [price,setPrice] = useState('');
//   const [category,setCategory] = useState('');
//   const [stock,setStock] = useState('');
//   const [offer,setOffer] = useState('');
  
  
//   {/* submitting form*/}
//   const submitCreateProductForm= async(e)=>{
//     e.preventDefault();
//     try {
   
//       let dataset= {
//         productName:productName,
//         description:description,
//         price:price,
//         category:category,
//         stock:stock,
//         images:images,
//         offer:offer}
//       console.log(dataset)
//       await newRequest.post("/product/new",{dataset});
//       alert("created product successfully")
//   } catch (error) {
//       console.log(error);    
//   }
//   }

//   {/*uploading images to cloudinary*/}
//   const handleImages = async (e) => {
//     const files = Array.from(e.target.files);
//     try {
//       const uploadedImages = [];
//       for (const file of files) {
//         const formData = new FormData();
//         formData.append('file', file);
//         formData.append('upload_preset', 'ecomandcohome');
//         formData.append('folder', 'ecomandco');
  
//         const res = await axios.post(
//           'https://api.cloudinary.com/v1_1/ecomandco/image/upload',
//           formData
//         );
//         alert("Image is uploaded successfully");
//         const imageObject = {
//           public_id:res.data.public_id,
//           url:res.data.secure_url
//         }
  
//         uploadedImages.push(imageObject);
       
//       }
//       setImages(uploadedImages);
//     } catch (error) {
//       console.error('Error uploading images to Cloudinary:', error);
//     }
//   };
//   return (
//     <div className='h-screen w-full flex  justify-center bg-blue-50  '>
//       <div className='w-3/4 bg-white m-1 flex justify-center '>
//         <form className='flex flex-col justify-start items-start pl-4 w-3/4 mt-4 '
//         onSubmit={submitCreateProductForm}>
// {/* product name*/}
//           <input type="text"
//            placeholder='Product Name'
//            className='p-1 outline-none border-b-2 w-full m-1 ' 
//            value={productName}
//            onChange={(e)=>setProductName(e.target.value)}/>
// {/*Description*/}
//           <textarea
//           placeholder='Please Enter Product Description'
//           rows={7}
//           cols={100}
//           className='p-1 outline-none border-b-2 border-l-2 border-r-2 m-1 '
//           value={description}
//           onChange={(e)=>setDescription(e.target.value)} />

// {/* price*/}
//           <input type="number" placeholder='Price'
//           className='p-1 outline-none border-b-2  m-1 '
//           value={price}
//           onChange={(e)=>setPrice(e.target.value)}
//           step={10}/>
// {/* Offer aka Discount*/}
//           <input type="number" placeholder='Offer'
//           className='p-1 outline-none border-b-2  m-1 '
//           value={offer}
//           onChange={(e)=>setOffer(e.target.value)} />
// {/*category*/}
//           <select  value={category} 
//           onChange={(e)=>setCategory(e.target.value)} 
//           className='outline-none border-2 rounded-md mt-2 cursor-pointer'>
//             <option value="" >Choose Category</option>
//             <option value="electronics">Electronics</option>
//             <option value="womenWear">Women Wear</option>
//             <option value="menWear"> Men Wear</option>
//             <option value="stationary">Stationary</option>
//             <option value="footWear">Footwear</option>
//           </select>
// {/*stock*/}
//           <input type="number" placeholder='stock'
//           value={stock}
//           className='outline-none border-b-2 m-4'
//           onChange={(e)=>setStock(e.target.value)}/>
// {/*images*/}
//           <label htmlFor="pic" className='cursor-pointer'><img src={picnew} alt="" /></label>
//           <input type="file" id='pic' className='hidden'
//           multiple
//           onChange={handleImages}/>
//           <p> <span className='font-bold'>Click</span> here to upload images </p>
//           <p> Hold <span className='font-bold'>ctrl </span>for selecting multiple images </p>

// {/*submit button*/}          
//           <button type='submit' className='p-2 bg-pink-500 text-white m-1 rounded-md'>create product</button>
//         </form>
//       </div>
//       {images && images.map((item)=>{
//           return(
//             <img src={item.url} key={item.public_id} className='w-20 object-contain'/>
//           )
//         })}

//     </div>

//   )
// }

// export default CreateProducts

