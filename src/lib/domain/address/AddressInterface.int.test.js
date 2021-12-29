import AddressInterface from './AddressInterface';
import { supabase } from '../../data/supabase';
const { createAddress, getAddresses, deleteAddressByID, getAddressByID, deleteAddresses } =
    AddressInterface();

let email = 'usera@gmail.com';
let password = 'abcd1234';
let loggedinUserID;
let testUiAddress1 = {
    address1: '9810 Address',
    address2: 'apt 7a',
    city: 'new city york',
    state: 'ny',
    postalCode: '10002',
    country: 'US'
};
let userB_id = '530f0820-f423-44c7-9727-78d6dc9b0d40';
let apiResAddress;

beforeAll(async () => {
    const { error } = await supabase.auth.signIn({ email, password });
    if (error) throw new Error('error in beforeall:', error.message);
});

describe('Address Integration Test', () => {
    it('should have a valid auth session', () => {
        const session = supabase.auth.session();
        loggedinUserID = session.user.id;
    });
    it('should return a new address', async () => {
        // the UI should append the logged in user
        testUiAddress1.user_id = loggedinUserID;
        apiResAddress = await createAddress(testUiAddress1);
        expect(apiResAddress.id).toEqual(expect.any(Number));
    });
    it('should add the logged in user id before db create', async () => {
        expect(apiResAddress.user_id).toBe(loggedinUserID);
    });
    it('should have been returned in ui format', async () => {
        expect(apiResAddress.address1).toBe(testUiAddress1.address1);
        expect(apiResAddress.address2).toBe(testUiAddress1.address2);
        expect(apiResAddress.city).toBe(testUiAddress1.city);
        expect(apiResAddress.state).toBe(testUiAddress1.state);
        expect(apiResAddress.postalCode).toBe(testUiAddress1.postalCode);
        expect(apiResAddress.country).toBe(testUiAddress1.country);
    });
    it('should only allow a user to submit their own', async () => {
        const inavlidAddress = Object.create(testUiAddress1);
        inavlidAddress.user_id = userB_id;
        await expect(createAddress(inavlidAddress)).rejects.toHaveProperty(
            'message',
            'new row violates row-level security policy for table "addresses"'
        );
    });
    it('should return all addresses for the user', async () => {
        let apiResAddresses = await getAddresses();
        expect(apiResAddresses.length).toBeGreaterThan(0);
    });
    it('should return a single address', async () => {
        let res = await getAddressByID(apiResAddress.id);
        expect(res.id).toEqual(apiResAddress.id);
    });
    it('should delete a single address by ID', async () => {
        let res = await deleteAddressByID(apiResAddress.id);
        expect(res.id).toEqual(apiResAddress.id);
    });
    it('Delete all addresses from the user', async () => {
        await createAddress(testUiAddress1);
        await createAddress(testUiAddress1);
        let allAddresses = await getAddresses();
        expect(allAddresses.length).toBeGreaterThan(0);
        let res = await deleteAddresses();
        expect(res.length).toBeGreaterThan(1);
        allAddresses = await getAddresses();
        expect(allAddresses.length).toEqual(0);
    });
});
