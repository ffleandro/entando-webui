import {useEffect, useState} from "react";


export default function WebComponentWidget({mfName, mfURL, customProps}) {
    const [hydrated, setHydrated] = useState(false);
    useEffect(() => {
        //systemjs works as pure loader
        window.System.import(mfURL)
        setHydrated(true)
    }, []);

    return (
        <span id={'wcmf:' + mfName}>
        {hydrated &&
            <x-rwc {...customProps}></x-rwc>
        }
        </span>)
}
