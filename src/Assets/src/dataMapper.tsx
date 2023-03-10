import * as response from './sampleData.json';

const { sprints, title: projectTitle } = JSON.parse(JSON.stringify(response));
const projectStartDate = Date.now();

/*

let projectStartDate = Date.now()
name: title,
id,
start: projectStartDate + startDay * 60 * 60 * 24 * 1000
end: projectStartDate + endDay * 60 * 60 * 24 * 1000,
developer: developers[0]
dependencies
y: ind + 1

Required: {
  id: 'd',
  name: 'Run acceptance tests',
  start: Date.UTC(2014, 10, 23),
  end: Date.UTC(2014, 10, 26),
  developer: 'John Doe',
  dependencies: ['b', 'c'],
  y: 3,
},
*/

/* 
{
  "id": 2,
  "title": "As be able to create a sprint",
  "description": "A sprint is a period of time during which a set of stories are worked on",
  "storyPoints": 5,
  "dependencies": [],
  "projectId": "70429f36-5bef-48f4-aabc-1d2ecdaca834",
  "created_at": "2023-02-17T09:10:12.000Z",
  "updated_at": "2023-02-17T09:10:12.000Z",
  "assignedDeveloperId": 2,
  "startDay": 0,
  "endDay": 4,
  "remainingDuration": -1,
  "developers": [
    {
      "id": 2,
      "name": "Lana",
      "capacity": 120,
      "projectId": "70429f36-5bef-48f4-aabc-1d2ecdaca834",
      "created_at": "2023-02-17T09:10:12.014Z",
      "updated_at": "2023-02-17T09:10:12.014Z"
    },
    {
      "id": 1,
      "name": "Leah",
      "capacity": 100,
      "projectId": "70429f36-5bef-48f4-aabc-1d2ecdaca834",
      "created_at": "2023-02-17T09:10:12.014Z",
      "updated_at": "2023-02-17T09:10:12.014Z"
    }
  ]
},
*/

const getGanttChartFormatData = () => {
  const toReturn = []; // 1-D array
  let storyYAxis = 0;
  sprints.forEach((sprint) => {
    sprint.forEach((story) => {
      let { id, dependencies, developers, title, startDay, endDay } = story;
      let storyToAdd = {
        id: id.toString(),
        dependencies: dependencies.map((dpd) => dpd.toString()),
        developer: developers[0].name,
        name: title,
        start: projectStartDate + startDay * 60 * 60 * 24 * 1000,
        end: projectStartDate + endDay * 60 * 60 * 24 * 1000,
        y: storyYAxis,
      };
      toReturn.push(storyToAdd);
      ++storyYAxis;
    });
  });
  const formattedData = {
    title: {
      text: projectTitle,
    },
    series: [
      {
        name: projectTitle,
        data: toReturn,
      },
    ],
  };
  // console.log('qwer', JSON.stringify(formattedData, null, 2));
  return formattedData;
};
export default getGanttChartFormatData;
