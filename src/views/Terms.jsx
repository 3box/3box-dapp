import React from 'react';

import Footer from '../components/Footer';
import './styles/Landing.css';
import './styles/Info.css';

const Terms = ({ isLoggedIn, handleSignInUp }) => (
  <div className="info">
     
    <div className="info__page">

      <div className="info__banner">
        <h1>Terms & Conditions</h1>
      </div>

      <div className="info__content">
      <div className="info__content__text">
        <h3>
        THIS IS THE ALPHA VERSION OF THE 3BOX PLATFORM WHICH IS STILL UNDERGOING TESTING BEFORE ITS OFFICIAL RELEASE. THE INFORMATION AVAILABLE IS NOT INTENDED TO BE RELIED ON OR USED IN A PRODUCTION ENVIRONMENT. YOU ACKNOWLEDGE AND ACCEPT THAT THE SITE AND SERVICES (A) MAY CONTAIN BUGS, ERRORS, AND DEFECTS, (B) MAY FUNCTION IMPROPERLY OR BE SUBJECT TO PERIODS OF DOWNTIME AND UNAVAILABILITY, (C) MAY RESULT IN TOTAL OR PARTIAL LOSS OR CORRUPTION OF DATA USED IN THE SITE AND SERVICES, AND (D) MAY BE MODIFIED AT ANY TIME, INCLUDING THROUGH THE RELEASE OF SUBSEQUENT VERSIONS, ALL WITH OR WITHOUT NOTICE. THE ALPHA PLATFORM IS AVAILABLE ON AN “AS IS” AND “AS AVAILABLE” BASIS FOR THE SOLE PURPOSE OF COLLECTING FEEDBACK ON QUALITY, USABILITY, PERFORMANCE AND ANY DEFECTS. THANK YOU FOR YOUR SUPPORT WHILE WE CONTINUE TO WORK ON DELIVERING A PERFECT PRODUCT. 
        </h3>
        <p>
        Welcome to ConsenSys AG’s 3Box (“3Box”, “Company”, “we”, “our”, or “us”). 3Box provides a distributed database infrastructure which allows people to publicly and selectively share their content and information over the Ethereum network between different decentralized apps (“dapps”), thus powering the next wave of highly usable dapps. These terms of use (“Terms” or “Terms of Use”) govern your use of the website located at https://3box.io (the “Site”), platform, and all related tools, applications, data, software, and other services provided by us (the “Service”). Certain features of the Site and Services may be subject to additional guidelines, terms, or rules, which will be posted on the Site in connection with such features.  All such additional terms, guidelines, and rules are incorporated by reference into these Terms and constitute a legally binding agreement between you and Company in relation to your use of the Service. Any personal information submitted in connection with your use of the Service is subject to our Privacy Policy, which is hereby incorporated by reference into these Terms.
        THESE TERMS SET FORTH THE LEGALLY BINDING TERMS AND CONDITIONS THAT GOVERN YOUR USE OF THE SITE AND SERVICES.  BY ACCESSING OR USING THE SITE OR SERVICES, YOU ARE ACCEPTING THESE TERMS (ON BEHALF OF YOURSELF OR THE ENTITY THAT YOU REPRESENT), AND YOU REPRESENT AND WARRANT THAT YOU HAVE THE RIGHT, AUTHORITY, AND CAPACITY TO ENTER INTO THESE TERMS (ON BEHALF OF YOURSELF OR THE ENTITY THAT YOU REPRESENT).  YOU FURTHER REPRESENT AND WARRANT THAT YOU ARE OTHERWISE LEGALLY PERMITTED TO USE THE SERVICES IN YOUR JURISDICTION AND THAT THE COMPANY IS NOT LIABLE FOR YOUR COMPLIANCE WITH SUCH APPLICABLE LAWS. YOU MAY NOT ACCESS OR USE THE SITES OR SERVICES OR ACCEPT THE TERMS IF YOU ARE NOT AT LEAST 18 YEARS OLD.  YOU FURTHER REPRESENT AND WARRANT THAT YOU UNDERSTAND AND ARE WILLING TO ACCEPT THE RISKS ASSOCIATED WITH CRYPTOGRAPHIC SYSTEMS SUCH AS THE INTERPLANETARY FILE SYSTEM. IF YOU DO NOT AGREE WITH ALL OF THE PROVISIONS OF THESE TERMS, DO NOT ACCESS AND/OR USE THE SITE AND SERVICES.
    THESE TERMS REQUIRE THE USE OF ARBITRATION (SECTION 13.2) ON AN INDIVIDUAL BASIS TO RESOLVE DISPUTES, RATHER THAN JURY TRIALS OR CLASS ACTIONS, AND ALSO LIMIT THE REMEDIES AVAILABLE TO YOU IN THE EVENT OF A DISPUTE.
        </p>

        <h3>1. ACCOUNTS</h3>
        <p>
          <b>1.1 Account Creation.</b>
          In order to use certain features of the Site and Services, you must create a profile (“Account”) and provide certain information about yourself as prompted by the account registration form, such as your Ethereum public key and if you choose, other information such as your name, photo and github account.  You may delete your Account at any time, for any reason, by following the instructions on the Site.  Company may suspend or terminate your Account in accordance with Section 13.

          <b>1.2 Account Responsibilities.</b>
          You are responsible for maintaining the confidentiality of your Account login information and are fully responsible for all activities that occur under your Account. When you use our Site and Services, you may provide things such as your files, content, messages, and so on (“User Content”).You may choose to share User Content publicly, in which case it will be accessible and viewable by anybody. You may also choose to authorize selected decentralized applications to interact with your private profile by approving the following message: “This app wants to view and update your profile.” Each party that you provide such private access to will be able to view and make changes to the same data. Such parties will be able to store additional data and/or delete data in your private profile. You should not use 3Box to store sensitive personal data which you don’t want accessible to others.  If you shared User Content which you no longer want to share publicly or privately using our Services, you must either delete that User Content or your Account. By making such deletion, the relevant User Content will become unlinked from the IPFS network and will be deleted from our IPFS node. You agree to immediately notify Company of any unauthorized use, or suspected unauthorized use of your Account or any other breach of security.  Company cannot and will not be liable for any loss or damage arising from your failure to comply with the above requirements.
        </p>

        <h3>2. ACCESS TO SITE AND SERVICES</h3>
        <p>
          <b>2.1 License.</b>
          Subject to these Terms, Company grants you a non-transferable, non-exclusive, revocable, limited license to use and access the Site and Services.

          <b>2.2 Certain Restrictions.</b>
          The rights granted to you in these Terms are subject to the following restrictions: (a) you shall not license, sell, rent, lease, transfer, assign, distribute, host, or otherwise commercially exploit the Site or Services, whether in whole or in part, or any content displayed on the Site or Services; (b) you shall not modify, make derivative works of, disassemble, reverse compile or reverse engineer any part of the Site or Services; (c) you shall not access the Site or Services in order to build a similar or competitive website, product, or service; (d) except as expressly stated herein, no part of the Site or Services may be copied, reproduced, distributed, republished, downloaded, displayed, posted or transmitted in any form or by any means, (e) you shall not use the Site or Services to store or transmit computer viruses, works, time bombs, Trojan horses and other harmful or malicious code, routines, files, scripts, agents or programs; (f) you shall not use the Site or Services to store or distribute any information, material or data that is harassing, threatening, infringing, libelous, unlawful, obscene, or which violates the privacy or intellectual property rights of any third party; and (g) you shall not interfere with or disrupt the integrity or performance of the Site or Services or third-party data contained therein.  Unless otherwise indicated, any future release, update, or other addition to functionality of the Site or Services shall be subject to these Terms.  All copyright and other proprietary notices on the Site or Services (or on any content displayed on the Site) must be retained on all copies thereof.

          <b>2.3 Modification.</b>
          Company reserves the right, at any time, to modify, suspend, or discontinue the Site (in whole or in part) with or without notice to you.  You agree that Company will not be liable to you or to any third party for any modification, suspension, or discontinuation of the Site and Services or any part thereof.

          <b>2.4 No Support or Maintenance.</b>
          You acknowledge and agree that Company will have no obligation to provide you with any support or maintenance in connection with the Site and Services.

          <b>2.5 Ownership.</b>
          Excluding any User Content that you may provide (defined below), you acknowledge that all the intellectual property rights, including copyrights, patents, trademarks, and trade secrets, in the Site and its content are owned by Company or Company’s suppliers.  Neither these Terms (nor your access to the Site) transfers to you or any third party any rights, title or interest in or to such intellectual property rights, except for the limited access rights expressly set forth in Section ‎2.1. Company and its suppliers reserve all rights not granted in these Terms.  There are no implied licenses granted under these Terms.
        </p>

        <h3>3. USER CONSENT</h3>
        <p>
          <b>3.1 User Content.</b>
          You are solely responsible for your User Content.  You assume all risks associated with use of your User Content, including any reliance on its accuracy, completeness or usefulness by others, or any disclosure of your User Content that personally identifies you or any third party.  You hereby represent and warrant that your User Content does not violate our Acceptable Use Policy (defined in Section ‎3.3).  You may not represent or imply to others that your User Content is in any way provided, sponsored or endorsed by Company.  Because you alone are responsible for your User Content, you may expose yourself to liability if, for example, your User Content violates the Acceptable Use Policy.  Company is not obligated to backup or maintain any User Content, and your User Content may be deleted at any time without prior notice.  You are solely responsible for creating and maintaining your own backup copies of your User Content if you desire.

          <b>3.2 License.</b>
          You hereby grant (and you represent and warrant that you have the right to grant) to Company an irrevocable, nonexclusive, royalty-free and fully paid, worldwide license to reproduce, distribute, publicly display and perform, prepare derivative works of, incorporate into other works, and otherwise use and exploit your User Content, and to grant sublicenses of the foregoing rights, solely for the purposes of including your User Content in the Site and Services.  You hereby irrevocably waive (and agree to cause to be waived) any claims and assertions of moral rights or attribution with respect to your User Content.

          <b>3.3 Acceptable Use Policy.</b>
          The following terms constitute our “Acceptable Use Policy”:
          <ul>
            <li>
              a) You agree not to use the Site and Services to collect, upload, transmit, display, or distribute any User Content (i) that violates any third-party right, including any copyright, trademark, patent, trade secret, moral right, privacy right, right of publicity, or any other intellectual property or proprietary right; (ii) that is unlawful, harassing, abusive, tortious, threatening, harmful, invasive of another’s privacy, vulgar, defamatory, false, intentionally misleading, trade libelous, pornographic, obscene, patently offensive, promotes racism, bigotry, hatred, or physical harm of any kind against any group or individual or is otherwise objectionable; (iii) that is harmful to minors in any way; or (iv) that is in violation of any law, regulation, or obligations or restrictions imposed by any third party.
            </li>
            <li>
              b) In addition, you agree not to: (i) upload, transmit, or distribute to or through the Site or Services any computer viruses, worms, or any software intended to damage or alter a computer system or data; (ii) send through the Site or Services unsolicited or unauthorized advertising, promotional materials, junk mail, spam, chain letters, pyramid schemes, or any other form of duplicative or unsolicited messages, whether commercial or otherwise; (iii)  use the Site or Services to harvest, collect, gather or assemble information or data regarding other users, including e-mail addresses, without their consent; (iv) interfere with, disrupt, or create an undue burden on servers or networks connected to the Site or Services, or violate the regulations, policies or procedures of such networks; (v) attempt to gain unauthorized access to the Site or Services (or to other computer systems or networks connected to or used together with the Site or Services), whether through password mining or any other means; or (vi) harass or interfere with any other user’s use and enjoyment of the Site or Services.
            </li>
          </ul>

          <b>3.4 Enforcement.</b>
          We reserve the right (but have no obligation) to review any User Content, and to investigate and/or take appropriate action against you in our sole discretion if you violate the Acceptable Use Policy or any other provision of these Terms or otherwise create liability for us or any other person. Such action may include no longer maintaining some or all of your User Content, limiting or blocking your access to the Services, and/or reporting you to law enforcement authorities.

          <b>3.5 Feedback.</b>
          Should you encounter any bugs, glitches, lack of functionality or other problems on the Site or Service, please let us know as soon as possible. We appreciate your feedback as it helps us develop the platform and offer the best Service possible. If you provide Company with any feedback or suggestions regarding the Site or Service (“Feedback”), you hereby assign to Company all rights in such Feedback and agree that Company shall have the right to use and fully act on such Feedback and related information in any manner it deems appropriate.  Company will treat any Feedback you provide to Company as non-confidential and non-proprietary.  You agree that you will not submit to Company any information or ideas that you consider to be confidential or proprietary.
        </p>

        <h3>4. INDEMNIFICATION</h3>
        <p>
          You agree to indemnify and hold Company (and its officers, employees, and agents) harmless, including costs and attorneys’ fees, from any claim or demand made by any third party due to or arising out of (a) your use of the Site and Services, (b) your violation of these Terms, (c) your violation of applicable laws or regulations or (d) your User Content.  Company reserves the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify us, and you agree to cooperate with our defense of these claims.  You agree not to settle any matter without the prior written consent of Company.  Company will use reasonable efforts to notify you of any such claim, action or proceeding upon becoming aware of it.
        </p>

        <h3>5. THIRD PARTY LINKS & ADS; OTHER USERS</h3>
        <p>
          <b>5.1 Third-Party Links & Ads.</b>
          The Site may contain links to third-party websites and services, and/or display advertisements for third parties (collectively, “Third-Party Links & Ads”).  Such Third-Party Links & Ads are not under the control of Company, and Company is not responsible for any Third-Party Links & Ads.  Company provides access to these Third-Party Links & Ads only as a convenience to you, and does not review, approve, monitor, endorse, warrant, or make any representations with respect to Third-Party Links & Ads.  You use all Third-Party Links & Ads at your own risk, and should apply a suitable level of caution and discretion in doing so. When you click on any of the Third-Party Links & Ads, the applicable third party’s terms and policies apply, including the third party’s privacy and data gathering practices.  You should make whatever investigation you feel necessary or appropriate before proceeding with any transaction in connection with such Third-Party Links & Ads.

          <b>5.2 Other Users.</b>
          Each Site user is solely responsible for any and all of its own User Content.  Because we do not control User Content, you acknowledge and agree that we are not responsible for any User Content, whether provided by you or by others, such as dapps which you’ve private access to.  We make no guarantees regarding the accuracy, currency, suitability, or quality of any User Content.  Your interactions with other Site users are solely between you and such users.  You agree that Company will not be responsible for any loss or damage incurred as the result of any such interactions.  If there is a dispute between you and any Site user, we are under no obligation to become involved.

          <b>5.3 Release.</b>
          You hereby release and forever discharge the Company (and our officers, employees, agents, successors, and assigns) from, and hereby waive and relinquish, each and every past, present and future dispute, claim, controversy, demand, right, obligation, liability, action and cause of action of every kind and nature (including personal injuries, death, and property damage), that has arisen or arises directly or indirectly out of, or that relates directly or indirectly to, the Site (including any interactions with, or act or omission of, other Site users or any Third-Party Links & Ads).  IF YOU ARE A CALIFORNIA RESIDENT, YOU HEREBY WAIVE CALIFORNIA CIVIL CODE SECTION 1542 IN CONNECTION WITH THE FOREGOING, WHICH STATES: “A GENERAL RELEASE DOES NOT EXTEND TO CLAIMS WHICH THE CREDITOR DOES NOT KNOW OR SUSPECT TO EXIST IN HIS OR HER FAVOR AT THE TIME OF EXECUTING THE RELEASE, WHICH IF KNOWN BY HIM OR HER MUST HAVE MATERIALLY AFFECTED HIS OR HER SETTLEMENT WITH THE DEBTOR.”

          <b>5.4 Third Party Beneficiaries.</b>
          You agree that, except as otherwise expressly provided in these Terms, there shall be no third party beneficiaries to the Terms. The Terms of Use will not be construed as creating or implying any relationship of agency, franchise, partnership, or joint venture between you and Company, except and solely to the extent expressly stated in these Terms.
        </p>

        <h3>6. DISCLAIMERS</h3>
        <p>
          THE SITE AND SERVICES  EXPRESSLY DISCLAIM ANY AND ALL WARRANTIES AND CONDITIONS OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING ALL WARRANTIES OR CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, QUIET ENJOYMENT, ACCURACY, OR NON-INFRINGEMENT.  WE (AND OUR SUPPLIERS) MAKE NO WARRANTY THAT THE SITE OR SERVICES WILL MEET YOUR REQUIREMENTS, WILL BE AVAILABLE ON AN UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE BASIS, OR WILL BE ACCURATE, RELIABLE, FREE OF VIRUSES OR OTHER HARMFUL CODE, COMPLETE, LEGAL, OR SAFE.  IF APPLICABLE LAW REQUIRES ANY WARRANTIES WITH RESPECT TO THE SITE OR SERVICES, ALL SUCH WARRANTIES ARE LIMITED IN DURATION TO NINETY (90) DAYS FROM THE DATE OF FIRST USE.
          SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF IMPLIED WARRANTIES, SO THE ABOVE EXCLUSION MAY NOT APPLY TO YOU.  SOME JURISDICTIONS DO NOT ALLOW LIMITATIONS ON HOW LONG AN IMPLIED WARRANTY LASTS, SO THE ABOVE LIMITATION MAY NOT APPLY TO YOU.
        </p>

        <h3>7. FURTHER DISCLAIMERS</h3>
        <p>
          Without limiting the generality of Section 6, neither Company nor its affiliates or licensors will have any responsibilities or liability with respect to the following: (a) the Services could be impacted by one or more regulatory inquiries or actions, which could prevent or limit the ability of Company to continue to develop or provide the Services, or for you and your users to use the Services, (b) Company has no obligation to update the Services or its underlying platforms and networks to address, mitigate, or remediate any security or other vulnerabilities in the Services, or such platforms or networks, and (c) portions of the Services or any other underlying networks and platforms may rest on open-source software, and there is a risk that weaknesses or bugs that may be introduced in the infrastructural elements of the Services or any other underlying networks and platforms, which may result in security vulnerabilities, data loss, damage, destructions, disclosure, or other compromises.
        </p>

        <h3>8. LIMITATION ON LIABILITY</h3>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL COMPANY (OR OUR SUPPLIERS) BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY LOST PROFITS, LOST DATA, COSTS OF PROCUREMENT OF SUBSTITUTE PRODUCTS, OR ANY INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL OR PUNITIVE DAMAGES ARISING FROM OR RELATING TO THESE TERMS OR YOUR USE OF, OR INABILITY TO USE, THE SITE OR SERVICES, EVEN IF COMPANY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.  ACCESS TO, AND USE OF, THE SITE OR SERVICES IS AT YOUR OWN DISCRETION AND RISK, AND YOU WILL BE SOLELY RESPONSIBLE FOR ANY DAMAGE TO YOUR DEVICE OR COMPUTER SYSTEM, OR LOSS OF DATA RESULTING THEREFROM.
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR LIABILITY TO YOU FOR ANY DAMAGES ARISING FROM OR RELATED TO THIS AGREEMENT (FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION), WILL AT ALL TIMES BE LIMITED TO A MAXIMUM OF FIFTY US DOLLARS (U.S. $50). THE EXISTENCE OF MORE THAN ONE CLAIM WILL NOT ENLARGE THIS LIMIT.  YOU AGREE THAT OUR SUPPLIERS WILL HAVE NO LIABILITY OF ANY KIND ARISING FROM OR RELATING TO THIS AGREEMENT.
          SOME JURISDICTIONS DO NOT ALLOW THE LIMITATION OR EXCLUSION OF LIABILITY FOR INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE ABOVE LIMITATION OR EXCLUSION MAY NOT APPLY TO YOU.
        </p>

        <h3>9. CRYPTOGRAPHIC SYSTEMS</h3>
        <p>
          You acknowledge and understand that cryptography is a progressing field. Advances in code cracking or technical advances such as the development of quantum computers may present risks to cryptographic systems and the Services, which could result in the theft or loss of your property. To the extent possible, the Company intends to update the code underlying the Services to account for any advances in cryptography and to incorporate additional security measures, but does not guarantee or otherwise represent full security of the system. By using the Services, you acknowledge these inherent risks.
        </p>

        <h3>10. PLATFORM SECURITY</h3>
        <p>
          We are an early stage platform.  You acknowledge that applications are code subject to flaws and acknowledge that you are solely responsible for evaluating any available code provided by the Services. You further expressly acknowledge and represent that applications can be written maliciously or negligently, that we cannot be held liable for your interaction with such third party applications. These warnings and others later provided by us in no way evidence or represent an ongoing duty to alert you to all of the potential risks of utilizing the Site and Services.
        </p>

        <h3>11. COPYRIGHT INFRINGEMENT</h3>
        <p>
          If you believe that your copyright or the copyright of a person on whose behalf you are authorized to act has been infringed, please provide Company a written notice containing the following information: (a) an electronic or physical signature of the person authorized to act on behalf of the owner of the copyright or other intellectual property interest, (b) a description of the copyrighted work or other intellectual property that you claim has been infringed, and (c) a description of where the material that you claim is infringing is located on the Site.
          Company can be reached at: 
          Email: support@3box.io
          Subject Line: Copyright Notification: 3Box
        </p>

        <h3>12. TERMS & TERMINATION</h3>
        <p>
        Subject to this Section, these Terms will remain in full force and effect while you use the Site.  We may suspend or terminate your rights to use the Site and Services (including your Account) at any time for any reason at our sole discretion, including for any use of the Site or Services in violation of these Terms.  Upon termination of your rights under these Terms, your Account and right to access and use the Site and Services will terminate immediately.  You understand that any termination of your Account may involve deletion of your User Content associated with your Account from our live databases.  Company will not have any liability whatsoever to you for any termination of your rights under these Terms, including for termination of your Account or deletion of your User Content.  Even after your rights under these Terms are terminated, the following provisions of these Terms will remain in effect: Sections ‎2.2 through ‎2.5, Sections ‎3 through 8, and Sections 11 through 14.	
        </p>

        <h3>13. GENERAL</h3>
        <p>
          <b>13.1 Changes</b>
          These Terms are subject to occasional revision, and if we make any changes, we will change the Last Updated date above.  Continued use of our Sites following such notice of such changes shall indicate your acknowledgement of such changes and agreement to be bound by the terms and conditions of such changes.
          
          <b>13.2 Dispute Resolution.</b>
          Please read this Arbitration Agreement carefully.  It is part of your contract with Company and affects your rights.  It contains procedures for MANDATORY BINDING ARBITRATION AND A CLASS ACTION WAIVER.
          <ul>
            <li>
              a) Applicability of Arbitration Agreement.  All claims and disputes (excluding claims for injunctive or other equitable relief as set forth below) in connection with the Terms or the use of any product or service provided by the Company that cannot be resolved informally or in small claims court shall be resolved by binding arbitration on an individual basis under the terms of this Arbitration Agreement.  Unless otherwise agreed to, all arbitration proceedings shall be held in English.  This Arbitration Agreement applies to you and the Company, and to any subsidiaries, affiliates, agents, employees, predecessors in interest, successors, and assigns, as well as all authorized or unauthorized users or beneficiaries of services or goods provided under the Terms.
            </li>
            <li>
              b) Notice Requirement and Informal Dispute Resolution.  Before either party may seek arbitration, the party must first send to the other party a written Notice of Dispute (“Notice”) describing the nature and basis of the claim or dispute, and the requested relief.  A Notice to the Company should be sent to: 49 Bogart St. #22, Brooklyn, New York 11206.  After the Notice is received, you and the Company may attempt to resolve the claim or dispute informally.  If you and the Company do not resolve the claim or dispute within thirty (30) days after the Notice is received, either party may begin an arbitration proceeding.  The amount of any settlement offer made by any party may not be disclosed to the arbitrator until after the arbitrator has determined the amount of the award, if any, to which either party is entitled.
            </li>
            <li>
              c) Arbitration Rules.  Arbitration shall be initiated through the American Arbitration Association (“AAA”), an established alternative dispute resolution provider (“ADR Provider”) that offers arbitration as set forth in this section.  If AAA is not available to arbitrate, the parties shall agree to select an alternative ADR Provider.  The rules of the ADR Provider shall govern all aspects of the arbitration, including but not limited to the method of initiating and/or demanding arbitration, except to the extent such rules are in conflict with the Terms.  The AAA Consumer Arbitration Rules (“Arbitration Rules”) governing the arbitration are available online at www.adr.org or by calling the AAA at 1-800-778-7879.  The arbitration shall be conducted by a single, neutral arbitrator.  Any claims or disputes where the total amount of the award sought is less than Ten Thousand U.S. Dollars (US $10,000.00) may be resolved through binding non-appearance-based arbitration, at the option of the party seeking relief.  For claims or disputes where the total amount of the award sought is Ten Thousand U.S. Dollars (US $10,000.00) or more, the right to a hearing will be determined by the Arbitration Rules.  Any judgment on the award rendered by the arbitrator may be entered in any court of competent jurisdiction.  If the arbitrator grants you an award that is greater than the last settlement offer that the Company made to you prior to the initiation of arbitration, the Company will pay you the greater of the award or $2,500.00.  Each party shall bear its own costs (including attorney’s fees) and disbursements arising out of the arbitration and shall pay an equal share of the fees and costs of the ADR Provider.
            </li>
            <li>
              d) Additional Rules for Non-Appearance Based Arbitration.  If non-appearance based arbitration is elected, the arbitration shall be conducted by telephone, online and/or based solely on written submissions; the specific manner shall be chosen by the party initiating the arbitration.  The arbitration shall not involve any personal appearance by the parties or witnesses unless otherwise agreed by the parties.
            </li>
            <li>
              e) Time Limits.  If you or the Company pursue arbitration, the arbitration action must be initiated and/or demanded within the statute of limitations (i.e., the legal deadline for filing a claim) and within any deadline imposed under the AAA Rules for the pertinent claim.
            </li>
            <li>
              f) Authority of Arbitrator.  If arbitration is initiated, the arbitrator will decide the rights and liabilities, if any, of you and the Company, and the dispute will not be consolidated with any other matters or joined with any other cases or parties.  The arbitrator shall have the authority to grant motions dispositive of all or part of any claim.  The arbitrator shall have the authority to award monetary damages, and to grant any non-monetary remedy or relief available to an individual under applicable law, the AAA Rules, and the Terms.  The arbitrator shall issue a written award and statement of decision describing the essential findings and conclusions on which the award is based, including the calculation of any damages awarded.  The arbitrator has the same authority to award relief on an individual basis that a judge in a court of law would have.  The award of the arbitrator is final and binding upon you and the Company.
            </li>
            <li>
              g) Waiver of Jury Trial.  THE PARTIES HEREBY WAIVE THEIR CONSTITUTIONAL AND STATUTORY RIGHTS TO GO TO COURT AND HAVE A TRIAL IN FRONT OF A JUDGE OR A JURY, instead electing that all claims and disputes shall be resolved by arbitration under this Arbitration Agreement.  Arbitration procedures are typically more limited, more efficient and less costly than rules applicable in a court and are subject to very limited review by a court.  In the event any litigation should arise between you and the Company in any state or federal court in a suit to vacate or enforce an arbitration award or otherwise, YOU AND THE COMPANY WAIVE ALL RIGHTS TO A JURY TRIAL, instead electing that the dispute be resolved by a judge.
            </li>
            <li>
              h) Waiver of Class or Consolidated Actions.  ALL CLAIMS AND DISPUTES WITHIN THE SCOPE OF THIS ARBITRATION AGREEMENT MUST BE ARBITRATED OR LITIGATED ON AN INDIVIDUAL BASIS AND NOT ON A CLASS BASIS, AND CLAIMS OF MORE THAN ONE CUSTOMER OR USER CANNOT BE ARBITRATED OR LITIGATED JOINTLY OR CONSOLIDATED WITH THOSE OF ANY OTHER CUSTOMER OR USER.  
            </li>
            <li>
              i) Confidentiality.  All aspects of the arbitration proceeding, including but not limited to the award of the arbitrator and compliance therewith, shall be strictly confidential.  The parties agree to maintain confidentiality unless otherwise required by law.  This paragraph shall not prevent a party from submitting to a court of law any information necessary to enforce this Agreement, to enforce an arbitration award, or to seek injunctive or equitable relief.
            </li>
            <li>
              j) Severability.  If any part or parts of this Arbitration Agreement are found under the law to be invalid or unenforceable by a court of competent jurisdiction, then such specific part or parts shall be of no force and effect and shall be severed and the remainder of the Agreement shall continue in full force and effect.
            </li>
            <li>
              k) Right to Waive.  Any or all of the rights and limitations set forth in this Arbitration Agreement may be waived by the party against whom the claim is asserted.  Such waiver shall not waive or affect any other portion of this Arbitration Agreement.
            </li>
            <li>
              l) Survival of Agreement.  This Arbitration Agreement will survive the termination of your relationship with Company.  
            </li>
            <li>
              m) Small Claims Court.  Notwithstanding the foregoing, either you or the Company may bring an individual action in small claims court.
            </li>
            <li>
              n) Emergency Equitable Relief.  Notwithstanding the foregoing, either party may seek emergency equitable relief before a state or federal court in order to maintain the status quo pending arbitration.  A request for interim measures shall not be deemed a waiver of any other rights or obligations under this Arbitration Agreement.
            </li>
            <li>
              o) Claims Not Subject to Arbitration.  Notwithstanding the foregoing, claims of defamation, violation of the Computer Fraud and Abuse Act, and infringement or misappropriation of the other party’s patent, copyright, trademark or trade secrets shall not be subject to this Arbitration Agreement.
            </li>
            <li>
              p) Courts.  In any circumstances where the foregoing Arbitration Agreement permits the parties to litigate in court, the parties hereby agree to submit to the personal jurisdiction of the courts located within Kings  County, New York, for such purpose 
            </li>
          </ul>

          <b>13.3 Export.</b>
          The Site may be subject to U.S. export control laws and may be subject to export or import regulations in other countries. You agree not to export, re-export, or transfer, directly or indirectly, any U.S. technical data acquired from Company, or any products utilizing such data, in violation of the United States export laws or regulations. 
          
          <b>13.4 Disclosures.</b>
          If you are a California resident, you may report complaints to the Complaint Assistance Unit of the Division of Consumer Product of the California Department of Consumer Affairs by contacting them in writing at 400 R Street, Sacramento, CA 95814, or by telephone at (800) 952-5210.

          <b>13.5 Electronic Communications.</b>
          The communications between you and Company use electronic means, whether you use the Site or send us emails, or whether Company posts notices on the Site or communicates with you via email. For contractual purposes, you (a) consent to receive communications from Company in an electronic form; and (b) agree that all terms and conditions, agreements, notices, disclosures, and other communications that Company provides to you electronically satisfy any legal requirement that such communications would satisfy if it were be in a hard-copy writing. The foregoing does not affect your non-waivable rights.

          <b>13.6 Entire Terms.</b>
          These Terms constitute the entire agreement between you and us regarding the use of the Site and Services. Our failure to exercise or enforce any right or provision of these Terms shall not operate as a waiver of such right or provision. The section titles in these Terms are for convenience only and have no legal or contractual effect. The word “including” means “including without limitation”.  If any provision of these Terms is, for any reason, held to be invalid or unenforceable, the other provisions of these Terms will be unimpaired and the invalid or unenforceable provision will be deemed modified so that it is valid and enforceable to the maximum extent permitted by law.  Your relationship to Company is that of an independent contractor, and neither party is an agent or partner of the other.  These Terms, and your rights and obligations herein, may not be assigned, subcontracted, delegated, or otherwise transferred by you without Company’s prior written consent, and any attempted assignment, subcontract, delegation, or transfer in violation of the foregoing will be null and void.  Company may freely assign these Terms.  The terms and conditions set forth in these Terms shall be binding upon assignees. 

          <b>13.7 Contact.</b>
          We welcome your comments or questions about these Terms. Please contact us at: support@3box.io.
        </p>
      </div>
    </div>
    </div>

    <Footer
      handleSignInUp={handleSignInUp}
      isLoggedIn={isLoggedIn}
    />
  </div>
);

export default Terms;
