import { Descriptions, Tag } from 'antd';
import { fetchProductInfo } from '../api/productApi';
import { useAsyncData } from '../hooks/useAsyncData';
import SectionCard from './SectionCard';

export default function ProductInformation() {
  const { data, loading, error, refetch } = useAsyncData(fetchProductInfo);

  return (
    <SectionCard
      title="Product Information"
      loading={loading}
      error={error}
      onRetry={refetch}
    >
      {data && (
        <Descriptions bordered column={{ xs: 1, sm: 2, md: 2 }}>
          <Descriptions.Item label="Product ID">{data?.id}</Descriptions.Item>
          <Descriptions.Item label="Product Name">{data?.productName}</Descriptions.Item>
          <Descriptions.Item label="SKU">{data?.sku}</Descriptions.Item>
          <Descriptions.Item label="Category">{data?.category}</Descriptions.Item>
          <Descriptions.Item label="Brand">{data?.brand}</Descriptions.Item>
          <Descriptions.Item label="Description" span={2}>{data?.description}</Descriptions.Item>
        </Descriptions>
      )}
    </SectionCard>
  );
}
