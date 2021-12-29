import React, { useEffect, useState } from 'react';
import { useRemoteEvents } from '../contexts/RemoteEventProvider';
import { processTransactions } from './TransactionProcessor';

const TransactionHandler = () => {
    const { message } = useRemoteEvents();
    const [isIdle, setisIdle] = useState(true);

    const handleTrigger = async () => {
        processTransactions()
            .then(() => {
                console.log('finished processing tx');
                setisIdle(true);
            })
            .catch((e) => {
                console.log(e);
                alert(e.message);
            });
    };

    // await sleep(6000);
    // async function sleep(ms) {
    //     return new Promise((resolve) => setTimeout(resolve, ms));
    // }

    useEffect(async () => {
        if (message && isIdle) {
            setisIdle(false);
            await handleTrigger();
        }
    }, [message]);

    return (
        <div className="grow m-auto">
            {/* Label */}
            Event Handler
        </div>
    );
};

export default TransactionHandler;
