"use client";
import React, { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { toast } from "react-toastify";

export default function ContactForm() {
  const [inputs, setInputs] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const req = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(inputs),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (req.status == 200) {
        toast("Email sent successfully.", { type: "success" });
        setInputs({
          name: "",
          phone: "",
          email: "",
          message: ""
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
    // console.log(inputs)
  };
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <form
      onSubmit={handleFormSubmit}
      action=""
      className="text-black font-heading"
    >
      <div className="grid gap-3 md:gap-6 p-6 md:p-10 shadow-[0px_0px_30px_rgba(0,0,0,.1)] rounded-2xl ">
        <div className="grid gap-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Your fullname here"
            className=" outline-0 border p-3 rounded-xl text-gray"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputs((prev) => ({ ...prev, name: e.target.value }))
            }
            required
          />
        </div>

        <div className="grid gap-3">
          <label htmlFor="name">Phone</label>
          <input
            type="text"
            placeholder="Write with your country code (+234)9062 325 092"
            className=" outline-0 border p-3 rounded-xl text-gray"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputs((prev) => ({ ...prev, phone: e.target.value }))
            }
            required
          />
        </div>

        <div className="grid gap-3">
          <label htmlFor="name">Email Address</label>
          <input
            type="text"
            placeholder="Email Address Here"
            className=" outline-0 border p-3 rounded-xl text-gray"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputs((prev) => ({ ...prev, email: e.target.value }))
            }
            required
          />
        </div>

        <div className="grid gap-3">
          <label htmlFor="name">Message</label>
          <textarea
            name=""
            id=""
            placeholder="Please tell your thought here"
            className=" outline-0 border p-3 rounded-xl text-gray resize-none h-30"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setInputs((prev) => ({ ...prev, message: e.target.value }))
            }
            required
          ></textarea>
        </div>

        <button className="bg-green py-2 px-5 text-black text-sm rounded-lg cursor-pointer flex items-center justify-center">
          {loading ? <CgSpinner className="animate-spin" /> : "Message"}
        </button>
      </div>
    </form>
  );
}
