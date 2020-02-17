import React, { Component } from 'react';
import Box from '3box';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  checkIsEthAddress,
  shortenEthAddr,
  fetchEthAddrByENS,
  debounce,
  checkIsENSAddress,
} from '../../utils/funcs';

import GithubIcon from '../../assets/GithubIcon.svg';
import TwitterIcon from '../../assets/twitterGrey.svg';
import Website from '../../assets/Website.png';
import ProfilePicture from '../ProfilePicture';
import Search from '../../assets/Search.svg';
import Loading from '../../assets/LoadingNew.svg';

class NavSearch extends Component {
  fetchENS = debounce(async (value) => {
    this.setState({ isFetching: true });
    const ensAddr = await fetchEthAddrByENS(value);
    this.fetchProfile(ensAddr);
  }, 300);

  constructor(props) {
    super(props);
    this.state = {
      isEthAddr: false,
      searchTerm: '',
      searchedProfile: null,
      profilePicture: null,
      isEmptyProfile: false,
      isFetching: false,
      searchedEthAddr: '',
    };
  }

  handleInputEdit = async (e) => {
    const { value } = e.target;
    const { handleToggleResults } = this.props;
    this.setState({ searchTerm: value, searchedProfile: null, isFetching: false, profilePicture: null });

    const isEthAddr = checkIsEthAddress(value);
    const isENS = checkIsENSAddress(value);

    this.setState({ isEthAddr, isENS });

    const showResults = true;
    handleToggleResults(showResults);

    if (isEthAddr) {
      this.fetchProfile(value);
    } else if (isENS) {
      this.fetchENS(value);
    }
  }

  fetchProfile = async (address) => {
    this.setState({ searchedEthAddr: address });
    const searchedProfile = address ? await Box.getProfile(address) : {};

    if (Object.entries(searchedProfile).length) {
      const verifiedAccouts = await Box.getVerifiedAccounts(searchedProfile);

      if (verifiedAccouts) {
        searchedProfile.github = verifiedAccouts.github && verifiedAccouts.github.username;
        searchedProfile.twitter = verifiedAccouts.twitter && verifiedAccouts.twitter.username;
      }
      this.setState({ searchedProfile, isEmptyProfile: false, profilePicture: searchedProfile.image });
    } else {
      this.setState({ isEmptyProfile: true, searchedProfile: null });
    }

    this.setState({ isFetching: false });
  }

  clearSearch = () => this.setState({ searchedProfile: null, searchTerm: '', profilePicture: null });

  render() {
    const {
      isEthAddr,
      searchedProfile,
      searchTerm,
      isEmptyProfile,
      isENS,
      isFetching,
      searchedEthAddr,
      profilePicture,
    } = this.state;

    const {
      showMobileSearch,
      handleMobileSearch,
      showResults,
      handleToggleResults,
    } = this.props;

    return (
      <>
        <div className="navSearch">
          <input
            type="text"
            className="navSearch_input"
            placeholder="Search user by Ethereum address or ENS..."
            onChange={(e) => this.handleInputEdit(e)}
            onFocus={() => handleToggleResults()}
            value={searchTerm}
          />

          {/* Search Result */}
          <Link to={`/${searchedEthAddr}`} onClick={this.clearSearch} className={`navSearch_resultLink ${(searchedProfile && showResults && !isEmptyProfile && !isFetching) ? 'showSearchResult' : ''}`}>
            <div className="navSearch_input_result">
              <ProfilePicture
                pictureClass="navSearch_input_result_image"
                imageToRender={profilePicture}
                otherProfileAddress={searchedEthAddr}
                fromnav
                isMyPicture={false}
              />

              {(searchedProfile && showResults && !isEmptyProfile && !isFetching) && (
                <div className="navSearch_input_result_info">
                  <h3>
                    {`${searchedProfile.name || shortenEthAddr(searchedEthAddr)} ${searchedProfile.emoji ? searchedProfile.emoji : ''}`}
                  </h3>

                  {searchedProfile.description && (
                    <p className="navSearch_input_result_info_description">
                      {searchedProfile.description}
                    </p>
                  )}

                  {(searchedProfile.twitter || searchedProfile.github || searchedProfile.website) && (
                    <div className="navSearch_input_result_info_social">
                      {searchedProfile.twitter && (
                        <span>
                          <img src={TwitterIcon} className="navSearch_input_result_info_social_icon" alt="Github Icon" />
                          <p>
                            {searchedProfile.twitter}
                          </p>
                        </span>
                      )}

                      {searchedProfile.github && (
                        <span>
                          <img src={GithubIcon} className="navSearch_input_result_info_social_icon" alt="Github Icon" />
                          <p>
                            {searchedProfile.github}
                          </p>
                        </span>
                      )}

                      {searchedProfile.website && (
                        <span>
                          <img src={Website} className="navSearch_input_result_info_social_icon" alt="Website Icon" />
                          <p>
                            {searchedProfile.website}
                          </p>
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </Link>

          {/* No Profile result */}
          {(isEmptyProfile && showResults && !isFetching && (isEthAddr || isENS)) && (
            <div className="navSearch_input_result">
              <h4>
                No profile for this address
              </h4>
            </div>
          )}

          {/* Not a valid search  */}
          {(!isEthAddr && !isENS && searchTerm && showResults && !searchedProfile) && (
            <div className="navSearch_input_result">
              <h4>
                Enter a valid Ethereum address or ENS name
              </h4>
            </div>
          )}

          {/* Loading search result */}
          {isFetching && (
            <div className="navSearch_input_result loading">
              <img src={Loading} alt="Loading" className="navSearch_input_result_loading" />
            </div>
          )}
        </div>

        <button
          className={`nav_openSearch-mobile ${showMobileSearch ? 'open' : 'closed'}`}
          type="button"
          onClick={handleMobileSearch}
        >
          <img
            src={Search}
            alt="Search"
            className="nav_openSearch_icon"
          />
        </button>

        <input
          type="text"
          className={`navSearch_input-mobile ${showMobileSearch ? 'open' : 'closed'}`}
          placeholder="Search user by Ethereum address..."
          onChange={(e) => this.handleInputEdit(e)}
          onFocus={() => handleToggleResults()}
          value={searchTerm}
        />

        {
          showResults && (
            <div
              className="onClickOutside"
              onClick={() => handleToggleResults()}
              onKeyPress={() => handleToggleResults()}
              tabIndex={0}
              role="button"
            />
          )
        }
      </>
    );
  }
}

NavSearch.propTypes = {
  showMobileSearch: PropTypes.bool,
  showResults: PropTypes.bool,
  handleMobileSearch: PropTypes.func.isRequired,
  handleToggleResults: PropTypes.func.isRequired,
};

NavSearch.defaultProps = {
  showMobileSearch: false,
  showResults: false,
};

export default NavSearch;