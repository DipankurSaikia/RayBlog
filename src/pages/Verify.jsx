import React from "react";
import { account } from "../appwrite/config";
import { useNavigate, useSearchParams } from "react-router-dom";

function Verify() {
  const navigate = useNavigate()
  const [params] = useSearchParams();
  const secret = params.get("secret");
  const id = params.get("userId");

  async function updateVerify() {
    try {
      const verify = await account.updateVerification(id, secret);
      alert("user is verified");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }
  updateVerify();
  return <div className="text-[var(--text-color1)]">Verify</div>;
}

export default Verify;
