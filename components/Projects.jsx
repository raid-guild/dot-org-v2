import { Heading, Text, Image, Tag } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { Footer } from '../shared/Footer';
import { theme } from '../themes/theme';
import { projects } from '../utils/constants';

const StyledGridChild = styled.div`
  width: 100%;
  break-inside: avoid;
  margin-bottom: 1em;
  padding: 2rem;
  border: 5px solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(0, 0, 0, 0.8);
  &:hover {
    cursor: pointer;
    background-color: ${theme.colors.blackLight};
  }
`;

export const Projects = () => {
  return (
    <>
      <div
        className='grid'
        style={{
          width: '100%',
          margin: '0 auto',
          display: 'column',
          columns: 4,
          gap: '2em',
          padding: '2rem'
        }}
      >
        {projects.map((item, index) => {
          return (
            <StyledGridChild
              key={index}
              style={{
                borderColor: item.color
              }}
            >
              <Image src={item.img} w='130px' mb='1rem' alt='picture' />
              <Heading
                variant='secondary'
                fontSize='1.5rem'
                mb='1rem'
                color={item.color}
                textAlign='center'
              >
                {item.name}
              </Heading>
              <Tag
                bg={item.color}
                fontFamily='jetbrains'
                color='black'
                fontWeight='bold'
                mb='1rem'
              >
                {item.type}
              </Tag>
              <Text
                variant='medium'
                color='white'
                fontSize='1rem'
                textAlign='justify'
              >
                {item.desc}
              </Text>
            </StyledGridChild>
          );
        })}
      </div>
      <Footer />
    </>
  );
};
