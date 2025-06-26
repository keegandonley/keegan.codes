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
      ],
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
          description: "The missing UI for OpenAI's DALL·E 3",
          url: 'https://dalle.keegan.codes',
        },
        {
          title: 'Zwift Workout Builder',
          description: 'A better UI for building cycling workouts for Zwift',
          url: 'https://workout.keegan.codes/',
        },
      ],
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
      ],
    },
    {
      title: 'Meet with Me',
      links: [
        {
          title: 'Book a Consultation',
          url: '/paid-consultation',
          description:
            'A paid consultation with me for custom development work or advice',
        },
        {
          title: 'Quick Chat',
          url: '/1-1',
          description:
            'A quick chat with me for networking, catching up, or discussing how we can work together',
        },
      ],
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
          title: 'Zwift',
          url: '/zwift',
          description: 'Much more active than Peloton these days',
        },
        {
          title: 'Peloton',
          url: '/peloton',
        },
      ],
    },
  ],
};

export default mapping;
