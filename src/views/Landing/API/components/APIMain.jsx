import React from 'react';

import TriangleWhite from '../../../../assets/TriangleWhite.svg';
import TriangleBlack from '../../../../assets/TriangleBlack.svg';
import Devs from '../../../../assets/Devs.png';

const APIMain = () => (
  <main className="api_main">
    <div className="api_main_wrapper">
      <div className="hero_copy">
        <div className="hero_copy_wrapper">
          <h1>Our products</h1>
          <p>
            A suite of APIs to easily build distributed consumer applications
          </p>
          <div className="hero_copy_buttons">
            <a href="https://github.com/3box/3box">
              <button type="button" className="hero_copy_buttons_button primaryMarketing">
                Read the Docs
              <img src={TriangleWhite} alt="arrow" />
              </button>
            </a>
            {/* <a href="">
              <button type="button" className="secondary">
                About 3Box
              <img src={TriangleBlack} alt="arrow" />
              </button>
            </a> */}
          </div>
        </div>
      </div>
      <div className="hero_graphic">
        <img src={Devs} alt="Developers" className="hero_devs" />
      </div>
    </div>
  </main>
);

export default APIMain;
