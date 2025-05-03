import { useContext, createContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyD-mErKrVcbVLDUN0_K1jVSltbS-T_Ey-s",
  authDomain: "bookify-7f45b.firebaseapp.com",
  projectId: "bookify-7f45b",
  storageBucket: "bookify-7f45b.firebasestorage.app",
  messagingSenderId: "901454975866",
  appId: "1:901454975866:web:bd695f1f897549bdd5bcc3",
  measurementId: "G-TWPKRLET31",
};
export const UseFirebase = () => useContext(FirebaseContext);

const FirebaseApp = initializeApp(firebaseConfig);
const FirebaseAuth = getAuth(FirebaseApp);
const firestore = getFirestore(FirebaseApp);

const GoogleProvider = new GoogleAuthProvider();

export const FirebaseProvider = (props) => {
  const [user, setuser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, (user) => {
      if (user) setuser(user);
      else setuser(null);
    });
  }, []);

  const SignupwithEmailAndPassword = (email, passwword) => {
    createUserWithEmailAndPassword(FirebaseAuth, email, passwword);
  };

  const LoginwithEmailandPassword = (email, password) => {
    signInWithEmailAndPassword(FirebaseAuth, email, password);
  };

  const SignupwithGoogle = () => signInWithPopup(FirebaseAuth, GoogleProvider);

  const SignOut = () =>
    signOut(FirebaseAuth)
      .then(() => console.log("User Sigin out"))
      .catch((err) => console.error("Failed to signOut"));

  const handleCreateNewLists = async (
    name,
    description,
    price,
    author,
    isbnNumber,
    Minidescription,
    coverImg
  ) => {
    return await addDoc(collection(firestore, "books"), {
      name,
      author,
      upercaseName:name.toUpperCase().trim(),
      description,
      Minidescription,
      coverImg,
      price,
      isbnNumber,
      userId: user.uid,
      userEmail: user.email,
      displayName: user.displayName || null,
      photoURl: user.photoURL || null,
    })
      .then(() => console.log("Book added successfully"))
      .catch((err) => console.error("not added", err));
  };

  const AllList = () => {
    return getDocs(collection(firestore, "books"));
  };

  const GetBookbyId = async (id) => {
    const docRef = doc(firestore, "books", id);
    const result = await getDoc(docRef);
    return result;
  };
  const placeOrder = async (BookID,Quantity,CustomerName,CustomerEmail,CustomerAddress,TotalPrice,book,setplaceorderForm,CustomerPhone) => {
    const collectionRef = collection(firestore, "books", BookID, "orders");
    const resilt = await addDoc(collectionRef, {
      BookID,
      coverImg: book.coverImg,
      BookName: book.name,
      Quantity,
      CustomerPhone,
      price: book.price,
      TotalPrice,
      Orderstatus:true,
      IsCanceled:false,
      isAccepted:true,
      CustomerName,
      CustomerEmail,
      CustomerAddress,
      OrderDate: new Date(),
      userID: user.uid,
      userEmail: user.email,
    })
      .then(() => console.log("Order Placed Sucessfully"))
      .then(alert("Order Placed"))
      .then(setplaceorderForm(false))
      .catch((err) => console.error("Order not placsed:", err));
  };

  const FetchMyBooks = async(userId) => {
     const collectionRef = collection(firestore, "books");
     const q = query(collectionRef, where("userId", "==", userId));

    const result = await getDocs(q);
    return result;
  };

  const GetOrders = async(BookID)=>{
    const collectionRef = collection(firestore,"books",BookID,"orders" );
    const result = await getDocs(collectionRef);
    return result

  }

  const AcceptOrder =async(OrderID,BookID)=>{
    const collectionRef = doc(firestore,"books",BookID,"orders",OrderID)
    await updateDoc(collectionRef,{
      isAccepted:true,
      Orderstatus:false,
      updatedAt: new Date(),
    }).then(()=>console.log("Accepted Order"))
    
    
  };
  const RejectOrder =async(OrderID,BookID)=>{
    const collectionRef = doc(firestore,"books",BookID,"orders",OrderID)
     await updateDoc(collectionRef,{
      isAccepted:false,
      Orderstatus:false,
      updatedAt: new Date(),
  }).then(()=>console.log("Rejected Order")) 
  };


const GetMyOrder= async(Email)=>{
 const allOrders = [];

  const Bookref = collection(firestore,"books")
  const result = await getDocs(Bookref);
 

  for(const Bookdoc of result.docs){
    const OrderRef = collection(Bookdoc.ref,"orders")
    const q = query(OrderRef, where("userEmail", "==" ,Email))
    const OrderDetals =await getDocs(q)
 
 

    OrderDetals.forEach((OrderRef)=>{
      allOrders.push({
        orderId: OrderRef.id,
        ...OrderRef.data(),
        BookId: Bookdoc.id,
        BookData: Bookdoc.data()
      })
    })
  }
  return allOrders
  } 

  const CancelOrder = async(BooID,OrderId)=>{
    const docRef= doc(firestore,"books",BooID,"orders",OrderId)
    await updateDoc(docRef,{
      IsCanceled:true,

    }).then(()=>console.log("Cancelled"))
  

  }

  const Searchbook = async(SearcInpute)=>{
    if(SearcInpute.length > 0){
    const SearchWord = SearcInpute.toUpperCase().trim()
    const collectionRef = collection(firestore,"books")
    const q = query(collectionRef, 
      where("upercaseName",">=", SearchWord),
      where("upercaseName","<=", SearchWord + '\uf8ff')
    );
    
    const snapshot = await getDocs(q)
    const result = []
    snapshot.forEach((doc)=>{
      result.push({id:doc.id, ...doc.data()})
    })

    return result
  }}

  
  

  const isLoggdIn = user ? true : false;
  return (
    <FirebaseContext.Provider 
      value={{
        SignupwithEmailAndPassword,
        LoginwithEmailandPassword,
        SignupwithGoogle,
        isLoggdIn,
        SignOut,
        user,
        handleCreateNewLists,
        AllList,
        GetBookbyId,
        placeOrder,
        FetchMyBooks,
        GetOrders,
        AcceptOrder,
        RejectOrder,
        GetMyOrder,
        CancelOrder,
        Searchbook,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
