  import React, { useEffect, useState } from "react";
  import { useParams } from "react-router-dom";
  import { UseFirebase } from "../Context/Firebase";
  import { Loading } from "../Components/Loading";

  export const BookDetailpage = () => {
    const params = useParams();
    const firebase = UseFirebase();
    const [placeorderForm, setplaceorderForm] = useState(false);
    const [book, setbook] = useState(null);
    const [CustomerName, setCustomerName] = useState("");
    const [CustomerEmail, setCustomerEmail] = useState("");
    const [CustomerPhone, setCustomerPhone] = useState("");
    const [Quantity, setQuantity] = useState(1);
    const [CustomerAddress, setCustomerAddress] = useState("");
    const TotalPrice = book ? book.price * Quantity : 0;

    useEffect(() => {
      firebase.GetBookbyId(params.BookID).then((book) => {
        setbook(book.data());
        console.log(book.data());
      });
    }, []);
    useEffect(() => {
      if (firebase.user) {
        setCustomerName(firebase.user.displayName);
        setCustomerEmail(firebase.user.email);
      }
    }, [firebase.user]);

    if (!book) {
      return <Loading />;
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      const result = await firebase.placeOrder(
        params.BookID,
        Quantity,
        CustomerName,
        CustomerEmail,
        CustomerAddress,
        TotalPrice,
        book,
        setplaceorderForm,
        CustomerPhone,
      );
      console.log(result);
    };
  
    return (
            <div className="p-8 max-w-6xl mx-auto bg-white rounded-lg shadow-lg mt-10">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
            <img
              className="w-full h-auto rounded-lg border-4 border-gray-100 shadow-md hover:shadow-xl transition-shadow duration-300"
              src={book.coverImg}
              alt={`${book.name} Cover`}
            />
          </div>

          <div className="flex-1">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
              {book.name}
            </h1>
            <h4 className="text-xl text-gray-600 mb-4">
              By <span className="font-semibold text-indigo-700">{book.author}</span>
            </h4>

            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              {book.description}
            </p>

            <div className="text-sm text-gray-500 mb-6">
              ISBN: <span className="font-mono">{book.isbnNumber}</span>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Price: <span className="text-green-600">Rs. {book.price}</span>
              </h3>

              <div className="mb-6">
                <label className="block text-gray-700 text-lg mb-2">
                  Quantity
                </label>
                <input
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  type="number"
                  min="1"
                  max="30"
                  defaultValue="1"
                />
              </div>

              <button
                onClick={() => setplaceorderForm(true)}
                className="w-full md:w-auto px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold text-lg rounded-xl transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      
        {placeorderForm && (
          <div className="absolute top-0 left-0 bg-black/75 w-full h-full flex items-center justify-center  ">
            <form
              onSubmit={handleSubmit}
              className="bg-white py-10 px-15  rounded-[10px]"
            >
              <div>
                <div className="flex flex-col ">
                  <label className="flex mb-1">Name:</label>
                  <input
                    type="text"
                    onChange={(e) => setCustomerName(e.target.value)}
                    value={CustomerName || ""}
                    placeholder="Enter Name"
                    className="bg-gray-200 px-2 py-1 rounded-[3px]  outline-none"
                  />
                </div>
                <div>
                  <label className="flex mb-1 mt-4">Phone No:</label>
                  <div className=" py-1  bg-gray-200">
                    <span className="w-full">+91</span>
                    <input
                      type="text"
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      value={CustomerPhone}
                      placeholder="Enter Phome No."
                      maxLength={10}
                      className=" w-80 bg-white outline-none focus:border-b-2 focus:border-gray-800"
                    />
                  </div>
                </div>
                <div>
                  <label className="flex mb-1 mt-4">Email:</label>
                  <input
                    type="email"
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    value={CustomerEmail || ""}
                    placeholder="Enter Email"
                    className="bg-gray-200 px-2 py-1 rounded-[3px] w-full  outline-none"
                  />
                </div>

                <div>
                  <label className="flex mb-1 mt-4">Full Adress:</label>
                  <textarea
                    rows="2"
                    cols="30"
                    placeholder="Enter Full Address"
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    value={CustomerAddress}
                    className="bg-gray-200 px-2 py-1 rounded-[3px] w-full  outline-none flex"
                  />
                </div>

                <div className="flex gap-10 mt-4">
                  <div className="flex gap-5">
                    <label className="p-2">Quantity</label>
                    <input
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-20 px-1 py-2 bg-gray-200 rounded-[3px] w-full  outline-none flex"
                      type="number"
                      min="1"
                      max="30"
                      placeholder="Choose Quantity"
                    />
                  </div>
                  <h2>Total :</h2>{" "}
                  <span className="w-20"> Rs.{book.price * Quantity}</span>
                </div>
                <div>
                  <button
                    type="submit"
                    className="py-2 px-5 bg-blue-600 hover:bg-blue-400 mt-4 rounded-[6px]"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </form>
            <h1
              onClick={() => setplaceorderForm(false)}
              className="text-3xl font-bold text-white top-10 cursor-pointer hover:text-red-500 right-100 absolute "
            >
              X
            </h1>
          </div>
        )}
      </div>
    );
  };
