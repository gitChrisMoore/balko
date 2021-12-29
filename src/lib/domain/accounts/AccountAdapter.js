export const toApiAccount = (uiAccount) => {
    const apiAccount = {
        id: uiAccount.id,
        user_id: uiAccount.user_id,
        individuals_id: uiAccount.individuals_id,
        account_products_id: uiAccount.accountProducts_id,
        token: uiAccount.token,
        updated_at: uiAccount.updatedAt,
        inserted_at: uiAccount.insertedAt,
        active: uiAccount.active,
        config: uiAccount.config,
        start_date: uiAccount.startDate,
        end_date: uiAccount.endDate,
        name: uiAccount.name
    };
    return apiAccount;
};

export const toUiAccount = (apiAccount) => {
    const uiAccount = {
        id: apiAccount.id,
        user_id: apiAccount.user_id,
        individuals_id: apiAccount.individuals_id,
        accountProducts_id: apiAccount.account_products_id,
        token: apiAccount.token,
        updatedAt: apiAccount.updated_at,
        insertedAt: apiAccount.inserted_at,
        active: apiAccount.active,
        config: apiAccount.config,
        startDate: apiAccount.start_date,
        endDate: apiAccount.end_date,
        name: apiAccount.name
    };
    return uiAccount;
};
