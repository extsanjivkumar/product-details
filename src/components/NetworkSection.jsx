import { Steps, Tag } from 'antd';
import { fetchNetwork } from '../api/productApi';
import { useAsyncData } from '../hooks/useAsyncData';
import SectionCard from './SectionCard';

const statusColor = {
  Delivered: 'success',
  'In Transit': 'processing',
  Pending: 'default',
};

export default function NetworkSection() {
  const { data, loading, error, refetch } = useAsyncData(fetchNetwork);

  const items = data?.map((item) => ({
    title: `${item.source} → ${item.destination}`,
    description: <Tag color={statusColor[item.status]}>{item.status}</Tag>,
  }));

  return (
    <SectionCard title="Network" loading={loading} error={error} onRetry={refetch}>
      {data && (
        <Steps orientation="vertical" current={data.length - 1} items={items} />
      )}
    </SectionCard>
  );
}
