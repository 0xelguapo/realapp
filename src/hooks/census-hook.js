import { useEffect, useState } from "react";

import {
  CENSUS_VARIABLES,
  MAIN_DATA,
  MAPPED_TITLES_WITH_CATEGORY,
} from "../utility/census";

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
  const [mainProfileData, setMainProfileData] = useState([]);
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
      } 
      let parsedSubject = await subjectResponse.json();
      let parsedDetail = await detailResponse.json();
      parsedSubject[0].pop();
      parsedDetail[0].pop();
      parsedSubject[1].pop();
      parsedDetail[1].pop();

      let finalArray = [];
      let mainData = [];

      for (let i = 0; i < parsedSubject[0].length; i++) {
        let subObj = {};
        subObj.value = parsedSubject[1][i];
        subObj.title = MAPPED_TITLES_WITH_CATEGORY[parsedSubject[0][i]].title;
        subObj.variable = parsedSubject[0][i];
        subObj.category =
          MAPPED_TITLES_WITH_CATEGORY[parsedSubject[0][i]].category;
        subObj.measurement =
          MAPPED_TITLES_WITH_CATEGORY[parsedSubject[0][i]].measurement;
        if (MAIN_DATA[parsedSubject[0][i]]) {
          mainData.push(subObj);
        }
        finalArray.push(subObj);
      }

      let detailedArray = [];
      for (let i = 0; i < parsedDetail[0].length; i++) {
        let detailObj = {};
        detailObj.category =
          MAPPED_TITLES_WITH_CATEGORY[parsedDetail[0][i]].category;
        detailObj.value = parsedDetail[1][i];
        detailObj.title = MAPPED_TITLES_WITH_CATEGORY[parsedDetail[0][i]].title;
        detailObj.measurement =
          MAPPED_TITLES_WITH_CATEGORY[parsedDetail[0][i]].measurement;
        detailObj.variable = parsedDetail[0][i];
        if(MAIN_DATA[parsedDetail[0][i]]) {
          mainData.push(detailObj)
        }
        detailedArray.push(detailObj);
      }
      setMainProfileData(mainData)
      finalArray.splice(2, 0, ...detailedArray);
      setCensusData(finalArray);
      setIsLoading(false)
      return subjectResponse;
    };
    grabCensus();
  }, []);

  return { isLoading, censusData, mainProfileData };
}
