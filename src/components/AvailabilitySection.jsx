import { Table, Tag } from 'antd';
import { fetchAvailability } from '../api/productApi';
import SectionCard from './SectionCard';
import { useEffect, useState, useRef } from "react";
import {useAsyncData} from '../hooks/useAsyncData'

const columns = [
  { title: 'Location', dataIndex: 'location', key: 'location' },
  {
    title: 'Availability',
    dataIndex: 'available',
    key: 'available',
    render: (available) =>
      available ? (
        <Tag color="success">Available</Tag>
      ) : (
        <Tag color="error">Unavailable</Tag>
      ),
  },
  { title: 'Remarks', dataIndex: 'remarks', key: 'remarks' },
];

export default function AvailabilitySection() {
  const {
    data: response,
    loading,
    error,
    execute,
  } = useAsyncData(fetchAvailability);
  
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
    <SectionCard title="Availability" loading={loading} error={error} onRetry={loadData}>
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
