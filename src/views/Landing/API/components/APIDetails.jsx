import React from 'react';
import Highlight from 'react-highlight';

export const ProfileDetails = ({ openSection }) => (
  <section className={`api_sections_expanded ${openSection ? 'openSection' : ''}`}>
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
        application. With profiles, your users no longer need to interact with robotic hexadecimal addresses,
        but can begin to enjoy a more usable, familiar, and human web3 experience.
      <br />
        <br />
        3Box profile data is stored in a decentralized IPFS datastore that is controlled by the user,
        so data is secure and can be shared across various apps and services.
    </p>
      <div className="api_sections_expanded_usp">
        <ul>
          <li>
            Humanize your decentralized application
        </li>
          <li>
            Access shared social identity and basic reputation
        </li>
          <li>
            Save public and encrypted profile data
        </li>
          <li>
            Support for shared or application specific profiles
        </li>
          <li>
            Compatible with Ethereum accounts
        </li>
        </ul>
      </div>
      <div className="api_sections_expanded_codeBlock">
        <Highlight className="javascript">
          {`// GET`}
        </Highlight>
        <br />
        <Highlight className="javascript">
          {`// Read profile data`}
        </Highlight>
        <Highlight className="javascript">
          {`const profile = await Box.getProfile(<ethereum-address>)`}
        </Highlight>
        <Highlight className="javascript">
          {`console.log(profile)`}
        </Highlight>
        <Highlight className="javascript">
          {`// Output:`}
        </Highlight>
        <Highlight className="javascript">
          {`// {`}
        </Highlight>
        <Highlight className="javascript">
          {`//   name: 'mollie the narwhal',`}
        </Highlight>
        <Highlight className="javascript">
          {`//   emoji: 😋`}
        </Highlight>
        <Highlight className="javascript">
          {`// }`}
        </Highlight>
        <br />
        <Highlight className="javascript">
          {`const name = await box.public.get('name')`}
        </Highlight>
        <Highlight className="javascript">
          {`console.log(name)`}
        </Highlight>
        <Highlight className="javascript">
          {`// Output:`}
        </Highlight>
        <Highlight className="javascript">
          {`// 'mollie the narwhal'`}
        </Highlight>
        <br />
        <Highlight className="javascript">
          {`const email = await box.private.get('email')`}
        </Highlight>
        <Highlight className="javascript">
          {`console.log(email)`}
        </Highlight>
        <Highlight className="javascript">
          {`// Output:`}
        </Highlight>
        <Highlight className="javascript">
          {`// 'mollyíe@3box.io'`}
        </Highlight>
        <br />
        <br />
        <Highlight className="javascript">
          {`// SET`}
        </Highlight>
        <br />
        <Highlight className="javascript">
          {`// Update public profile data`}
        </Highlight>
        <Highlight className="javascript">
          {`await box.public.set('name', 'Molly the Narwhal')`}
        </Highlight>
        <br />
        <Highlight className="javascript">
          {`// Update encrypted profile data`}
        </Highlight>
        <Highlight className="javascript">
          {`await box.private.set('email', 'narwhal@3box.io')`}
        </Highlight>
      </div>
      <button>
        View full documentation
      </button>
    </div>
  </section>
);

export const MessagingDetails = ({ openSection }) => (
  <section className={`api_sections_expanded ${openSection ? 'openSection' : ''}`}>
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
            Add interactivity to your decentralized application
            </li>
          <li>
            Build chat, comment, and content threads
            </li>
          <li>
            Support for moderation, if desired
            </li>
          <li>
            Compatible with Ethereum apps
            </li>
        </ul>
      </div>
      <div className="api_sections_expanded_codeBlock">
        <Highlight className="javascript">
          {`// GET`}
        </Highlight>
        <br />
        <Highlight className="javascript">
          {`// Read profile data`}
        </Highlight>
        <Highlight className="javascript">
          {`const profile = await Box.getProfile(<ethereum-address>)`}
        </Highlight>
        <Highlight className="javascript">
          {`console.log(profile)`}
        </Highlight>
        <Highlight className="javascript">
          {`// Output:`}
        </Highlight>
        <Highlight className="javascript">
          {`// {`}
        </Highlight>
        <Highlight className="javascript">
          {`//   name: 'mollie the narwhal',`}
        </Highlight>
        <Highlight className="javascript">
          {`//   emoji: 😋`}
        </Highlight>
        <Highlight className="javascript">
          {`// }`}
        </Highlight>
        <br />
        <Highlight className="javascript">
          {`const name = await box.public.get('name')`}
        </Highlight>
        <Highlight className="javascript">
          {`console.log(name)`}
        </Highlight>
        <Highlight className="javascript">
          {`// Output:`}
        </Highlight>
        <Highlight className="javascript">
          {`// 'mollie the narwhal'`}
        </Highlight>
        <br />
        <Highlight className="javascript">
          {`const email = await box.private.get('email')`}
        </Highlight>
        <Highlight className="javascript">
          {`console.log(email)`}
        </Highlight>
        <Highlight className="javascript">
          {`// Output:`}
        </Highlight>
        <Highlight className="javascript">
          {`// 'mollyíe@3box.io'`}
        </Highlight>
        <br />
        <br />
        <Highlight className="javascript">
          {`// SET`}
        </Highlight>
        <br />
        <Highlight className="javascript">
          {`// Update public profile data`}
        </Highlight>
        <Highlight className="javascript">
          {`await box.public.set('name', 'Molly the Narwhal')`}
        </Highlight>
        <br />
        <Highlight className="javascript">
          {`// Update encrypted profile data`}
        </Highlight>
        <Highlight className="javascript">
          {`await box.private.set('email', 'narwhal@3box.io')`}
        </Highlight>
      </div>
      <button>
        View full documentation
        </button>
    </div>
  </section>
);

export const StorageDetails = ({ openSection }) => (
  <section className={`api_sections_expanded ${openSection ? 'openSection' : ''}`}>
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
            Reduce liability by storing content directly with users
        </li>
          <li>
            Store sensitive, application-specific, and context-specific data
        </li>
          <li>
            Support for public and encrypted storage
        </li>
          <li>
            Compatible with Ethereum apps
        </li>
        </ul>
      </div>
      <div className="api_sections_expanded_codeBlock">
        <Highlight className="javascript">
          {`// GET`}
        </Highlight>
        <br />
        <Highlight className="javascript">
          {`// Read profile data`}
        </Highlight>
        <Highlight className="javascript">
          {`const profile = await Box.getProfile(<ethereum-address>)`}
        </Highlight>
        <Highlight className="javascript">
          {`console.log(profile)`}
        </Highlight>
        <Highlight className="javascript">
          {`// Output:`}
        </Highlight>
        <Highlight className="javascript">
          {`// {`}
        </Highlight>
        <Highlight className="javascript">
          {`//   name: 'mollie the narwhal',`}
        </Highlight>
        <Highlight className="javascript">
          {`//   emoji: 😋`}
        </Highlight>
        <Highlight className="javascript">
          {`// }`}
        </Highlight>
        <br />
        <Highlight className="javascript">
          {`const name = await box.public.get('name')`}
        </Highlight>
        <Highlight className="javascript">
          {`console.log(name)`}
        </Highlight>
        <Highlight className="javascript">
          {`// Output:`}
        </Highlight>
        <Highlight className="javascript">
          {`// 'mollie the narwhal'`}
        </Highlight>
        <br />
        <Highlight className="javascript">
          {`const email = await box.private.get('email')`}
        </Highlight>
        <Highlight className="javascript">
          {`console.log(email)`}
        </Highlight>
        <Highlight className="javascript">
          {`// Output:`}
        </Highlight>
        <Highlight className="javascript">
          {`// 'mollyíe@3box.io'`}
        </Highlight>
        <br />
        <br />
        <Highlight className="javascript">
          {`// SET`}
        </Highlight>
        <br />
        <Highlight className="javascript">
          {`// Update public profile data`}
        </Highlight>
        <Highlight className="javascript">
          {`await box.public.set('name', 'Molly the Narwhal')`}
        </Highlight>
        <br />
        <Highlight className="javascript">
          {`// Update encrypted profile data`}
        </Highlight>
        <Highlight className="javascript">
          {`await box.private.set('email', 'narwhal@3box.io')`}
        </Highlight>
      </div>
      <button>
        View full documentation
    </button>
    </div>
  </section>
);