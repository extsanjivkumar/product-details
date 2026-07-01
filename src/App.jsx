import { Layout, Typography } from 'antd';
import AvailabilitySection from './components/AvailabilitySection';
import InventoryTable from './components/InventoryTable';
import NetworkSection from './components/NetworkSection';
import ProductInformation from './components/ProductInformation';
import './App.css';

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#001529', padding: '0 24px' }}>
        <Title level={3} style={{ color: '#fff', margin: '16px 0' }}>
          Product Details Dashboard
        </Title>
      </Header>
      <Content
        style={{
          padding: 24,
          maxWidth: 1200,
          margin: '0 auto',
          width: '100%',
        }}
      >
        <ProductInformation />
        <InventoryTable />
        <AvailabilitySection />
        <NetworkSection />
      </Content>
    </Layout>
  );
}

export default App;
