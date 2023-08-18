import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import CompleteShoppingCard from '../../home/CompleteShoppingCard';
import EmptySearch from './EmptySearch';



const Search = () => {
  const [searchProducts,setSearchProducts] = useState([]);
  const location = useLocation();
  const urlSearchParams = new URLSearchParams(location.search);
  const keyword = urlSearchParams.get('keyword');
  // const {search} = useParams();
  // console.log(search);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const data = await fetch(`http://localhost:3000/api/v1/products?keyword=${keyword}`);
    const jsonData = await data.json();
    setSearchProducts(jsonData.products);
  }
  if(searchProducts.length === 0){
    return <EmptySearch/>
  }
  return (
    <div className='flex flex-wrap justify-around h-screen'>
        {searchProducts.map((item, index) => (
          <CompleteShoppingCard key={item._id} {...item} />
        ))}
      </div>
  )
}

export default Search