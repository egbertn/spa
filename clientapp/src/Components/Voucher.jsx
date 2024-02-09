import React, { Component } from 'react';

class VoucherWidget extends Component {

  componentDidMount() {
    const script = document.createElement('script');
    script.async = true;
    script.src = "https://cdn.giftup.app/dist/gift-up.js";
    script.onload = this.initializeGiftUpScript;
    document.body.appendChild(script);
  }

  initializeGiftUpScript = () => {
    const { giftup } = window;
    if (giftup) {
      giftup({
        siteId: '838eda63-7897-4564-96bd-08dc27cf9068',
        platform: 'Other'
      });
    }
  }

  componentWillUnmount() {
    // Clean up the script when component unmounts
    const giftUpScript = document.getElementById('gift-up-script');
    if (giftUpScript) {
      document.body.removeChild(giftUpScript);
    }
  }

  render() {
    return (
      <div className="gift-up-target" data-site-id="838eda63-7897-4564-96bd-08dc27cf9068" data-platform="Other"></div>
    );
  }
}

export default VoucherWidget;
