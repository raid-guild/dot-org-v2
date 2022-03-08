import {
  Text,
  Image,
  Tag,
  Box,
  Avatar,
  Tooltip,
  HStack,
  Flex,
  VStack
} from '@chakra-ui/react';

import { Footer } from '../../shared/Footer';

import { projects, icons, roleConversions } from '../../utils/constants';

import { StyledGridChild } from '../../themes/styled';

export const Projects = () => {
  return (
    <>
      <Box
        w='100%'
        margin='0 auto'
        p='2rem'
        style={{
          display: 'column',
          columns: '4',
          gap: '2em'
        }}
      >
        {projects.map((item, index) => {
          return (
            <StyledGridChild key={index}>
              <Flex
                minHeight='200px'
                w='100%'
                direction='row'
                alignItems='center'
                border='3px solid'
                borderColor={item.color}
                p='.7rem'
                mb='2rem'
              >
                <Image
                  src={item.img}
                  w='auto'
                  mb='1rem'
                  alt='picture'
                  mr='2rem'
                />
                <VStack alignItems='flex-start'>
                  <Tag
                    fontSize='.7rem'
                    bg={item.color}
                    fontFamily='jetbrains'
                    color='black'
                    fontWeight='bold'
                  >
                    {item.type}
                  </Tag>
                </VStack>
              </Flex>

              <Text
                color='white'
                fontSize='1rem'
                textAlign='justify'
                letterSpacing='1.1px'
              >
                {item.desc}
              </Text>
              <Text
                w='100%'
                fontFamily='spaceMono'
                color={item.color}
                textAlign='left'
                mt='2rem'
                mb='.5rem'
                fontWeight='bold'
              >
                Roles
              </Text>
              <HStack w='100%'>
                {item.roles.map((role, index) => {
                  return (
                    <Tooltip key={index} label={roleConversions[role]}>
                      <Avatar size='sm' src={icons.roles[role]} />
                    </Tooltip>
                  );
                })}
              </HStack>
            </StyledGridChild>
          );
        })}
      </Box>
      <Footer />
    </>
  );
};
