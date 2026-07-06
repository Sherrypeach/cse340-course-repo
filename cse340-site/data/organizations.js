const organizations = [
  {
    id: 1,
    name: 'Green Future Alliance',
    category: 'Environmental',
    image: '/images/green-future-alliance.svg',
    description:
      'A grassroots group organizing river cleanups, tree plantings, and recycling drives across the region.',
  },
  {
    id: 2,
    name: 'Bright Minds Tutoring',
    category: 'Educational',
    image: '/images/bright-minds-tutoring.svg',
    description:
      'Connects volunteer tutors with local students who need extra support in reading, math, and science.',
  },
  {
    id: 3,
    name: 'Helping Hands Community Kitchen',
    category: 'Community Service',
    image: '/images/helping-hands-kitchen.svg',
    description:
      'Prepares and distributes free meals to families in need every week, powered entirely by volunteers.',
  },
  {
    id: 4,
    name: 'Wellness for All',
    category: 'Health and Wellness',
    image: '/images/wellness-for-all.svg',
    description:
      'Offers free fitness classes, mental health workshops, and basic health screenings in underserved areas.',
  },
];

export const getOrganizations = async () => {
  return organizations;
};
