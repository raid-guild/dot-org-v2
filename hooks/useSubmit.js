import { useState, useContext } from 'react';

import { AppContext } from '../context/AppContext';

import {
  submitApplicationToAirtable,
  submitApplicationToMongo,
  notifyApplicationSubmission
} from '../utils/requests';

const useSubmit = (formType) => {
  const context = useContext(AppContext);
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
      setSubmissionPendingStatus(!submissionPendingStatus);
      setSubmissionTextUpdates('Awaiting Connection..');
      setSubmissionPendingStatus(!submissionPendingStatus);
      context.updateStage('next');
    } catch (err) {
      console.log(err);
      setSubmissionPendingStatus(!submissionPendingStatus);
    }
  };

  const submitApplication = async () => {
    if (formType === 'join') submitCohortApplication();
    if (formType === 'hire') submitConsultationApplication();
  };

  return { submissionTextUpdates, submissionPendingStatus, submitApplication };
};

export default useSubmit;
