// Step 2: Instantiate instance of civic.sip
var civicSip = new civic.sip({ appId: 'B1EhoMgUf' });

// Step 3: Start scope request.
var button = document.querySelector('#signupButton');
button.addEventListener('click', function () {
    civicSip.signup({ style: 'popup', scopeRequest: civicSip.ScopeRequests.BASIC_SIGNUP });
});

// Listen for data
civicSip.on('auth-code-received', function (event) {
    console.log(101, event)

    // encoded JWT Token is sent to the server
    var jwtToken = event.response;

    // Your function to pass JWT token to your server
    sendAuthCode(jwtToken);
});

civicSip.on('user-cancelled', function (event) {
    console.log(201, event)
    /*
        event:
        {
          event: "scoperequest:user-cancelled"
        }
    */
});

civicSip.on('read', function (event) {
    console.log(301, event)
    /*
        event:
        {
          event: "scoperequest:read"
        }
    */
});

// Error events.
civicSip.on('civic-sip-error', function (error) {
    // handle error display if necessary.
    console.log('   Error type = ' + error.type);
    console.log('   Error message = ' + error.message);
});

function sendAuthCode(jwtToken) {
    console.log('JWT Token', jwtToken)
}