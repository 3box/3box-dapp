import React from 'react';

import TriangleWhite from '../../../../assets/TriangleWhite.svg';
import TriangleBlack from '../../../../assets/TriangleBlack.svg';
import Devs from '../../../../assets/Devs.png';

const APIMain = () => (
  <main className="api_main">
    <div className="hero_copy">
      <div className="hero_copy_wrapper">
        <h1>Our API products</h1>
        <p>
          A suite of APIs to easily build distributed consumer application
          </p>
        <div className="hero_copy_buttons">
          <button type="button" className="hero_copy_buttons_button">
            Read the Docs
              <img src={TriangleWhite} alt="arrow" />
          </button>
          <button type="button" className="secondary">
            About 3Box
              <img src={TriangleBlack} alt="arrow" />
          </button>
        </div>
      </div>
    </div>
    <div className="hero_graphic">
      <img src={Devs} alt="Color cubes" className="hero_devs" />
    </div>
  </main>
);

export default APIMain;
