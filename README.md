# react-ga-sender
Simple google analytics sender component for React.

# what?
A react component for google analytics pageview sending.
This component takes two props `trackingId` and `location`.
If `location` is changed, this component simply send ga event for `trackingId`.

# usage

```js
<GASender
  trackingId="YOUR-TRACKING-ID"
  location={{
    pathname: '/current/pathname',
    search: '?current=search'
  }}
/>
```

## usage with react-router

```js
import React from 'react';
import { withRouter } from 'react-router';
import { GASender } from '@manaten/ga-sender';

const GASenderWithRouter = withRouter(GASender);

// your app component
const App = (props) => (
  <main>
    <GASenderWithRouter trackingId="YOUR-TRACKING-ID" />
    ...
  </main>
)
```
