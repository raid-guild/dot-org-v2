import { Flex, Box } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import Head from 'next/head'

import { theme } from '../themes/theme'

import { FirstPaint } from '../components/landing/FirstPaint'
import { Manifesto } from '../components/landing/Manifesto'
import { Services } from '../components/landing/Services'
import { Portfolio } from '../components/landing/Portfolio'
import { Culture } from '../components/landing/Culture'
import { Community } from '../components/landing/Community'
import { Animation } from '../components/animation/Animation'

import { Footer } from '../shared/Footer'

const wrapper_style = {
  position: 'relative',
  zIndex: 100,
}

export default function Home() {
  const [windowWidth, setWindowWidth] = useState('')

  useEffect(() => {
    setWindowWidth(window.innerWidth)
    window.removeEventListener('resize', () => {})
    window.addEventListener('resize', (e) => {
      setWindowWidth(window.innerWidth)
    })
  }, [])

  return (
    <Flex height="100%" width="100%" direction="column" background="#2b2c34">
      <Head>
        <title>RaidGuild</title>
        <meta
          name="description"
          content="A Decentralized Collective of Mercenaries Ready to Slay Your Web3
            Product Demons"
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"
          integrity="sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog=="
          crossorigin="anonymous"
        />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/js/all.min.js"
          integrity="sha512-YSdqvJoZr83hj76AIVdOcvLWYMWzy6sJyIMic2aQz5kh2bPTd9dzY3NtdeEAzPp/PhgZqr4aJObB3ym/vsItMg=="
          crossorigin="anonymous"
        ></script>
      </Head>
      <div style={wrapper_style}>
        <FirstPaint windowWidth={windowWidth} />
        <Manifesto />
        <Services />
        <Portfolio />
        <Culture />

        <Community />

        {windowWidth > 500 && <Box px="5rem" py="2rem" minH="20vh" bgImage={`url(${theme.images.steps})`}></Box>}

        <Footer />
      </div>
      <Animation />
    </Flex>
  )
}
