import React from 'react';

import DiscordChat from '../../../assets/DiscordChat.png';

const DiscordButton = () => (
  <a href="https://chat.3box.io">
    <button type="button" className="hero_graphic_discord">
      <img src={DiscordChat} alt="Discord button" />
    </button>
  </a>
);

export default DiscordButton;