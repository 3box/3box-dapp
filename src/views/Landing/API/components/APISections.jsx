import React from 'react';
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import DownArrow from '../../../../assets/DownArrow.svg';
import ProfilesSmall from '../../../../assets/ProfilesSmall.png';
import MessagingSmall from '../../../../assets/MessagingSmall.png';
import StorageSmall from '../../../../assets/StorageSmall.png';

export const ProfileSection = ({ handleOpenSection, openSection }) => (
  <Link to="profiles" offset={-120} duration={500} smooth>
    <Element name="profiles">
      <section className="api_sections" onClick={() => handleOpenSection('profiles')}>
        <div className="api_sections_wrapper">
          <img src={ProfilesSmall} alt="" />
          <h3>Profiles</h3>
          <p>Read and update user profiles</p>
          <button className="clearButton" type="button">
            <img src={DownArrow} alt="" className={`openSectionButton ${openSection ? 'flipOpenSectionButton' : ''}`} />
          </button>
        </div>
      </section>
    </Element>
  </Link>
);

export const MessagingSection = ({ handleOpenSection, openSection }) => (
  <Link to="messaging" offset={-120} duration={500} smooth>
    <Element name="messaging">
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
    </Element>
  </Link>
);

export const StorageSection = ({ handleOpenSection, openSection }) => (
  <Link to="storage" offset={-120} duration={500} smooth>
    <Element name="storage">
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
    </Element>
  </Link>
);