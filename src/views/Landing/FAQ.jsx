import React from 'react';
import propTypes from 'prop-types';
import Footer from './components/Footer';
import '../styles/Landing.css';
import '../styles/Info.css';

const FAQ = ({ isLoggedIn, handleSignInUp }) => {
  const FAQItems = [{ question: 'Question 1?', answer: '3Box!' },
    { question: 'What am I doing here?', answer: '3Box!' },
    { question: 'Aaaaaaaaaaaaaaa', answer: '3Box!' },
    { question: 'Bee-Movie Script?', answer: '3Box!' },
    { question: 'IPFS', answer: '3Box!' },
    { question: 'OrbitDB', answer: '3Box!' },
  ];
  return (
    <div className="info">
      <div className="info__page">
        <div className="info__banner">
          <h1>FAQ</h1>
          <br />
          <h2>Frequently asked questions</h2>
        </div>
        <div className="info__content lr-auto-mg">
          &nbsp;
          <br />
          <br />
          {
            FAQItems.map(q => (
              <section>
                <h3>{q.question}</h3>
                <p>
                  {q.answer}
                </p>
                <br />
              </section>
            ))
          }
          &nbsp;
        </div>
      </div>
      <Footer
        handleSignInUp={handleSignInUp}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
};
FAQ.defaultProps = {
  handleSignInUp: null,
  isLoggedIn: false,
};

FAQ.propTypes = {
  handleSignInUp: propTypes.func,
  isLoggedIn: propTypes.bool,
};

export default FAQ;
