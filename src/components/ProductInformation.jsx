import { Descriptions, Tag } from 'antd';
import { fetchProductInfo } from '../api/productApi';
import { useState, useEffect } from 'react';
import SectionCard from './SectionCard';
import {useAsyncData} from '../hooks/useAsyncData'


export default function ProductInformation() {
  const {
    data,
    loading,
    error,
    execute,
  } = useAsyncData(fetchProductInfo);
  
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
    <SectionCard
      title="Product Information"
      loading={loading}
      error={error}
      onRetry={loadData}
    >
      {data && (
        <Descriptions
        bordered
        className="product-description"
        column={{
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 2,
        }}
        styles={{
          label: {
            fontWeight: 600,
            whiteSpace: "nowrap",
          },
          content: {
            wordBreak: "break-word",
          },
        }}
      >
        <Descriptions.Item label="Product ID">
          {data?.id}
        </Descriptions.Item>
      
        <Descriptions.Item label="Product Name">
          {data?.productName}
        </Descriptions.Item>
      
        <Descriptions.Item label="SKU">
          {data?.sku}
        </Descriptions.Item>
      
        <Descriptions.Item label="Category">
          {data?.category}
        </Descriptions.Item>
      
        <Descriptions.Item label="Brand">
          {data?.brand}
        </Descriptions.Item>
      
        <Descriptions.Item label="Description" span={1}>
          {data?.description}
        </Descriptions.Item>
      </Descriptions>
      )}
    </SectionCard>
  );
}
