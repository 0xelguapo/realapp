import { useEffect, useState } from "react";

import { CENSUS_VARIABLES } from "../utility/census";

const KEY = "52a1cdb690a176f1610acecf067b4c68f77f5677";

function getACS5SubjectVariables() {
  let allVariables = [];
  for (const property in CENSUS_VARIABLES["subject"]) {
    allVariables.push(
      ...CENSUS_VARIABLES["subject"][property].map((item) => item.variable)
    );
  }
  return allVariables.join(",");
}

function getACS5DetailVariables() {
  let allVariables = [];
  for (const property in CENSUS_VARIABLES["detailed"]) {
    allVariables.push(
      ...CENSUS_VARIABLES["detailed"][property].map((item) => item.variable)
    );
  }
  return allVariables.join(",");
}

export default function useCensus(zipCode) {
  const [isLoading, setIsLoading] = useState(true);
  const [censusData, setCensusData] = useState([]);

  const ACS5_DETAIL = `https://api.census.gov/data/2020/acs/acs5?&get=${getACS5DetailVariables()}&for=zip%20code%20tabulation%20area:${zipCode}&key=${KEY}`;
  const ACS5_SUBJECT = `https://api.census.gov/data/2020/acs/acs5/subject?&get=${getACS5SubjectVariables()}&for=zip%20code%20tabulation%20area:${zipCode}&key=${KEY}`;

  useEffect(() => {
    const grabCensus = async () => {
      let subjectResponse;
      let detailResponse;
      try {
        subjectResponse = await fetch(ACS5_SUBJECT, { method: "GET" });
        detailResponse = await fetch(ACS5_DETAIL, { method: "GET" });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
      let parsedSubject = await subjectResponse.json();
      let parsedDetail = await detailResponse.json();
      console.log(parsedDetail);
      return subjectResponse;
    };
    grabCensus();
  }, []);

  return "hi";
}
