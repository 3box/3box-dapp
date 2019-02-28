import React from 'react';

import StatusUpdate from '../StatusUpdate';
import PublicActivity from './PublicActivity';
import PublicCollectiblesGallery from './PublicCollectiblesGallery';
import '../../styles/Feed.css';
import '../../../views/styles/Profile.css';
import '../../styles/NetworkArray.css';

const PubContent = () => (
  <div>
    <StatusUpdate />
    <PublicCollectiblesGallery />
    <PublicActivity />
  </div>
);

export default PubContent;
