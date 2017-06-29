import React from 'react';

const ID = '_grecaptcha.element.id';
const CALLBACK_NAME = '_grecaptcha.data-callback';
const EXPIRED_CALLBACK_NAME = '_grecaptcha.data-expired-callback';

const removeChild = elem => elem.parentNode && elem.parentNode.removeChild(elem);

module.exports = React.createClass({
  displayName: 'Recaptcha',

  propTypes: {
    sitekey: React.PropTypes.string.isRequired,
    callback: React.PropTypes.func.isRequired,
    expiredCallback: React.PropTypes.func.isRequired,
    className: React.PropTypes.string,
    invisible: React.PropTypes.string,
    locale: React.PropTypes.string,
  },
  defaultProps: {
    locale: 'en',
    className: undefined,
    invisible: false,
  },
  componentDidMount() {
    const { locale, callback, expiredCallback } = this.props;

    // 1. Async lazy load
    const head = document.head || document.getElementsByTagName('head')[0];
    const script = document.createElement('script');
    script.id = ID;
    script.src = `https://www.google.com/recaptcha/api.js?hl=${locale}`;
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    script.onerror = (oError) => {
      throw new URIError(`The script ${oError.target.src} is not accessible.`);
    };
    head.appendChild(script);

    // 2. Expose callback function to window object
    window[CALLBACK_NAME] = callback;
    window[EXPIRED_CALLBACK_NAME] = expiredCallback;
  },
  componentWillUnmount() {
    removeChild(document.getElementById(ID));
  },
  render() {
    const { className, sitekey, invisible } = this.props;

    return (
      <div
        className={`g-recaptcha ${className}`}
        data-sitekey={sitekey}
        data-callback={CALLBACK_NAME}
        data-expired-callback={EXPIRED_CALLBACK_NAME}
        data-size={invisible}
      />
    );
  },
});
