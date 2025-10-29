import {
  BulbOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  Avatar,
  Button,
  Checkbox,
  Collapse,
  DatePicker,
  Form,
  Input,
  Modal,
  Slider,
  Space,
} from "antd";
import { useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import useWindowSize from "../hooks/useWindowSize";
import { editorConfiguration } from "../libs/packages/ckeditor";
import { getCroppedImg } from "../utils/cropImage";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

export default function CVForm({ data = {}, onChange }) {
  const [form] = Form.useForm();
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [rounded, setRounded] = useState(50);
  const [show, setShow] = useState({
    summary: false,
    experient: false,
    education: false,
    skill: false,
  });

  // === Cropper State ===
  const [cropModal, setCropModal] = useState(false);
  const [tempImage, setTempImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const toggleModal = (key, value = true) => {
    setShow((prev) => ({ ...prev, [key]: value }));
  };

  const handleChange = () => {
    const values = form.getFieldsValue();
    onChange({ ...values, avatarUrl, rounded });
  };

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      form.setFieldsValue(data);
    }
  }, [data, form]);

  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={handleChange}
      style={{ width: "100%" }}
    >
      {/* ====== FOTO & IDENTITAS ====== */}
      <div
        style={{
          marginBottom: 24,
          textAlign: "center",
          background: "#fafafa",
          padding: 16,
          borderRadius: 8,
        }}
      >
        <Avatar
          src={data.avatarUrl || avatarUrl || "https://placehold.co/120"}
          size={120}
          shape="square"
          style={{
            borderRadius: `${data.rounded ?? rounded}%`,
            border: "2px solid #d9d9d9",
            objectFit: "cover",
          }}
        />

        <div style={{ marginTop: 12 }}>
          <input
            hidden
            id="avatar-input"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;
              if (!file.type.startsWith("image/")) {
                console.warn("File bukan gambar!");
                return;
              }

              const reader = new FileReader();
              reader.onload = (ev) => {
                setTempImage(ev.target.result);
                setCropModal(true);
              };
              reader.readAsDataURL(file);
            }}
          />
          <Button
            icon={<UploadOutlined />}
            onClick={() => document.getElementById("avatar-input").click()}
          >
            Pilih Foto
          </Button>
        </div>

        {/* === Cropper Modal === */}
        <Modal
          open={cropModal}
          title="Sesuaikan Foto"
          onCancel={() => setCropModal(false)}
          onOk={async () => {
            try {
              const croppedImg = await getCroppedImg(
                tempImage,
                croppedAreaPixels
              );
              setAvatarUrl(croppedImg);
              const values = form.getFieldsValue();
              onChange({ ...values, avatarUrl: croppedImg, rounded });
              setCropModal(false);
            } catch (e) {
              console.error(e);
            }
          }}
          okText="Gunakan Foto"
          width={600}
        >
          {tempImage && (
            <div
              style={{
                position: "relative",
                width: "100%",
                height: 300,
                background: "#333",
              }}
            >
              <Cropper
                image={tempImage}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onRotationChange={setRotation}
                onCropComplete={(_, croppedPixels) =>
                  setCroppedAreaPixels(croppedPixels)
                }
              />
            </div>
          )}
          <div style={{ marginTop: 10 }}>
            <span>Zoom</span>
            <Slider
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={setZoom}
            />
          </div>

          <div style={{ marginTop: 10 }}>
            <span>Rotasi ({rotation}°)</span>
            <Slider
              min={-360}
              max={360}
              step={1}
              value={rotation}
              onChange={setRotation}
            />
          </div>
        </Modal>

        <div style={{ marginTop: 16 }}>
          <span style={{ display: "block", marginBottom: 4 }}>
            Kelengkungan Foto ({rounded}%)
          </span>
          <Slider
            min={0}
            max={50}
            value={rounded}
            onChange={(value) => {
              setRounded(value);
              handleChange();
            }}
          />
        </div>

        {avatarUrl && (
          <Button
            danger
            type="link"
            style={{ marginTop: 8 }}
            onClick={() => {
              setAvatarUrl(null);
              const values = form.getFieldsValue();
              setTimeout(() => {
                onChange({ ...values, avatarUrl: null, rounded });
              }, 0);
            }}
          >
            Hapus Foto
          </Button>
        )}

        <Form.Item
          name="useIcon"
          valuePropName="checked"
          style={{ marginTop: 16 }}
        >
          <Checkbox defaultChecked={true}>Gunakan ikon pada CV</Checkbox>
        </Form.Item>
      </div>

      {/* ====== INFORMASI DASAR ====== */}
      <Form.Item label="Nama Lengkap" name="name" rules={[{ required: true }]}>
        <Input placeholder="Masukkan nama lengkap" />
      </Form.Item>

      <Form.Item label="Posisi / Jabatan" name="position">
        <Input placeholder="Contoh: Frontend Developer" />
      </Form.Item>

      <Form.Item label="Email" name="email" rules={[{ required: true }]}>
        <Input placeholder="Masukkan email Anda" />
      </Form.Item>

      <Form.Item label="Nomor Telepon" name="phone">
        <Input placeholder="Masukkan nomor telepon" />
      </Form.Item>

      <Form.Item label="Alamat Lengkap" name="address">
        <TextArea rows={4} placeholder="Masukkan alamat lengkap" />
      </Form.Item>

      {/* ====== DESKRIPSI DIRI ====== */}
      <div
        style={{
          border: "1px solid #d9e2ec",
          background: "#f9fbfd",
          borderRadius: 10,
          padding: 20,
          marginBottom: 24,
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        }}
      >
        <label
          style={{
            fontWeight: 600,
            fontSize: 16,
            display: "block",
            marginBottom: 12,
            color: "#003366",
          }}
        >
          Deskripsi Diri
        </label>
        <Form.Item name="summary">
          <CKEditor
            editor={ClassicEditor}
            config={editorConfiguration}
            data={form.getFieldValue("summary") || ""}
            onChange={(_, editor) => {
              const value = editor.getData();
              form.setFieldValue("summary", value);
              handleChange();
            }}
          />
        </Form.Item>

        <Button
          icon={<BulbOutlined />}
          onClick={() => toggleModal("summary", true)}
        >
          Tips
        </Button>
        <Modal
          open={show.summary}
          onCancel={() => toggleModal("summary", false)}
          footer={null}
          title="Tips Deskripsi Diri"
        >
          <ol>
            <li>Letakkan profil Anda di bagian paling atas CV.</li>
            <li>
              Tulis ringkasan singkat yang mencerminkan kekuatan, ambisi, dan
              pencapaian Anda.
            </li>
            <li>
              Hindari satu kalimat saja — cobalah tetap padat tapi bermakna.
            </li>
          </ol>
        </Modal>
      </div>

      {/* ====== PENGALAMAN KERJA ====== */}
      <Form.List name="experiences">
        {(fields, { add, remove }) => (
          <SectionCollapse
            title="Pengalaman Kerja"
            tipsKey="experient"
            tipsTitle="Tips Pengalaman Kerja"
            tipsContent={
              <ol>
                <li>
                  Gunakan nama posisi yang profesional, misalnya “Sales” jadi
                  “Account Executive”.
                </li>
                <li>
                  Tulis tugas dan pencapaian Anda secara spesifik dan terukur.
                </li>
                <li>
                  Fokuskan pada pengalaman yang relevan dengan posisi dilamar.
                </li>
              </ol>
            }
            fields={fields}
            add={add}
            remove={remove}
            form={form}
            handleChange={handleChange}
          />
        )}
      </Form.List>

      {/* ====== PENDIDIKAN ====== */}
      <Form.List name="education">
        {(fields, { add, remove }) => (
          <SectionCollapse
            title="Pendidikan"
            tipsKey="education"
            tipsTitle="Tips Pendidikan"
            tipsContent={
              <ol>
                <li>Hanya tulis pendidikan yang relevan.</li>
                <li>
                  Tambahkan jurusan, periode, dan pencapaian akademik penting.
                </li>
                <li>
                  Tidak perlu mencantumkan SD/SMP kecuali itu pendidikan
                  terakhir Anda.
                </li>
              </ol>
            }
            fields={fields}
            add={add}
            remove={remove}
            form={form}
            handleChange={handleChange}
            education
          />
        )}
      </Form.List>

      {/* ====== KEAHLIAN ====== */}
      <Form.List name="skills">
        {(fields, { add, remove }) => (
          <SectionCollapse
            title="Keterampilan / Keahlian"
            tipsKey="skill"
            tipsTitle="Tips Keahlian"
            tipsContent={
              <ol>
                <li>
                  Sebutkan hanya skill yang relevan dengan posisi yang dilamar.
                </li>
                <li>
                  Contoh: React.js, UI Design, Komunikasi Efektif, Problem
                  Solving.
                </li>
                <li>
                  Hindari terlalu banyak daftar — fokus pada keunggulan utama.
                </li>
              </ol>
            }
            fields={fields}
            add={add}
            remove={remove}
            form={form}
            handleChange={handleChange}
            skills
          />
        )}
      </Form.List>

      {/* ====== BAHASA ====== */}
      <Form.List name="languages">
        {(fields, { add, remove }) => (
          <SectionCollapse
            title="Bahasa"
            tipsKey="language"
            tipsTitle="Tips Bahasa"
            tipsContent={
              <ol>
                <li>Selalu sebutkan bahasa asli Anda.</li>
                <li>
                  Sebutkan sebanyak-banyaknya bahasa, tetapi hanya bahasa yang
                  dapat Anda gunakan, baca, dan benar-benar pahami.
                </li>
              </ol>
            }
            fields={fields}
            add={add}
            remove={remove}
            form={form}
            handleChange={handleChange}
            languages
          />
        )}
      </Form.List>
    </Form>
  );
}

/* === REUSABLE SECTION COMPONENT === */
function SectionCollapse({
  title,
  tipsTitle,
  tipsContent,
  fields,
  add,
  remove,
  form,
  handleChange,
  education,
  skills,
  languages,
}) {
  const { isMobile } = useWindowSize();
  const [activeKey, setActiveKey] = useState(null);
  const [showTips, setShowTips] = useState(false);

  const toggleTips = (value = true) => setShowTips(value);

  const formatPeriod = (period) => {
    if (!period || !Array.isArray(period) || period.length !== 2) return "";
    const [start, end] = period;
    const format = (d) =>
      d
        ? new Date(d).toLocaleDateString("id-ID", {
            month: "short",
            year: "numeric",
          })
        : "";
    return `${format(start)} - ${format(end)}`;
  };

  const items = fields.map(({ key, name, ...restField }) => {
    const fieldValues = form.getFieldValue(
      education
        ? ["education", name]
        : skills
        ? ["skills", name]
        : languages
        ? ["languages", name]
        : ["experiences", name]
    );

    let headerText = `Item #${key + 1}`;
    if (skills && fieldValues?.skill) headerText = fieldValues.skill;
    else if (education && (fieldValues?.major || fieldValues?.period)) {
      const jurusan = fieldValues?.major || "";
      const period = formatPeriod(fieldValues?.period);
      headerText = `${jurusan}${period ? ` (${period})` : ""}`;
    } else if (languages && fieldValues?.language) {
      headerText = `${fieldValues.language}${
        fieldValues.level ? ` (${fieldValues.level})` : ""
      }`;
    } else if (
      !education &&
      !skills &&
      !languages &&
      (fieldValues?.position || fieldValues?.period)
    ) {
      const posisi = fieldValues?.position || "";
      const period = formatPeriod(fieldValues?.period);
      headerText = `${posisi}${period ? ` (${period})` : ""}`;
    }

    return {
      key,
      label: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>{headerText || `Item #${key + 1}`}</span>
          <MinusCircleOutlined
            onClick={(e) => {
              e.stopPropagation();
              remove(name);
              if (activeKey === key) setActiveKey(null);
            }}
            style={{ color: "red" }}
          />
        </div>
      ),
      children: (
        <Space
          direction="vertical"
          style={{
            display: "flex",
            background: "#fff",
            padding: 16,
            borderRadius: 8,
            border: "1px solid #eee",
          }}
        >
          {/* SKILL */}
          {skills ? (
            <Form.Item {...restField} name={[name, "skill"]}>
              <Input placeholder="Contoh: React.js, Node.js, UI Design" />
            </Form.Item>
          ) : education ? (
            <>
              <Form.Item
                {...restField}
                label="Institusi"
                name={[name, "school"]}
              >
                <Input placeholder="Nama sekolah / universitas" />
              </Form.Item>
              <Form.Item {...restField} label="Jurusan" name={[name, "major"]}>
                <Input placeholder="Contoh: Informatika" />
              </Form.Item>
              <Form.Item {...restField} label="Periode" name={[name, "period"]}>
                <RangePicker picker="month" style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                {...restField}
                label="Deskripsi"
                name={[name, "description"]}
              >
                <CKEditor
                  editor={ClassicEditor}
                  config={editorConfiguration}
                  data={
                    form.getFieldValue(["education", name, "description"]) || ""
                  }
                  onChange={(_, editor) => {
                    const value = editor.getData();
                    form.setFieldValue(
                      ["education", name, "description"],
                      value
                    );
                    handleChange();
                  }}
                />
              </Form.Item>
            </>
          ) : languages ? (
            <>
              <Form.Item
                {...restField}
                label="Bahasa"
                name={[name, "language"]}
              >
                <Input placeholder="Contoh: Bahasa Inggris" />
              </Form.Item>
              <Form.Item
                {...restField}
                label="Tingkat Kemampuan"
                name={[name, "level"]}
              >
                <Input placeholder="Contoh: Penutur Asli, Lancar, Menengah, Dasar" />
              </Form.Item>
            </>
          ) : (
            // EXPERIENCES
            <>
              <Form.Item
                {...restField}
                label="Posisi / Jabatan"
                name={[name, "position"]}
              >
                <Input placeholder="Contoh: Frontend Developer" />
              </Form.Item>
              <Form.Item
                {...restField}
                label="Perusahaan"
                name={[name, "company"]}
              >
                <Input placeholder="Nama perusahaan" />
              </Form.Item>
              <Form.Item {...restField} label="Periode" name={[name, "period"]}>
                <RangePicker picker="month" style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                {...restField}
                label="Deskripsi"
                name={[name, "description"]}
              >
                <CKEditor
                  editor={ClassicEditor}
                  config={editorConfiguration}
                  data={
                    form.getFieldValue(["experiences", name, "description"]) ||
                    ""
                  }
                  onChange={(_, editor) => {
                    const value = editor.getData();
                    form.setFieldValue(
                      ["experiences", name, "description"],
                      value
                    );
                    handleChange();
                  }}
                />
              </Form.Item>
            </>
          )}
        </Space>
      ),
    };
  });

  return (
    <div
      style={{
        border: "1px solid #d9e2ec",
        background: "#f9fbfd",
        borderRadius: 10,
        padding: 20,
        marginBottom: 24,
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      }}
    >
      <label
        style={{
          fontWeight: 600,
          fontSize: 16,
          display: "block",
          marginBottom: 12,
          color: "#003366",
        }}
      >
        {title}
      </label>

      <Collapse
        accordion
        activeKey={activeKey}
        onChange={(key) => setActiveKey(key)}
        items={items}
      />

      <Form.Item style={{ marginTop: 12 }}>
        <Button
          type="dashed"
          onClick={() => {
            add();
            setActiveKey(fields.length);
          }}
          block
          icon={<PlusOutlined />}
        >
          Tambah {title}
        </Button>
      </Form.Item>

      <Button icon={<BulbOutlined />} onClick={() => toggleTips(true)}>
        Tips
      </Button>
      <Modal
        open={showTips}
        onCancel={() => toggleTips(false)}
        footer={null}
        title={tipsTitle}
        centered={!isMobile}
      >
        {tipsContent}
      </Modal>
    </div>
  );
}
