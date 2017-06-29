# React Recaptcha Module
This is an easy stand alone module that you can add to your React programs to integrate Recaptcha.

Currently, this file is built for older versions of React needs some tweaking for newer versions.

## How to use:
Include the file as a module and setup so that you can access the file from webpack or browserify
Get a Recaptcha key and secret from official Recaptcha site.

For invisible Captcha:
```jsx
const Recaptcha = require('<linktofile>/Recaptcha.jsx');

verifyCallback(response) {
  console.log(response)
},
expiredCallback() {
  console.log('expired')
},
onSubmit() {
  window.grecaptcha.execute();
},
render() {
  <form onSubmit={this.onSubmit}>
    <button type="submit">
      submit
    </button>
    <Recaptcha
      sitekey={'recaptcha-sitekey'}
      callback={this.verifyCallback}
      expiredCallback={this.expiredCallback}
      className="recaptcha-box"
      invisible="invisible"
    />
  </form>
},
```

Still need to setup backend to do api verify request to recaptcha site.
