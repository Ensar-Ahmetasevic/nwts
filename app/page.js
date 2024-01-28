"use client";

import { useForm } from "react-hook-form";

const HomePage = () => {
  const {
    register,
    setError,
    formState: { errors },
  } = useForm();

  return (
    <form>
      <input {...register("test")} />
      {errors.test && <p>{errors.test.message}</p>}

      <button
        type="button"
        onClick={() => {
          setError("test", { type: "focus" }, { shouldFocus: true });
        }}
      >
        Set Error Focus
      </button>
      <input type="submit" />
    </form>
  );
};

export default HomePage;
