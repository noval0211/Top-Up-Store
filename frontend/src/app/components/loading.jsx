import { OrbitProgress } from "react-loading-indicators";


export default function Loading() {
    return (
        <div className="absolute top-0 w-screen h-screen">
            <OrbitProgress variant="split-disc" dense color="#000000" size="medium" text="" textColor="" />
        </div>
    )
}