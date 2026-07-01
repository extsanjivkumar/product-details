import { useEffect, useState } from "react";
import { Table } from "antd";
import { fetchInventory } from "../api/productApi";
import SectionCard from './SectionCard';

const columns = [
  {
    title: "Warehouse",
    dataIndex: "warehouse",
    key: "warehouse",
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
  },
  {
    title: "Available Stock",
    dataIndex: "availableStock",
    key: "availableStock",
  },
  {
    title: "Reserved Stock",
    dataIndex: "reservedStock",
    key: "reservedStock",
  },
  {
    title: "Total Stock",
    dataIndex: "totalStock",
    key: "totalStock",
  },
];

export default function InventoryTable() {
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

      const response = await fetchInventory(page, pageSize);

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
    <SectionCard title="Availability" loading={loading} error={error}>
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