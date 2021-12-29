import { createAccount, getAccounts, deleteAccountByID } from './Account';
import { createPerson } from '../person/Person';
import { createAddress } from '../address/Address';
import { createPhone } from '../phone/Phone';
import { createIndividual, getIndividuals } from '../individuals/Individual';
import { supabase } from '../../data/supabase';
import { createAccountProduct, getAccountProducts } from '../accountProducts/AccountProduct';

let MOCK_USER_1 = global.MOCK_DATA_USERS.user1;
let MOCK_PRODUCT_1 = global.MOCK_DATA_ACCOUNTPRODUCTS.product1;
let loggedinUserID;
let loggedinIdentity;
let newAccount;
let individual;
let accountProduct;

const handleIndividualSetup = async () => {
    const session = supabase.auth.session();
    loggedinUserID = session.user.id;
    const individual = await getIndividuals();
    if (individual.length > 0) {
        // console.log('handleIndividualSetup - complete: ', individual);
        return;
    } else {
        // Create new individual
        MOCK_USER_1.user_id = loggedinUserID;
        const person = await createPerson(MOCK_USER_1);
        const address = await createAddress(MOCK_USER_1);
        const phone = await createPhone(MOCK_USER_1);
        let newIndividual = {
            user_id: MOCK_USER_1.user_id,
            persons_id: person.id,
            addresses_id: address.id,
            phoneNumber_id: phone.id
        };
        const individual = await createIndividual(newIndividual);
        console.log('individual ', individual);
        // Create new account product
        MOCK_PRODUCT_1.user_id = loggedinUserID;
        const acccountProduct = await createAccountProduct(MOCK_PRODUCT_1);
        console.log('acccountProduct ', acccountProduct);
    }
};
const handleCleanUpAccount = async () => {
    let accounts = await getAccounts();
    if (accounts.length > 0) {
        await deleteAccountByID(accounts[0].id);
    }
};

beforeAll(async () => {
    const { error } = await supabase.auth.signIn({
        email: MOCK_USER_1.email,
        password: MOCK_USER_1.password
    });
    if (error) throw new Error('error in beforeall:', error.message);
    await handleIndividualSetup();
    await handleCleanUpAccount();
});

describe('Account Integration Test', () => {
    it('should have a valid auth session', () => {
        const session = supabase.auth.session();
        loggedinUserID = session.user.id;
    });
    it('should have a valid identity', async () => {
        let individuals = await getIndividuals();
        individual = individuals[0];
        expect(individual.id).toEqual(expect.any(Number));
    });
    it('should have a valid account product', async () => {
        let accountProducts = await getAccountProducts();
        accountProduct = accountProducts[0];
        expect(accountProduct.id).toEqual(expect.any(Number));
    });
    it('should be able to create an account', async () => {
        let accountRequest = {
            user_id: loggedinUserID,
            individuals_id: individual.id,
            accountProducts_id: accountProduct.id,
            active: true,
            startDate: '2020-02-02'
        };
        newAccount = await createAccount(accountRequest);
        expect(newAccount.id).toEqual(expect.any(Number));
    });
});
