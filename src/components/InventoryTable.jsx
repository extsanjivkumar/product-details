import { Table } from 'antd';
import { fetchInventory } from '../api/productApi';
import { useAsyncData } from '../hooks/useAsyncData';
import SectionCard from './SectionCard';

const columns = [
  { title: 'Warehouse', dataIndex: 'warehouse', key: 'warehouse' },
  { title: 'Location', dataIndex: 'location', key: 'location' },
  { title: 'Available Stock', dataIndex: 'availableStock', key: 'availableStock' },
  { title: 'Reserved Stock', dataIndex: 'reservedStock', key: 'reservedStock' },
  { title: 'Total Stock', dataIndex: 'totalStock', key: 'totalStock' },
];

export default function InventoryTable() {
  const { data, loading, error, refetch } = useAsyncData(fetchInventory);

  return (
    <SectionCard title="Inventory" loading={loading} error={error} onRetry={refetch}>
      {data && (
        <Table
          columns={columns}
          dataSource={data}
          rowKey="warehouse"
          pagination={false}
          scroll={{ x: true }}
        />
      )}
    </SectionCard>
  );
}
