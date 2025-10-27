import {
  ShoppingOutlined,
  StarOutlined,
  ReadOutlined,
  UserOutlined,
} from "@ant-design/icons";

export default function CVPreview({ data }) {
  const {
    name,
    position,
    email,
    phone,
    address,
    postalcode,
    city,
    summary,
    experiences = [],
    education = [],
    skills = [],
    avatarUrl,
    rounded = 50,
  } = data || {};

  console.log("data", data);

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        background: "#fff",
        padding: 32,
        borderRadius: 8,
        color: "#333",
        lineHeight: 1.6,
      }}
    >
      {/* ===== HEADER ===== */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
        <div>
          <img
            src={avatarUrl || "https://placehold.co/80"}
            alt="avatar"
            style={{
              width: 80,
              height: 80,
              minHeight: 80,
              minWidth: 80,
              borderRadius: `${rounded}%`,
              objectFit: "cover",
              border: "2px solid #ddd",
              marginRight: 16,
            }}
          />
        </div>
        <div>
          <h1 style={{ margin: 0, fontSize: 22 }}>
            {name || "Nama Lengkap Anda"}
          </h1>
          <h3 style={{ margin: "4px 0", fontWeight: 400, color: "#555" }}>
            {position || "Posisi / Jabatan"}
          </h3>
        </div>
      </div>

      {/* ===== PERSONAL INFO ===== */}
      <SectionTitle icon={<UserOutlined />} title="Pribadi" />
      <div style={{ marginBottom: 16 }}>
        <InfoRow
          label="Alamat"
          value={`${address || ""} ${city || ""} ${postalcode || ""}`}
        />
        <InfoRow label="Nomor telepon" value={phone || "08xx-xxxx-xxxx"} />
        <InfoRow label="Email" value={email || "email@contoh.com"} />
      </div>

      {/* ===== SUMMARY ===== */}
      {summary && (
        <div
          style={{
            marginBottom: 24,
            borderLeft: "4px solid #ccc",
            paddingLeft: 12,
          }}
          dangerouslySetInnerHTML={{ __html: summary }}
        />
      )}

      {/* ===== EXPERIENCE ===== */}
      {experiences.length > 0 && (
        <>
          <SectionTitle icon={<ShoppingOutlined />} title="Pengalaman kerja" />
          {experiences.map((exp, i) => {
            const e = exp || {};
            return (
              <div
                key={i}
                style={{
                  marginBottom: 20,
                  borderBottom: "1px solid #eee",
                  paddingBottom: 12,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <div>
                    <h3 style={{ margin: 0 }}>{e.position || "Jabatan"}</h3>
                    <p
                      style={{ margin: 0, color: "#555", fontStyle: "italic" }}
                    >
                      {e.company || "Perusahaan"}
                      {e.location ? `, ${e.location}` : ""}
                    </p>
                  </div>
                  <span style={{ color: "#777", fontSize: 13 }}>
                    {formatPeriod(e.period)}
                  </span>
                </div>

                {e.description && (
                  <div
                    style={{ marginTop: 8 }}
                    dangerouslySetInnerHTML={{ __html: e.description }}
                  />
                )}
              </div>
            );
          })}
        </>
      )}

      {/* ===== EDUCATION ===== */}
      {education.length > 0 && (
        <>
          <SectionTitle icon={<ReadOutlined />} title="Pendidikan" />
          {education.map((edu, i) => {
            const e = edu || {};
            return (
              <div
                key={i}
                style={{
                  marginBottom: 20,
                  borderBottom: "1px solid #eee",
                  paddingBottom: 12,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <div>
                    <h3 style={{ margin: 0 }}>{e.major || "Jurusan"}</h3>
                    <p
                      style={{ margin: 0, color: "#555", fontStyle: "italic" }}
                    >
                      {e.school || "Institusi"}
                    </p>
                  </div>
                  <span style={{ color: "#777", fontSize: 13 }}>
                    {formatPeriod(e.period)}
                  </span>
                </div>

                {e.description && (
                  <div
                    style={{ marginTop: 8 }}
                    dangerouslySetInnerHTML={{ __html: e.description }}
                  />
                )}
              </div>
            );
          })}
        </>
      )}

      {/* ===== SKILLS ===== */}
      {skills.length > 0 && (
        <>
          <SectionTitle icon={<StarOutlined />} title="Keterampilan" />
          <ul style={{ marginTop: 4 }}>
            {skills.map((s, i) => (
              <li key={i}>{s?.skill}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

/* ========== Helper Components ========== */

const SectionTitle = ({ icon, title }) => (
  <div
    style={{
      background: "#f0f0f0",
      padding: "6px 12px",
      borderRadius: 4,
      marginBottom: 12,
      display: "flex",
      alignItems: "center",
      gap: 8,
      fontWeight: 600,
    }}
  >
    {icon}
    <span>{title}</span>
  </div>
);

const InfoRow = ({ label, value }) => (
  <p style={{ margin: "4px 0" }}>
    <strong style={{ display: "inline-block", width: 120 }}>{label}</strong>{" "}
    {value || "-"}
  </p>
);

function formatPeriod(period) {
  if (!Array.isArray(period) || period.length === 0) return "";
  const [start, end] = period;
  const format = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const month = d.toLocaleString("default", { month: "short" });
    const year = d.getFullYear();
    return `${month} ${year}`;
  };
  return `${format(start)}${end ? " – " + format(end) : ""}`;
}
