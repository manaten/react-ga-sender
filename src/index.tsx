import { Component } from 'react';

if (typeof window === 'object' && typeof document === 'object') {
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
}


const trackers: {[trackingId: string]: string} = {};
function getGATrackerName(trackingId: string): string {
  if (trackers[trackingId]) {
    return trackers[trackingId];
  }
  const trackerName = `tracker_${Object.keys(trackers).length + 1}`;
  (window as any).ga('create', trackingId, 'auto', trackerName);
  trackers[trackingId] = trackerName;
  return trackerName;
}

function sendToGA(page: string, trackerName: string): void {
  (window as any).ga(`${trackerName}.set`, 'page', page);
  (window as any).ga(`${trackerName}.send`, 'pageview');
}

type Location = {
  pathname: string,
  search: string
};

const getPageFromLocation = ({ pathname, search }: Location): string => pathname + search;

export type GASenderProps = {
  trackingId: string,
  location: Location
};

export class GASender extends Component<GASenderProps> {
  componentDidMount() {
    sendToGA(getPageFromLocation(this.props.location), getGATrackerName(this.props.trackingId));
  }

  componentDidUpdate(prevProps: GASenderProps) {
    const newPage = getPageFromLocation(this.props.location);
    if (getPageFromLocation(prevProps.location) !== newPage) {
      sendToGA(newPage, getGATrackerName(this.props.trackingId));
    }
  }

  render() {
    return null;
  }
}
