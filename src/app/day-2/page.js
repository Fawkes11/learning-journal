'use client'
import { lazy, Suspense, useState } from "react"
import './styles.css'
import { Spinner } from "@heroui/spinner";
import { FadeIn, LeftMiddle } from "./layout/styles";
import Overlay from "./layout/Overlay";
import Bananas from "./Bananas";

const Day_02 = () => {
    const [speed, setSpeed] = useState(1)

    return (
        <>
            <Suspense fallback={<Spinner />}>

                <Bananas speed={speed} count={160}/>
                <FadeIn />

            </Suspense>

            {/* <LeftMiddle>
                <input type="range" min="0" max="10" value={speed} step="1" onChange={(e) => setSpeed(e.target.value)} />
            </LeftMiddle>
            <Overlay /> */}
        </>
    )
}

export default Day_02