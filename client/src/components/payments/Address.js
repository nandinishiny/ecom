import React, { useState } from 'react';

const Address = ({ onNext,onClose }) => {
  const [shippingAddress, setShippingAddress] = useState({
    address:"",
    city: '',
    state: '',
    pinCode: '',
    country: 'India',
    phoneNumber: '',
  });
  {/*Check box handling*/}
  const handleCheckboxChange = () => {
    localStorage.setItem("address",JSON.stringify(shippingAddress))

  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };
  const handleNext = () => {
    onNext(shippingAddress); // Pass the entire address object
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 max-h-7xl bg-gray-900 bg-opacity-50 pb-4">
    <div className="max-w-md  bg-white rounded-lg p-4 w-full sm:w-96 shadow-md">
      {/* <h1 className="text-2xl font-semibold mb-4">Shipping Address</h1> */}
      <form>
        <div className="mb-4">
          <label htmlFor="address" className="block mb-1 font-medium">
            Address  <span className='text-red-600'>*</span>
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={shippingAddress.addressLine1}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        {/*City*/}
        <div className="mb-4">
          <label htmlFor="city" className="block mb-1 font-medium">
          city  <span className='text-red-600'>*</span>
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={shippingAddress.city}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        {/*State*/}
        <div className="mb-4">
          <label htmlFor="state" className="block mb-1 font-medium">
            State <span className='text-red-600'>*</span>
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={shippingAddress.state}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        {/*Pincode*/}
        <div className="mb-4">
          <label htmlFor="pinCode" className="block mb-1 font-medium">
            PinCode <span className='text-red-600'>*</span>
          </label>
          <input
            type="Number"
            id="pinCode"
            name="pinCode"
            value={shippingAddress.pinCode}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        {/*Country*/}
        <div className="mb-4">
          <label htmlFor="country" className="block mb-1 font-medium">
            Country
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={shippingAddress.country}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        {/*Phone no*/}
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block mb-1 font-medium">
          Phone Number  <span className='text-red-600'>*</span>
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={shippingAddress.phoneNumber}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <input
            type="checkbox"
            id="isSaved"
            onChange={handleCheckboxChange}
        />
        <label htmlFor="isSaved"> Save in address book?</label>
        <div className='flex justify-around'>
            <button
                onClick={onClose}
                className=" bg-yellow-600 font-bold p-2 rounded">
                Close
            </button>
            <button
            type="button"
            onClick={handleNext}
            className="bg-blue-500  text-white py-2 px-4 rounded hover:bg-blue-600">
            Next
            </button>
        </div>
      </form>
    </div>
    </div>
    
  );
};

export default Address;
