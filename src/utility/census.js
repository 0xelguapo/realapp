export const CENSUS_VARIABLES = {
  subject: {
    financial: [
      { title: "Number of Households", variable: "S1901_C01_001E" },
      { title: "Median Household Income", variable: "S1901_C01_012E" },
    ],
    education: [
      {
        title: "% High School Graduates or Equivalent",
        variable: "S1501_C02_009E",
      },
      { title: "% of Some College, No Degree", variable: "S1501_C02_010E" },
      { title: "% of Associate's Degree", variable: "S1501_C02_011E" },
      { title: "% of Bachelor's Degree", variable: "S1501_C02_012E" },
      { title: "% of Gradutes/PhD Degree", variable: "S1501_C02_013E" },
    ],
    enrollment: [
      {
        title: "Population 3 years and over enrolled in school",
        variable: "S1401_C01_001E",
      },
      { title: "% in private school", variable: "S1401_C06_001E" },
      { title: "% Enrolled in K-12", variable: "S1401_C02_003E" },
      { title: "% Enrolled in College", variable: "S1401_C02_008E" },
      {
        title: "% Enrolled in Graduate / Professional School",
        variable: "S1401_C02_009E",
      },
    ],
    employment: [
      {
        title: "# of civilians employed, age 16 years and over",
        variable: "S2406_C01_001E",
      },
      {
        title: "% self employed in own incorporated business",
        variable: "S2406_C03_001E",
      },
      { title: "% employees of private companies", variable: "S2406_C02_001E" },
      { title: "% non-profit workers", variable: "S2406_C04_001E" },
      {
        title: "% local, state, federal government workers",
        variable: "S2406_C05_001E",
      },
      {
        title:
          "% Self Employed in not incorprated businesses / unpaid family workers",
        variable: "S2406_C06_001E",
      },
    ],
    commute: [
      {
        title: "Average travel time to work in minutes",
        variable: "S0801_C01_046E",
      },
      { title: "% drove alone to work", variable: "S0801_C01_003E" },
      { title: "% carpooled to work", variable: "S0801_C01_004E" },
      { title: "% took public transportation", variable: "S0801_C01_009E" },
    ],
    housing: [
      { title: "Number of occupied housing units", variable: "S2504_C01_001E" },
      { title: "Render occupied housing units", variable: "S2504_C05_001E" },
      { title: "# of 1 bedroom houses", variable: "S2504_C01_022E" },
      { title: "# of 2 or 3 bedroom houses", variable: "S2504_C01_023E" },
      { title: "#of 4 or more bedrooms", variable: "S2504_C01_024E" },
      { title: "Homes built after 2014", variable: "S2504_C01_009E" },
      { title: "Homes built 2010 to 2013", variable: "S2504_C01_010E" },
      { title: "Homes built 2000 to 2019", variable: "S2504_C01_011E" },
      { title: "Homes built 1980 to 1999", variable: "S2504_C01_012E" },
      { title: "Homes built 1960 to 1979", variable: "S2504_C01_013E" },
      { title: "Homes built 1940 to 1959", variable: "S2504_C01_014E" },
      { title: "Homes built before 1939", variable: "S2504_C01_015E" },
    ],
  },
  detailed: {
    household: [
      { title: "Median Value of Home", variable: "B25077_001E" },
      { title: "Median Gross Rent", variable: "B25031_001E" },
      {
        title: "Median Housing Costs (including mortgage)",
        variable: "B25105_001E",
      },
      { title: "Median Rent 1 Bedroom", variable: "B25031_003E" },
      { title: "Median Rent 2 Bedrooms", variable: "B25031_004E" },
      { title: "Median Rent 3 Bedrooms", variable: "B25031_005E" },
      { title: "Median Rent 4 Bedrooms", variable: "B25031_006E" },
      { title: "Median Rent 5+ Bedrooms", variable: "B25031_007E" },
    ],
  },
};
