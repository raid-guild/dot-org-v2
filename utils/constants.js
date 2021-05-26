import { theme } from '../themes/theme';

export const icons = {
  red: {
    fullstack_dev:
      'https://res.cloudinary.com/saimano/image/upload/v1622036154/RaidGuild/icons/red/fullstackdev_pvshh4.png'
  },
  yellow: {
    experimentation:
      'https://res.cloudinary.com/saimano/image/upload/v1622036856/RaidGuild/icons/yellow/experimentation_izxle0.png'
  },
  purple: {
    consultations:
      'https://res.cloudinary.com/saimano/image/upload/v1622037332/RaidGuild/icons/purple/consultations_nzbplw.png',
    design_sprints:
      'https://res.cloudinary.com/saimano/image/upload/v1622037331/RaidGuild/icons/purple/designsprints__three_uwcyef.png',
    fullstack_dev:
      'https://res.cloudinary.com/saimano/image/upload/v1622037332/RaidGuild/icons/purple/fullstackdev_rz5tei.png',
    marketing:
      'https://res.cloudinary.com/saimano/image/upload/v1622037332/RaidGuild/icons/purple/marketing_yqf609.png',
    learning:
      'https://res.cloudinary.com/saimano/image/upload/v1622037332/RaidGuild/icons/purple/learning__two_effsd5.png',
    cartel_culture:
      'https://res.cloudinary.com/saimano/image/upload/v1622037331/RaidGuild/icons/purple/cartelculture__one_njxbae.png',
    tip_of_spear:
      'https://res.cloudinary.com/saimano/image/upload/v1622037333/RaidGuild/icons/purple/tipofthespear_k2lkvk.png'
  }
};

export const services = [
  {
    name: 'Consultations',
    img: icons.purple.consultations,
    text: 'Validate your ideas and get expert advice on how to build, ship and grow your product.'
  },
  {
    name: 'Design Sprints',
    img: icons.purple.design_sprints,
    text: 'Fine tune your product market fit and nail your UX before writing a single line of code.'
  },
  {
    name: 'Full Stack Dev',
    img: icons.purple.fullstack_dev,
    text: 'Make your dApp ideas a reality. From contracts to front ends, our Raiders are the best in the biz.'
  },
  {
    name: 'Marketing',
    img: icons.purple.marketing,
    text: 'Level up your meme game and build a compelling narrative for your brand / product.'
  }
];

export const culture = [
  {
    name: 'Learn New Things',
    img: icons.purple.learning,
    text: 'Stay on top of the latest trends and developments while leveling up your skills.'
  },
  {
    name: 'Cartel Culture',
    img: icons.purple.cartel_culture,
    text: "We're serious about our work and its impacts on society, but we also know how to have a good time."
  },
  {
    name: 'Tip of the Spear',
    img: icons.purple.tip_of_spear,
    text: 'Join the ranks on the front lines and make a direct impact on the world around you.'
  }
];

export const projects = [
  {
    name: 'Aragon Network Metrics',
    desc: 'The Aragon Network is a digital jurisdiction that offers services to DAOs. It does so via linked protocols like Aragon Court with ANJ. All these linked protocols have their tokens linked to ANT — the native token of the Aragon Network. The Metrics Dashboard is a project for providing insight to data regarding the ANT and ANJ tokens.',
    type: 'fullstack',
    img: icons.red.fullstack_dev,
    color: theme.colors.red
  },
  {
    name: 'Stake On Me',
    desc: 'Design and build the frontend for a personal token launcher built on the meToken contracts.',
    type: 'design sprint',
    img: icons.purple.design_sprints,
    color: theme.colors.purpleLight
  },
  {
    name: 'Tellor',
    desc: 'Design and build the Tellor Dispute Center, along with its Price Feed, for visual cohesion and to simplify both user and dev experience for ease of use and future maintainability.',
    type: 'design sprint',
    img: icons.purple.design_sprints,
    color: theme.colors.purpleLight
  },
  {
    name: '1Up World',
    desc: '1UP World provides community tracking as an MMO coordination game. Giving a 1UP helps track value added activities within your community via a Discord or Telegram chat bot.',
    type: 'wizadry',
    img: icons.yellow.experimentation,
    color: theme.colors.yellowDark
  },
  {
    name: 'Moloch Minion',
    desc: 'Moloch DAOs needed a way to execute arbitrary contract calls through a passing proposal. To do this we did a RaidGuild Improvement Proposal (RIP) to explore a proof of concept for new contracts and getting a minimal frontend UI to test inside the RaidGuild DAO.',
    type: 'wizadry',
    img: icons.yellow.experimentation,
    color: theme.colors.yellowDark
  },
  {
    name: 'Senary Blockchain Ventures',
    desc: 'SBV is a multidisciplinary innovation firm devoted to decentralized technology. SBV supports web-based public utilities that democratize opportunity and promote greater humanity.',
    type: 'fullstack',
    img: icons.red.fullstack_dev,
    color: theme.colors.red
  },
  {
    name: 'Moloch Minion',
    desc: 'Moloch DAOs needed a way to execute arbitrary contract calls through a passing proposal. To do this we did a RaidGuild Improvement Proposal (RIP) to explore a proof of concept for new contracts and getting a minimal frontend UI to test inside the RaidGuild DAO.',
    type: 'wizadry',
    img: icons.yellow.experimentation,
    color: theme.colors.yellowDark
  },
  {
    name: 'Senary Blockchain Ventures',
    desc: 'SBV is a multidisciplinary innovation firm devoted to decentralized technology. SBV supports web-based public utilities that democratize opportunity and promote greater humanity.',
    type: 'fullstack',
    img: icons.red.fullstack_dev,
    color: theme.colors.red
  }
];
