import React, { useState, useRef, useEffect } from "react";
import { Layout, Row, Col, Button, Typography } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import CVForm from "./components/CVForm";
import CVPreview from "./components/CVPreview";
import { exportPDF } from "./utils/pdf";

const { Title } = Typography;
const { Content } = Layout;

export default function App() {
  const [data, setData] = useState({});
  const previewRef = useRef();

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("visteedata");
      if (saved) {
        setData(JSON.parse(saved));
      }
    } catch (err) {
      console.warn("Gagal parse data CV:", err);
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        sessionStorage.setItem("visteedata", JSON.stringify(data));
      } catch (err) {
        console.warn("Gagal simpan data CV:", err);
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, [data]);

  return (
    <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      <Content style={{ padding: 24 }}>
        <Row gutter={24}>
          {/* ================= LEFT SIDE (FORM) ================= */}
          <Col
            xs={24}
            md={10}
            style={{
              background: "#fff",
              padding: 24,
              borderRadius: 8,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              height: "calc(100vh - 48px)",
              overflowY: "auto",
            }}
          >
            <Title level={4} style={{ marginBottom: 16 }}>
              Form Data CV
            </Title>
            <CVForm data={data} onChange={setData} />
          </Col>

          {/* ================= RIGHT SIDE (PREVIEW) ================= */}
          <Col
            xs={24}
            md={14}
            style={{
              background: "#fff",
              padding: 32,
              borderRadius: 8,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              height: "calc(100vh - 48px)",
              overflowY: "auto",
            }}
          >
            <Title level={4} style={{ marginBottom: 16 }}>
              Preview CV
            </Title>

            <div
              ref={previewRef}
              style={{
                minHeight: "80vh",
                background: "#fafafa",
                padding: 24,
                borderRadius: 8,
              }}
            >
              <CVPreview data={data} />
            </div>

            <Button
              type="primary"
              icon={<DownloadOutlined />}
              onClick={() => exportPDF(previewRef)}
              style={{
                marginTop: 16,
                float: "right",
                position: "fixed",
                zIndex: 999,
                right: 48,
                bottom: 48,
              }}
            >
              Cetak ke PDF
            </Button>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
