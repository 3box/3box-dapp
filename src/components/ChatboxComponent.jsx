import React from 'react';
import PropTypes from 'prop-types';
import Chatbox from '3box-chatbox-react';

const ChatBoxComponent = ({
  spaceName,
  box,
  currentUserAddr,
  threadName,
  agentProfile,
  userProfileURL,
}) => (
    <Chatbox
      spaceName={spaceName}
      threadName={threadName}
      box={box}
      currentUserAddr={currentUserAddr}
      agentProfile={agentProfile}
      popupChat
      userProfileURL={userProfileURL}
      openOnMount
    />
  );

ChatBoxComponent.propTypes = {
  spaceName: PropTypes.string,
  box: PropTypes.object,
  currentUserAddr: PropTypes.string,
  threadName: PropTypes.string.isRequired,
  agentProfile: PropTypes.object.isRequired,
  userProfileURL: PropTypes.func.isRequired,
};

ChatBoxComponent.defaultProps = {
  spaceName: '',
  box: {},
  currentUserAddr: '',
};

export default ChatBoxComponent;