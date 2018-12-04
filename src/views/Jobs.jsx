import React from 'react';

import Nav from '../components/Nav';
import Footer from '../components/Footer';
import './styles/Info.css';
import './styles/Landing.css';
import NavLoggedOut from '../components/NavLoggedOut';

const Jobs = ({ isLoggedIn, handleSignInUp }) => (
  <div className="info">
    {!isLoggedIn
      ? (
        <NavLoggedOut handleSignInUp={handleSignInUp} />
      )
      : (
        <Nav />
      )}

    <div className="info__page">
      <div className="info__banner">
        <h1>Jobs</h1>
        <p>
          We're looking for exceptional individuals who are comfortable working on
          a remote-first team.  If you're passionate about helping people establish
          trust and social connection on web3, apply to one of our open positions below.
      </p>
      </div>

      <div className="info__content">

        <div className="info__content__jobs">
          <div className="info__content__jobWrapper">
            <div className="info__content__job__text">
              <h2 className="info__content__job__text__title">
                Distributed Systems Engineer
            </h2>
              <p className="info__content__job__text__description">
                We are seeking a distributed systems engineer to drive the development of our
                database infrastructure, contribute to exceptional developer operations, and
                anchor a stellar backend engineering team.
            </p>
              <p className="info__content__job__text__location">
                Location: Remote
            </p>
            </div>
            <div className="info__content__job__link">
              <a href="https://www.notion.so/Distributed-Systems-Engineer-967dad0c601e46349e83f57ef94c1279" target="_blank" rel="noopener noreferrer">
                <button type="button">View Details</button>
              </a>
            </div>
          </div>

          <div className="info__content__jobWrapper">
            <div className="info__content__job__text">
              <h2 className="info__content__job__text__title">
                Technical Community Developer
              </h2>
              <p className="info__content__job__text__description">
                We are seeking a community developer to be the bridge between our core
                team and our community, assuring we grow and succeed alongside our developers, users, and ecosystem.
              </p>
              <p className="info__content__job__text__location">
                Location: Remote
              </p>
            </div>
            <div className="info__content__job__link">
              <a href="https://www.notion.so/Technical-Community-Developer-3d17e76619a544b89339efcf77d2cf6e" target="_blank" rel="noopener noreferrer">
                <button type="button">View Details</button>
              </a>
            </div>
          </div>

          <div className="info__content__jobWrapper">
            <div className="info__content__job__text">
              <h2 className="info__content__job__text__title">
                Product Manager
            </h2>
              <p className="info__content__job__text__description">
                We are seeking a Product Manager to own and grow our 3Box dapp.
            </p>
              <p className="info__content__job__text__location">
                Location: Remote
            </p>
            </div>
            <div className="info__content__job__link">
              <a href="https://www.notion.so/3Box-Product-Manager-a49f9a807d74467796d7c54e293f407b" target="_blank" rel="noopener noreferrer">
                <button type="button">View Details</button>
              </a>
            </div>
          </div>

          <div className="info__content__contact">
            <h3 className="info__content__contact__header">
              Don't see your job listed here?
            </h3>
            <p className="info__content__contact__body">
              Email
              <a href="mailto:team@3box.io">
                team@3box.io
              </a>
              with your details, experience, desired role, and a note
              on why we should create a role for you.
            </p>
          </div>

        </div>

      </div>
    </div>

    <Footer
      handleSignInUp={handleSignInUp}
      isLoggedIn={isLoggedIn}
    />

  </div>
);

export default Jobs;
