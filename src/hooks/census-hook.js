import { useEffect } from "react";

const CENSUS_VARIABLES = {
  acs5: {
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
  },
};

const KEY = "52a1cdb690a176f1610acecf067b4c68f77f5677";

function getACS5Variables() {
  let allVariables = [];
  for (const property in CENSUS_VARIABLES["acs5"]) {
    allVariables.push(
      ...CENSUS_VARIABLES["acs5"][property].map((item) => item.variable)
    );
  }
  return allVariables.join(",");
}

export default function useCensus(zipCode) {
  const ac5variables = getACS5Variables();
  const ACS5_BASE_URL = `https://api.census.gov/data/2020/acs/acs5/subject?&get=${ac5variables}&for=zip%20code%20tabulation%20area:${zipCode}&key=${KEY}`;

  useEffect(() => {
    const grabCensus = async () => {
      let response;
      try {
        response = await fetch(ACS5_BASE_URL, { method: "GET" });
      } catch (error) {
        console.error(error);
      }
      let parsed = await response.json();
      console.log(parsed);
      return response;
    };
    grabCensus();
  }, []);

  return "hi";
}
