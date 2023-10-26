'use client';

import { useState, useEffect } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
    id: string,
    type: string
    register: UseFormRegister<FieldValues>,
    error: FieldErrors,
    required?: boolean,
    placeholder?: string,
}

const MessageInput:React.FC<MessageInputProps> = ({
    id,
    type,
    register,
    error,
    required=false,
    placeholder=''
}) => {

    return (
        <div className="relative w-full">
           <input 
           id={id}
           type={type}
           autoComplete={id}
           placeholder={placeholder}
           {...register(id, { required })}
           className="
           text-black
           font-light
           py-2
           px-4
           bg-neutral-100
           w-full
           rounded-full
           focus:outline-none"
           />
        </div>
    )
}

export default MessageInput;
