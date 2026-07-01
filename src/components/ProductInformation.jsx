import { Descriptions, Tag } from 'antd';
import { fetchProductInfo } from '../api/productApi';
import { useAsyncData } from '../hooks/useAsyncData';
import SectionCard from './SectionCard';
import { Typography } from 'antd';

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
        <Descriptions
        bordered
        column={2}
        size='small'
      >
        <Descriptions.Item label="Product ID">
          {data?.id || "Data not available"}
        </Descriptions.Item>
      
        <Descriptions.Item label="Product Name">
          {data?.productName || "Data not available"}
        </Descriptions.Item>
      
        <Descriptions.Item label="SKU">
          {data?.sku || "Data not available"}
        </Descriptions.Item>
      
        <Descriptions.Item label="Category">
          {data?.category || "Data not available"}
        </Descriptions.Item>
      
        <Descriptions.Item label="Brand">
          {data?.brand || "Data not available"}
        </Descriptions.Item>
      
        <Descriptions.Item label="Description">
          {data?.description || "Data not available"}
        </Descriptions.Item>
      </Descriptions>
      )}
    </SectionCard>
  );
}
