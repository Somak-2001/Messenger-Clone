"use client";

import Button from '@/app/components/Button';
import Input from '@/app/components/inputs/Input';
import React, { useCallback, useState } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import {BsGithub,BsGoogle} from 'react-icons/bs'

import AuthSocialicons from './AuthSocialicons';

type Variant = 'REGISTER' | 'LOGIN';

const AuthForm = () => {
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isloading, setIsloading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    // Toggle Function to switch between LOGIN and REGISTER
    const toggleVariant: any = useCallback(() => {
        if (variant === 'LOGIN') {
            setVariant('REGISTER');
        }
        else {
            setVariant('LOGIN');
        }
    }, [variant]);

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsloading(true);

        if (variant === 'LOGIN') {
            // Next Auth sign in
        }

        if (variant === 'REGISTER') {
            // Axios register
        }
    }

    const socialAction = (action: string) => {
        setIsloading(true);

        // Next Auth Sign In
    }
    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div
                className="
                bg-white
                    px-4
                    py-8
                    shadow
                    sm:rounded-lg
                    sm:px-10
                "
            >
                <form
                    className="space-y-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {variant === 'REGISTER' && (
                        <Input
                            disabled={isloading}
                            register={register}
                            errors={errors}
                            required
                            id="name"
                            label="Name"
                        />
                    )}

                    <Input
                        disabled={isloading}
                        register={register}
                        errors={errors}
                        required
                        id="email"
                        label="Email address"
                    />

                    <Input
                        disabled={isloading}
                        register={register}
                        errors={errors}
                        required
                        id="password"
                        label="Password"
                    />

                    {/* Button */}
                    <div>
                        <Button
                            type='submit'
                            fullWidth
                            disabled={isloading}
                        >
                            {variant === 'LOGIN' ? 'Sign In' : 'Register'}
                        </Button>
                    </div>
                </form>

                {/* Horizontal Line and the text */}
                <div className='mt-6'>
                  <div className='relative'>
                    <div className='absolute inset-0 flex items-center'>
                      <div className='w-full border-t border-gray-300'/>
                    </div>
                    <div className='relative flex justify-center text-sm'>
                        <span className='bg-white px-2 text-gray-500'>
                            Or continue with
                        </span>
                    </div>
                  </div>

                {/* Social Icons */}
                  <div className='mt-6 flex gap-2'>
                    <AuthSocialicons 
                    icon={BsGithub}
                    onClick={() => socialAction('github')}/>

                    <AuthSocialicons 
                    icon={BsGoogle}
                    onClick={() => socialAction('google')}/>
                  </div>
                </div>

                {/* Footer Text */}
                <div className='flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500'>
                  <div>
                    {variant === 'LOGIN' ? 'New to Messenger?' : 'Already have an account?'}
                  </div>

                  <div 
                  className='underline cursor-pointer' 
                  onClick={toggleVariant}>
                    {variant === 'LOGIN' ? 'Create an account' : "Login"}
                  </div>
                </div>
            </div>
        </div>
    )
}

export default AuthForm;
