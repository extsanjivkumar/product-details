import { Timeline, Tag } from "antd";
import { fetchNetwork } from "../api/productApi";
import { useAsyncData } from "../hooks/useAsyncData";
import SectionCard from "./SectionCard";

const statusColor = {
  Delivered: "green",
  "In Transit": "blue",
  Pending: "orange",
};

export default function NetworkSection() {
  const { data } = useAsyncData(fetchNetwork);

  const items =
    data?.map((item) => ({
      color:
        item.status === "Delivered"
          ? "green"
          : item.status === "In Transit"
          ? "blue"
          : "gray",

      children: (
        <div>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>
            {item.source} → {item.destination}
          </div>

          <div>Transfer: {item.transferDate}</div>
          <div>Expected: {item.expectedDelivery}</div>

          {item.actualDelivery && (
            <div>Delivered: {item.actualDelivery}</div>
          )}

          <div style={{ marginTop: 8 }}>
            <Tag color={statusColor[item.status]}>
              {item.status}
            </Tag>
          </div>
        </div>
      ),
    })) ?? [];

  return (
    <SectionCard title="Supply Network">
      <Timeline items={items} />
    </SectionCard>
  );
}