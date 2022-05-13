import {
  filterRecordsByDate,
  filterRecords,
  convertToCurrencySystem,
  checkJsonData,
  mapCampListData,
} from "../helper";
import mockData from "../../store/sagas/mockList";

test("filter records by date when start and endDate is selected", () => {
  const startDate = "4/19/2022";
  const endDate = "5/19/2022";
  const expectedResult = [
    {
      id: 1,
      name: "Divavu",
      startDate: "4/19/2022",
      endDate: "5/19/2022",
      Budget: 88377,
      userId: 3,
    },
  ];

  const result = filterRecordsByDate(startDate, endDate, mockData.data);
  expect(result.length).toEqual(1);
  expect(result).toEqual(expectedResult);
});

test("filter records by name", () => {
  const startDate = "3/19/2022";
  const endDate = "4/25/2022";
  const inputResult = [
    {
      id: 1,
      name: "Divavu",
      username: "samantha",
      startDate: "3/19/2022",
      endDate: "4/9/2022",
      Budget: 88377,
      userId: 3,
    },
    {
      id: 2,
      name: "jaxspan",
      username: "Leopoldo_Corkery",
      startDate: "3/21/2022",
      endDate: "4/9/2022",
      Budget: 88377,
      userId: 3,
    },
    {
      id: 3,
      name: "Trilith",
      username: "Bret",
      startDate: "3/21/2022",
      endDate: "4/30/2022",
      Budget: 88377,
      userId: 3,
    },
  ];
  const inputSearch = "sam";

  const result = filterRecords(startDate, endDate, inputResult, inputSearch);
  expect(result.length).toEqual(1);
});

test("convert currency number into thousand format", () => {
  const inputFormat = "88377";
  const expectedResult = "88.38K USD";

  const result = convertToCurrencySystem(inputFormat);
  expect(result).toEqual(expectedResult);
});

test("check json data and get valid result", () => {
  const inputData = [
    {
      id: 11,
      name: "Divavu",
      username: "samantha",
      startDate: "23",
      endDate: "4/9/2022",
      Budget: 88377,
      userId: 3,
    },
    {
      id: 12,
      name: "jaxspan",
      username: "Leopoldo_Corkery",
      startDate: "3/21/2022",
      endDate: "4/9/2022",
      Budget: 88377,
      userId: 3,
    },
  ];

  const result = checkJsonData(inputData);
  expect(result.length).toEqual(1);
});

test("map user data to campaign data", () => {
  const inputData = [
    {
      id: 1,
      name: "Divavu",
      username: "samantha",
      startDate: "3/19/2022",
      endDate: "4/9/2022",
      Budget: 88377,
      userId: 1,
    },
    {
      id: 2,
      name: "jaxspan",
      username: "Leopoldo_Corkery",
      startDate: "3/21/2022",
      endDate: "4/9/2022",
      Budget: 88377,
      userId: 2,
    },
  ];

  const userData = [
    {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      address: {
        street: "Kulas Light",
        suite: "Apt. 556",
        city: "Gwenborough",
        zipcode: "92998-3874",
        geo: {
          lat: "-37.3159",
          lng: "81.1496",
        },
      },
      phone: "1-770-736-8031 x56442",
      website: "hildegard.org",
      company: {
        name: "Romaguera-Crona",
        catchPhrase: "Multi-layered client-server neural-net",
        bs: "harness real-time e-markets",
      },
    },
    {
      id: 2,
      name: "Ervin Howell",
      username: "Antonette",
      email: "Shanna@melissa.tv",
      address: {
        street: "Victor Plains",
        suite: "Suite 879",
        city: "Wisokyburgh",
        zipcode: "90566-7771",
        geo: {
          lat: "-43.9509",
          lng: "-34.4618",
        },
      },
      phone: "010-692-6593 x09125",
      website: "anastasia.net",
      company: {
        name: "Deckow-Crist",
        catchPhrase: "Proactive didactic contingency",
        bs: "synergize scalable supply-chains",
      },
    },
  ];

  const result = mapCampListData(userData, inputData);
  expect(result.length).toEqual(2);
  expect(result[0].username).toEqual("Bret");
});
