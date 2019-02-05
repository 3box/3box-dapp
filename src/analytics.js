import analytics from 'segment'

export const trackUpdateProfile = (fields) => {
    analytics.track('update_profile', {
        fields: fields
    });
}

export const trackRemoveProfile = (fields) => {
    analytics.track('remove_profile', {
        fields: fields
    });
}
