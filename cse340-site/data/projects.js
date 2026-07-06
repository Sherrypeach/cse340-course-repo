const projects = [
  {
    id: 1,
    title: 'Riverside Cleanup Day',
    organization: 'Green Future Alliance',
    category: 'Environmental',
    date: 'August 15, 2026',
    description:
      'Join volunteers to clear litter and invasive plants along the riverside trail.',
  },
  {
    id: 2,
    title: 'Back to School Tutoring Kickoff',
    organization: 'Bright Minds Tutoring',
    category: 'Educational',
    date: 'August 22, 2026',
    description:
      'Volunteer tutors are matched with students for the new school year.',
  },
  {
    id: 3,
    title: 'Weekly Community Meal',
    organization: 'Helping Hands Community Kitchen',
    category: 'Community Service',
    date: 'Every Saturday',
    description:
      'Help prepare and serve a free hot meal to families in the community.',
  },
  {
    id: 4,
    title: 'Free Health Screening Day',
    organization: 'Wellness for All',
    category: 'Health and Wellness',
    date: 'September 5, 2026',
    description:
      'Volunteers assist with basic health screenings and wellness education booths.',
  },
];

export const getProjects = async () => {
  return projects;
};
