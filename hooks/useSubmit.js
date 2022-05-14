import { useState, useContext } from 'react';
import { utils } from 'ethers';

import { AppContext } from '../context/AppContext';

import useWarnings from './useWarnings';

import {
  submitApplicationToAirtable,
  submitApplicationToMongo,
  notifyApplicationSubmission,
  submitConsultationToAirtable,
  submitConsultationToMongo,
  updateConsultationToAirtable,
  updateConsultationToMongo,
  notifyConsultationRequest
} from '../utils/requests';
import { getSignature, balanceOf, payWithRaidToken } from '../utils/web3';
import {
  SUBMISSION_REQUEST_FEE,
  CONSULTATION_REQUEST_FEE,
  RAID_CONTRACT_ADDRESS,
  DAO_ADDRESS
} from '../config';

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
      if (context.signerAddress && context.chainId !== 100) {
        triggerToast('Please switch to the Gnosis Network.');
        return;
      }

      //if member
      if (context.chainId === 100 && context.isMember) {
        setSubmissionPendingStatus((prevState) => !prevState);
        setSubmissionTextUpdates('Sending request..');
        await submitConsultationToAirtable({
          ...context,
          h_submissionHash: null
        });
        const record = await submitConsultationToMongo({
          ...context,
          h_submissionHash: null
        });
        setSubmissionTextUpdates('Notifying..');
        await notifyConsultationRequest({
          ...context,
          h_id: record._id,
          h_submissionHash: null
        });

        setSubmissionPendingStatus((prevState) => !prevState);
        context.updateStage('next');
      }

      // if not a member
      if (context.chainId === 100 && !context.isMember) {
        setSubmissionPendingStatus((prevState) => !prevState);
        setSubmissionTextUpdates('Checking Balance..');

        const tokenBalance = await balanceOf(
          context.ethersProvider,
          RAID_CONTRACT_ADDRESS[context.chainId],
          context.signerAddress
        );

        if (utils.formatEther(tokenBalance) < SUBMISSION_REQUEST_FEE) {
          context.updateAlertModalStatus();
          setSubmissionPendingStatus((prevState) => !prevState);
          return;
        }

        setSubmissionTextUpdates('Paying..');
        const tx = await payWithRaidToken(
          RAID_CONTRACT_ADDRESS[context.chainId],
          context.ethersProvider,
          DAO_ADDRESS[context.chainId],
          context.web3.utils.toWei(SUBMISSION_REQUEST_FEE.toString())
        );

        if (tx) {
          const { status } = await tx.wait();
          if (status === 1) {
            setSubmissionTextUpdates('Sending request..');
            await submitConsultationToAirtable({
              ...context,
              h_submissionHash: tx.hash
            });
            await submitConsultationToMongo({
              ...context,
              h_submissionHash: tx.hash
            });
            setSubmissionTextUpdates('Notifying..');
            await notifyConsultationRequest({
              ...context,
              h_submissionHash: tx.hash
            });

            setSubmissionPendingStatus((prevState) => !prevState);
            context.updateStage('next');
          } else {
            useWarnings('Error paying for submission.');
            setSubmissionPendingStatus((prevState) => !prevState);
            return;
          }
        } else {
          useWarnings('Error paying for submission.');
          setSubmissionPendingStatus((prevState) => !prevState);
          return;
        }
      }
    } catch (err) {
      console.log(err);
      setSubmissionPendingStatus((prevState) => !prevState);
    }
  };

  const bookConsultation = async (submissionHash, airtableRecordId) => {
    try {
      if (context.signerAddress && context.chainId !== 100) {
        triggerToast('Please switch to the Gnosis Network.');
        return;
      }

      if (context.chainId === 100) {
        setSubmissionTextUpdates('Checking Balance..');

        const tokenBalance = await balanceOf(
          context.ethersProvider,
          RAID_CONTRACT_ADDRESS[context.chainId],
          context.signerAddress
        );

        if (utils.formatEther(tokenBalance) < CONSULTATION_REQUEST_FEE) {
          context.updateAlertModalStatus();

          return;
        }

        setSubmissionTextUpdates('Paying..');
        const tx = await payWithRaidToken(
          RAID_CONTRACT_ADDRESS[context.chainId],
          context.ethersProvider,
          DAO_ADDRESS[context.chainId],
          context.web3.utils.toWei(CONSULTATION_REQUEST_FEE.toString())
        );

        if (tx) {
          const { status } = await tx.wait();
          if (status === 1) {
            context.setWeb3Data({ h_consultationHash: tx.hash });
            setSubmissionTextUpdates('Updating records..');

            await updateConsultationToAirtable(airtableRecordId, tx.hash);
            await updateConsultationToMongo(submissionHash, tx.hash);
          } else {
            useWarnings('Error paying for consultation.');
            return;
          }
        } else {
          useWarnings('Error paying for consultation.');
          return;
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const submitApplication = async () => {
    if (formType === 'join') submitCohortApplication();
    if (formType === 'hire') submitConsultationApplication();
  };

  return {
    submissionTextUpdates,
    submissionPendingStatus,
    submitApplication,
    bookConsultation
  };
};

export default useSubmit;
