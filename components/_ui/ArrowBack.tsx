
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
export function ArrowBack() {
    return (

        <div className="absolute top-10 z-50 left-10 text-amber-100">
            <Link href='/'>
                <ArrowLeft />
            </Link>
        </div>
    )
}