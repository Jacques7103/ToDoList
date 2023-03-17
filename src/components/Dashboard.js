import "../styles/dashboard.css";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, fs, logout } from "./Firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import "../App.css";
import Front from './Front'

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  
  const fetchUserName = async () => {
    try {
      const q = query(collection(fs, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);

  return (
    <div className="dashboard">
       <div className="dashboard__container">
        <div className="topcontainer">
          <div className="text">Logged in as</div>
          <div className="text">Name : {name}</div>
          <div className="text">Email : {user?.email}</div>
          <button className="dashboard__btn" onClick={logout}>
            Logout
          </button>
        </div>
       </div>
       <Front className='front'/>
     </div>
  );
}



export default Dashboard;