"use client";
import { collection, query, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { FaArrowLeft } from "react-icons/fa";
import { FaRegEdit, FaBackspace } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";


const Info = ({ params }) => {
  const id = params.id;

  const router = useRouter()
  const [title, setTitle] = useState('Bookstore');
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingAfter, setLoadingAfter] = useState(false);
  const [error, setError] = useState(false);
  const [bookRemoved, setBookRemoved] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "books"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let booksArr = [];

      querySnapshot.forEach((doc) => {
        booksArr.push({ ...doc.data(), id: doc.id });
      });
      const bookFind = booksArr.filter((book) => book.id == id)[0];

      if (bookFind) {
        setBook(bookFind);
        setLoading(false);
        setTitle('Bookstore Admin: '+book.title);
      } else {
        setError(true);
        return;
      }
    });
  }, [book, id]);

  const handleDelete = async () => {
    setLoadingAfter(true)
    setBookRemoved(true)
    await deleteDoc(doc(db, "books", id))
    router.push('/admin')
  }

  const handleLoading = () => {
    setLoadingAfter(true)
  }

  return (
    <main className="flex flex-col h-screen">
      <div className="m-auto">
      <Link href="/admin" className="absolute top-32 left-72 text-3xl border-4 border-intorange-600 text-intorange-600 rounded-full p-2 hover:bg-intorange-600 hover:text-white transition-all" onClick={handleLoading}><FaArrowLeft /></Link>
      {!loading && !loadingAfter ? (
          <>
          <title>{title}</title>
          <div className="flex gap-10 justify-center items-center mt-10">
            <Image
              src={book.coverImage}
              alt={book.title}
              width={2000}
              height={2000}
              className="mx-20"
              style={{ width: "360px", height: "576px" }}
            />
            <div className="w-[750px] flex flex-col relative">
              <h1 className="text-6xl mb-10">
                {book.title} - {book.author}
              </h1>
              <p className="text-xl text-justify">
                <span className="font-bold">Description:</span> {book.description}
              </p>
              <button className="rounded-full border-2 border-blue-500 text-xl w-fit px-5 text-center text-blue-500 font-semibold hover:text-white hover:bg-blue-500 transition-all my-5">{book.category}</button>
              <p className="text-xl mb-5"><span className="font-bold">Publisher:</span> {book.publisher}</p>
              <p className="text-xl mb-5"><span className="font-bold">Publication year:</span> {book.publicationYear}</p>
              <p className="text-xl mb-5"><span className="font-bold">ISBN:</span> {book.ISBN}</p>
              <p className="text-xl mb-5"><span className="font-bold">Available Copies:</span> {book.availableCopies}</p>
              <p className="text-xl mb-5"><span className="font-bold">Total Copies:</span> {book.totalCopies}</p>
              <p className="text-2xl font-bold text-justify relative mb-5"><sup className="absolute top-3 -left-3">$</sup>{book.price}</p>
              <div className="flex gap-5 mx-auto mt-15 items-center">
                <button className="px-4 py-2 text-intorange-600 border-2 border-intorange-600 hover:bg-intorange-600 hover:text-white rounded transition-all text-xl flex gap-3 items-center"><FaRegEdit /> Edit</button>
                <button className="px-4 py-2 border-2 border-intorange-700 bg-intorange-700 text-white hover:text-intorange-700 hover:bg-white rounded transition-all text-xl flex gap-3 items-center" onClick={handleDelete}><FaBackspace /> Delete</button>
              </div>
            </div>
          </div>
          </>
        ) : (error&&!bookRemoved?(<h1 className="text-6xl text-intorange-600 font-bold">Book not Found <span className="ms-10 text-7xl">:\</span></h1>):(
          <Loading />
        ))}
      </div>
    </main>
  );
};

export default Info;
