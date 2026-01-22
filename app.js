const {
  Layout,
  Menu,
  Card,
  Statistic,
  Table,
  Tag,
  Progress,
  Avatar,
  Button,
  Typography,
  Space,
  Badge,
  Input,
  Select,
  DatePicker,
  Tabs,
  List,
  Divider,
} = antd;
const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

const revenueData = [
  {
    key: "1",
    order: "#TF-2841",
    customer: "Aurora Labs",
    status: "Paid",
    amount: "$18,420",
    date: "Aug 18, 2024",
  },
  {
    key: "2",
    order: "#TF-2837",
    customer: "Summit Retail",
    status: "Pending",
    amount: "$7,810",
    date: "Aug 17, 2024",
  },
  {
    key: "3",
    order: "#TF-2829",
    customer: "Beacon Health",
    status: "Paid",
    amount: "$22,105",
    date: "Aug 16, 2024",
  },
  {
    key: "4",
    order: "#TF-2814",
    customer: "Northwind Co",
    status: "Refunded",
    amount: "$4,980",
    date: "Aug 15, 2024",
  },
];

const pipelineData = [
  {
    title: "Onboarding",
    value: 68,
    description: "Automation flows building",
  },
  {
    title: "Risk review",
    value: 42,
    description: "Compliance waiting room",
  },
  {
    title: "Activation",
    value: 84,
    description: "Teams live this week",
  },
];

const activityFeed = [
  {
    title: "New approval needed",
    description: "Orion Systems requested access",
    time: "12m ago",
  },
  {
    title: "Workflow published",
    description: "Payroll automations version 4.2",
    time: "38m ago",
  },
  {
    title: "Incident resolved",
    description: "API latency back to baseline",
    time: "2h ago",
  },
  {
    title: "Scheduled report",
    description: "Q3 finance summary sent to executives",
    time: "4h ago",
  },
];

const columns = [
  {
    title: "Order",
    dataIndex: "order",
    key: "order",
  },
  {
    title: "Customer",
    dataIndex: "customer",
    key: "customer",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => {
      const colorMap = {
        Paid: "green",
        Pending: "gold",
        Refunded: "red",
      };
      return <Tag color={colorMap[status]}>{status}</Tag>;
    },
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
];

function App() {
  return (
    <Layout className="app-shell">
      <Sider width={260} className="app-sider" theme="light">
        <div className="brand">
          <Avatar shape="square" size={40} className="brand-logo">
            TF
          </Avatar>
          <div>
            <Title level={4} className="brand-title">
              Tempflow Admin
            </Title>
            <Text type="secondary">Operations Console</Text>
          </div>
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={["dashboard"]}
          items={[
            { key: "dashboard", label: "Dashboard" },
            { key: "workflow", label: "Workflow Studio" },
            { key: "approvals", label: "Approvals" },
            { key: "billing", label: "Billing" },
            { key: "audit", label: "Audit Logs" },
            { key: "settings", label: "Settings" },
          ]}
        />
        <div className="sider-footer">
          <Card bordered={false} className="sider-card">
            <Space direction="vertical" size={8}>
              <Text strong>System Health</Text>
              <Progress percent={92} strokeColor="#1677ff" />
              <Text type="secondary">All services operational</Text>
            </Space>
          </Card>
        </div>
      </Sider>

      <Layout>
        <Header className="app-header">
          <Space size="large" className="header-left">
            <Title level={3} className="page-title">
              Executive Overview
            </Title>
            <Badge count={3}>
              <Button type="text">Notifications</Button>
            </Badge>
          </Space>
          <Space size="middle">
            <Input.Search placeholder="Search workflows" allowClear />
            <Select
              defaultValue="north-america"
              options={[
                { value: "north-america", label: "North America" },
                { value: "emea", label: "EMEA" },
                { value: "apac", label: "APAC" },
              ]}
            />
            <DatePicker />
            <Button type="primary">Create report</Button>
          </Space>
        </Header>

        <Content className="app-content">
          <div className="grid-metrics">
            <Card className="metric-card">
              <Statistic
                title="Total revenue"
                value="$2.4M"
                suffix={<Text type="secondary">+18%</Text>}
              />
              <Text type="secondary">Monthly recurring revenue</Text>
            </Card>
            <Card className="metric-card">
              <Statistic
                title="Active workflows"
                value="1,284"
                suffix={<Text type="secondary">+6%</Text>}
              />
              <Text type="secondary">Across 87 enterprise teams</Text>
            </Card>
            <Card className="metric-card">
              <Statistic
                title="Approval backlog"
                value="48"
                suffix={<Text type="secondary">-12%</Text>}
              />
              <Text type="secondary">Pending in review queue</Text>
            </Card>
            <Card className="metric-card">
              <Statistic
                title="SLA compliance"
                value="99.2%"
                suffix={<Text type="secondary">+0.4%</Text>}
              />
              <Text type="secondary">Last 30 days performance</Text>
            </Card>
          </div>

          <div className="grid-main">
            <Card className="panel" title="Revenue pipeline">
              <Space direction="vertical" size={18} className="panel-content">
                {pipelineData.map((item) => (
                  <div key={item.title} className="pipeline-row">
                    <div>
                      <Text strong>{item.title}</Text>
                      <div className="text-muted">{item.description}</div>
                    </div>
                    <Progress percent={item.value} status="active" />
                  </div>
                ))}
              </Space>
            </Card>
            <Card className="panel" title="Team performance">
              <Tabs
                defaultActiveKey="sales"
                items={[
                  {
                    key: "sales",
                    label: "Sales",
                    children: (
                      <Space direction="vertical" size={16}>
                        <Statistic
                          title="Closed won"
                          value="$860K"
                          suffix="this month"
                        />
                        <Progress percent={74} strokeColor="#1677ff" />
                        <Text type="secondary">
                          32 deals at 41% win rate.
                        </Text>
                      </Space>
                    ),
                  },
                  {
                    key: "success",
                    label: "Success",
                    children: (
                      <Space direction="vertical" size={16}>
                        <Statistic title="Renewals" value="98%" />
                        <Progress percent={98} strokeColor="#52c41a" />
                        <Text type="secondary">8 accounts due in Q4.</Text>
                      </Space>
                    ),
                  },
                  {
                    key: "support",
                    label: "Support",
                    children: (
                      <Space direction="vertical" size={16}>
                        <Statistic title="Tickets" value="142" />
                        <Progress percent={64} strokeColor="#faad14" />
                        <Text type="secondary">Avg. response 1h 12m.</Text>
                      </Space>
                    ),
                  },
                ]}
              />
            </Card>
          </div>

          <div className="grid-secondary">
            <Card
              className="panel"
              title="Latest orders"
              extra={<Button type="link">View all</Button>}
            >
              <Table
                columns={columns}
                dataSource={revenueData}
                pagination={false}
                size="small"
              />
            </Card>
            <Card className="panel" title="Activity feed">
              <List
                dataSource={activityFeed}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={
                        <Space>
                          <Text strong>{item.title}</Text>
                          <Tag color="blue">Live</Tag>
                        </Space>
                      }
                      description={item.description}
                    />
                    <Text type="secondary">{item.time}</Text>
                  </List.Item>
                )}
              />
            </Card>
          </div>

          <Card className="panel" title="Operations snapshot">
            <div className="snapshot-grid">
              <div>
                <Text type="secondary">Infrastructure</Text>
                <Title level={4} className="snapshot-title">
                  14 regions active
                </Title>
                <Text type="secondary">Latency: 120ms</Text>
              </div>
              <Divider type="vertical" className="snapshot-divider" />
              <div>
                <Text type="secondary">Risk monitor</Text>
                <Title level={4} className="snapshot-title">
                  6 open signals
                </Title>
                <Text type="secondary">Auto-resolve in 4h</Text>
              </div>
              <Divider type="vertical" className="snapshot-divider" />
              <div>
                <Text type="secondary">Release cadence</Text>
                <Title level={4} className="snapshot-title">
                  3 deployments / week
                </Title>
                <Text type="secondary">Next window: Friday</Text>
              </div>
            </div>
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
