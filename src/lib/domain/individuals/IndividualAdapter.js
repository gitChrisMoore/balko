export const toApiIndividual = (uiIndividual) => {
    const apiIndividual = {
        id: uiIndividual.id,
        user_id: uiIndividual.user_id,
        persons_id: uiIndividual.persons_id,
        addresses_id: uiIndividual.addresses_id,
        phone_numbers_id: uiIndividual.phoneNumber_id
    };
    return apiIndividual;
};

export const toUiIndividual = (apiIndividual) => {
    const uiIndividual = {
        id: apiIndividual.id,
        user_id: apiIndividual.user_id,
        persons_id: apiIndividual.persons_id,
        addresses_id: apiIndividual.addresses_id,
        phoneNumber_id: apiIndividual.phone_numbers_id
    };
    return uiIndividual;
};
