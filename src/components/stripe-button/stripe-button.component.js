import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

import './stripe-button.styles.scss';

const StripeCheckoutButton = ({ price }) => {
    //Stripe receives cents
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_2oWClJrqATcfWBYyCHRy7Z0I00J9MUELWQ';

    //With the token, you would pass it to your backend, which then creates the charge
    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }

    //StripeCheckout component takes a bunch of properties that enable different features that we have access to inside of our checkout dropdown
    return (
        <StripeCheckout 
            label='Pay Now'
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://sendeyo.com/up/d/f3eb2117da'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;