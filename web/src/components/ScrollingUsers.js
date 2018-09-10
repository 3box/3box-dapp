import React from 'react';
import Kenzo from '../assets/me.jpg';
import Christian from '../assets/Christian.jpg';
import Andres from '../assets/Andres.jpg';
import Patrick from '../assets/Patrick.jpg';
import joel from '../assets/joel.jpg';
import Ozlem from '../assets/Ozlem.jpg';
import Michael from '../assets/Michael.png';
import Cristobal from '../assets/Cristobal.png';
import './styles/ProfileCard.css';
// import PropTypes from 'prop-types';

const ScrollingUsers = () => (
  <div id="users">

    <div id="users_tile">
      <div className="profileCardSmall">
        <img src={Michael} className="profileCardSmall_user_picture" alt="profile" />
        <div className="profileCard_user_info">

          <h4 className="profileCardSmall_user_name">Michael Sena</h4>

          <div id="profile_network" />
          <p className="profileCardSmall_address">0x123456789</p>
        </div>
      </div>
    </div>
    <div id="users_tile">
      <div className="profileCardSmall">
        <img src={Christian} className="profileCardSmall_user_picture" alt="profile" />
        <div className="profileCard_user_info">

          <h4 className="profileCardSmall_user_name">Christian Lundkvist</h4>

          <div id="profile_network" />
          <p className="profileCardSmall_address">0x123456789</p>
        </div>
      </div>
    </div>
    <div id="users_tile">
      <div className="profileCardSmall">
        <img src={Cristobal} className="profileCardSmall_user_picture" alt="profile" />
        <div className="profileCard_user_info">

          <h4 className="profileCardSmall_user_name">Cristobal Castillo</h4>

          <div id="profile_network" />
          <p className="profileCardSmall_address">0x123456789</p>
        </div>
      </div>
    </div>
    <div id="users_tile">
      <div className="profileCardSmall">
        <img src={Andres} className="profileCardSmall_user_picture" alt="profile" />
        <div className="profileCard_user_info">

          <h4 className="profileCardSmall_user_name">Andres Junge</h4>

          <div id="profile_network" />
          <p className="profileCardSmall_address">0x123456789</p>
        </div>
      </div>

    </div>
    <div id="users_tile">
      <div className="profileCardSmall">
        <img src={Ozlem} className="profileCardSmall_user_picture" alt="profile" />
        <div className="profileCard_user_info">

          <h4 className="profileCardSmall_user_name">Ozlem Ulusoy</h4>

          <div id="profile_network" />
          <p className="profileCardSmall_address">0x123456789</p>
        </div>
      </div>
    </div>
    <div id="users_tile">
      <div className="profileCardSmall">
        <img src={joel} className="profileCardSmall_user_picture" alt="profile" />
        <div className="profileCard_user_info">

          <h4 className="profileCardSmall_user_name">Joel Torstensson</h4>

          <div id="profile_network" />
          <p className="profileCardSmall_address">0x123456789</p>
        </div>
      </div>
    </div>
    <div id="users_tile">
      <div className="profileCardSmall">
        <img src={Michael} className="profileCardSmall_user_picture" alt="profile" />
        <div className="profileCard_user_info">

          <h4 className="profileCardSmall_user_name">Danny Zuckerman</h4>

          <div id="profile_network" />
          <p className="profileCardSmall_address">0x123456789</p>
        </div>
      </div>
    </div>
    <div id="users_tile">
      <div className="profileCardSmall">
        <img src={Michael} className="profileCardSmall_user_picture" alt="profile" />
        <div className="profileCard_user_info">

          <h4 className="profileCardSmall_user_name">Kames Lubin</h4>

          <div id="profile_network" />
          <p className="profileCardSmall_address">0x123456789</p>
        </div>
      </div>
    </div>
    <div id="users_tile">
      <div className="profileCardSmall">
        <img src={Kenzo} className="profileCardSmall_user_picture" alt="profile" />
        <div className="profileCard_user_info">

          <h4 className="profileCardSmall_user_name">Kenzo Nakamura</h4>

          <div id="profile_network" />
          <p className="profileCardSmall_address">0x123456789</p>
        </div>
      </div>
    </div>
    <div id="users_tile">
      <div className="profileCardSmall">
        <img src={Michael} className="profileCardSmall_user_picture" alt="profile" />
        <div className="profileCard_user_info">

          <h4 className="profileCardSmall_user_name">Alejandro Matamala</h4>

          <div id="profile_network" />
          <p className="profileCardSmall_address">0x123456789</p>
        </div>
      </div>
    </div>
    
    <div id="users_tile">
      <div className="profileCardSmall">
        <img src={Patrick} className="profileCardSmall_user_picture" alt="profile" />
        <div className="profileCard_user_info">

          <h4 className="profileCardSmall_user_name">Patrick Presto</h4>

          <div id="profile_network" />
          <p className="profileCardSmall_address">0x123456789</p>
        </div>
      </div>
    </div>

    <div id="users_tile">
      <div className="profileCardSmall">
        <img src={Michael} className="profileCardSmall_user_picture" alt="profile" />
        <div className="profileCard_user_info">

          <h4 className="profileCardSmall_user_name">Cristobal Valenzuela</h4>

          <div id="profile_network" />
          <p className="profileCardSmall_address">0x123456789</p>
        </div>
      </div>
    </div>

  </div>
);

ScrollingUsers.propTypes = {
};

export default ScrollingUsers;
