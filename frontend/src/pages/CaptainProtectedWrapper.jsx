import React, { useContext, useEffect } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainProtectedWrapper = ({ children }) => {
  const { setCaptain, setLoading, loading } = useContext(CaptainDataContext);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCaptain = async () => {
      if (!token) {
        navigate("/captain-login");
        return;
      }

      setLoading(true);

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/captains/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        // safe fallback
        setCaptain(response.data?.captain || response.data);
      } catch (error) {
        console.log("Auth error:", error);
        localStorage.removeItem("token");
        navigate("/captain-login");
      } finally {
        setLoading(false);
      }
    };

    fetchCaptain();
  }, [token, navigate, setCaptain, setLoading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading Captain Session...
      </div>
    );
  }

  return children;
};

export default CaptainProtectedWrapper;
