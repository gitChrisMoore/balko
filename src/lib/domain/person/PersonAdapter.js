export const toApiPerson = (uiPerson) => {
    const apiPerson = {
        id: uiPerson.id,
        user_id: uiPerson.user_id,
        first_name: uiPerson.firstName,
        last_name: uiPerson.lastName,
        middle_name: uiPerson.middleName,
        gender: uiPerson.gender,
        date_of_birth: uiPerson.dateofBirth
    };
    return apiPerson;
};

export const toUiPerson = (apiPerson) => {
    const uiPerson = {
        id: apiPerson.id,
        user_id: apiPerson.user_id,
        firstName: apiPerson.first_name,
        lastName: apiPerson.last_name,
        middleName: apiPerson.middle_name,
        gender: apiPerson.gender,
        dateofBirth: apiPerson.date_of_birth
    };
    return uiPerson;
};
