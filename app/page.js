"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

function HomePage() {
  const [showContainerProfile, setshowContainerProfile] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function toggleContainerProfileHandler() {
    setshowContainerProfile(!showContainerProfile);
  }

  function onSubmit(data) {
    console.log(data.newInput);
    console.log(showContainerProfile);
  }
  return (
    <>
      <div className="container mx-auto px-6 pb-52 md:pt-20">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <button
            className="btn btn-outline btn-warning"
            onClick={() => toggleContainerProfileHandler()}
          >
            Warning
          </button>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs text-white"
            {...register("newInput")}
          />
        </form>
      </div>
    </>
  );
}

export default HomePage;
