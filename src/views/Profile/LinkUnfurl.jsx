import React from 'react';
import PropTypes from 'prop-types';

import { baseURL } from '../../utils/funcs';

const LinkUnfurl = ({
  linkPreview,
}) => (
    <div className="input_linkPreview">
      <img src={linkPreview.image.url} alt="link preview" className="input_linkPreview_image" />
      <div className="input_linkPreview_content">
        <h3 className="input_linkPreview_content_title">
          {linkPreview.title}
        </h3>
        <p className="input_linkPreview_content_description">
          {linkPreview.description}
        </p>
        <p className="input_linkPreview_content_url">
          {baseURL(linkPreview.url)}
        </p>
      </div>
    </div>
  );

LinkUnfurl.propTypes = {
  linkPreview: PropTypes.object,
};

LinkUnfurl.defaultProps = {
  linkPreview: {},
};

export default LinkUnfurl;
