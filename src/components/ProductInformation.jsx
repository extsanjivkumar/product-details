import { Descriptions, Tag } from 'antd';
import { fetchProductInfo } from '../api/productApi';
import { useState, useEffect } from 'react';
import SectionCard from './SectionCard';



export default function ProductInformation() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetchProductInfo();
      setData(response);
    } catch {
      setError("Something went wrong")
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SectionCard
      title="Product Information"
      loading={loading}
      error={error}
      onRetry={fetchData}
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
