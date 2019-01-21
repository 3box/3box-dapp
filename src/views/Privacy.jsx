import React from 'react';

import Footer from '../components/Footer';
import './styles/Info.css';
import './styles/Landing.css';

const Privacy = ({ isLoggedIn, handleSignInUp }) => (
  <div className="info">
     
    <div className="info__page">
    <div className="info__banner">
      <h1>Privacy Policy</h1>
    </div>
    <div className="info__content">
      <div className="info__content__text">
        <p>
        This privacy policy (“Policy”) describes how ConsenSys AG’s
        3Box (“3Box” “Company”, “we”, “our”, or “us”)
        collects, uses, shares, and stores personal information
        of users of this website, 3box.io (the “Site”). This Policy
        applies to the Site, applications, products and services
        (collectively, “Services”) on or in which it is posted,
        linked, or referenced. By using the Services, you accept
        the terms of this Policy and our Terms of Use, and consent
        to our collection, use, disclosure, and retention of your
        information as described in this Policy.  If you have not
        done so already, please also review our terms of use. The
        terms of use contain provisions that limit our liability
        to you and require you to resolve any dispute with us on
        an individual basis and not as part of any class or
        representative action. IF YOU DO NOT AGREE WITH ANY
        PART OF THIS PRIVACY POLICY OR OUR TERMS OF USE, THEN
        PLEASE DO NOT USE ANY OF THE SERVICES.
        Please note that this Policy does not apply to
        information collected through third-party websites
        or services that you may access through the Services
        or that you submit to us through email, text message
        or other electronic message or offline.
        If you are visiting this site from the European Union
        (EU), see our Notice to EU Data Subjects below for
        our legal bases for processing and transfer of your data.
        </p>
        <h3>What We Collect</h3>
        <p>
          We get information about you in a range of ways.
          <br />
          <br />
          <b>Information You Give Us.</b>
          Information we collect from you includes:
          • Identity information, such as your public key; and
          • Any User Content (as defined in our Terms of Use) you submit as part of the Services.

          <br />
          <br />
          <b>Information We Get From Others.</b>
          We may get information about you from other third party sources, such as any User Content which any third party decentralized applications which you give access permission to submit on your behalf, as further described in our Terms of Use.

          <br />
          <br />
          <b>Information Automatically Collected.</b>
          We may automatically record certain information about how you use our Site (we refer to this information as “Log Data“). Log Data may include information such as a user’s Internet Protocol (IP) address, device and browser type, operating system, the pages or features of our Site to which a user browsed and the time spent on those pages or features, the frequency with which the Site is used by a user, search terms, the links on our Site that a user clicked on or used, and other statistics. We use this information to administer the Service and we analyze (and may engage third parties to analyze) this information to improve and enhance the Service by expanding its features and functionality and tailoring it to our users’ needs and preferences.
          We may use cookies or similar technologies to analyze trends, administer the website, track users’ movements around the website, and to gather demographic information about our user base as a whole. Users can control the use of cookies at the individual browser level.
          We also use Google Analytics to help us offer you an optimized user experience.  You can find more information about Google Analytics’ use of your personal data here: https://policies.google.com/privacy?hl=en&gl=us

          <br />
          <br />
          <b>Information we will never collect.</b>
          We will never ask you to share your private keys or wallet seed. Never trust anyone or any site that asks you to enter your private keys or wallet seed.
        </p>

        <h3>USE OF PERSONAL INFORMATION</h3>
        <div>
          <b>To provide our service</b>
          We will use your personal information in the following ways:
          • To enable you to access and use the Services
          • To provide and deliver products and services that you may request.
          • To send information, including confirmations, technical notices, updates, security alerts, and support and administrative messages.

          <br />
          <br />
          <b>To comply with law</b>
          We use your personal information as we believe necessary or appropriate to comply with applicable laws, lawful requests and legal process, such as to respond to subpoenas or requests from government authorities.

          <br />
          <br />
          <b>To communicate with you</b>
          We use your personal information to communicate about promotions, upcoming events, and other news about products and services offered by us and our selected partners.

          <br />
          <br />
          <b>To optimize our platform</b>
          In order to optimize your user experience, we may use your personal information to operate, maintain, and improve our Services. We may also use your information to respond to your comments and questions regarding the Services, and to provide you and other users with general customer service.

          <br />
          <br />
          <b>With your consent</b>
          We may use or share your personal information with your consent, such as when you consent to let us post your testimonials or endorsements on our Site, you instruct us to take a specific action with respect to your personal information, or you opt into third party marketing communications.

          <br />
          <br />
          <b>For compliance, fraud prevention, and safety</b>
          We may use your personal information to protect, investigate, and deter against fraudulent, unauthorized, or illegal activity.
        </div>


        <h3>SHARING OF PERSONAL INFORMATION</h3>
        <div>
          <b>Affiliates.</b>
          We may disclose your personal information to our subsidiaries and corporate affiliates for purposes consistent with this Privacy Policy.

          <br />
          <br />
          <b>Business Transfers.</b>
          We may share personal information when we do a business deal, or negotiate a business deal, involving the sale or transfer of all or a part of our business or assets. These deals can include any merger, financing, acquisition, or bankruptcy transaction or proceeding.

          <br />
          <br />
          <b>Compliance with Laws and Law Enforcement; Protection and Safety.</b>
          We may share personal information for legal, protection, and safety purposes.

          <ul>
            <li>• We may share information to comply with laws.</li>
            <li>• We may share information to respond to lawful requests and legal processes.</li>
            <li>• We may share information to protect the rights and property of the Company, our agents, customers, and others. This includes enforcing our agreements, policies, and terms of use.</li>
            <li>• We may share information in an emergency. This includes protecting the safety of our employees and agents, our customers, or any person.</li>
          </ul>

          <br />
          <br />
          <b>Professional Advisors and Service Providers.</b>
          We may share information with those who need it to do work for us. These recipients may include third party companies and individuals to administer and provide the Service on our behalf (such as customer support, hosting, email delivery and database management services), as well as lawyers, bankers, auditors, and insurers.

          <br />
          <br />
          <b>Other.</b>
          You may permit us to share your personal information with other companies or entities of your choosing. Those uses will be subject to the privacy policies of the recipient entity or entities.

          <br />
          We may also share aggregated and/or anonymized data with others for their own uses.
        </div>

        <h3>INTERNATIONAL TRANSFER</h3>
        <p>
          The Company has offices outside of the EU and has affiliates and service providers in the United States and in other countries. Your personal information may be transferred to or from the United States or other locations outside of your state, province, country or other governmental jurisdiction where privacy laws may not be as protective as those in your jurisdiction.
          EU users should read the important information provided  below about transfer of personal information outside of the European Economic Area (EEA).
        </p>

        <h3>HOW INFORMATION IS SECURED</h3>
        <p>
          We retain information we collect as long as it is necessary and relevant to fulfill the purposes outlined in this privacy policy. In addition, we retain personal information to comply with applicable law where required, prevent fraud, resolve disputes, troubleshoot problems, assist with any investigation, enforce our Terms of Use, and other actions permitted by law. To determine the appropriate retention period for personal information, we consider the amount, nature, and sensitivity of the personal information, the potential risk of harm from unauthorized use or disclosure of your personal information, the purposes for which we process your personal information and whether we can achieve those purposes through other means, and the applicable legal requirements.
          In some circumstances we may anonymize your personal information (so that it can no longer be associated with you) in which case we may use this information indefinitely without further notice to you.
          We employ industry standard security measures designed to protect the security of all information submitted through the Services. However, the security of information transmitted through the internet can never be guaranteed. We are not responsible for any interception or interruption of any communications through the internet or for changes to or losses of data. Users of the Services are responsible for maintaining the security of any password, biometrics, user ID or other form of authentication involved in obtaining access to password protected or secure areas of any of our digital services. In order to protect you and your data, we may suspend your use of any of the Services, without notice, pending an investigation, if any breach of security is suspected.
        </p>

        <h3>INFORMATION CHOICES AND CHANGES</h3>
        <p>
          <b>Accessing, Updating, Correcting, and Deleting your Information</b>
          You may access information that you have voluntarily provided through your account on the Services, and to review, correct, or delete it by sending a request to support@3box.io. You can request to change contact choices, opt-out of our sharing with others, and update your personal information and preferences.

          <br />
          <br />
          <b>Tracking Technologies Generally</b>
          Regular cookies may generally be disabled or removed by tools available as part of most commercial browsers, and in some instances blocked in the future by selecting certain settings. For more information, please see the section entitled “Cookies Policy” below.
        </p>

        <h3>CONTACT INFORMATION</h3>
        <p>
          We welcome your comments or questions about this Policy, and you may contact us at: support@3box.io.
        </p>

        <h3>CHANGES TO THIS PRIVACY POLICY</h3>
        <p>
          We may change this privacy policy at any time. We encourage you to periodically review this page for the latest information on our privacy practices. If we make any changes, we will change the Last Updated date above.
          Any modifications to this Privacy Policy will be effective upon our posting of the new terms and/or upon implementation of the changes to the Site (or as otherwise indicated at the time of posting). In all cases, your continued use of the the Site or Services after the posting of any modified Privacy Policy indicates your acceptance of the terms of the modified Privacy Policy.
        </p>

        <h3>ELIGIBILITY</h3>
        <p>
          If you are under the age of majority in your jurisdiction of residence, you may use the Services only with the consent of or under the supervision of your parent or legal guardian. Consistent with the requirements of the Children's Online Privacy Protection Act (COPPA), if we learn that we have received any information directly from a child under age 13 without first receiving his or her parent's verified consent, we will use that information only to respond directly to that child (or his or her parent or legal guardian) to inform the child that he or she cannot use the Site and subsequently we will delete that information.
        </p>

        <h3>NOTICE TO CALIFORNIA RESIDENTS</h3>
        <p>
          Under California Civil Code Section 1789.3, California users are entitled to the following consumer rights notice: California residents may reach the Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs by mail at 1625 North Market Blvd., Sacramento, CA 95834, or by telephone at (916) 445-1254 or (800) 952-5210.
        </p>

        <h3>NOTICE TO EU DATA SUBJECTS</h3>
        <p>
          <b>Personal Information</b>
          With respect to EU data subjects, “personal information,” as used in this Privacy Policy, is equivalent to
          “personal data” as defined in the
          <a href="https://gdpr-info.eu/art-4-gdpr/">European Union General Data Protection Regulation</a>
          (GDPR).

          <br />
          <br />
          <b>Sensitive Data</b>
          Some of the information you provide us may constitute sensitive data as defined in the GDPR (also referred to as special categories of personal data), including identification of your race or ethnicity on government-issued identification documents.

          <br />
          <br />
          <b>Legal Bases for Processing</b>
          We only use your personal information as permitted by law. We are required to inform you of the legal bases of our processing of your personal information, which are described in the table below. If you have questions about the legal bases under which we process your personal information, contact us at support@3box.io.
        </p>

        <div id="privacy__processing">
          <table>
            <tbody>
            <tr>
              <th>
                <b>Processing Purpose</b>
              </th>
              <th>
                <b>Legal Basis</b>
              </th>
            </tr>

            <tr>
              <td>
                <p>
                To communicate with you
  
                To optimize our platform
  
                For compliance, fraud prevention, and safety
  
                To provide our service
                </p>
              </td>

              <td>
                <p>
                These processing activities constitute our legitimate interests. We make sure we consider and balance any potential impacts on you (both positive and negative) and your rights before we process your personal information for our legitimate interests. We do not use your personal information for activities where our interests are overridden by any adverse impact on you (unless we have your consent or are otherwise required or permitted to by law).
                </p>
              </td>
            </tr>

            <tr>
              <td>
                <p>
                To comply with law
                </p>
              </td>

              <td>
                <p>
                We use your personal information to comply with applicable laws and our legal obligations
                </p>
              </td>
            </tr>

            <tr>
              <td>
                <p>
                With your consent
                </p>
              </td>

              <td>
                <p>
                Where our use of your personal information is based upon your consent, you have the right to withdraw it anytime in the manner indicated in the Service or by contacting us at support@3box.io.
                </p>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
          <div>
            <b>Use for New Purposes</b>
            We may use your personal information for reasons not described in this Privacy Policy, where we are permitted by law to do so and where the reason is compatible with the purpose for which we collected it. If we need to use your personal information for an unrelated purpose, we will notify you and explain the applicable legal basis for that use. If we have relied upon your consent for a particular use of your personal information, we will seek your consent for any unrelated purpose.

            <br />
            <br />
            <b>Your Rights</b>
            Under the GDPR, you have certain rights regarding your personal information. You may ask us to take the following actions in relation to your personal information that we hold:
            
            <ul>
              <li>
                •
                <b>
                  Opt-out.
                </b>
                Stop sending you direct marketing communications which you have previously consented to receive. We may continue to send you Service-related and other non-marketing communications.</li>
              <li>• <b>Access.</b> Provide you with information about our processing of your personal information and give you access to your personal information.</li>
              <li>• <b>Delete.</b> Delete your personal information.</li>
              <li>• <b>Transfer.</b>Transfer a machine-readable copy of your personal information to you or a third party of your choice.</li>
              <li>• <b>Restrict.</b>Restrict the processing of your personal information.</li>
              <li>• <b>Object.</b>Object to our reliance on our legitimate interests as the basis of our processing of your personal information that impacts your rights.</li>
            </ul>

            You can submit these requests by email to support@3box.io. We may request specific information from you to help us confirm your identity and process your request. Applicable law may require or permit us to decline your request. If we decline your request, we will tell you why, subject to legal restrictions. If you would like to submit a complaint about our use of your personal information or response to your requests regarding your personal information, you may contact us at support@3box.io or submit a complaint to the data protection regulator in your jurisdiction. You can find your data protection regulator here.

            <b>Cross-Border Data Transfer</b>
            Please be aware that your personal data will be transferred to, processed, and stored in the United States. Data protection laws in the U.S. may be different from those in your country of residence. You consent to the transfer of your information, including personal information, to the U.S. as set forth in this Privacy Policy by visiting our site or using our service.
            Whenever we transfer your personal information out of the EEA to the U.S. or countries not deemed by the European Commission to provide an adequate level of personal information protection, the transfer will be based on a data transfer mechanism recognized by the European Commission as providing adequate protection for personal information.
            Please contact us if you want further information on the specific mechanism used by us when transferring your personal information out of the EEA.
          </div>


        <h3>COOKIES POLICY</h3>
        <p>
          We understand that your privacy is important to you and are committed to being transparent about the technologies we use. In the spirit of transparency, this policy provides detailed information about how and when we use cookies on our Site.

          <b>Do we use Cookies?</b>
          Yes. We and our marketing partners, affiliates, and analytics or service providers use cookies, web beacons, or pixels and other technologies to ensure everyone who uses the Site has the best possible experience.

          <br />
          <br />
          <b>What is a Cookie?</b>
          A cookie (“Cookie”) is a small text file that is placed on your hard drive by a web page server. Cookies contain information that can later be read by a web server in the domain that issued the cookie to you. Some of the cookies will only be used if you use certain features or select certain preferences, and some cookies will always be used. You can find out more about each cookie by viewing our current cookie list below. We update this list periodically, so there may be additional cookies that are not yet listed. Web beacons, tags and scripts may be used in the Site or in emails to help us to deliver cookies, count visits, understand usage and campaign effectiveness and determine whether an email has been opened and acted upon. We may receive reports based on the use of these technologies by our service/analytics providers on an individual and aggregated basis.

          <br />
          <br />
          <b>Why do we use Cookies?</b>
          We generally use Cookies for the following purposes:
          • To recognize new or past customers.
          • To store your password if you are registered on our Site.
          • To improve our Site and to better understand your visits on our platforms and Site.
          • To integrate with third party  websites.
          • To serve you with interest-based or targeted advertising.
          • To observe your behaviors and browsing activities over time across multiple websites or other platforms.
          • To better understand the interests of our customers and our website visitors.
          Some Cookies are necessary for certain uses of the Site, and without such Cookies, we would not be able to provide many services that you need to properly use the Site. These Cookies, for example, allow us to operate our Site so you may access it as you have requested and let us recognize that you have created an account and have logged into that account to access Site content. They also include Cookies that enable us to remember your previous actions within the same browsing session and secure our Sites.  
          We also use functional Cookies and Cookies from third parties for analysis and marketing purposes.  Functional Cookies enable certain parts of the site to work properly and your user preferences to remain known, and you to login using social network user credentials.  Analysis Cookies, among other things, collect information on how visitors use our Site, the content and products that users view most frequently, and the effectiveness of our third party advertising. Advertising Cookies assist in delivering ads to relevant audiences and having our ads appear at the top of search results. Cookies are either “session” Cookies which are deleted when you end your browser session, or “persistent,” which remain until their deletion by you (discussed below) or the party who served the cookie.  Full details on all of the Cookies used on the Site are available at our Cookie Disclosure table below. 

          <br />
          <br />
          <b>How to disable Cookies. </b>
          You can generally activate or later deactivate the use of cookies through a functionality built into your web browser. To learn more about how to control cookie settings through your browser:

          Click here to learn more about the “Private Browsing” setting and managing cookie settings in Firefox;

          Click here to learn more about “Incognito” and managing cookie settings in Chrome;

          Click here to learn more about “InPrivate” and managing cookie settings in Internet Explorer; or

          Click here to learn more about “Private Browsing” and managing cookie settings in Safari.

          If you want to learn more about cookies, or how to control, disable or delete them, please visit http://www.aboutcookies.org for detailed guidance. In addition, certain third party advertising networks, including Google, permit users to opt out of or customize preferences associated with your internet browsing. To learn more about this feature from Google, click here.
          To control flash cookies, which we may use on our Site from time to time, you can go to this <a href="http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager07.html">link</a> because Flash cookies cannot be controlled through your browser settings. Please note that if you decline the use of Cookies, some functions of the website may be unavailable and we will not be able to present personally tailored content and advertisements to you. 
          We may link the information collected by Cookies with other information we collect from you pursuant to this Privacy Policy and use the combined information as set forth herein.  Similarly, the third parties who serve cookies on our Site may link your name or email address to other information they collect, which may include past purchases made offline or online, or your online usage information. If you are located in the European Economic Area, you have certain rights that are described above under the header “Notice to EU Data Subjects”, including the right to inspect and correct or delete the data that we have about you.
          Cookies Disclosure
        </p>

        <table>
          <tbody>
          <tr>
              <th>
                <b>Name of Cookie/Identifier</b>
              </th>
              <th>
                <b>What does the cookie generally do (e.g., website function and administration, analytics, marketing)?</b>
              </th>
              <th>
                <b>Is it a 1st or 3rd party cookie and what is the name of the party providing it?</b>
              </th>
              <th>
                <b>What type of cookie is it (persistent or session)?</b>
              </th>
              <th>
                <b>What is the duration of the cookie on the website (if not cleared by the user)?</b>
              </th>
            </tr>

            <tr>
              <td>
                <p>
                Google Analytics
                </p>
              </td>

              <td>
                <p>
                Analytics
                </p>
              </td>
              <td>
                <p>
                3rd - Google
                </p>
              </td>
              <td>
                <p>
                Persistent
                </p>
              </td>
              <td>
                <p>
                2 years
                </p>
              </td>
            </tr>
          </tbody>
          </table>

      </div>
    </div>
  </div>
  <Footer
      handleSignInUp={handleSignInUp}
      isLoggedIn={isLoggedIn}
    />
  </div>
);

export default Privacy;
