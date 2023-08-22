import React, { useState } from 'react';
import axios from 'axios';
import picnew from '../../assets/picenter.png';
import { newRequest } from '../../components/userAuth/newRequest';
import CartMessage from '../../components/cart/CartMsg';
import { useNavigate } from 'react-router-dom';

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
  const [imagePreviews, setImagePreviews] = useState('');
  const [msg,setMsg] = useState('');
  const navigate = useNavigate();

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
  {/*For handling images*/}
  const handleImages = async (e) => {
    e.preventDefault();
    const files = Array.from(e.target.files);
    setImages(files)
    const arr = [];
    for (const item of files) {
        const reader = new FileReader();
        reader.readAsDataURL(item);

        reader.onload = () => {
            arr.push(reader.result);

            // Update imagePreviews after all images are processed
            if (arr.length === files.length) {
                setImagePreviews(arr);
            }
        };
    }
    
  };

  const submitCreateProductForm = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const formData = new FormData();
        formData.append('name',productName);
        formData.append('description',description);
        formData.append('price',price);
        formData.append('category',category);
        formData.append('stock',stock);
        formData.append('offer',offer);
        for (const file of images) {
          formData.append('images', file); 
        }
        setMsg("Please wait a few seconds")
        //sending request
        const res = await newRequest.post('/product/new', formData);
        if(res.status === 201){
            alert('Created product successfully');
            navigate(`/products/product/${res.data.product._id}`)
        }
        else{
          alert("Failed in creating product !")
        }
        
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('Please fill in all required fields.');
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
          {/*Images*/}

          <label htmlFor='pic' className='cursor-pointer'><img src={picnew} alt='' /></label>
          <input type='file' id='pic' className='hidden' name='images' multiple onChange={handleImages} />
          <p> <span className='font-bold'>Click</span> here to upload images </p>
          <p> Hold <span className='font-bold'>ctrl </span>for selecting multiple images </p>

          <button type='submit' className='p-2 bg-pink-500 text-white m-1 rounded-md'>
            create product
          </button>
        </form>
      </div>
      {imagePreviews &&
        imagePreviews.map((item) => {
          return <img src={item} key={item.public_id} className='w-20 object-contain' />;
        })}
        <div>
        {msg && <CartMessage message={msg}progressCount={100}decrement={1} steps={100} />}
        </div>
    </div>
  );
};

export default CreateProducts;

