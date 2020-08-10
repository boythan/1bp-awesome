import React, { useEffect, useRef } from 'react';

function useFirstTime() {
    const ref = useRef(true);
    useEffect(() => {
        ref.current = false;
    }, []);
    return ref.current;
}

export default useFirstTime;
