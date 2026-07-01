import { useState } from 'react';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Alert, Button, Card, Spin } from 'antd';

export default function SectionCard({
  title,
  loading,
  error,
  onRetry,
  children,
  collapsible = true,
  defaultCollapsed = false,
  ...cardProps
}) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  const extra =
    collapsible && (
      <Button
        type="text"
        size="small"
        aria-label={collapsed ? 'Expand section' : 'Collapse section'}
        icon={collapsed ? <DownOutlined /> : <UpOutlined />}
        onClick={() => setCollapsed((prev) => !prev)}
      />
    );

  return (
    <Card
      title={title}
      extra={extra}
      style={{ marginBottom: 24 }}
      {...cardProps}
    >
      {!collapsed && loading && (
        <div style={{ textAlign: 'center', padding: 40 }}>
          <Spin size="large" />
        </div>
      )}

      {!collapsed && !loading && error && (
        <Alert
          type="error"
          message="Failed to load"
          description={error}
          showIcon
          action={
            onRetry && (
              <Button size="small" onClick={onRetry}>
                Retry
              </Button>
            )
          }
        />
      )}

      {!collapsed && !loading && !error && children}
    </Card>
  );
}
