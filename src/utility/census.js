export const CENSUS_VARIABLES = {
  subject: {
    financial: [
      { title: "Number of Households", variable: "S1901_C01_001E" },
      { title: "Median Household Income", variable: "S1901_C01_012E" },
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
      { title: "Renter occupied housing units", variable: "S2504_C05_001E" },
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

export const MAPPED_TITLES_WITH_CATEGORY = {
  S1901_C01_001E: {
    title: "Number of Households",
    category: "Financial",
    measurement: "unit",
  },
  S1901_C01_012E: {
    title: "Median Household Income",
    category: "Financial",
    measurement: "unit",
  },
  S2406_C01_001E: {
    title: "# of civilians employed, age 16 years and over",
    category: "Employment",
    measurement: "unit",
  },
  S2406_C02_001E: {
    title: "% employees of private companies",
    category: "Employment",
    measurement: "percent",
  },
  S2406_C03_001E: {
    title: "% self employed in own incorporated business",
    category: "Employment",
    measurement: "percent",
  },
  S2406_C04_001E: {
    title: "% non-profit workers",
    category: "Employment",
    measurement: "percent",
  },
  S2406_C05_001E: {
    title: "% local, state, federal government workers",
    category: "Employment",
    measurement: "percent",
  },
  S2406_C06_001E: {
    title:
      "% Self Employed in not incorprated businesses / unpaid family workers",
    category: "Employment",
    measurement: "percent",
  },
  S1501_C02_009E: {
    title: "% High School Graduates or Equivalent",
    category: "Education",
    measurement: "percent",
  },
  S1501_C02_010E: {
    title: "% of Some College, No Degree",
    category: "Education",
    measurement: "percent",
  },
  S1501_C02_011E: {
    title: "% of Associate's Degree",
    category: "Education",
    measurement: "percent",
  },
  S1501_C02_012E: {
    title: "% of Bachelor's Degree",
    category: "Education",
    measurement: "percent",
  },
  S1501_C02_013E: {
    title: "% of Gradutes/PhD Degree",
    category: "Education",
    measurement: "percent",
  },
  S1401_C01_001E: {
    title: "Population 3 years and over enrolled in school",
    category: "Education",
    measurement: "unit",
  },
  S1401_C02_003E: {
    title: "% Enrolled in K-12",
    category: "Education",
    measurement: "percent",
  },
  S1401_C02_008E: {
    title: "% Enrolled in College",
    category: "Education",
    measurement: "percent",
  },
  S1401_C02_009E: {
    title: "% Enrolled in Graduate / Professional School",
    category: "Education",
    measurement: "percent",
  },
  S1401_C06_001E: {
    title: "% in private school",
    category: "Education",
    measurement: "percent",
  },
  S0801_C01_003E: {
    title: "% drove alone to work",
    category: "Commute",
    measurement: "percent",
  },
  S0801_C01_004E: {
    title: "% carpooled to work",
    category: "Commute",
    measurement: "percent",
  },
  S0801_C01_009E: {
    title: "% took public transportation",
    category: "Commute",
    measurement: "percent",
  },
  S0801_C01_046E: {
    title: "Average travel time to work in minutes",
    category: "Commute",
    measurement: "unit",
  },
  S2504_C01_001E: {
    title: "Number of occupied housing units",
    category: "Housing Profile",
    measurement: "unit",
  },
  S2504_C01_009E: {
    title: "Homes built after 2014",
    category: "Housing Profile",
    measurement: "unit",
  },
  S2504_C01_010E: {
    title: "Homes built 2010 to 2013",
    category: "Housing Profile",
    measurement: "unit",
  },
  S2504_C01_011E: {
    title: "Homes built 2000 to 2019",
    category: "Housing Profile",
    measurement: "unit",
  },
  S2504_C01_012E: {
    title: "Homes built 1980 to 1999",
    category: "Housing Profile",
    measurement: "unit",
  },
  S2504_C01_013E: {
    title: "Homes built 1960 to 1979",
    category: "Housing Profile",
    measurement: "unit",
  },
  S2504_C01_014E: {
    title: "Homes built 1940 to 1959",
    category: "Housing Profile",
    measurement: "unit",
  },
  S2504_C01_015E: {
    title: "Homes built before 1939",
    category: "Housing Profile",
    measurement: "unit",
  },
  S2504_C01_022E: {
    title: "# of 1 bedroom houses",
    category: "Housing Profile",
    measurement: "unit",
  },
  S2504_C01_023E: {
    title: "# of 2 or 3 bedroom houses",
    category: "Housing Profile",
    measurement: "unit",
  },
  S2504_C01_024E: {
    title: "#of 4 or more bedrooms",
    category: "Housing Profile",
    measurement: "unit",
  },
  S2504_C05_001E: {
    title: "Renter occupied housing units",
    category: "Housing Profile",
    measurement: "unit",
  },
  B25031_001E: {
    title: "Median Gross Rent",
    category: "Housing Financials",
    measurement: "unit",
  },
  B25031_003E: {
    title: "Median Rent 1 Bedroom",
    category: "Housing Financials",
    measurement: "unit",
  },
  B25031_004E: {
    title: "Median Rent 2 Bedrooms",
    category: "Housing Financials",
    measurement: "unit",
  },
  B25031_005E: {
    title: "Median Rent 3 Bedrooms",
    category: "Housing Financials",
    measurement: "unit",
  },
  B25031_006E: {
    title: "Median Rent 4 Bedrooms",
    category: "Housing Financials",
    measurement: "unit",
  },
  B25031_007E: {
    title: "Median Rent 5+ Bedrooms",
    category: "Housing Financials",
    measurement: "unit",
  },
  B25077_001E: {
    title: "Median Value of Home",
    category: "Housing Financials",
    measurement: "unit",
  },
  B25105_001E: {
    title: "Median Housing Costs (including mortgage)",
    category: "Housing Financials",
    measurement: "unit",
  },
};
