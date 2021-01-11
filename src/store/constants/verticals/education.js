const state = {
  areas_of_interest: {
    arts: { name: 'Arts', id: 1 },
    businessAndManagement: { name: 'Business & Management', id: 2 },
    computersAndTechnology: { name: 'Computers & Technology', id: 3 },
    criminalJusticeAndLegal: { name: 'Criminal Justice & Legal', id: 4 },
    culinary: { name: 'Culinary', id: 5 },
    educationAndTeaching: { name: 'Education & Teaching', id: 6 },
    hospitalityAndTravel: { name: 'Hospitality & Travel', id: 7 },
    liberalArts: { name: 'Liberal Arts', id: 8 },
    nursingAndHealthCare: { name: 'Nursing & Health Care', id: 9 },
    psychologyAndHumanServices: { name: 'Psychology & Human Services', id: 10 },
    religion: { name: 'Religion', id: 11 },
    scienceAndMath: { name: 'Science And Math', id: 12 },
    tradesAndVocationalEducation: { name: 'Trades & Vocational Education', id: 13 }
  },
  degree_levels: {
    unknown: { name: 'Unknown', id: 1 },
    certificate: { name: 'Certificate', id: 2 },
    associates: { name: 'Associates', id: 3 },
    diploma: { name: 'Diploma', id: 4 },
    bachelors: { name: 'Bachelors', id: 5 },
    masters: { name: 'Masters', id: 6 },
    doctorate: { name: 'Doctorate', id: 7 }
  }
}

const getters = {
  getAreasOfInterest: state => state.areas_of_interest,
  getDegreeLevels: state => state.degree_levels
}

export default {
  state,
  getters
}
