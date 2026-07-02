import { useEffect, useState } from "react";
import { Table } from "antd";
import { fetchInventory } from "../api/productApi";
import SectionCard from './SectionCard';
import {useAsyncData} from '../hooks/useAsyncData'
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
  const {
    data: response,
    loading,
    error,
    execute,
  } = useAsyncData(fetchInventory);
  
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