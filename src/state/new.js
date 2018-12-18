export const signInGetBox = () => async (dispatch) => {
  dispatch({
    type: 'HANDLE_CONSENT_MODAL',
    provideConsent: true,
  });

  const consentGiven = () => {
    history.push(routes.PROFILE);
    dispatch({
      type: 'LOADING_3BOX',
    });
    dispatch({
      type: 'LOADING_ACTIVITY',
    });
  };

  const opts = {
    consentCallback: consentGiven,
  };

  try {
    const box = await Box // eslint-disable-line no-undef
      .openBox(
        store.getState().threeBox.accountAddress || address,
        window.web3.currentProvider, // eslint-disable-line no-undef
        opts,
      );

    dispatch({
      type: 'UPDATE_THREEBOX',
      ifFetchingThreeBox: false,
      isLoggedIn: true,
      box,
    });

    const memberSince = await store.getState().threeBox.box.public.get('memberSince');

    box.onSyncDone(() => {
      const publicActivity = store.getState().threeBox.box.public.log;
      const privateActivity = store.getState().threeBox.box.private.log;
      
      if (!privateActivity.length && !publicActivity.length) {
        dispatch({
          type: 'HANDLE_ONBOARDING_MODAL',
          onBoardingModal: true,
        });
        store.getState().threeBox.box.public.set('memberSince', Date.now());
        history.push(routes.EDITPROFILE);
      } else if (!memberSince && (privateActivity.length || publicActivity.length)) {
        store.getState().threeBox.box.public.set('memberSince', 'Alpha');
      }

      dispatch({
        type: 'UPDATE_THREEBOX',
        ifFetchingThreeBox: false,
        isLoggedIn: true,
        box,
      });
    });
  } catch (err) {
    dispatch({
      type: 'FAILED_LOADING_3BOX',
      errorMessage: err,
      showErrorModal: true,
      provideConsent: false,
    });
  }
};

export const profileGetBox = () => async (dispatch) => {
  dispatch({
    type: 'HANDLE_CONSENT_MODAL',
    provideConsent: true,
  });

  const consentGiven = () => {
    dispatch({
      type: 'LOADING_3BOX',
    });
    dispatch({
      type: 'LOADING_ACTIVITY',
    });
  };

  const opts = {
    consentCallback: consentGiven,
  };

  try {
    const box = await Box // eslint-disable-line no-undef
      .openBox(
        store.getState().threeBox.accountAddress || address,
        window.web3.currentProvider, // eslint-disable-line no-undef
        opts,
      );

    dispatch({
      type: 'UPDATE_THREEBOX',
      ifFetchingThreeBox: false,
      box,
      isLoggedIn: true,
    });

    const memberSince = await store.getState().threeBox.box.public.get('memberSince');

    box.onSyncDone(() => {
      const publicActivity = store.getState().threeBox.box.public.log;
      const privateActivity = store.getState().threeBox.box.private.log;
      if (!privateActivity.length && !publicActivity.length) {
        dispatch({
          type: 'HANDLE_ONBOARDING_MODAL',
          onBoardingModal: true,
        });
        history.push(routes.EDITPROFILE);
      } else if (!memberSince && (privateActivity.length || publicActivity.length)) {
        store.getState().threeBox.box.public.set('memberSince', 'Alpha');
      }

      dispatch({
        type: 'UPDATE_THREEBOX',
        ifFetchingThreeBox: false,
        isLoggedIn: true,
        box,
      });
    });
  } catch (err) {
    dispatch({
      type: 'FAILED_LOADING_3BOX',
      errorMessage: err,
      showErrorModal: true,
      provideConsent: false,
    });