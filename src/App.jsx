import { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import SignIn from "./components/SignIn";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "./store/userSlice";
import { useNavigate } from "react-router-dom";


function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");

        // ...
      } 
      else {
        // User is signed out
        
        dispatch(removeUser());
        navigate("/");

        // ...
      }
    });
  }, []);
  return (
    <>
      <Header />
      <SignIn />
      
    </>
  );
}

export default App;
