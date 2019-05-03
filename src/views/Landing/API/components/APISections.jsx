import React from 'react';
import { Link, Element } from 'react-scroll'

import DownArrow from '../../../../assets/DownArrow.svg';
import ProfilesSmall from '../../../../assets/ProfilesSmall.png';
import MessagingSmall from '../../../../assets/MessagingSmall.png';
import StorageSmall from '../../../../assets/StorageSmall.png';

export const ProfileSection = ({ handleOpenSection, openSection, offset }) => (
  // <Link to="profiles" offset={offset} duration={500} smooth isDynamic spy>
  <Element name="profiles">
    <section className="api_sections" onClick={() => handleOpenSection('profiles')}>
      <div className="api_sections_wrapper">
        <div className="api_sections_content">
          <img src={ProfilesSmall} alt="" />
          <h3>Profiles</h3>
          <p>Read and update user profiles</p>
        </div>
        <button className="clearButton" type="button">
          <img src={DownArrow} alt="" className={`openSectionButton ${openSection ? 'flipOpenSectionButton' : ''}`} />
        </button>
      </div>
    </section>
  </Element>
  // </Link>
);

export const MessagingSection = ({ handleOpenSection, openSection, offset }) => (
  // <Link to="messaging" offset={offset} duration={500} smooth isDynamic spy>
  <Element name="messaging">
    <section className="api_sections" onClick={() => handleOpenSection('messaging')}>
      <div className="api_sections_wrapper">
        <div className="api_sections_content">
          <img src={MessagingSmall} alt="" />
          <h3>Messaging</h3>
          <p>Add chat, comment, and content threads</p>
        </div>
        <button className="clearButton" type="button" >
          <img src={DownArrow} alt="" className={`openSectionButton ${openSection ? 'flipOpenSectionButton' : ''}`} />
        </button>
      </div>
    </section>
  </Element>
  // </Link>
);

export const StorageSection = ({ handleOpenSection, openSection, offset }) => (
  // <Link to="storage" offset={offset} duration={500} smooth isDynamic spy>
  <Element name="storage">
    <section className="api_sections" onClick={() => handleOpenSection('storage')}>
      <div className="api_sections_wrapper">
        <div className="api_sections_content">
          <img src={StorageSmall} alt="" />
          <h3>Storage</h3>
          <p>Read and update app specific datastores</p>
        </div>
        <button className="clearButton" type="button" >
          <img src={DownArrow} alt="" className={`openSectionButton ${openSection ? 'flipOpenSectionButton' : ''}`} />
        </button>
      </div>
    </section>
  </Element>
  // </Link>
);