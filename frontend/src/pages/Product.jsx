
// import React, { useContext, useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { ShopContext } from '../context/ShopContext';
// import { assets } from '../assets/assets';
// import RelatedProducts from '../components/RelatedProducts';

// const Product = () => {
//   const { productId } = useParams();
//   const { products, currency, addToCart } = useContext(ShopContext);
//   const [productData, setProductData] = useState(false);
//   const [image, setImage] = useState('');
//   const [size, setSize] = useState('');

//   const fetchProductData = async () => {
//     products.map((item) => {
//       if (item._id === productId) {
//         setProductData(item);
//         setImage(item.image[0]);
//         return null;
//       }
//     });
//   };

//   useEffect(() => {
//     fetchProductData();
//   }, [productId, products]);

//   return productData ? (
//     <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
//       {/*----------- Product Data-------------- */}
//       <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
//         {/*---------- Product Images------------- */}
//         <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
//           <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
//             {productData.image.map((item, index) => (
//               <img
//                 onClick={() => setImage(item)}
//                 src={item}
//                 key={index}
//                 className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
//                 alt=""
//               />
//             ))}
//           </div>
//           <div className='w-full sm:w-[80%]'>
//             <img className='w-full h-auto' src={image} alt="" />
//           </div>
//         </div>

//         {/* -------- Product Info ---------- */}
//         <div className='flex-1'>
//           <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
//           <div className='flex items-center gap-1 mt-2'>
//             <img src={assets.star_icon} alt="" className="w-3.5" />
//             <img src={assets.star_icon} alt="" className="w-3.5" />
//             <img src={assets.star_icon} alt="" className="w-3.5" />
//             <img src={assets.star_icon} alt="" className="w-3.5" />
//             <img src={assets.star_dull_icon} alt="" className="w-3.5" />
//             <p className='pl-2'>(122)</p>
//           </div>
          
//           {/* Pricing Section */}
//           <div className='mt-5 flex items-center gap-3'>
//             <p className='text-3xl font-semibold text-black'>
//               {currency}{productData.offerPrice || productData.price}
//             </p>
//             {productData.offerPrice && productData.offerPrice < productData.price && (
//               <p className='text-xl text-gray-500 line-through'>
//                 {currency}{productData.price}
//               </p>
//             )}
//             {productData.offerPrice && productData.offerPrice < productData.price && (
//               <span className='text-sm text-green-600 font-medium'>
//                 {Math.round(((productData.price - productData.offerPrice) / productData.price) * 100)}% OFF
//               </span>
//             )}
//           </div>

//           <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
//           <div className='flex flex-col gap-4 my-8'>
//             <p>Select Size</p>
//             <div className='flex gap-2'>
//               {productData.sizes.map((item, index) => (
//                 <button
//                   onClick={() => setSize(item)}
//                   className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`}
//                   key={index}
//                 >
//                   {item}
//                 </button>
//               ))}
//             </div>
//           </div>
//           <button
//             onClick={() => addToCart(productData._id, size)}
//             className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'
//           >
//             ADD TO CART
//           </button>
//           <hr className='mt-8 sm:w-4/5' />
//           <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
//             <p>100% Original product.</p>
//             <p>Cash on delivery is available on this product.</p>
//             <p>Easy return and exchange policy within 7 days.</p>
//           </div>
//         </div>
//       </div>

//       {/* ---------- Description & Review Section ------------- */}
//       <div className='mt-20'>
//         <div className='flex'>
//           <b className='border px-5 py-3 text-sm'>Description</b>
//           <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
//         </div>
//         <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
//           <p>
//             An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.
//           </p>
//           <p>
//             E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.
//           </p>
//         </div>
//       </div>

//       {/* --------- Display Related Products ---------- */}
//       <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
//     </div>
//   ) : (
//     <div className='opacity-0'></div>
//   );
// };

// export default Product;
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import Loading from '../components/Loading';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, cartItems, addToCart, updateQuantity } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  // Check if the product is in the cart with the selected size
  const isInCart = size && cartItems[productId]?.[size] > 0;
  const currentQuantity = isInCart ? cartItems[productId][size] : 0;

  // Handle adding to cart
  const handleAddToCart = async () => {
    if (!size) {
      alert('Please select a size');
      return;
    }
    setIsLoading(true);
    try {
      await addToCart(productData._id, size, 1); // Default quantity of 1
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle quantity changes
  const increaseQuantity = async () => {
    setIsLoading(true);
    try {
      await updateQuantity(productData._id, size, currentQuantity + 1);
    } catch (error) {
      console.error('Error increasing quantity:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const decreaseQuantity = async () => {
    if (currentQuantity > 1) {
      setIsLoading(true);
      try {
        await updateQuantity(productData._id, size, currentQuantity - 1);
      } catch (error) {
        console.error('Error decreasing quantity:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 relative">
      <Loading isLoading={isLoading} />

      {/*----------- Product Data-------------- */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/*---------- Product Images------------- */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>

        {/* -------- Product Info ---------- */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className="pl-2">(122)</p>
          </div>

          {/* Pricing Section */}
          <div className="mt-5 flex items-center gap-3">
            <p className="text-3xl font-semibold text-black">
              {currency}
              {productData.offerPrice || productData.price}
            </p>
            {productData.offerPrice && productData.offerPrice < productData.price && (
              <p className="text-xl text-gray-500 line-through">
                {currency}
                {productData.price}
              </p>
            )}
            {productData.offerPrice && productData.offerPrice < productData.price && (
              <span className="text-sm text-green-600 font-medium">
                {Math.round(
                  ((productData.price - productData.offerPrice) / productData.price) * 100
                )}
                % OFF
              </span>
            )}
          </div>

          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${
                    item === size ? 'border-orange-500' : ''
                  }`}
                  key={index}
                  disabled={isLoading}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Conditional Add to Cart or Quantity Controls */}
          {isInCart ? (
            <div className="flex items-center gap-2 mb-8">
              <button
                onClick={decreaseQuantity}
                className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentQuantity <= 1 || isLoading}
              >
                -
              </button>
              <span className="text-base">{currentQuantity}</span>
              <button
                onClick={increaseQuantity}
                className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed mb-8"
              disabled={isLoading}
            >
              ADD TO CART
            </button>
          )}

          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* ---------- Description & Review Section ------------- */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet...
          </p>
          <p>
            E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations...
          </p>
        </div>
      </div>

      {/* --------- Display Related Products ---------- */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;