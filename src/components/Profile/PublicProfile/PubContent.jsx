import React from 'react';

import StatusUpdate from '../StatusUpdate';
import PublicActivity from './PublicActivity';
import '../../styles/Feed.css';
import '../../../views/styles/Profile.css';
import '../../styles/NetworkArray.css';

const PubContent = () => (
  <div>
    <StatusUpdate />
    <PublicActivity />
  </div>
);

export default PubContent;
