import { Box, useToast } from '@chakra-ui/react';

const useWarnings = () => {
  const toast = useToast();

  const triggerToast = (message) => {
    toast({
      duration: 3000,
      position: 'top',
      render: () => (
        <Box
          color='white'
          p={3}
          bg='red'
          fontFamily='jetbrains'
          textAlign='center'
        >
          {message}
        </Box>
      )
    });
  };

  return { triggerToast };
};

export default useWarnings;
