import Image from 'next/image'
import AuthForm from './components/AuthForm'

export default function Home() {
  return (
    <main>
      <div className="
        flex 
        min-h-full 
        flex-col 
        justify-center 
        py-12 
        sm:px-6 
        lg:px-8 
        bg-gray-100
        h-screen
      ">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Image
            height="80"
            width="80"
            className="mx-auto w-auto object-cover"
            src="/images/logo.png"
            alt="Logo"
          />
          <h2 
            className="
            mt-6 
            text-center 
            text-3xl 
            font-bold 
            tracking-tight 
            text-gray-900
          "
          >
            Sign in to your account
          </h2>
        </div>

        {/* Auth Form Setup */}
        <AuthForm />
      </div>
    </main>
  )
}
