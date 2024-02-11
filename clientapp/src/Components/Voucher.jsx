import React, { useEffect, useContext } from 'react';
import AppContext from '../context';

const VoucherWidget = () => {
  const appContext = useContext(AppContext);

  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = "https://cdn.giftup.app/dist/gift-up.js";
    script.onload = initializeGiftUpScript;
    document.body.appendChild(script);

    return () => {
      const giftUpScript = document.getElementById('gift-up-script');
      if (giftUpScript) {
        document.body.removeChild(giftUpScript);
      }
    };
  }, []);

  const initializeGiftUpScript = () => {
    const { giftup } = window;
    if (giftup) {
      giftup({
        siteId: '838eda63-7897-4564-96bd-08dc27cf9068',
        platform: 'Other'
      });
    }
  };

  return <div className="gift-up-target" data-site-id={"838eda63-7897-4564-96bd-08dc27cf9068"}
    data-language="nl-NL" data-payment-methods="Stripe" data-platform="Other" />;
};

export default VoucherWidget;


