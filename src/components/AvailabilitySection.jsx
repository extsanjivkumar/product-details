import { Table, Tag } from 'antd';
import { fetchAvailability } from '../api/productApi';
import { useAsyncData } from '../hooks/useAsyncData';
import SectionCard from './SectionCard';

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
  const { data, loading, error, refetch } = useAsyncData(fetchAvailability);

  return (
    <SectionCard title="Availability" loading={loading} error={error} onRetry={refetch}>
      {data && (
        <Table
          columns={columns}
          dataSource={data}
          rowKey="location"
          pagination={false}
          scroll={{ x: true }}
        />
      )}
    </SectionCard>
  );
}
