type Link = {
  title: string;
  description?: string;
  url: string;
};

type Section = {
  title: string;
  links: Link[];
};

type Mapping = {
  sections: Section[];
};

const mapping: Mapping = {
  sections: [
    {
      title: 'Social Media',
      links: [
        {
          title: 'Bluesky',
          description: 'I post the most here',
          url: '/bluesky',
        },
        {
          title: 'LinkedIn',
          url: '/linkedin',
        },
        {
          title: 'Instagram',
          url: '/instagram',
        },
        {
          title: 'Reddit',
          url: '/reddit',
        },
      ].sort((a, b) => a.title.localeCompare(b.title)),
    },
    {
      title: 'Fitness',
      links: [
        {
          title: 'Strava',
          description: 'My most used fitness platform',
          url: '/strava',
        },
        {
          title: 'Peloton',
          url: '/peloton',
        },
      ].sort((a, b) => a.title.localeCompare(b.title)),
    },
    {
      title: 'Projects',
      links: [
        {
          title: 'Thirsty Bot',
          description: 'An AI cocktail assistant!',
          url: 'https://thirsty.bot',
        },
        {
          title: 'DALL·E 3 UI',
          description: "A UI for OpenAI's DALL·E 3 API",
          url: 'https://dalle.keegan.codes',
        },
        {
          title: 'Zwift Workout Builder',
          description: 'A better UI for building cycling workouts for Zwift',
          url: 'https://workout.keegan.codes/',
        },
      ].sort((a, b) => a.title.localeCompare(b.title)),
    },
    {
      title: 'Software & Design',
      links: [
        {
          title: 'GitHub',
          url: '/github',
        },
        {
          title: 'Dribbble',
          url: '/dribbble',
        },
      ].sort((a, b) => a.title.localeCompare(b.title)),
    },
  ],
};

export default mapping;
