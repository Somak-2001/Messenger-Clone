'use client';

import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "../Modal";
import Input from "../inputs/Input";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import Button from "../Button";

interface SettingsModalProps{
    isOpen ?: boolean;
    currentUser: User;
    onClose: () => void;
}
const SettingsModal: React.FC<SettingsModalProps> = ({
    isOpen, currentUser, onClose
}) => {
    const router = useRouter();
    const [isLoading, setIsloading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: currentUser?.name,
            email: currentUser?.email
        }
    })
    // This will keep monitotring the value of image (So whenever a new image gets uploaded the change will reflect in real time)
    const image = watch('image');

    const handleUpload = (result: any) => {
        setValue('image',result?.info?.secure_url,{
            shouldValidate: true
        })
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsloading(true);

        axios.post('/api/settings',data)
        .then(()=>{
            toast.success('Profile Pic Updated')
            router.refresh();
            onClose();
        })
        .catch(() => toast.error('Something went wrong!'))
        .finally(() => setIsloading(false));
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                        Profile
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        Edit your public information.
                    </p>

                    <div className="mt-10 flex flex-col gap-y-8">
                        <Input 
                            disabled={isLoading}
                            label='Name'
                            id='name'
                            errors={errors}
                            required
                            register={register} 
                        />
                    </div>

                    <label className="block text-sm font-medium leading-6 text-gray-900">
                        Photo
                    </label>
                    <div className="mt-2 flex items-center gap-x-3">
                        <Image 
                        src={image || currentUser?.image || '/images/placeholder.png'} 
                        height='48' 
                        width='48' 
                        className="rounded-full" alt="Avatar" />

                        {/* Image Upload Button */}
                        <CldUploadButton 
                        options={{maxFiles : 1}}
                        onUpload={handleUpload}
                        uploadPreset="q1ugupld">
                            <Button disabled={isLoading} type="button" secondary>
                                Change
                            </Button>
                        </CldUploadButton>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                   <Button 
                   disabled={isLoading} 
                   secondary 
                   onClick={onClose}>
                        Cancel
                   </Button>

                   <Button 
                   disabled={isLoading} 
                   type="submit">
                        Save
                   </Button>
                </div>
            </div>
          </form>
        </Modal>
    )
}

export default SettingsModal;
