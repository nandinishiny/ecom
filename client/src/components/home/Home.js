import React, { useEffect } from 'react'
import Corousel from './Corousel'
import ShoppingList from './ShoppingList'
import { displayProducts } from '../../redux/productDisplaySlice';
import { useDispatch,useSelector } from 'react-redux';


const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const data = await fetch(`http://localhost:3000/api/v1/products`);
    const jsonData = await data.json();
    dispatch(displayProducts(jsonData.products));
  }
  const products = useSelector(store=>store.productDisplay.items);
  const uniqueCategories = [...new Set(products.map(item => item.category))];
  return (
    <div>
        <Corousel products = {products}/>
        <ShoppingList  products={products} productCategory = {"View All"}/>
        {uniqueCategories.map((category)=>{
          const categoryProducts = products.filter((item)=>item.category === category);
          if (categoryProducts.length > 0) {
          return(<ShoppingList  products={categoryProducts} productCategory = {category}/> )}

        })}
    </div>
  )
}

export default Home