"use client"
import { useEffect } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { removeBook, incrementQnt, decrementQnt } from "@/features/cartSlice";
import Image from "next/image";
import { MdClose, MdOutlineShoppingCartCheckout } from "react-icons/md";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import Link from "next/link";

const Cart = ({hidden, setHidden}) => {

  const books = useSelector(state => state.cart.books)
  const dispatch = useDispatch()

  const hideCart = () => {
    setHidden(true)
  }

  const handleIncrementQnt = (id) => {
	dispatch(incrementQnt(id))	
  }
  
  const handleDecrementQnt = (id) => {
	dispatch(decrementQnt(id))
  }

  const handleRemoveBook = (id) => {
	dispatch(removeBook(id))
  }

  const handleCheckout = () => {
	console.log('checkout handled!')
  }

  return (
    <div className={`z-20 border-4 border-orange-500 absolute w-1/3 h-[90vh] bg-white my-8 rounded-xl ${hidden?'-right-[2200px]':'-right-10'} transition-all`}>
        <button onClick={hideCart} className="text-orange-500 m-5 text-6xl">
            <IoIosCloseCircleOutline />
        </button>
		<div className="mt-5 h-[60vh] overflow-scroll no-scrollbar">
        {books.map((book,key)=>{
              return (
                <div className="flex gap-5 my-4 mx-10" key={key}>
				  <button 
				  onClick={() => handleRemoveBook(book.id)} className="p-2 bg-orange-500 text-white text-xl hover:bg-orange-600 transition-all">
				  <MdClose/>
				  </button>
				  <Image 
					src={book.coverImage}
					alt={book.title}
					width={2000}
					height={2000}
					className="w-[120px] h-[200px]"
				  />
				  <div className="flex flex-col gap-3 justify-center">
				  <p className="text-xl font-semibold">{book.title}</p>
				  <div className="flex gap-4 items-center justify-start">
				  <div className="h-fit w-10 flex flex-col items-center justify-center border-2 rounded-full border-orange-500">
                <button onClick={() => handleIncrementQnt(book.id)} className="w-10 flex justify-center items-center text-orange-500 rounded-t-full hover:bg-orange-500 hover:text-white transition-all text-3xl border-b-2 border-orange-500">
                <IoMdArrowDropup />
                </button>
                <button onClick={() => handleDecrementQnt(book.id)} className="w-10 flex justify-center items-center text-orange-500 rounded-b-full hover:bg-orange-500 hover:text-white transition-all text-3xl">
                <IoMdArrowDropdown />
                </button>
              </div>
              <p className="text-xl font-semibold">Qnt: {book.qnt}</p>
			</div>
				  <p className="relative text-xl font-semibold"><span className="absolute -left-2 -top-2 text-sm">$</span>{book.price * book.qnt}</p>
				  </div>
                </div>
              )
            })}
    </div>
	<div className="flex gap-5 items-center justify-center">
		<p className="relative text-xl font-semibold"><span className="absolute -left-2 -top-2 text-sm">$</span>100</p>
		<Link href={"/checkout"} onClick={handleCheckout} className="px-4 py-2 text-xl border-2 border-orange-500 text-orange-500 gap-4 rounded hover:bg-orange-500 hover:text-white flex justify-center items-center transition-all"><MdOutlineShoppingCartCheckout/> Checkout</Link>
	</div>
	</div>
  )
}

export default Cart
