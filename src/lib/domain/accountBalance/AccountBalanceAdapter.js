export const toApiAccountBalance = (uiAccountBalance) => {
    const apiAccountBalance = {
        accounts_id: uiAccountBalance.accounts_id,
        current_balance: uiAccountBalance.currentBalance
    };
    return apiAccountBalance;
};

export const toUiAccountBalance = (apiAccountBalance) => {
    const uiAccountBalance = {
        accounts_id: apiAccountBalance.accounts_id,
        currentBalance: apiAccountBalance.current_balance
    };
    return uiAccountBalance;
};
