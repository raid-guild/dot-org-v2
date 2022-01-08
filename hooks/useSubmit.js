import { useState, useContext } from 'react';
import { utils } from 'ethers';

import { AppContext } from '../context/AppContext';

import useWarnings from './useWarnings';

import {
  submitApplicationToAirtable,
  submitApplicationToMongo,
  notifyApplicationSubmission
} from '../utils/requests';
import { getSignature } from '../utils/web3';
import { balanceOf } from '../utils/web3';
import { NETWORK_CONFIG } from '../config';

const useSubmit = (formType) => {
  const context = useContext(AppContext);

  const { triggerToast } = useWarnings();

  const [submissionTextUpdates, setSubmissionTextUpdates] = useState('');
  const [submissionPendingStatus, setSubmissionPendingStatus] = useState(false);

  const submitCohortApplication = async () => {
    try {
      setSubmissionPendingStatus(!submissionPendingStatus);
      setSubmissionTextUpdates('Awaiting signature..');

      const signature = await getSignature(context.ethersProvider);
      if (signature) {
        setSubmissionTextUpdates('Verifying..');
        await submitApplicationToAirtable(context, signature);
        setSubmissionTextUpdates('Sending..');
        await submitApplicationToMongo(context, signature);
        setSubmissionTextUpdates('Notifying..');
        await notifyApplicationSubmission(context, signature);
      }

      setSubmissionPendingStatus(!submissionPendingStatus);
      context.updateStage('next');
    } catch (err) {
      setSubmissionPendingStatus(!submissionPendingStatus);
    }
  };

  const submitConsultationApplication = async () => {
    try {
      if (context.signerAddress && context.chainId !== 4) {
        triggerToast('Please switch to the Rinkeby Network.');
        return;
      }

      if (context.chainId === 4) {
        setSubmissionPendingStatus((prevState) => !prevState);
        setSubmissionTextUpdates('Checking Balance..');

        const tokenBalance = await balanceOf(
          context.ethersProvider,
          NETWORK_CONFIG[context.chainId]['TOKEN_ADDRESS'],
          context.signerAddress
        );

        if (
          utils.formatEther(tokenBalance) < NETWORK_CONFIG['PAYMENT_AMOUNT']
        ) {
          context.updateAlertModalStatus();
          setSubmissionPendingStatus((prevState) => !prevState);
          return;
        }

        setSubmissionPendingStatus((prevState) => !prevState);
        context.updateStage('next');
      }
    } catch (err) {
      console.log(err);
      setSubmissionPendingStatus((prevState) => !prevState);
    }
  };

  const submitApplication = async () => {
    if (formType === 'join') submitCohortApplication();
    if (formType === 'hire') submitConsultationApplication();
  };

  return { submissionTextUpdates, submissionPendingStatus, submitApplication };
};

export default useSubmit;
