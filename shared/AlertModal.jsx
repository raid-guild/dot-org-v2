import { useRef, useContext } from 'react';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay
} from '@chakra-ui/react';

import { StyledPrimaryButton } from '../themes/styled';

import { AppContext } from '../context/AppContext';

const AlertModal = ({ alertTitle, alertMessage, alertAction }) => {
  const context = useContext(AppContext);

  const onClose = () => context.updateAlertModalStatus();
  const cancelRef = useRef();

  return (
    <AlertDialog
      isOpen={context.showAlertModal}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            {alertTitle}
          </AlertDialogHeader>

          <AlertDialogBody fontFamily='spaceMono'>
            {alertMessage}
          </AlertDialogBody>

          <AlertDialogFooter>
            <StyledPrimaryButton
              className='dialog-button-select'
              onClick={() => window.open(alertAction, '_blank')}
              ml={3}
            >
              Buy $RAID
            </StyledPrimaryButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default AlertModal;
