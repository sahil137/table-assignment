import React, { useEffect, useState } from "react";
import { Table, TableCaption, TableThead } from "@mantine/core";
import wineData from "../wine-data.json";
import { TableData, WineData } from "../types";
import {
  calculateGamma,
  calculateMean,
  calculateMedian,
  calculateMode,
  getGroupedByAlcoholClass,
} from "../util";

const GammaTable = () => {
  const [tableData, setTableData] = useState<TableData[]>([]);

  const calculateStats = (data: WineData[]) => {
    const dataWithGama = calculateGamma(data);
    const gammas = dataWithGama.map((element) =>
      parseFloat(`${element.gamma}`)
    );
    const mean = calculateMean(gammas);
    const median = calculateMedian(gammas);
    const mode = calculateMode(
      gammas.filter((value) => typeof value === "number")
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
      <TableCaption>Gamma Table</TableCaption>
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
          <Table.Th>Gamma Mean</Table.Th>
          {tableData.map((data, idx) => (
            <Table.Td key={idx}>{data.mean.toPrecision(3)}</Table.Td>
          ))}
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Gamma Median</Table.Th>
          {tableData.map((data, idx) => (
            <Table.Td key={idx}>{data.median.toPrecision(3)}</Table.Td>
          ))}
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Gamma Mode</Table.Th>
          {tableData.map((data, idx) => (
            <Table.Td key={idx}>{data.mode.toPrecision(3)}</Table.Td>
          ))}
        </Table.Tr>
      </Table.Tbody>
    </Table>
  );
};

export default GammaTable;
