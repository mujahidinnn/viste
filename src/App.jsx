import { DownloadOutlined } from "@ant-design/icons";
import { Button, Col, Layout, Row, Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import CVForm from "./components/CVForm";
import CVPreview from "./components/CVPreview";
import CVPreview2 from "./components/CVPreview2";
import CVPreview3 from "./components/CVPreview3";
import { exportPDF } from "./utils/pdf";

const { Title } = Typography;
const { Content } = Layout;

export default function App() {
  const [data, setData] = useState({});
  const [selectedTemplate, setSelectedTemplate] = useState("cv1");
  const previewRef = useRef();

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("visteedata");
      if (saved) setData(JSON.parse(saved));
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

  const renderSelectedTemplate = () => {
    switch (selectedTemplate) {
      case "cv3":
        return <CVPreview3 data={data} />;
      case "cv2":
        return <CVPreview2 data={data} />;
      default:
        return <CVPreview data={data} />;
    }
  };

  const TemplateThumbnail = ({ id, component }) => (
    <div
      onClick={() => setSelectedTemplate(id)}
      style={{
        cursor: "pointer",
        border:
          selectedTemplate === id ? "3px solid #1890ff" : "1px solid #ddd",
        borderRadius: 8,
        padding: 4,
        background: "#fff",
        transition: "all 0.3s",
        width: 140,
        height: 200,
        overflow: "hidden",
        boxShadow:
          selectedTemplate === id ? "0 0 10px rgba(24,144,255,0.4)" : "none",
      }}
    >
      <div
        style={{
          transform: "scale(0.18)",
          transformOrigin: "top left",
          width: 900,
          height: 1300,
          pointerEvents: "none", // biar klik-nya tetap di wrapper
        }}
      >
        {component}
      </div>
    </div>
  );

  return (
    <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      <Content style={{ padding: 24 }}>
        <Row gutter={24}>
          {/* LEFT SIDE - FORM */}
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
            <Title level={4}>Form Data CV</Title>
            <CVForm data={data} onChange={setData} />
          </Col>

          {/* RIGHT SIDE - PREVIEW */}
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
            <Title level={4}>Pilih Template</Title>
            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
              <Col>
                <TemplateThumbnail
                  id="cv1"
                  component={<CVPreview data={data} />}
                />
              </Col>
              <Col>
                <TemplateThumbnail
                  id="cv2"
                  component={<CVPreview2 data={data} />}
                />
              </Col>
              <Col>
                <TemplateThumbnail
                  id="cv3"
                  component={<CVPreview3 data={data} />}
                />
              </Col>
            </Row>

            <Title level={4} style={{ marginTop: 8 }}>
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
              {renderSelectedTemplate()}
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
