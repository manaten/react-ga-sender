import { Component } from 'react';

const GA_ID = '';

if (typeof window === 'object') {
  // https://developers.google.com/analytics/devguides/collection/analyticsjs/
  /* eslint-disable */
  (function(i: any, s: any, o: string, g: string, r: string) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
      (i[r].q = i[r].q || []).push(arguments);
    }, i[r].l = Date.now();
    const a = s.createElement(o), m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
  })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
  /* eslint-enable */
  (window as any).ga('create', GA_ID, 'auto');
}

function sendToGA(page: string): void {
  (window as any).ga('set', 'page', page);
  (window as any).ga('send', 'pageview', page);
}

type Location = {

  pathname: string,
  search: string
};
const getPageFromLocation = ({ pathname, search }: Location): string => pathname + search;

type GASenderProps = {
  location: Location
};

export class GASender extends Component<GASenderProps> {
  componentDidMount() {
    sendToGA(getPageFromLocation(this.props.location));
  }

  componentDidUpdate(prevProps: GASenderProps) {
    const newPage = getPageFromLocation(this.props.location);
    if (getPageFromLocation(prevProps.location) !== newPage) {
      sendToGA(newPage);
    }
  }

  render() {
    return null;
  }
}
