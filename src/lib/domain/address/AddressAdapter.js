export const toApiAddress = (uiAddress) => {
    const apiAddress = {
        id: uiAddress.id,
        user_id: uiAddress.user_id,
        address1: uiAddress.address1,
        address2: uiAddress.address2,
        city: uiAddress.city,
        state: uiAddress.state,
        postal_code: uiAddress.postalCode,
        country: 'US'
    };
    return apiAddress;
};

export const toUiAddress = (apiAddress) => {
    const uiAddress = {
        id: apiAddress.id,
        user_id: apiAddress.user_id,
        address1: apiAddress.address1,
        address2: apiAddress.address2,
        city: apiAddress.city,
        state: apiAddress.state,
        postalCode: apiAddress.postal_code,
        country: apiAddress.country
    };
    return uiAddress;
};
