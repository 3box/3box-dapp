import React from 'react';

import StatusUpdate from './StatusUpdate';
import Activity from './Activity';
import '../styles/Feed.css';
import '../../views/styles/Profile.css';
import '../styles/NetworkArray.css';

const PubContent = () => (
  <div>
    <StatusUpdate />
    <Activity />
  </div>
);

export default PubContent;
