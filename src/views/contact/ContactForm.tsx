"use client";

import Button from "@/components/button/Button";
import Input from "@/components/input/input/Input";
import Textarea from "@/components/input/textarea/Textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactSchema>({ resolver: zodResolver(contactSchema) });

  const onSubmit = () => {};

  return (
    <form className="" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <label htmlFor="name" className="block pb-2">
            Your name
          </label>
          <Input {...register("name")} error={errors.name} />
        </div>
        <div>
          <label htmlFor="name" className="block pb-2">
            Your email
          </label>
          <Input {...register("email")} error={errors.email} />
        </div>
      </div>
      <label className="mt-5 block pb-2" htmlFor="subject">
        Subject
      </label>
      <Input {...register("subject")} error={errors.subject} />
      <label className="mt-5 block pb-2" htmlFor="message">
        Message
      </label>
      <Textarea {...register("message")} rows={4} error={errors.subject} />
      <Button
        primary
        type="submit"
        className="mt-5 block w-[150px]"
        size="large"
      >
        Send
      </Button>
    </form>
  );
};

const contactSchema = z.object({
  name: z
    .string({ required_error: "Please provide your name" })
    .min(3, { message: "Name too short" })
    .max(128, { message: "Name too long" }),
  email: z
    .string({ required_error: "Please provide your email" })
    .email("Invalid email"),
  subject: z.string().nonempty("Please provide a subject"),
  message: z.string().nonempty("Please provide a message"),
});

type ContactSchema = z.infer<typeof contactSchema>;

export default ContactForm;
