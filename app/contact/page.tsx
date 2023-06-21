import ContactForm from "@/views/contact/ContactForm";
import React from "react";

const Page = () => {
  return (
    <div className="mx-auto max-w-7xl px-5 text-white">
      <h1 className="pt-10 text-center text-4xl font-bold lg:pt-20 lg:text-6xl">
        Get in touch
      </h1>
      <p className="mb-10 mt-5 text-center text-gray-300 lg:mb-20 lg:text-lg">
        Want to report a bug? Suggest a feature? Say something nice?
      </p>
      <div className="mx-auto max-w-[750px] pb-5">
        <ContactForm />
      </div>
    </div>
  );
};

export default Page;
