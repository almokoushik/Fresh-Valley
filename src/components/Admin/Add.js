import React, { useState } from "react";
import AdminHeader from "./AdminHeader";
import { useForm } from "react-hook-form";
import axios from "axios";
const Add = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [uploadedImg, setUploadedImg] = useState(null);

  const onSubmit = (data) => {
    const newItem = {
      name: data.name,
      weight: data.weight,
      price: data.price,
      image: uploadedImg,
    };
    fetch("https://fresh-valley-server-xi.vercel.app/addItem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  const handleImageChange = (event) => {
    const imageData = new FormData();
    const image = event.target.files[0];
    imageData.set("key", "d480ee043158dcf9557f12bdb19ed335");
    imageData.append("image", image);

    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then((data) => {
        setUploadedImg(data.data.data.display_url);
        console.log("Done");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <AdminHeader></AdminHeader>
      <h3>This is Add Product</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <input placeholder="Enter Product Name" {...register("name")} />{" "}
        <br></br>
        <input
          placeholder="Enter Product Weight"
          {...register("weight")}
        />{" "}
        <br></br>
        {/* include validation with required or other standard HTML validation rules */}
        <input
          placeholder="Enter Price"
          {...register("price", { required: true })}
        />
        <br></br>
        {/* errors will return when field validation fails  */}
        <input onChange={handleImageChange} type="file" />
        <br></br>
        <input type="submit" />
      </form>
    </div>
  );
};

export default Add;
