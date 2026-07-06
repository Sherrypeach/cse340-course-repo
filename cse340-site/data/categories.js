const categories = [
  {
    name: 'Environmental',
    description: 'Projects focused on cleanups, conservation, and sustainability efforts.',
  },
  {
    name: 'Educational',
    description: 'Projects that support tutoring, mentoring, and literacy in the community.',
  },
  {
    name: 'Community Service',
    description: 'Projects that provide direct support such as meals, shelter, and outreach.',
  },
  {
    name: 'Health and Wellness',
    description: 'Projects promoting physical health, mental wellness, and access to care.',
  },
];

export const getCategories = async () => {
  return categories;
};
