import React from 'react';
import PropTypes from 'prop-types';

import { baseURL } from '../../utils/funcs';

const LinkUnfurl = ({
  linkPreview,
}) => {
  const {
    url,
    image,
    title,
    description,
  } = linkPreview;

  return (
    <a href={url} className="input_linkPreview" target="_blank" rel="noopener noreferrer">
      {image && <img src={image.url} alt="link preview" className="input_linkPreview_image" />}

      <div className={`input_linkPreview_content ${image ? 'withImage' : ''}`}>
        <h3 className="input_linkPreview_content_title">
          {title}
        </h3>
        <p className="input_linkPreview_content_description">
          {description}
        </p>
        <p className="input_linkPreview_content_url">
          {baseURL(url)}
        </p>
      </div>
    </a>
  );
};

LinkUnfurl.propTypes = {
  linkPreview: PropTypes.object,
};

LinkUnfurl.defaultProps = {
  linkPreview: {},
};

export default LinkUnfurl;
