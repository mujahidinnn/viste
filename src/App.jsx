import { DownloadOutlined } from "@ant-design/icons";
import { Button, Col, Layout, Row, Typography } from "antd";
import { Input } from "antd/es";
import { useEffect, useRef, useState } from "react";
import CVForm from "./components/CVForm";
import CVPreview1 from "./components/CVPreview1";
import CVPreview2 from "./components/CVPreview2";
import CVPreview3 from "./components/CVPreview3";
import CVPreview4 from "./components/CVPreview4";
import CVPreview5 from "./components/CVPreview5";
import { exportPDF } from "./utils/pdf";

const { Title } = Typography;
const { Content } = Layout;

const colorThemes = [
  // 1. Neutral Gray
  {
    text1: "#222222",
    text2: "#555555",
    text3: "#777777",
    bg: "#F0F0F0",
  },
  // 2. Dark Gray
  // {
  // text1: "#FFFFFF",
  // text2: "#DDDDDD",
  // text3: "#AAAAAA",
  // bg: "#333333",
  // },
  // 3. Green
  {
    text1: "#0E7131",
    text2: "#1F8A45",
    text3: "#A4D9A0",
    bg: "#DFF3E3",
  },
  // 4. Emerald
  {
    text1: "#006A4E",
    text2: "#008C6F",
    text3: "#B2E3D3",
    bg: "#E8FAF4",
  },
  // 5. Yellow / Gold
  {
    text1: "#5C4500",
    text2: "#826923",
    text3: "#E6C76C",
    bg: "#FFF8E1",
  },
  // 6. Blue
  {
    text1: "#1F2C73",
    text2: "#435C94",
    text3: "#A9B9E8",
    bg: "#E8EEFF",
  },
  // 7. Cyan / Teal
  {
    text1: "#005A66",
    text2: "#0096AA",
    text3: "#A7E7EE",
    bg: "#E6FAFC",
  },
  // 8. Red
  {
    text1: "#6A0000",
    text2: "#8C1E2F",
    text3: "#F19BA3",
    bg: "#FDECEC",
  },
  // 9. Purple / Violet
  {
    text1: "#3E2A5A",
    text2: "#544C78",
    text3: "#C0B5E6",
    bg: "#F5F0FF",
  },
  // 10. Magenta / Pink
  {
    text1: "#82175E",
    text2: "#A23A84",
    text3: "#F6B7E0",
    bg: "#FFF0FA",
  },
];

export default function App() {
  const [fileName, setFileName] = useState("");
  const [data, setData] = useState({});
  const [selectedTemplate, setSelectedTemplate] = useState("cv1");
  const [selectedTheme, setSelectedTheme] = useState(colorThemes[0]);
  const previewRef = useRef();

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("visteedata");
      if (saved) {
        const parsed = JSON.parse(saved);
        setData(parsed);
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

  useEffect(() => {
    setData((prev) => ({ ...prev, colorTheme: selectedTheme }));
  }, [selectedTheme]);

  const renderSelectedTemplate = () => {
    switch (selectedTemplate) {
      case "cv5":
        return <CVPreview5 data={data} />;
      case "cv4":
        return <CVPreview4 data={data} />;
      case "cv3":
        return <CVPreview3 data={data} />;
      case "cv2":
        return <CVPreview2 data={data} />;
      default:
        return <CVPreview1 data={data} />;
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
          pointerEvents: "none",
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
              background: "#fafafa",
              padding: 32,
              borderRadius: 8,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              height: "calc(100vh - 48px)",
              overflowY: "auto",
            }}
          >
            <Title level={4}>Pilih Template</Title>
            <Row
              gutter={[16, 16]}
              style={{
                marginBottom: 24,
                background: "#fff",
              }}
            >
              <Col>
                <TemplateThumbnail
                  id="cv1"
                  component={<CVPreview1 data={data} />}
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
              <Col>
                <TemplateThumbnail
                  id="cv4"
                  component={<CVPreview4 data={data} />}
                />
              </Col>
              <Col>
                <TemplateThumbnail
                  id="cv5"
                  component={<CVPreview5 data={data} />}
                />
              </Col>
            </Row>

            {/* Color Theme Picker */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                marginBottom: 24,
              }}
            >
              {colorThemes.map((theme, i) => {
                const isActive = selectedTheme.bg === theme.bg;
                return (
                  <div
                    key={i}
                    onClick={() => setSelectedTheme(theme)}
                    title={theme.name}
                    style={{
                      cursor: "pointer",
                      border: isActive ? "3px solid #1890ff" : "1px solid #ddd",
                      borderRadius: "50%",
                      width: 28,
                      height: 28,
                      background: theme.bg,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  ></div>
                );
              })}
            </div>

            <Row gutter={24}>
              <Col>
                <Title level={4} style={{ marginTop: 8 }}>
                  Preview CV
                </Title>
              </Col>
              <Col>
                <Input
                  name="filename"
                  value={
                    fileName ||
                    (data?.name && `CV-${data?.name?.replace(/\s+/g, "")}`) ||
                    "My-CV"
                  }
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="Masukkan nama file"
                  variant="underlined"
                  suffix=".pdf"
                  style={{
                    background: "transparent",
                    width: "250px",
                  }}
                />
              </Col>
            </Row>
            <div
              style={{
                padding: 24,
                background: "#fff",
              }}
            >
              <div
                ref={previewRef}
                style={{
                  minHeight: "80vh",
                }}
              >
                {renderSelectedTemplate()}
              </div>
            </div>

            <Button
              type="primary"
              icon={<DownloadOutlined />}
              onClick={() => {
                const resultname =
                  fileName ||
                  (data?.name && `CV-${data?.name?.replace(/\s+/g, "")}`) ||
                  "My-CV";

                exportPDF(previewRef, resultname);
              }}
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
