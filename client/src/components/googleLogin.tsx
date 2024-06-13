import { FC } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { LockKeyhole } from 'lucide-react';

interface googleLoginProps {
  
}

const GoogleLogin: FC<googleLoginProps> = ({}) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-black text-white ">
            Create
            <span className="ml-1">
              <LockKeyhole size={17} />
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <h1 className='w-full text-center text-2xl font-semibold mb-8'>Login to Continue</h1>
            <Button
              onClick={() => signIn("google")}
              className="p-6 text-md mt-7"
            >
              <FcGoogle /> <span className="ml-2"></span>Log In with Google
            </Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default GoogleLogin