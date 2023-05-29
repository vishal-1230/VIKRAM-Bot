import InputGroup from "@/components/InputGroup";
import RightAuthContainer from "../RightAuthContainer";
import Link from "next/link";
import PrimaryButton from "@/components/PrimaryButton";

function ResetPasswordForm() {
  return (
    <RightAuthContainer title="Reset Password">

        <InputGroup label="New Password" placeholder="Enter your new password" type="password" className="!mt-10" passwordAccessory={<label htmlFor="password" className='text-sm text-neutral-900'>Password should contain atleast number, capital letter, small letter and symbol.</label>} />
        
        <InputGroup label="Confirm Password" placeholder="Confirm your new password" type="password" passwordAccessory={
            <div className="flex justify-between">
                <div className="flex gap-1 5 items-center">
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="" className='text-sm font-medium text-neutral-900'>Remember me</label>
                </div>
                <Link href="/auth/forgot-password">
                    <span className="text-sm font-medium text-bg-50">Forgot Password?</span>
                </Link>
            </div>
        } />

        <PrimaryButton title="Reset Password" buttonStyle="w-full mt-5 mb-5" />

        <span className="text-sm text-neutral-900">You will be required to sign in with new password on all devices</span>

    </RightAuthContainer>
  )
}

export default ResetPasswordForm