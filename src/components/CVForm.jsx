import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  Avatar,
  Button,
  Collapse,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Slider,
  Space,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";

const { RangePicker } = DatePicker;
const { Panel } = Collapse;

export default function CVForm({ onChange }) {
  const [form] = Form.useForm();
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [rounded, setRounded] = useState(50);
  const [show, setShow] = useState({
    summary: false,
    experient: false,
    education: false,
    skill: false,
  });

  const toggleModal = (key, value = true) => {
    setShow((prev) => ({ ...prev, [key]: value }));
  };

  const handleChange = () => {
    const values = form.getFieldsValue();
    onChange({ ...values, avatarUrl, rounded });
  };

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
          src={avatarUrl}
          size={120}
          shape="square"
          style={{
            borderRadius: `${rounded}%`,
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
                const newUrl = ev.target.result;
                setAvatarUrl(newUrl);
                const values = form.getFieldsValue();
                onChange({ ...values, avatarUrl: newUrl, rounded });
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
        <Form.Item
          label="Deskripsi Diri"
          name="summary"
          rules={[{ required: true }]}
        >
          <CKEditor
            editor={ClassicEditor}
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
}) {
  const [show, setShow] = useState(false);
  const toggle = (value = true) => setShow(value);

  // helper buat ambil periode dalam format singkat
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

      <Collapse accordion>
        {fields.map(({ key, name, ...restField }) => {
          // ambil data untuk header
          const fieldValues = form.getFieldValue(
            education
              ? ["education", name]
              : skills
              ? ["skills", name]
              : ["experiences", name]
          );

          let headerText = `Item #${key + 1}`;

          if (skills && fieldValues?.skill) {
            headerText = fieldValues.skill;
          } else if (education && (fieldValues?.major || fieldValues?.period)) {
            const jurusan = fieldValues?.major || "";
            const period = formatPeriod(fieldValues?.period);
            headerText = `${jurusan}${period ? ` (${period})` : ""}`;
          } else if (
            !education &&
            !skills &&
            (fieldValues?.position || fieldValues?.period)
          ) {
            const posisi = fieldValues?.position || "";
            const period = formatPeriod(fieldValues?.period);
            headerText = `${posisi}${period ? ` (${period})` : ""}`;
          }

          return (
            <Panel
              header={headerText || `Item #${key + 1}`}
              key={key}
              extra={
                <MinusCircleOutlined
                  onClick={(e) => {
                    e.stopPropagation();
                    remove(name);
                  }}
                  style={{ color: "red" }}
                />
              }
            >
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
                    <Form.Item
                      {...restField}
                      label="Jurusan"
                      name={[name, "major"]}
                    >
                      <Input placeholder="Contoh: Informatika" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      label="Periode"
                      name={[name, "period"]}
                    >
                      <RangePicker picker="month" style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      label="Deskripsi"
                      name={[name, "description"]}
                    >
                      <CKEditor
                        editor={ClassicEditor}
                        data={
                          form.getFieldValue([
                            "education",
                            name,
                            "description",
                          ]) || ""
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
                ) : (
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
                    <Form.Item
                      {...restField}
                      label="Periode"
                      name={[name, "period"]}
                    >
                      <RangePicker picker="month" style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      label="Deskripsi"
                      name={[name, "description"]}
                    >
                      <CKEditor
                        editor={ClassicEditor}
                        data={
                          form.getFieldValue([
                            "experiences",
                            name,
                            "description",
                          ]) || ""
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
            </Panel>
          );
        })}
      </Collapse>

      <Form.Item style={{ marginTop: 12 }}>
        <Button
          type="dashed"
          onClick={() => add()}
          block
          icon={<PlusOutlined />}
        >
          Tambah {title}
        </Button>
      </Form.Item>

      <Button icon={<BulbOutlined />} onClick={() => toggle(true)}>
        Tips
      </Button>
      <Modal
        open={show}
        onCancel={() => toggle(false)}
        footer={null}
        title={tipsTitle}
      >
        {tipsContent}
      </Modal>
    </div>
  );
}
