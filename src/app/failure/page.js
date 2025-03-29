
import React from 'react'
import { useSearchParams } from 'next/navigation';


const Failure = () => {
    const searchParams = useSearchParams();
    const referenceNum = searchParams.get('reference');
    return (
        <div>Payment Failed
            Reference No: {referenceNum}
        </div>
    )
}

export default Failure;