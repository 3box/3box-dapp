/* eslint-disable react/prop-types */
import React from 'react';
import Highlight from 'react-highlight';

import GreenBullet from '../../../../assets/GreenBullet.png';
import YellowBullet from '../../../../assets/YellowBullet.png';
import PinkBullet from '../../../../assets/PinkBullet.png';

export const ProfileDetails = ({ openSection }) => (
  <section className={`api_sections_expanded ${openSection ? 'openSection openSection-profiles' : ''}`}>
    <div className="api_sections_expanded_wrapper">
      <div className="api_sections_expanded_header">
        <h4>Why use Profiles?</h4>
        <div className="api_sections_expanded_header_getSet">
          <div className="getSet getSet-pink">GET</div>
          <div className="getSet getSet-pink">SET</div>
        </div>
      </div>
      <p>
        Profiles API makes it easy to add social user profiles and basic reputation to your Ethereum
        application. With profiles, your users no longer need to interact with
        robotic hexadecimal addresses, but can begin to enjoy a more usable, familiar,
        and human web3 experience.
        <br />
        <br />
        3Box profile data is stored in a decentralized IPFS datastore that is controlled
        by the user, so data is secure and can be shared across various apps and services.
      </p>
      <div className="api_sections_expanded_usp">
        <ul>
          <li>
            <img src={PinkBullet} alt="bullet point" className="api_sections_expanded_usp_bullets" />
            <p>
              Humanize your decentralized application
            </p>
          </li>
          <li>
            <img src={PinkBullet} alt="bullet point" className="api_sections_expanded_usp_bullets" />
            <p>
              Access shared social identity and basic reputation
            </p>
          </li>
          <li>
            <img src={PinkBullet} alt="bullet point" className="api_sections_expanded_usp_bullets" />
            <p>
              Save public and encrypted profile data
            </p>
          </li>
          <li>
            <img src={PinkBullet} alt="bullet point" className="api_sections_expanded_usp_bullets" />
            <p>
              Support for shared or application specific profiles
            </p>
          </li>
          <li>
            <img src={PinkBullet} alt="bullet point" className="api_sections_expanded_usp_bullets" />
            <p>
              Compatible with Ethereum accounts
            </p>
          </li>
        </ul>
      </div>
      <div className="api_sections_expanded_header_getSet mv-sm">
        <div className="getSet getSet-pink noMargin">GET</div>
      </div>
      <div className="api_sections_expanded_codeBlock">
        <Highlight className="javascript">
          {'// Read profile data'}
        </Highlight>
        <Highlight className="javascript">
          {'const profile = await Box.getProfile(<ethereum-address>)'}
        </Highlight>
        <Highlight className="javascript">
          {'console.log(profile)'}
        </Highlight>
        <Highlight className="javascript">
          {'// Output:'}
        </Highlight>
        <Highlight className="javascript">
          {'// {'}
        </Highlight>
        <Highlight className="javascript">
          {'//   name: \'mollie the narwhal\','}
        </Highlight>
        <Highlight className="javascript">
          {'//   emoji: 😋'}
        </Highlight>
        <Highlight className="javascript">
          {'// }'}
        </Highlight>
        <br />
        <Highlight className="javascript">
          {'const name = await box.public.get(\'name\')'}
        </Highlight>
        <Highlight className="javascript">
          {'console.log(name)'}
        </Highlight>
        <Highlight className="javascript">
          {'// Output:'}
        </Highlight>
        <Highlight className="javascript">
          {'// \'mollie the narwhal\''}
        </Highlight>
        <br />
        <Highlight className="javascript">
          {'const email = await box.private.get(\'email\')'}
        </Highlight>
        <Highlight className="javascript">
          {'console.log(email)'}
        </Highlight>
        <Highlight className="javascript">
          {'// Output:'}
        </Highlight>
        <Highlight className="javascript">
          {'// \'mollyíe@3box.io\''}
        </Highlight>
      </div>

      <div className="api_sections_expanded_header_getSet mv-sm">
        <div className="getSet getSet-pink noMargin">SET</div>
      </div>
      <div className="api_sections_expanded_codeBlock margin-bottom-60">
        <Highlight className="javascript">
          {'// Update public profile data'}
        </Highlight>
        <Highlight className="javascript">
          {'await box.public.set(\'name\', \'Molly the Narwhal\')'}
        </Highlight>
        <br />
        <Highlight className="javascript">
          {'// Update encrypted profile data'}
        </Highlight>
        <Highlight className="javascript">
          {'await box.private.set(\'email\', \'narwhal@3box.io\')'}
        </Highlight>
      </div>
      <a href="https://docs.3box.io/api/profiles" target="_blank" rel="noopener noreferrer">
        <button className="secondaryBlue" type="button">
          View full documentation
        </button>
      </a>
    </div>
  </section>
);

export const MessagingDetails = ({ openSection }) => (
  <section className={`api_sections_expanded ${openSection ? 'openSection openSection-messaging' : ''}`}>
    <div className="api_sections_expanded_wrapper">
      <div className="api_sections_expanded_header">
        <h4>Why use Messaging?</h4>
        <div className="api_sections_expanded_header_getSet">
          <div className="getSet getSet-green">GET</div>
          <div className="getSet getSet-green">SET</div>
        </div>
      </div>
      <p>
        Messaging API makes it easy to add interactivity to your application with
        decentralized storage for user-generated content streams, comment threads,
        reviews, chats, and more. With threads, users can interact with each other
        on your application platform, but still retain ownership of the content they produce.
        <br />
        <br />
        3Box messaging data is stored in decentralized OrbitDB feedstores that are shared
        between one or more participants.
      </p>
      <div className="api_sections_expanded_usp">
        <ul>
          <li>
            <img src={GreenBullet} alt="bullet point" className="api_sections_expanded_usp_bullets" />
            <p>
              Add interactivity to your decentralized application
            </p>
          </li>
          <li>
            <img src={GreenBullet} alt="bullet point" className="api_sections_expanded_usp_bullets" />
            <p>
              Build chat, comment, and content threads
            </p>
          </li>
          <li>
            <img src={GreenBullet} alt="bullet point" className="api_sections_expanded_usp_bullets" />
            <p>
              Support for moderation, if desired
            </p>
          </li>
          <li>
            <img src={GreenBullet} alt="bullet point" className="api_sections_expanded_usp_bullets" />
            <p>
              Compatible with Ethereum apps
            </p>
          </li>
        </ul>
      </div>
      <div className="api_sections_expanded_header_getSet mv-sm">
        <div className="getSet getSet-green noMargin">GET</div>
      </div>
      <div className="api_sections_expanded_codeBlock">
        <Highlight className="javascript">
          {'// Statically read thread'}
        </Highlight>
        <Highlight className="javascript">
          {'const posts = await Box.getThread(\'myApp\', \'thethread\')'}
        </Highlight>
      </div>

      <div className="api_sections_expanded_header_getSet mv-sm">
        <div className="getSet getSet-green noMargin">SET</div>
      </div>
      <div className="api_sections_expanded_codeBlock margin-bottom-60">
        <Highlight className="javascript">
          {'// Post in thread'}
        </Highlight>
        <Highlight className="javascript">
          {'const myAppSpace = await box.openSpace(\'myApp\')'}
        </Highlight>
        <Highlight className="javascript">
          {'await thread.post(\'the message\')'}
        </Highlight>
      </div>
      <a href="https://docs.3box.io/api/messaging" target="_blank" rel="noopener noreferrer">
        <button className="secondaryBlue" type="button">
          View full documentation
        </button>
      </a>
    </div>
  </section>
);

export const StorageDetails = ({ openSection }) => (
  <section className={`api_sections_expanded ${openSection ? 'openSection openSection-storage' : ''}`}>
    <div className="api_sections_expanded_wrapper">
      <div className="api_sections_expanded_header">
        <h4>Why use Storage?</h4>
        <div className="api_sections_expanded_header_getSet">
          <div className="getSet getSet-yellow">GET</div>
          <div className="getSet getSet-yellow">SET</div>
        </div>
      </div>
      <p>
        Storage API makes it easy to store data and content specific to your
        application directly with your user in a secure, sandboxed environment.
        With decentralized storage, developers can build lighterweight
        applications and reduce data management risk, while users enjoy
        more trust in the services they use.
        <br />
        <br />
        3Box storage API saves data to an OrbitDB key-value datastore that is
        controlled by the user, so the user can consent to their data being
        shared with other apps and services.
      </p>
      <div className="api_sections_expanded_usp">
        <ul>
          <li>
            <img src={YellowBullet} alt="bullet point" className="api_sections_expanded_usp_bullets" />
            <p>
              Reduce liability by storing content directly with users
            </p>
          </li>
          <li>
            <img src={YellowBullet} alt="bullet point" className="api_sections_expanded_usp_bullets" />
            <p>
              Store sensitive, application-specific, and context-specific data
            </p>
          </li>
          <li>
            <img src={YellowBullet} alt="bullet point" className="api_sections_expanded_usp_bullets" />
            <p>
              Support for public and encrypted storage
            </p>
          </li>
          <li>
            <img src={YellowBullet} alt="bullet point" className="api_sections_expanded_usp_bullets" />
            <p>
              Compatible with Ethereum apps
            </p>
          </li>
        </ul>
      </div>
      <div className="api_sections_expanded_header_getSet mv-sm">
        <div className="getSet getSet-yellow noMargin">GET</div>
      </div>
      <div className="api_sections_expanded_codeBlock">
        <Highlight className="javascript">
          {'// Read space data'}
        </Highlight>
        <Highlight className="javascript">
          {'const spaceData = await Box.getSpace(<eth-address>, \'myApp\')'}
        </Highlight>
      </div>

      <div className="api_sections_expanded_header_getSet mv-sm">
        <div className="getSet getSet-yellow noMargin">SET</div>
      </div>
      <div className="api_sections_expanded_codeBlock margin-bottom-60">
        <Highlight className="javascript">
          {'// Open space for writing'}
        </Highlight>
        <Highlight className="javascript">
          {'const myAppSpace = await box.openSpace(\'myApp\')'}
        </Highlight>
        <br />
        <Highlight className="javascript">
          {'// Update public space data'}
        </Highlight>
        <Highlight className="javascript">
          {'await myAppSpace.public.set(\'favorite-nft\', \'Space Narwhal\')'}
        </Highlight>
        <br />
        <Highlight className="javascript">
          {'// Update encrypted space data'}
        </Highlight>
        <Highlight className="javascript">
          {'await myAppSpace.private.set(\'last used\', \'id-of-last-used-item\')'}
        </Highlight>
      </div>
      <a href="https://docs.3box.io/api/storage" target="_blank" rel="noopener noreferrer">
        <button className="secondaryBlue" type="button">
          View full documentation
        </button>
      </a>
    </div>
  </section>
);
