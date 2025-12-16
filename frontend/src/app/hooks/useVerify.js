import { VerifyEmail } from "../../lib/api/auth/verifEmail";
import toast from "react-hot-toast";

export function useVerify() {
    const mailVerify = async (email) => {
        if (!email) return

        const res = await VerifyEmail(email)

        if(!res.ok) {
            console.error(res.message)
            toast.error(res.message)
            return
        }

        toast.success("Verify Succes")
        return res
    }
    return { mailVerify }
}