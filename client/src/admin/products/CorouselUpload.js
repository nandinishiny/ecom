//this component didn't included in project.






import React, { useState } from 'react';
import axios from 'axios';
import { newRequest } from '../../components/userAuth/newRequest';

const CorouselUpload = () => {
  const [name,setName]= useState('')
  const [images,setImages]= useState([])
  const [imagePreviews,setImagePreviews]= useState([])


  const handleImage = async (e) => {
    e.preventDefault();
    const files = Array.from(e.target.files);
    setImages(files);
    console.log(files)

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
    const handleSubmit = async(e) => {
      e.preventDefault();
      const formData = new FormData();
      for (const file of images) {
        formData.append('images', file); 
      }
      formData.append('name', name); 
      console.log(formData)
      try {
        const response = await newRequest.post('/corousel', formData,{
          headers: {
            'Content-Type': 'multipart/form-data' // Set the correct content type
          }});
    
        console.log(response.data);
      } catch (error) {
        console.log(error, 'An error occurred');
      }
    };
    

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">Upload Images and Name</h1>
        <div>
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
            />
            <label htmlFor="images" className="block font-medium mb-1">
              Images:
            </label>
            <input
              type="file"
              id="images"
              multiple
              name="images"
              onChange={handleImage}
              className="w-full"
            />
          </div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            onClick={handleSubmit}
          >
            Upload
          </button>
        </div>
        {imagePreviews&& imagePreviews.map((item,index)=>{
          return(<img src={item} alt="" key={index} />)
        })}
        
      </div>
    </div>
  );
};

export default CorouselUpload;
