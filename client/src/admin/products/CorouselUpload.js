import React, { useState } from 'react';
import axios from 'axios';
import { newRequest } from '../../components/userAuth/newRequest';


const CorouselUpload = () => {
  const [name, setName] = useState('');
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState('');

  const handleImages=(e)=> {
    const selectedFiles = e.target.files;

    if (selectedFiles) {
      const imageArray = Array.from(selectedFiles);
      const readerArray = [];

      imageArray.forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          readerArray.push(reader.result);

          if (readerArray.length === imageArray.length) {
            setImages([...images, ...readerArray]);
          }
        };
      });
    }
  }
  const handleSubmit = async()=>{
    const reqObj = {
      name:name,
      images:images
    }
    try {
      const res = await newRequest.post("/corousel",reqObj);
      console.log(res)
      
    } catch (error) {
      console.log(error + "the error is") 
    }
  }
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">Upload Images and Name</h1>
        <form >
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium mb-1">
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="images" className="block font-medium mb-1">
              Images:
            </label>
            <input
              type="file"
              id="images"
              accept="image/*"
              multiple
              onChange={handleImages}
              className="w-full"
            />
          </div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            onClick={handleSubmit}
          >
            Upload
          </button>
        </form>
        {message && <p className="mt-4 text-green-600">{message}</p>}
      </div>
    </div>
  );
};

export default CorouselUpload;
