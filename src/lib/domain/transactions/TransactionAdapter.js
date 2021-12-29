export const toApiTransaction = (uiTransaction) => {
    const apiTransaction = {
        id: uiTransaction.id,
        token: uiTransaction.token,

        user_id: uiTransaction.user_id,
        individuals_id: uiTransaction.individuals_id,
        accounts_id: uiTransaction.accounts_id,
        account_products_id: uiTransaction.accountProducts_id,

        created_by: uiTransaction.createdBy,

        effective_date: uiTransaction.effectiveDate,
        inserted_at: uiTransaction.insertedAt,

        amount: uiTransaction.amount,
        balance_delta: uiTransaction.balanceDelta,

        state_id: uiTransaction.state_id,
        state_description: uiTransaction.stateDescription,

        processed: uiTransaction.processed,
        status: uiTransaction.status,
        source: uiTransaction.source,
        type: uiTransaction.type,
        config: uiTransaction.config
    };
    return apiTransaction;
};

export const toUiTransaction = (apiTransaction) => {
    const uiTransaction = {
        id: apiTransaction.id,
        token: apiTransaction.token,

        user_id: apiTransaction.user_id,
        individuals_id: apiTransaction.individuals_id,
        accounts_id: apiTransaction.accounts_id,
        accountProducts_id: apiTransaction.account_products_id,

        createdBy: apiTransaction.created_by,

        effectiveDate: apiTransaction.effective_date,
        insertedAt: apiTransaction.inserted_at,

        amount: apiTransaction.amount,
        balanceDelta: apiTransaction.balance_delta,

        state_id: apiTransaction.state_id,
        stateDescription: apiTransaction.state_description,

        processed: apiTransaction.processed,
        status: apiTransaction.status,
        source: apiTransaction.source,
        type: apiTransaction.type,
        config: apiTransaction.config
    };
    return uiTransaction;
};
