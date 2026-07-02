import { Tag } from "antd";
import { fetchNetwork } from "../api/productApi";
import SectionCard from "./SectionCard";
import { useState, useEffect } from "react";
import { Table } from "antd";


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
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
    showSizeChanger: true,
    pageSizeOptions: [5, 10, 20, 50]
  });

  const fetchData = async (page = 1, pageSize = 5) => {
    setLoading(true);

    try {

      const response = await fetchNetwork(page, pageSize);

      setData(response.data);

      setPagination({
        current: page,
        pageSize,
        total: response.total,
        showSizeChanger: true,
        pageSizeOptions: [5, 10, 20, 50]
      });
    } catch {
      setError("Something went wrong")
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(1, 5);
  }, []);

  return (
    <SectionCard title="Inventory" loading={loading} error={error}>
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey={(record, index) => `${record.warehouse}-${index}`}
      pagination={pagination}
      onChange={(pagination) => {
        fetchData(pagination.current, pagination.pageSize);
      }}
    />
    </SectionCard>
  );
}