import { Tag } from "antd";
import { fetchNetwork } from "../api/productApi";
import SectionCard from "./SectionCard";
import { useState, useEffect } from "react";
import { Table } from "antd";
import {useAsyncData} from '../hooks/useAsyncData'


const columns = [
  {
    title: "Network",
    dataIndex: "network",
    key: "network",
  },
  {
    title: "Source",
    dataIndex: "source",
    key: "source",
  },
  {
    title: "Destination",
    dataIndex: "destination",
    key: "destination",
  },
  {
    title: "Dispatch Date",
    dataIndex: "dispatchDate",
    key: "dispatchDate",
  },
  {
    title: "Expected Arrival",
    dataIndex: "expectedArrival",
    key: "expectedArrival",
  },
  {
    title: "Actual Arrival",
    dataIndex: "actualArrival",
    key: "actualArrival",
    render: (value) => value || "-",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => (
      <Tag
        color={
          status === "Delivered"
            ? "success"
            : status === "In Transit"
            ? "processing"
            : "default"
        }
      >
        {status}
      </Tag>
    ),
  },
];

export default function NetworkSection() {
  const {
    data: response,
    loading,
    error,
    execute,
  } = useAsyncData(fetchNetwork);
  
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
    showSizeChanger: true,
    pageSizeOptions: [5, 10, 20, 50]
  });
  
  useEffect(() => {
    loadData(1, 5);
  }, []);
  
  const loadData = async (page = 1, pageSize = 5) => {
    const result = await execute(page, pageSize);
  
    setPagination({
      current: page,
      pageSize,
      total: result.total,
      showSizeChanger: true,
      pageSizeOptions: [5, 10, 20, 50]
    });
  };

  return (
    <SectionCard title="Inventory" loading={loading} error={error} onRetry={loadData}>
    <Table
      columns={columns}
      dataSource={response?.data || []}
      loading={loading}
      rowKey={(record, index) => `${record.warehouse}-${index}`}
      pagination={pagination}
      onChange={(pagination) => {
        loadData(pagination.current, pagination.pageSize);
      }}
    />
    </SectionCard>
  );
}