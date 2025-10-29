import {
  EditOutlined,
  GlobalOutlined,
  ReadOutlined,
  ShoppingOutlined,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { formatPeriod } from "../utils/formatPeriod";

export default function CVPreview4({ data }) {
  const {
    name,
    position,
    email,
    phone,
    address,
    summary,
    experiences = [],
    education = [],
    skills = [],
    languages = [],
    avatarUrl,
    rounded = 50,
    useIcon = true,
  } = data || {};

  return (
    <div
      style={{
        fontFamily: "'Inter', Arial, sans-serif",
        background: "#ffffff",
        color: "#1a1a1a",
        lineHeight: 1.6,
        borderRadius: 8,
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      {/* ===== HEADER ===== */}
      <div
        style={{
          background: "#f0f0f0",
          display: "flex",
          alignItems: "center",
          padding: "24px 32px",
          borderBottom: "3px solid #dfdfdf",
        }}
      >
        <img
          src={avatarUrl || "https://placehold.co/100x100"}
          alt="avatar"
          style={{
            width: 100,
            height: 100,
            borderRadius: `${rounded}%`,
            objectFit: "cover",
            marginRight: 24,
            border: "3px solid #fff",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        />

        <div>
          <h1
            style={{
              margin: 0,
              fontSize: 26,
              fontWeight: 700,
              color: "#1a2b4c",
            }}
          >
            {name || "Nama Lengkap"}
          </h1>
          {position && (
            <h3
              style={{
                margin: "4px 0 0 0",
                fontWeight: 500,
                color: "#444",
              }}
            >
              {position}
            </h3>
          )}
        </div>
      </div>

      {/* ===== BODY ===== */}
      <div
        style={{
          padding: 32,
        }}
      >
        <SectionHeading
          title="Data Pribadi"
          icon={useIcon ? <UserOutlined /> : null}
        />
        <InfoRow label="Nama" value={name || "Nama Lengkap"} />
        <InfoRow label="Telepon" value={phone || "08xx-xxxx-xxxx"} />
        <InfoRow label="Email" value={email || "email@contoh.com"} />
        <InfoRow label="Alamat" value={address || "-"} />

        {summary && (
          <>
            <SectionHeading
              title="Ringkasan Profil"
              icon={useIcon ? <EditOutlined /> : null}
            />
            <div
              style={{
                textAlign: "justify",
                color: "#444",
                fontSize: 14,
                borderLeft: "4px solid #ccc",
                paddingLeft: 12,
                marginBottom: 24,
              }}
              dangerouslySetInnerHTML={{ __html: summary }}
            />
          </>
        )}

        {skills.length > 0 && (
          <>
            <SectionHeading
              title="Keterampilan"
              icon={useIcon ? <StarOutlined /> : null}
            />
            <ul style={{ marginTop: 8 }}>
              {skills.map((s, i) => (
                <li key={i}>{s?.skill}</li>
              ))}
            </ul>
          </>
        )}

        {languages.length > 0 && (
          <>
            <SectionHeading
              title="Bahasa"
              icon={useIcon ? <GlobalOutlined /> : null}
            />
            <ul style={{ marginTop: 8 }}>
              {languages.map((lang, i) => (
                <li key={i}>
                  {lang?.language}{" "}
                  {lang?.level ? (
                    <span style={{ color: "#777" }}>– {lang.level}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          </>
        )}

        {experiences.length > 0 && (
          <>
            <SectionHeading
              title="Pengalaman Kerja"
              icon={useIcon ? <ShoppingOutlined /> : null}
            />
            {experiences.map((exp, i) => {
              const e = exp || {};
              return (
                <div
                  key={i}
                  style={{
                    marginBottom: 20,
                    borderBottom: "1px solid #eee",
                    paddingBottom: 10,
                  }}
                >
                  <strong>{e.position || "Jabatan"}</strong>
                  <div style={{ fontStyle: "italic", color: "#555" }}>
                    {e.company || "Perusahaan"}
                  </div>
                  <div style={{ color: "#777", fontSize: 13 }}>
                    {formatPeriod(e.period)}
                  </div>
                  {e.description && (
                    <div
                      style={{ marginTop: 6 }}
                      dangerouslySetInnerHTML={{
                        __html: e.description,
                      }}
                    />
                  )}
                </div>
              );
            })}
          </>
        )}

        {education.length > 0 && (
          <>
            <SectionHeading
              title="Pendidikan"
              icon={useIcon ? <ReadOutlined /> : null}
            />
            {education.map((edu, i) => {
              const e = edu || {};
              return (
                <div
                  key={i}
                  style={{
                    marginBottom: 20,
                    borderBottom: "1px solid #eee",
                    paddingBottom: 10,
                  }}
                >
                  <strong>{e.major || "Jurusan"}</strong>
                  <div style={{ fontStyle: "italic", color: "#555" }}>
                    {e.school || "Institusi"}
                  </div>
                  <div style={{ color: "#777", fontSize: 13 }}>
                    {formatPeriod(e.period)}
                  </div>
                  {e.description && (
                    <div
                      style={{ marginTop: 6 }}
                      dangerouslySetInnerHTML={{
                        __html: e.description,
                      }}
                    />
                  )}
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

/* ===== Sub Components ===== */
function SectionHeading({ title, icon }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontWeight: 600,
        fontSize: 16,
        color: "#222",
        borderBottom: "2px solid #ccc",
        paddingBottom: 4,
        marginBottom: 12,
        textTransform: "uppercase",
      }}
    >
      {icon}
      {title}
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <p style={{ margin: "4px 0", fontSize: 14 }}>
      <strong style={{ display: "inline-block", width: 100 }}>{label}</strong> :{" "}
      {value || "-"}
    </p>
  );
}
