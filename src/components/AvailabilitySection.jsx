import { Table, Tag } from 'antd';
import { fetchAvailability } from '../api/productApi';
import SectionCard from './SectionCard';
import { useEffect, useState, useRef } from "react";

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

      const response = await fetchAvailability(page, pageSize);

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
    <SectionCard title="Availability" loading={loading} error={error} onRetry={fetchData}>
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
