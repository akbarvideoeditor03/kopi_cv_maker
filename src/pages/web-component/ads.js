// src/web-component/AdHeader.js
import { useEffect } from 'react';

function AdHeader() {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error('AdSense error', err);
        }
    }, []);

    return (
        <ins className="adsbygoogle"
            style={{ display: 'flex', width: '100%' }}
            data-ad-client="ca-pub-2846989538167510"
            data-ad-slot="9585066112"
            data-ad-format="auto"
            data-full-width-responsive="true">
        </ins>
    );
}

export default AdHeader;
