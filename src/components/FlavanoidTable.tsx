import React, { useEffect, useState } from "react";
import { Table, TableCaption, TableThead } from "@mantine/core";
import wineData from "../wine-data.json";
import { TableData, WineData, WineGroupedData } from "../types";
import { calculateMean, calculateMedian, calculateMode } from "../util";

const FlavanoidTable = () => {
  const [tableData, setTableData] = useState<TableData[]>([]);

  //* Function to group data by alcohol class

  const getGroupedByAlcoholClass = (data: WineData[]) => {
    const groupedData: WineGroupedData = {};
    data.forEach((element) => {
      const alcoholClass = element.Alcohol;
      if (!groupedData[alcoholClass]) {
        groupedData[alcoholClass] = [];
      }
      groupedData[alcoholClass].push(element);
    });
    return groupedData;
  };

  const calculateStats = (data: WineData[]) => {
    const flavanoids = data.map((element) =>
      parseFloat(`${element.Flavanoids}`)
    );
    const mean = calculateMean(flavanoids);
    const median = calculateMedian(flavanoids);
    const mode = calculateMode(
      flavanoids.filter((value) => typeof value === "number")
    );

    return { mean, median, mode };
  };

  useEffect(() => {
    const groupedData = getGroupedByAlcoholClass(wineData);
    let arr = [];
    for (let key in groupedData) {
      const data = groupedData[key];
      const result = calculateStats(data);
      arr.push(result);
    }
    setTableData(arr);
  }, []);

  return (
    <Table
      className="table"
      captionSide="top"
      withRowBorders
      withColumnBorders
      withTableBorder
    >
      <TableCaption>Flavanoids Table</TableCaption>
      <TableThead>
        <Table.Tr>
          <Table.Th>Measure</Table.Th>
          <Table.Th>Class 1</Table.Th>
          <Table.Th>Class 2</Table.Th>
          <Table.Th>Class 3</Table.Th>
        </Table.Tr>
      </TableThead>
      <Table.Tbody>
        <Table.Tr>
          <Table.Th>Flavanoids Mean</Table.Th>
          {tableData.map((data, idx) => (
            <Table.Td key={idx}>{data.mean.toPrecision(4)}</Table.Td>
          ))}
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Flavanoids Median</Table.Th>
          {tableData.map((data, idx) => (
            <Table.Td key={idx}>{data.median}</Table.Td>
          ))}
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Flavanoids Mode</Table.Th>
          {tableData.map((data, idx) => (
            <Table.Td key={idx}>{data.mode}</Table.Td>
          ))}
        </Table.Tr>
      </Table.Tbody>
    </Table>
  );
};

export default FlavanoidTable;
