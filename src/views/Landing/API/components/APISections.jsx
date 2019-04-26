import React from 'react';

import DownArrow from '../../../../assets/DownArrow.svg';
import ProfilesSmall from '../../../../assets/ProfilesSmall.png';
import MessagingSmall from '../../../../assets/MessagingSmall.png';
import StorageSmall from '../../../../assets/StorageSmall.png';

export const ProfileSection = ({ handleOpenSection, openSection }) => (
  <section className="api_sections" onClick={() => handleOpenSection('profile')}>
    <div className="api_sections_wrapper">
      <img src={ProfilesSmall} alt="" />
      <h3>Profiles</h3>
      <p>Read and update user profiles</p>
      <button className="clearButton" type="button">
        <img src={DownArrow} alt="" className={`openSectionButton ${openSection ? 'flipOpenSectionButton' : ''}`} />
      </button>
    </div>
  </section>
);

export const MessagingSection = ({ handleOpenSection, openSection }) => (
  <section className="api_sections" onClick={() => handleOpenSection('messaging')}>
    <div className="api_sections_wrapper">
      <img src={MessagingSmall} alt="" />
      <h3>Messaging</h3>
      <p>Add chat, comment, and content threads</p>
      <button className="clearButton" type="button" >
        <img src={DownArrow} alt="" className={`openSectionButton ${openSection ? 'flipOpenSectionButton' : ''}`} />
      </button>
    </div>
  </section>
);

export const StorageSection = ({ handleOpenSection, openSection }) => (
  <section className="api_sections" onClick={() => handleOpenSection('storage')}>
    <div className="api_sections_wrapper">
      <img src={StorageSmall} alt="" />
      <h3>Storage</h3>
      <p>Read and update app specific datastores</p>
      <button className="clearButton" type="button" >
        <img src={DownArrow} alt="" className={`openSectionButton ${openSection ? 'flipOpenSectionButton' : ''}`} />
      </button>
    </div>
  </section>
);